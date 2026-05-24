import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("..", import.meta.url));
const externalUrl = process.env.PORTFOLIO_VERIFY_URL;
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const server = externalUrl ? null : createServer(async (request, response) => {
  try {
    const requested = request.url === "/" ? "/index.html" : request.url;
    const filePath = join(root, decodeURIComponent(requested.split("?")[0]));
    const content = await readFile(filePath);
    response.writeHead(200, { "content-type": mime[extname(filePath)] || "application/octet-stream" });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end("not found");
  }
});

let targetUrl = externalUrl;
if (!targetUrl) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  targetUrl = `http://127.0.0.1:${port}/`;
}

const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto(targetUrl, { waitUntil: "networkidle" });

  const requiredJapaneseText = [
    "AI作品集",
    "人間が決める。",
    "このページは、人間主導のAI作品を見る入口です。",
    "30秒レビュー手順",
    "忙しい人は、この順番で見てください。",
    "まず全体を見る",
    "公開ページを開く",
    "確認できるものを見る",
    "公開した作品",
    "AI時代の投稿管理",
    "投資調査メモ作成",
    "造船所パズル解き",
    "Web調査の証拠整理",
    "AI共存の効果確認",
    "AI作業の記録",
    "証拠を見ながら事故調査"
  ];

  for (const text of requiredJapaneseText) {
    const count = await page.getByText(text, { exact: false }).count();
    if (count === 0) {
      throw new Error(`missing Japanese-first text: ${text}`);
    }
  }

  const japaneseText = await page.locator("body").innerText();
  const bannedJapaneseModeText = [
    "AI Product Portfolio",
    "Human-AI products",
    "Featured",
    "Shipped Products",
    "View products",
    "Start here",
    "public product lanes",
    "working demos",
    "submitted Devpost project",
    "First-time visitors",
    "Choose by purpose",
    "Hackathon lanes",
    "Evidence-first",
    "Submitted",
    "Ready package",
    "Submit window locked",
    "Proof stage",
    "Live app",
    "Operating system",
    "Agent Work Needs a Control Room",
    "Not Just Screenshots",
    "What this portfolio proves",
    "Back to top"
  ];
  for (const text of bannedJapaneseModeText) {
    if (japaneseText.includes(text)) {
      throw new Error(`english text still visible in Japanese mode: ${text}`);
    }
  }

  await page.getByRole("button", { name: "EN" }).click();

  const requiredEnglishText = [
    "Human decides. AI ships.",
    "This page is the front door to a human-led AI product portfolio.",
    "30-second review path",
    "If you are busy, review in this order.",
    "Understand the whole picture",
    "Open the live page",
    "Check the proof",
    "Shipped Products",
    "Coexistence Console",
    "Investor Diligence War Room",
    "Shipyard Solver Lab",
    "Live Web Evidence Agent",
    "Coexistence Impact Engine",
    "AgentOps Flight Recorder",
    "Evidence-Locked DFIR Agent"
  ];

  for (const text of requiredEnglishText) {
    const count = await page.getByText(text, { exact: false }).count();
    if (count === 0) {
      throw new Error(`missing English text: ${text}`);
    }
  }

  const cardCount = await page.locator(".project-card").count();
  if (cardCount < 10) {
    throw new Error(`expected at least 10 project cards, got ${cardCount}`);
  }

  const imageCount = await page.locator(".project-card img").evaluateAll((images) =>
    images.filter((image) => image.complete && image.naturalWidth > 0).length
  );
  if (imageCount < 10) {
    throw new Error(`expected at least 10 loaded images, got ${imageCount}`);
  }

  await page.getByRole("button", { name: "日本語" }).click();
  await page.getByText("人間が決める。", { exact: false }).waitFor();
  await page.getByText("このページは、人間主導のAI作品を見る入口です。", { exact: false }).waitFor();
  await page.getByText("公開した作品", { exact: false }).waitFor();

  await page.getByRole("button", { name: "ハッカソン" }).click();
  const filterState = await page.locator(".project-card").evaluateAll((projectCards) => ({
    visible: projectCards.filter((card) => !card.hidden).length,
    hidden: projectCards.filter((card) => card.hidden).length
  }));
  if (filterState.visible !== 6 || filterState.hidden !== 6) {
    throw new Error(`expected hackathon filter to show 6 and hide 6, got ${JSON.stringify(filterState)}`);
  }

  await page.getByRole("button", { name: "すべて" }).click();
  const screenshotName = externalUrl ? "portfolio-vercel-full.png" : "portfolio-full.png";
  await page.screenshot({ path: join(root, "media", screenshotName), fullPage: true });
  console.log(`portfolio_verify_ok url=${targetUrl} cards=${cardCount} loaded_images=${imageCount} screenshot=media/${screenshotName}`);
} finally {
  await browser.close();
  if (server) {
    server.close();
  }
}
