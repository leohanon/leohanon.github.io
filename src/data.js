// Single source of truth for the site. Facts come from the master resume doc.
// Dates are "YYYY-MM"; end: null means ongoing.

export const TODAY = "2026-11";

export const person = {
  name: "Leonardo Hanon",
  title: "AI Software Engineer",
  location: "Detroit, MI",
  summary:
    "I ship production LLM agents end to end: data ingestion, tools, RAG, evals, UI and deployment. Before engineering I spent 8 years in operations, growth and product at Uber, Outschool and Accenture, so I scope AI work around the business metric it has to move.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/leohanon/" },
  ],
};

export const experience = [
  {
    id: "upsmith",
    short: "UpSmith",
    logo: { src: "/media/logos/upsmith.png", bg: "#ffffff", pad: 0.14 },
    role: "AI Software Engineer",
    org: "UpSmith",
    start: "2025-09",
    end: null,
    blurb: "AI agents for home-service businesses (HVAC, plumbing) that run on ServiceTitan.",
    bullets: [
      "Rebuilt the multi-tenant infrastructure for AI agents that text customers over SMS, with per-company settings, campaigns and tools, booking jobs directly into ServiceTitan.",
      "Built Ask Jenny, an analytics AI agent for shop owners: natural-language reporting over the warehouse, scheduled reports by SMS and email, sub-agent delegation.",
      "Built ServiceTitan and QuickBooks ingestion into Postgres and Redshift, and a Knowledge Agent that drafts shop rules for staff approval, backed by regression evals.",
      "Built evals for AI voice and SMS conversations and an internal MCP server for operators.",
      "Authored 3,000+ pull requests across backend, data, AI and frontend in 15 months.",
    ],
    stack: ["Python", "TypeScript", "React", "Postgres", "Redshift", "dbt", "AWS", "Kubernetes"],
  },
  {
    id: "guayaba",
    short: "Guayaba Games",
    logo: { src: "/media/logos/guayaba.png", bg: "#010101", pad: 0.00 },
    role: "Owner",
    org: "Guayaba Games LLC",
    start: "2022-10",
    end: null,
    blurb: "My company. Full time on games from 2022 to 2024; since then, client AI work and my own apps alongside my day job.",
    bullets: [],
    stack: [],
  },
  {
    id: "amplitude",
    short: "Command AI → Amplitude",
    logo: { src: "/media/logos/amplitude.png", bg: "#1e61f0", pad: 0.00 },
    role: "Software Engineer",
    org: "Amplitude (acquired Command AI)",
    start: "2024-09",
    end: "2025-09",
    blurb: "Joined Command AI, an AI chat and in-app assistant company, shortly before Amplitude acquired it.",
    bullets: [
      "Ported Command AI's AI assistant, including the model layer, into Amplitude after the acquisition.",
      "Built ~10 CRM and helpdesk integrations (Salesforce, Zendesk and more) so the AI could chat through them, and ingested their help docs into a vector database for retrieval.",
    ],
    stack: ["AI chat", "CRM integrations", "Vector search"],
  },
  {
    id: "outschool",
    short: "Outschool",
    logo: { src: "/media/logos/outschool.svg", bg: "#ffffff", pad: 0.06 },
    role: "Product Manager & Growth Lead",
    org: "Outschool",
    start: "2019-06",
    end: "2022-10",
    blurb: "Joined as the 12th employee and left at 150+.",
    bullets: [
      "Led an engineering pod shipping in-product currency and B2B payments, and optimized referrals and sign-up flows.",
      "Ran 2–3 A/B tests a month, including ML recommendation tuning.",
    ],
    stack: ["SQL", "Python", "Experimentation"],
  },
  {
    id: "uber",
    short: "Uber",
    logo: { src: "/media/logos/uber.svg", bg: "#000000", pad: 0.12 },
    role: "Central Ops Lead & Ops Manager",
    org: "Uber",
    start: "2016-09",
    end: "2019-06",
    blurb: "Uber Eats operations in Atlanta, then central ops in San Francisco.",
    bullets: [
      "Led 3 analysts automating ops in SQL and Python; built models that set restaurant delivery areas and where service is available in each city.",
      "Helped launch 5 Uber Eats markets and ran courier operations for 4 cities; ran weekly A/B experiments on driver pay.",
    ],
    stack: ["Python", "SQL"],
  },
  {
    id: "accenture",
    short: "Accenture",
    logo: { src: "/media/logos/accenture.svg", bg: "#ffffff", pad: 0.20 },
    role: "Consultant",
    org: "Accenture",
    start: "2014-03",
    end: "2016-09",
    blurb: "Operations and supply chain consulting in Atlanta.",
    bullets: [
      "Used SQL and Python to find, execute and measure cost savings, including $25M in capex for a large telecom client.",
    ],
    stack: ["SQL", "Python"],
  },
];

// Projects inside the Guayaba Games card. Keep each to a one-line summary,
// at most two short bullets, and a few stack tags, so the cards stay even.
export const projects = [
  {
    id: "upscrolled",
    name: "UpScrolled support responder",
    kind: "Client work",
    summary: "Zendesk AI agent that triages and answers a support backlog, built for UpScrolled's support team.",
    bullets: [
      "Tool-calling agent (PydanticAI, Claude) tags, escalates or replies in the customer's language; shadow mode lets staff review before anything is sent.",
      "Retrieval over the Help Center (Pinecone), versioned prompts and full traces in Langfuse, parallel workers on the Zendesk API.",
    ],
    stack: ["Python", "PydanticAI", "Claude", "Pinecone", "React"],
    links: [],
    // Mock data: the real admin UI run against a fake API with made-up tickets.
    media: [
      { src: "/media/upscrolled/ticket-reply-shadow.jpg", alt: "A locked-out customer's ticket and the AI's drafted reply, held in shadow mode (sample data)" },
      { src: "/media/upscrolled/run-history.jpg", alt: "Run history: processed tickets and the agent's step-by-step trace for a Spanish ticket (sample data)" },
      { src: "/media/upscrolled/launch-configure.jpg", alt: "Launch settings: always-on mode and manual runs on a Zendesk view (sample data)" },
      { src: "/media/upscrolled/agent-prompt-tools.jpg", alt: "Agent settings: versioned prompt and the tools it may use (sample data)" },
    ],
    shape: "auto",
  },
  {
    id: "derny",
    name: "Derny",
    kind: "iOS app",
    summary: "iOS app that controls smart trainers over Bluetooth, with a rules engine that adapts the workout to live heart rate and power.",
    bullets: [
      "Hosted MCP server with OAuth, so Claude or ChatGPT can write workouts against a shared Zod schema.",
      "Apple Watch companion, Supabase sync and an Android port in Kotlin.",
    ],
    stack: ["Swift", "SwiftUI", "Kotlin", "Supabase", "MCP"],
    links: [{ label: "derny.app", href: "https://derny.app" }],
    media: [
      { src: "/media/derny/live-adaptive-ride.webp", alt: "Live ride screen adjusting power to heart rate" },
      { src: "/media/derny/workout-library.webp", alt: "Workout library" },
      { src: "/media/derny/activity-detail.webp", alt: "Ride analytics" },
      { src: "/media/derny/progress.webp", alt: "Training progress" },
      { src: "/media/derny/bluetooth-ready.webp", alt: "Connecting a trainer over Bluetooth" },
    ],
    shape: "tall",
  },
  {
    id: "resto",
    name: "Resto",
    kind: "iOS + web app",
    summary: "Job tracking for a water damage restoration company, from first call to final payment.",
    bullets: [
      "iPhone app turns LiDAR room scans (RoomPlan) into measured floor plans and photo-textured 3D models.",
      "Offline-first: a local SQLite store and an ordered outbox that syncs to a Next.js + Supabase web app.",
    ],
    stack: ["Swift", "RoomPlan", "Next.js", "Supabase"],
    links: [],
    media: [
      { src: "/media/resto/floor-plan.png", alt: "Measured floor plan of a scanned basement" },
      { src: "/media/resto/3d-shapes.png", alt: "3D model of the scanned rooms" },
      { src: "/media/resto/3d-photos.png", alt: "Photo-textured 3D scan of the rooms" },
      { src: "/media/resto/3d-photos-closeup.png", alt: "Close-up of the photo-textured 3D scan" },
    ],
    shape: "tall",
  },
  {
    id: "afterimage",
    name: "Afterimage",
    kind: "macOS app",
    summary: "macOS menu-bar app that adds a virtual camera for Zoom and other video apps.",
    bullets: [
      "Camera extension switches between the live webcam and a looping clip without the call changing cameras.",
      "Only turns on the real webcam while an app is actually using the camera.",
    ],
    stack: ["Swift", "Camera extension"],
    links: [{ label: "Website", href: "https://leohanon.github.io/afterimage/" }],
    media: [
      { src: "/media/afterimage/call.jpg", alt: "Afterimage in a video call" },
      { src: "/media/afterimage/menu.jpg", alt: "Afterimage menu" },
      { src: "/media/afterimage/camera.jpg", alt: "Choosing the Afterimage camera" },
      { src: "/media/afterimage/menubar.jpg", alt: "Menu-bar icon" },
    ],
    shape: "tall",
  },
  {
    id: "gorathar",
    name: "Gorathar",
    kind: "iOS game",
    summary: "Rogue-like deckbuilder for iOS. I wrote all the code in Unity and C#, and hired the art and audio.",
    bullets: [
      "Data-driven engine: ~770 C# scripts, with cards, buffs and events defined as ScriptableObjects, procedural maps, and 40 test files including balance tests.",
      "Bluetooth bike mode reads a smart bike to power battles and exports workouts as TCX; ads, in-app purchases and event analytics.",
    ],
    stack: ["C#", "Unity"],
    links: [
      { label: "Steam", href: "https://store.steampowered.com/app/2545950/Gorathar/" },
    ],
    media: [
      { src: "/media/gorathar/battle.jpg", alt: "Gorathar battle screen" },
      { src: "/media/gorathar/cards.jpg", alt: "Gorathar cards" },
      { src: "/media/gorathar/monsters.jpg", alt: "Gorathar monsters" },
      { src: "/media/gorathar/achievements.jpg", alt: "Gorathar achievements" },
    ],
    shape: "tall",
  },
  {
    id: "bobo-blitz",
    name: "Bobo Blitz",
    kind: "PC game",
    summary: "Deckbuilder football game for PC, built on Gorathar's card engine.",
    bullets: [
      "~530 C# scripts for cards, plays and characters on a 3D field.",
      "Steamworks integration, localization and gameplay analytics.",
    ],
    stack: ["C#", "Unity", "Steamworks"],
    links: [{ label: "Steam", href: "https://store.steampowered.com/app/2826460/Bobo_Blitz/" }],
    media: [
      { src: "/media/bobo-blitz/header.jpg", alt: "Bobo Blitz key art" },
      { src: "/media/bobo-blitz/play-1.jpg", alt: "Bobo Blitz gameplay" },
      { src: "/media/bobo-blitz/play-2.jpg", alt: "Bobo Blitz gameplay" },
      { src: "/media/bobo-blitz/play-3.jpg", alt: "Bobo Blitz gameplay" },
      { src: "/media/bobo-blitz/play-4.jpg", alt: "Bobo Blitz gameplay" },
    ],
    shape: "wide",
  },
];

export const skills = [
  { group: "AI", items: ["Agents & tool use", "RAG & vector search", "Evals", "Human-in-the-loop review", "MCP servers", "Claude & OpenAI APIs"] },
  { group: "Data", items: ["Python", "SQL", "Postgres", "Redshift", "dbt", "Java"] },
  { group: "Web & infra", items: ["TypeScript", "React", "Next.js", "Vite", "AWS", "Kubernetes", "Vercel"] },
  { group: "Mobile & games", items: ["Swift", "SwiftUI", "Kotlin", "C#"] },
];

export const education = {
  id: "education",
  short: "UCF",
  logo: { src: "/media/logos/ucf.png", bg: "#ffffff", pad: 0.06 },
  degree: "B.S. Industrial Engineering, Magna Cum Laude",
  school: "University of Central Florida",
  start: "2010-08",
  end: "2013-12",
  years: "2010 – 2013",
  societies: "Institute of Industrial Engineers, Tau Beta Pi, Alpha Pi Mu",
};
