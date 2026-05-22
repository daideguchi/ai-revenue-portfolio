import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("..", import.meta.url));
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const server = createServer(async (request, response) => {
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

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });

  const requiredText = [
    "Human decides. AI ships.",
    "Coexistence Console",
    "Investor Diligence War Room",
    "Shipyard Solver Lab",
    "Live Web Evidence Agent",
    "Coexistence Impact Engine",
    "AgentOps Flight Recorder",
    "Evidence-Locked DFIR Agent"
  ];

  for (const text of requiredText) {
    const count = await page.getByText(text, { exact: false }).count();
    if (count === 0) {
      throw new Error(`missing text: ${text}`);
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
  await page.getByText("人間が決める。AIが進める。", { exact: false }).waitFor();

  await page.getByRole("button", { name: "Hackathon lanes" }).click();
  const filterState = await page.locator(".project-card").evaluateAll((projectCards) => ({
    visible: projectCards.filter((card) => !card.hidden).length,
    hidden: projectCards.filter((card) => card.hidden).length
  }));
  if (filterState.visible !== 6 || filterState.hidden !== 6) {
    throw new Error(`expected hackathon filter to show 6 and hide 6, got ${JSON.stringify(filterState)}`);
  }

  await page.getByRole("button", { name: "All" }).click();
  await page.screenshot({ path: join(root, "media", "portfolio-full.png"), fullPage: true });
  console.log(`portfolio_verify_ok cards=${cardCount} loaded_images=${imageCount} screenshot=media/portfolio-full.png`);
} finally {
  await browser.close();
  server.close();
}
