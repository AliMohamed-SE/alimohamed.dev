export type NavItem = { href: string; label: string };

export type Pillar = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  link: { href: string; label: string };
};

export type CaseStudyCard = {
  id: string;
  index: string;
  title: string;
  summary: string;
  tags: string[];
  href: string;
};

export type SideProject = {
  id: string;
  title: string;
  summary: string;
  stack: string;
};

export type Role = {
  id: string;
  company: string;
  title: string;
  meta: string;
  body: string[];
};

export type SkillGroup = {
  id: string;
  label: string;
  tone: "accent" | "neutral";
  items: string[];
};

export const NAV_ITEMS: NavItem[] = [
  { href: "#approach", label: "Approach" },
  { href: "#pipeline", label: "Automation" },
  { href: "#cases", label: "Case studies" },
  { href: "#jarvis", label: "AI & retrieval" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const HERO = {
  kicker: "Cairo, Egypt  ·  Software Architect & Engineer",
  title: "Ali Mohamed",
  lede: "I work out what an organisation actually needs to build, and why. Then I build it.",
  body: "Four years turning ambiguous enterprise problems into systems that run in production. At Dell the brief was better search; the real problem was that configuration dependencies live between documents, so I designed retrieval around relationships instead. At Ark I architect AI products for enterprise clients, and I set the AI-assisted development practice the company now works in.",
} as const;

export const PILLARS: Pillar[] = [
  {
    id: "diagnosis",
    kicker: "Diagnosis",
    title: "Find the real problem first",
    body: "Most briefs describe a symptom. I work with the people who own the problem to find what is actually constraining them, and I will say so when the thing being asked for is not the thing that helps.",
    link: { href: "#jarvis", label: "How that went at Dell" },
  },
  {
    id: "architecture",
    kicker: "Architecture",
    title: "Decisions I can defend",
    body: "Retrieval models, service boundaries, where AI belongs and where determinism does, who approves what. Each one is a tradeoff I can explain to an engineer and to the person paying for it.",
    link: { href: "#cases", label: "Case studies" },
  },
  {
    id: "delivery",
    kicker: "Delivery",
    title: "Proven in production",
    body: "An architecture is worth what ships. Enterprise products delivered end to end on Next.js, TypeScript, Node.js, Python and AWS, plus the practices a team needs to keep running them.",
    link: { href: "#pipeline", label: "Explore the pipeline" },
  },
];

export const CASE_STUDY_CARDS: CaseStudyCard[] = [
  {
    id: "gv-storybooth",
    index: "Case study 01",
    title: "GV Storybooth",
    summary:
      "A configurable real-time AI interview platform. One admin app drives branding, prompt templates that steer the interviewer's behaviour, and target audience, across on-premise kiosks with badge scanning and camera validation, and remote deployments with device start/end control.",
    tags: ["Real-time AI", "Kiosk + remote", "Prompt configuration"],
    href: "/work/gv-storybooth",
  },
  {
    id: "association-audit",
    index: "Case study 02",
    title: "Association Audit",
    summary:
      "An AI-assisted website-audit platform. Firecrawl handles controlled crawling to a configurable depth, AI reads on-page signals like video placement and CTA proximity, and a deterministic engine turns those signals into a score. The scoring is rule-based on purpose: the same site audited twice gets the same number.",
    tags: ["Controlled crawling", "Signal analysis", "Deterministic scoring"],
    href: "/work/association-audit",
  },
];

export const JARVIS_SUMMARY = {
  kicker: "AI & retrieval · Dell Technologies · 2023–2024",
  heading: "Retrieval that follows relationships",
  lede: "JARVIS is the pattern behind the assistant on this page: ask about one thing and it pulls in what that thing is connected to, not what merely sounds similar.",
  body: [
    "A Python and RAG based presales decision-support platform consolidating thousands of large, cross-referenced product documents.",
    "The hard part wasn't search. Configuration dependencies live _between_ documents, if Product A carries spec X, Product B can't also carry spec Y. Vector similarity has no way to see that. Two chunks can be semantically unrelated and still constrain each other.",
    "I designed a per-product, per-section dynamic chunking strategy alongside an identifier-based relationship model connecting products, documents, and sections, so a query runs semantic search and then traverses the relationships it surfaces.",
  ],
  tags: ["Python", "RAG", "Dynamic chunking", "Relationship model"],
  href: "/work/jarvis",
  querySteps: [
    {
      ordinal: "01",
      title: "Semantic pass",
      body: "Vector search over per-section chunks returns the sections that look relevant.",
    },
    {
      ordinal: "02",
      title: "Traversal pass",
      body: "Identifiers on those sections pull in the products and documents they constrain, whether or not the text is similar.",
    },
    {
      ordinal: "03",
      title: "Answer with its sources",
      body: "The engineer sees which documents and dependencies produced the answer.",
    },
  ],
  footnote: "The assistant on this page runs the same two-pass approach over my work history.",
} as const;

export const SIDE_PROJECTS: SideProject[] = [
  {
    id: "efg-kidzania",
    title: "EFG Hermes × KidZania",
    summary: "An interactive stock-market simulation teaching children how trading works.",
    stack: "React · NestJS · MongoDB · AWS",
  },
  {
    id: "lifecare",
    title: "Lifecare Egypt",
    summary: "A B2B platform for a pharmaceutical and aesthetics distributor.",
    stack: "B2B · Full-stack",
  },
  {
    id: "careplus",
    title: "CarePlus",
    summary:
      "Patient management: registration, appointment booking, admin scheduling, SMS notifications.",
    stack: "Healthcare · Full-stack",
  },
  {
    id: "evander",
    title: "Evander Creative Studio",
    summary: "A client site for a software and design studio.",
    stack: "Studio site · Full-stack",
  },
];

export const ROLES: Role[] = [
  {
    id: "ark",
    company: "Ark Development",
    title: "Senior Software Engineer",
    meta: "Cairo, Egypt · Dec 2024 – Present",
    body: [
      "Architects and develops production applications for enterprise clients (Next.js, React, TypeScript, Node.js, Python, AWS), owning delivery end to end.",
      "Designed and built the end-to-end AI-assisted SDLC pipeline described above, and established the AI-assisted development practices adopted company-wide: documentation architecture with an indexed reference system, per-topic chunking, and a Skills and subagents framework.",
      "Architected two AI products for enterprise client Gather Voices: GV Storybooth and the Association Audit platform. Maintains the Drupal CMS platform for the American University in Cairo.",
    ],
  },
  {
    id: "dell",
    company: "Dell Technologies",
    title: "Software Engineer I",
    meta: "Cairo, Egypt · Jan 2023 – Nov 2024",
    body: [
      "Architected JARVIS, a Python and RAG based presales decision-support platform consolidating thousands of large, cross-referenced product documents, and built the foundation for an AI-assisted presales workflow that evaluates customer requirements and surfaces ranked solution options.",
      "Designed and deployed always-on RPA workflows automating incoming presales requests, saving roughly 10 minutes per request on the primary flow, plus several smaller recurring automations, running 24/7 on internal servers.",
      "Developed enterprise applications in C#, .NET Core, Blazor, and Microsoft SQL Server.",
    ],
  },
  {
    id: "freelance",
    company: "Freelance",
    title: "Full-Stack Software Engineer",
    meta: "Remote · Jan 2022 – Present",
    body: [
      "Delivered 10+ production projects for startups, SMEs, and enterprise clients across B2B, finance, retail, lifestyle, and education, owning each end to end.",
      "Next.js, React, Node.js, NestJS, PostgreSQL, MongoDB, AWS.",
    ],
  },
];

export const EDUCATION = {
  school: "German University in Cairo",
  degree: "B.Sc., Computer Science Engineering",
  meta: "Sept 2017 – July 2022",
  body: "Bachelor thesis on the Proteus effect, the finding that people take on behaviour matching the avatar they are given. I built a full VR environment and studied how different avatars changed user behaviour across different situations, with users fully immersed in the headset rather than looking at a screen.",
  tags: ["Virtual reality", "Avatar embodiment", "User study"],
} as const;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ai",
    label: "AI & LLM",
    tone: "accent",
    items: [
      "RAG",
      "OpenAI API",
      "Anthropic / Claude",
      "Claude Code",
      "Prompt Engineering",
      "Embeddings",
      "Vector Search",
    ],
  },
  {
    id: "languages",
    label: "Languages",
    tone: "neutral",
    items: ["TypeScript", "JavaScript", "Python", "C#", "SQL", "HTML/CSS"],
  },
  {
    id: "frontend",
    label: "Frontend",
    tone: "neutral",
    items: ["React", "Next.js", "Tailwind CSS", "Redux", "Blazor"],
  },
  {
    id: "backend",
    label: "Backend",
    tone: "neutral",
    items: ["Node.js", "NestJS", "Express", ".NET Core", "REST APIs"],
  },
  {
    id: "databases",
    label: "Databases",
    tone: "neutral",
    items: ["PostgreSQL", "MongoDB", "DynamoDB", "Microsoft SQL Server", "Redis", "Pinecone"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    tone: "neutral",
    items: [
      "AWS (Lambda, Fargate, App Runner, Amplify)",
      "Docker",
      "Vercel",
      "GitHub Actions",
      "CI/CD",
    ],
  },
];
