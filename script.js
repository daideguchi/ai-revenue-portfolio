const langButtons = document.querySelectorAll("[data-lang]");
const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");

const translations = {
  en: {
    pageTitle: "DD AI Product Portfolio",
    brandTitle: "AI Product Portfolio",
    brandSub: "Human-AI products, shipped in public",
    navFeatured: "Featured",
    navSystem: "System",
    navProof: "Proof",
    heroEyebrow: "DD x AI organization",
    viewProducts: "View products",
    metricProducts: "public product lanes",
    metricDemos: "working demos and screenshots",
    metricSubmitted: "submitted Devpost project, with more queued",
    featuredEyebrow: "Featured work",
    featuredTitle: "Shipped Products",
    filterAll: "All",
    filterHackathon: "Hackathon lanes",
    filterAgentops: "AgentOps",
    filterEvidence: "Evidence-first",
    statusSubmitted: "Submitted",
    statusReady: "Ready package",
    statusReadyShort: "Ready",
    statusQueued: "Submit window locked",
    statusQueuedShort: "Queued",
    statusProof: "Proof stage",
    statusPublicDemos: "Public demos",
    tagInvestor: "Investor workflow",
    tagOptimization: "Optimization",
    tagWeb: "Live web research",
    tagCoexistence: "AI coexistence",
    tagLaunch: "Launch system",
    coexistenceTitle: "Coexistence Console",
    investorTitle: "Investor Diligence War Room",
    shipyardTitle: "Shipyard Solver Lab",
    webEvidenceTitle: "Live Web Evidence Agent",
    impactTitle: "Coexistence Impact Engine",
    shiproomTitle: "Shiproom OS",
    gatewayTitle: "Resilient AgentOps Gateway",
    recorderTitle: "AgentOps Flight Recorder",
    caseTitle: "AgentOps Case Control Room",
    geminiOpsTitle: "Gemini Operations Navigator",
    handoffTitle: "Human-AI Handoff Copilot",
    dfirTitle: "Evidence-Locked DFIR Agent",
    proofDevvit: "Devvit app",
    proofJapaneseUi: "Japanese UI",
    proofGeminiDrafts: "Gemini policy drafts",
    proofGemini: "Gemini proof",
    proofNarrated: "Narrated demo",
    proofDevpostSubmitted: "Devpost submitted",
    proofChecker: "Official checker smoke",
    proofRuns: "1,051 runs",
    proofZip: "Submission zip",
    proofSources: "Source ledger",
    proofVoice: "Voice handoff",
    proofLadder: "Evidence ladder",
    proofBoundary: "Claim boundaries",
    proofLaunchPacket: "Launch packet",
    proofEvidenceLedger: "Evidence ledger",
    proofNovus: "Novus/Pendo proof",
    linkLive: "Live app",
    systemEyebrow: "Operating system",
    systemTitle: "Agent Work Needs a Control Room",
    gatewayDesc: "Visible model routing, fallback, risk, cost, approval gates, and handoff state for resilient AI workflows.",
    recorderDesc: "A Splunk-ready black box for human-AI operations, with event timelines, risk signals, and replayable evidence.",
    caseDesc: "Turns AI-agent work into a UiPath-style governed case with risk, robot work items, approval tasks, and handoff.",
    geminiOpsDesc: "Gemini plus MCP-style support operations with tool traces, cost guardrails, and a human approval checkpoint.",
    handoffDesc: "A required-field handoff packet for support escalation, approval pauses, and next-human or next-agent resumption.",
    dfirDesc: "AI-assisted incident response where every claim cites evidence and unsupported certainty is blocked as a risk.",
    proofEyebrow: "Proof posture",
    proofTitle: "Not Just Screenshots",
    proofBoxTitle: "What this portfolio proves",
    proofBullet1: "Public products can be shipped quickly without hiding human approval boundaries.",
    proofBullet2: "AI-assisted work becomes safer when evidence, logs, and handoff packets are first-class artifacts.",
    proofBullet3: "Hackathon submissions are stronger when the README, demo, verifier, and live app tell the same story.",
    tableProduct: "Product",
    tableStatus: "Status",
    tableProof: "Primary proof",
    tableCoexistenceProof: "Devvit app, Gemini drafts, Japanese UI",
    tableInvestorProof: "Gemini proof, narrated demo, Devpost",
    tableShipyardProof: "Official checker smoke and submission zip",
    tableWebProof: "Source ledger and voice handoff demo",
    tableAgentopsSuite: "AgentOps suite",
    tableAgentopsProof: "Trace, approval, case, DFIR, and handoff artifacts",
    footerText: "Built by DD with AI agents. Public demos are proof-oriented prototypes, not inflated production claims.",
    backTop: "Back to top"
  },
  ja: {
    pageTitle: "DD AI作品集",
    brandTitle: "AI作品集",
    brandSub: "人とAIで作った公開作品",
    navFeatured: "作品",
    navSystem: "仕組み",
    navProof: "確認",
    heroEyebrow: "DDとAI組織",
    viewProducts: "作品を見る",
    metricProducts: "公開作品",
    metricDemos: "動くデモと画像",
    metricSubmitted: "提出済み。ほかも準備中",
    featuredEyebrow: "主な作品",
    featuredTitle: "公開した作品",
    filterAll: "すべて",
    filterHackathon: "ハッカソン",
    filterAgentops: "AI運用",
    filterEvidence: "証拠重視",
    statusSubmitted: "提出済み",
    statusReady: "提出準備済み",
    statusReadyShort: "準備済み",
    statusQueued: "提出開始待ち",
    statusQueuedShort: "待機中",
    statusProof: "検証中",
    statusPublicDemos: "公開デモ",
    tagInvestor: "投資調査",
    tagOptimization: "最適化",
    tagWeb: "Web調査",
    tagCoexistence: "AI共存",
    tagLaunch: "公開準備",
    coexistenceTitle: "AI時代の投稿管理",
    investorTitle: "投資調査メモ作成",
    shipyardTitle: "造船所パズル解き",
    webEvidenceTitle: "Web調査の証拠整理",
    impactTitle: "AI共存の効果確認",
    shiproomTitle: "公開準備OS",
    gatewayTitle: "AI運用の入口",
    recorderTitle: "AI作業の記録",
    caseTitle: "AI作業の案件管理",
    geminiOpsTitle: "Gemini業務ナビ",
    handoffTitle: "人とAIの引き継ぎ補助",
    dfirTitle: "証拠を見ながら事故調査",
    proofDevvit: "Devvitアプリ",
    proofJapaneseUi: "日本語画面",
    proofGeminiDrafts: "Geminiで方針案",
    proofGemini: "Gemini検証",
    proofNarrated: "音声つきデモ",
    proofDevpostSubmitted: "Devpost提出済み",
    proofChecker: "公式チェッカー確認",
    proofRuns: "1,051回検証",
    proofZip: "提出zip",
    proofSources: "出典一覧",
    proofVoice: "音声引き継ぎ",
    proofLadder: "証拠の段階",
    proofBoundary: "言える範囲",
    proofLaunchPacket: "公開準備セット",
    proofEvidenceLedger: "証拠一覧",
    proofNovus: "Novus/Pendo確認",
    linkLive: "公開サイト",
    systemEyebrow: "運用の仕組み",
    systemTitle: "AIの仕事には管理画面が必要",
    gatewayDesc: "AIの経路、失敗時の切り替え、リスク、費用、承認、引き継ぎを一画面で見るための仕組みです。",
    recorderDesc: "AIが何をしたかを、あとから追えるように記録する仕組みです。",
    caseDesc: "AIの作業を一つの案件としてまとめ、リスク、承認、引き継ぎを残します。",
    geminiOpsDesc: "Geminiを使った業務で、道具の利用、費用、証拠、人間の承認を見えるようにします。",
    handoffDesc: "AIが止まるべき場面で、人間や次のAIへ安全に引き継ぐための仕組みです。",
    dfirDesc: "事故調査で、証拠があることだけを言い、証拠が弱い断定を止めるAIです。",
    proofEyebrow: "確認できること",
    proofTitle: "見た目だけではありません",
    proofBoxTitle: "このページで分かること",
    proofBullet1: "人間の承認を隠さずに、公開できる形まで作れています。",
    proofBullet2: "AIの仕事は、証拠、ログ、引き継ぎがあるほど安全になります。",
    proofBullet3: "説明、デモ、検証、公開サイトが同じ内容を指しています。",
    tableProduct: "作品",
    tableStatus: "状態",
    tableProof: "確認できること",
    tableCoexistenceProof: "Devvitアプリ、Gemini方針案、日本語画面",
    tableInvestorProof: "Gemini検証、音声つきデモ、Devpost",
    tableShipyardProof: "公式チェッカー確認、提出zip",
    tableWebProof: "出典一覧、音声引き継ぎデモ",
    tableAgentopsSuite: "AI運用シリーズ",
    tableAgentopsProof: "記録、承認、案件管理、事故調査、引き継ぎ",
    footerText: "DDがAIと作った公開作品集です。見た目だけでなく、確認できるものを載せています。",
    backTop: "上へ戻る"
  }
};

const setLanguage = (lang) => {
  document.documentElement.lang = lang === "ja" ? "ja" : "en";
  document.body.dataset.lang = lang;
  document.title = translations[lang].pageTitle;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[lang][key] || translations.en[key] || element.textContent;
  });
  localStorage.setItem("portfolioLang", lang);
  langButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.lang === lang ? "true" : "false");
  });
};

const setFilter = (filter) => {
  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.filter === filter ? "true" : "false");
  });

  cards.forEach((card) => {
    const matches = filter === "all" || card.dataset.category.split(" ").includes(filter);
    card.hidden = !matches;
  });
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

const savedLang = localStorage.getItem("portfolioLang");
const browserLang = navigator.language && navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
setLanguage(savedLang || browserLang);
setFilter("all");
