/**
 * The corpus the mock assistant answers from. It is shaped like the real thing
 * on purpose: every entry carries the graph nodes an answer traversed, so when
 * this file is replaced by an actual retrieval service the response contract
 * (`text` + `nodes`) does not change.
 */
export type KnowledgeEntry = {
  id: string;
  keys: string[];
  nodes: string[];
  text: string;
};

export type ProblemPattern = {
  id: string;
  keys: string[];
  name: string;
  note: string;
};

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "jarvis",
    keys: [
      "jarvis",
      "rag",
      "retrieval",
      "chunk",
      "vector",
      "embedding",
      "dell",
      "pinecone",
      "knowledge base",
      "search",
    ],
    nodes: ["JARVIS", "Dell Technologies", "dynamic chunking", "relationship model", "presales"],
    text: [
      "JARVIS is the presales decision-support platform I architected at Dell: Python and RAG over thousands of large, cross-referenced product documents.",
      "The interesting constraint: configuration dependencies live between documents. If Product A carries spec X, Product B can't also carry spec Y. Vector similarity can't see that, because the two chunks that constrain each other often aren't semantically alike at all.",
      "So I built a per-product, per-section dynamic chunking strategy plus an identifier-based relationship model connecting products, documents, and sections. A query runs semantic search first, then traverses the relationships it surfaces. This assistant uses the same pattern on my own history.",
    ].join("\n\n"),
  },
  {
    id: "pipeline",
    keys: [
      "sdlc",
      "pipeline",
      "automation",
      "agent",
      "opus",
      "sonnet",
      "jira",
      "linear",
      "gate",
      "cycle time",
      "ci",
      "workflow",
      "rpa",
    ],
    nodes: ["SDLC pipeline", "Ark Development", "Opus", "Sonnet", "human approval gate"],
    text: [
      "At Ark Development I built an AI-assisted SDLC pipeline driven by card status in Jira or Linear.",
      "A card moves through automated requirement analysis, Opus-driven implementation planning, Sonnet-driven branch and PR generation, automated testing, then release-note generation. Every phase transition passes a human approval gate. The pitch is automation with control, not autonomy.",
      "Roughly 3× faster task cycle time in the fully optimized flow: a 3-hour task lands closer to an hour. The practices around it, indexed documentation, per-topic chunking, a Skills and subagents framework, were adopted company-wide.",
    ].join("\n\n"),
  },
  {
    id: "storybooth",
    keys: [
      "storybooth",
      "gather voices",
      "interview",
      "kiosk",
      "real-time",
      "realtime",
      "video",
      "badge",
    ],
    nodes: ["GV Storybooth", "Gather Voices", "Ark Development", "real-time AI"],
    text: [
      "GV Storybooth is a configurable real-time AI interview platform for Gather Voices, built at Ark Development.",
      "An admin app configures interview events, branding, the prompt templates that control how the AI interviewer behaves, and the target audience. It runs both as an on-premise kiosk (badge scanning, camera and head-position validation) and as a remote deployment with device start and end control.",
    ].join("\n\n"),
  },
  {
    id: "audit",
    keys: [
      "audit",
      "association",
      "firecrawl",
      "crawl",
      "scoring",
      "score",
      "deterministic",
      "website",
    ],
    nodes: ["Association Audit", "Firecrawl", "deterministic scoring", "Gather Voices"],
    text: [
      "Association Audit is an AI-assisted website-audit platform. Firecrawl handles controlled crawling to a configurable depth, then AI analysis reads on-page content signals: video placement, CTA proximity, quotes.",
      "The scoring engine is deliberately not an LLM. Signals go into a deterministic, rule-based scorer, so results stay consistent and auditable. Audit the same site twice and you get the same number, which matters when a client is going to argue with it.",
    ].join("\n\n"),
  },
  {
    id: "work",
    keys: [
      "work",
      "experience",
      "background",
      "about",
      "who are you",
      "career",
      "resume",
      "cv",
      "history",
      "senior",
      "role",
    ],
    nodes: ["Ark Development", "Dell Technologies", "freelance", "GUC"],
    text: [
      "Four years of production engineering. Senior Software Engineer at Ark Development since Dec 2024, architecting AI products for enterprise clients. Before that, Software Engineer I at Dell Technologies, Jan 2023 to Nov 2024, where I built JARVIS. Freelancing alongside both since Jan 2022, with 10+ delivered projects.",
      "If you're evaluating me for a role, the two things worth reading first are JARVIS (retrieval architecture) and the SDLC pipeline (agentic automation with human gates). Both are on this page.",
    ].join("\n\n"),
  },
  {
    id: "stack",
    keys: [
      "stack",
      "skills",
      "tech",
      "language",
      "framework",
      "aws",
      "typescript",
      "python",
      "next",
    ],
    nodes: ["TypeScript", "Python", "Next.js", "AWS", "PostgreSQL"],
    text: [
      "Day to day: TypeScript, Python, Next.js, React, Node.js and NestJS, PostgreSQL and MongoDB, AWS (Lambda, Fargate, App Runner, Amplify). C# and .NET Core from the Dell years.",
      "On the AI side: RAG, embeddings and vector search, the OpenAI and Anthropic APIs, Claude Code, and a fair amount of context engineering. Full list is in the Stack section below.",
    ].join("\n\n"),
  },
  {
    id: "contact",
    keys: ["contact", "email", "reach", "available", "availability", "hire you", "talk", "call"],
    nodes: ["contact"],
    text: "Email is the fastest route, it's in the Contact section at the bottom, along with LinkedIn and GitHub. I'm open to both senior engineering roles and project work, so it helps if you say which one you're thinking about.",
  },
];

export const PROBLEM_PATTERNS: ProblemPattern[] = [
  {
    id: "rag",
    keys: [
      "knowledge",
      "documents",
      "docs",
      "search",
      "manual",
      "pdf",
      "retrieval",
      "rag",
      "internal wiki",
    ],
    name: "a RAG knowledge base",
    note: "especially if your documents cross-reference each other. That's the JARVIS problem exactly.",
  },
  {
    id: "realtime",
    keys: [
      "voice",
      "interview",
      "real-time",
      "realtime",
      "conversation",
      "chatbot",
      "assistant",
      "kiosk",
    ],
    name: "real-time conversational AI",
    note: "GV Storybooth is the closest thing I've shipped to that.",
  },
  {
    id: "rpa",
    keys: [
      "manual process",
      "repetitive",
      "spreadsheet",
      "copy paste",
      "ticket",
      "form",
      "email",
      "automate",
      "rpa",
      "back office",
    ],
    name: "RPA workflow automation",
    note: "the always-on presales automations at Dell saved ~10 minutes a request, running 24/7.",
  },
  {
    id: "scoring",
    keys: ["score", "scoring", "rank", "grade", "audit", "evaluate", "benchmark", "compliance"],
    name: "a deterministic scoring or audit engine",
    note: "AI reads the signals, a rule-based engine assigns the number, so it's defensible.",
  },
  {
    id: "presales",
    keys: ["sales", "presales", "quote", "configure", "requirements", "proposal", "recommend"],
    name: "presales decision support",
    note: "that was JARVIS's actual job: evaluate requirements, surface ranked options.",
  },
  {
    id: "sdlc",
    keys: [
      "developer",
      "engineering team",
      "sdlc",
      "code review",
      "ship faster",
      "velocity",
      "jira",
      "linear",
      "pr",
    ],
    name: "an agentic SDLC pipeline",
    note: "with a human approval gate at every transition, which is the part that makes it usable.",
  },
];

export const HIRING_KEYS = [
  "build",
  "need",
  "looking for",
  "project",
  "quote",
  "freelance",
  "help me",
  "we have",
  "i have",
  "our team",
  "startup",
  "budget",
  "client",
  "problem",
];

export const GREETING_TEXT =
  "Ask me about the work: JARVIS, the SDLC pipeline, the Gather Voices products. Or describe a problem you need solved and I'll tell you whether it looks like something I've built before.";

export const FALLBACK_TEXT =
  "I don't have a good answer stored for that one. Things I can speak to in detail: JARVIS and retrieval architecture, the AI-assisted SDLC pipeline, GV Storybooth, Association Audit, the freelance work, and the stack. Or describe a problem you need built and I'll tell you if it looks familiar.";

export const HIRING_PROBE_TEXT =
  "Tell me a bit more about the problem, what the data looks like, who uses it, what's manual today. The things I build most often are RAG knowledge bases, real-time conversational AI, RPA workflow automation, deterministic scoring engines, presales decision support, and agentic SDLC pipelines. I can usually tell within a couple of sentences whether yours rhymes with one of those.";

export const SUGGESTION_SEEDS = [
  { id: "jarvis", label: "What is JARVIS?", prompt: "What is JARVIS?" },
  {
    id: "pipeline",
    label: "How does the SDLC pipeline work?",
    prompt: "How does the SDLC pipeline work?",
  },
  { id: "hiring", label: "I need something built", prompt: "I need something built" },
];
