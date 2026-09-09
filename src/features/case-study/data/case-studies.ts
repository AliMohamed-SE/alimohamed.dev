import type { CaseStudy } from "../types";

const GV_STORYBOOTH: CaseStudy = {
  slug: "gv-storybooth",
  title: "GV Storybooth",
  kicker: "Gather Voices · via Ark Development",
  lede: "A real-time AI interview platform that ships as a badge-scanning kiosk and as a remote link, from one configuration.",
  meta: [
    { label: "Role", value: "Architect" },
    { label: "Client", value: "Gather Voices" },
    { label: "Surfaces", value: "Admin app, kiosk, remote" },
    { label: "Core", value: "Real-time AI interviewer" },
  ],
  blocks: [
    {
      kind: "prose",
      ordinal: "01",
      kicker: "01, The problem",
      heading: "Every event wants a different interview",
      paragraphs: [
        "Gather Voices collects video stories from real people. Storybooth automates the interviewer: an AI conducts the conversation in real time, at a conference booth or over a link.",
        "But no two events want the same interview. Branding differs, the audience differs, and what the interviewer should ask, and how hard it should push for a usable answer, differs most of all. Any version of this that requires an engineer per event doesn't work as a product.",
      ],
    },
    {
      kind: "prose",
      ordinal: "02",
      kicker: "02, The constraint that made it hard",
      heading: "One product, two physical realities",
      paragraphs: [
        "On-premise, Storybooth runs on a kiosk that a stranger walks up to unattended. It has to identify who they are by badge scan, confirm the camera actually has a person framed correctly before recording anything, and recover gracefully when someone walks away mid-interview.",
        "Remote, none of that hardware exists, but an operator does, and they need to start and end sessions on devices they aren't standing next to.",
        "Same interview logic, same configuration, two entirely different entry conditions. Splitting them into two codebases would have meant every prompt change shipping twice.",
      ],
    },
    {
      kind: "architecture",
      ordinal: "03",
      kicker: "03, The architecture",
      heading: "Configuration is the product; the deployment is a branch at the end",
      paragraphs: [
        "**The admin app defines an event.** Branding, the target audience, and the prompt templates that control how the AI interviewer behaves, its opening, its follow-ups, what counts as enough of an answer. Non-engineers configure an event end to end.",
        "**Prompt templates are content, not code.** Interviewer behaviour is authored and versioned in the admin app, so tuning a conversation is a configuration change rather than a deploy.",
        "**Deployment mode diverges only at intake.** The kiosk path adds badge scanning and camera and head-position validation as preconditions to starting. The remote path adds device start and end control for the operator. From the moment the interview begins, both run the same session.",
      ],
      figures: [
        {
          figure: "storybooth-config-flow",
          caption:
            "Deployment differences are confined to intake, so interviewer behaviour ships once.",
        },
      ],
    },
    {
      kind: "prose",
      ordinal: "04",
      kicker: "04, Outcome",
      paragraphs: [
        "Storybooth runs as a single configurable platform. A new event is set up in the admin app, branding, audience, interviewer behaviour, and deployed to a kiosk or a remote link without engineering involvement.",
        "One of two AI products I architected for Gather Voices at Ark Development. The other, [Association Audit](/work/association-audit), took the opposite position on where AI belongs in a system.",
      ],
    },
  ],
};

const ASSOCIATION_AUDIT: CaseStudy = {
  slug: "association-audit",
  title: "Association Audit",
  kicker: "Gather Voices · via Ark Development",
  lede: "An AI-assisted website audit where the AI reads the page and a rule-based engine assigns the number, deliberately.",
  meta: [
    { label: "Role", value: "Architect" },
    { label: "Client", value: "Gather Voices" },
    { label: "Crawling", value: "Firecrawl, configurable depth" },
    { label: "Scoring", value: "Deterministic, rule-based" },
  ],
  blocks: [
    {
      kind: "prose",
      ordinal: "01",
      kicker: "01, The problem",
      heading: "Judging a website at scale, in a way someone can argue with",
      paragraphs: [
        "The platform audits an organisation's website and returns a score: how well the site uses video, where calls to action sit relative to content, whether member quotes appear where they carry weight.",
        "Those are judgement calls that a person makes by looking at a page. Making them at the scale of a whole site is what the AI is for.",
      ],
    },
    {
      kind: "prose",
      ordinal: "02",
      kicker: "02, The constraint that made it hard",
      heading: "The score gets shown to the person being scored",
      paragraphs: [
        "An audit result is a conversation opener with a client. It has to survive being questioned, why this number, what would move it, and why the same site audited again next week produces the same figure unless something on the site changed.",
        "An LLM asked to output a score directly cannot promise any of that. It will produce a defensible-sounding number that drifts between runs, and no one, including the people who built it, can say precisely what the number is made of.",
      ],
      pullQuote: "Use the model for what only a model can do, reading the page, and nothing else.",
    },
    {
      kind: "options",
      ordinal: "03",
      kicker: "03, Considered and rejected",
      options: [
        {
          verdict: "rejected",
          title: "Let the LLM return the score",
          body: "One prompt, one number. Fastest to build, impossible to explain, and inconsistent across identical runs. Fails the moment a client asks why.",
        },
        {
          verdict: "rejected",
          title: "Pure static analysis, no AI",
          body: "Consistent, and blind to everything worth auditing. Whether a CTA sits near the content it belongs to isn't something a selector can answer.",
        },
        {
          verdict: "built",
          title: "AI extracts signals, rules score them",
          body: "The model produces structured observations about the page. A deterministic engine turns those observations into a score with a fixed, inspectable weighting.",
        },
      ],
    },
    {
      kind: "architecture",
      ordinal: "04",
      kicker: "04, The architecture",
      heading: "A hard boundary between reading and judging",
      paragraphs: [
        "**Controlled crawling.** Firecrawl walks the site to a configurable depth, so the audit's boundary is set explicitly rather than by whatever the crawler happened to reach.",
        "**AI signal extraction.** Each page is analysed for on-page content signals, video placement, CTA proximity, quotes. The model's job ends at describing what's on the page, in a fixed structure.",
        "**Deterministic scoring.** Signals go into a rule-based engine that computes the final score. Same signals in, same score out, every time, and the weighting can be read, argued with, and changed.",
      ],
      figures: [
        {
          figure: "audit-pipeline",
          caption:
            "Only stage 02 is non-deterministic, and its output is structured before anything downstream reads it.",
        },
      ],
    },
    {
      kind: "prose",
      ordinal: "05",
      kicker: "05, Outcome",
      paragraphs: [
        "Audits are consistent and explainable. A score traces back to the signals that produced it, and the rules that weighted them are visible rather than buried in a prompt.",
        "The second of two AI products I architected for Gather Voices at Ark Development. [GV Storybooth](/work/gv-storybooth) puts the model at the centre of the product; this one keeps it firmly at the edge. Which one is right is a property of the problem, not a preference.",
      ],
    },
  ],
};

const JARVIS: CaseStudy = {
  slug: "jarvis",
  title: "JARVIS",
  kicker: "Dell Technologies · Cairo · 2023–2024",
  lede: "A presales decision-support platform over thousands of cross-referenced product documents, where the answers live between the documents, not inside them.",
  meta: [
    { label: "Role", value: "Architect & engineer" },
    { label: "Stack", value: "Python, RAG, vector search" },
    { label: "Corpus", value: "Thousands of large documents" },
    { label: "Users", value: "Presales engineers" },
  ],
  blocks: [
    {
      kind: "prose",
      ordinal: "01",
      kicker: "01, The problem",
      heading: "The knowledge existed. Nobody could reach it in time.",
      paragraphs: [
        "Presales engineers answer configuration questions against a corpus of thousands of large product documents. The information is all there, spread across product specs, compatibility notes, and section-level footnotes that reference other documents by identifier.",
        "JARVIS consolidated that corpus into a single retrieval-backed system so an engineer could ask a question in natural language instead of knowing which document to open.",
      ],
    },
    {
      kind: "prose",
      ordinal: "02",
      kicker: "02, The constraint that made it hard",
      heading: "Two chunks can constrain each other and read nothing alike",
      paragraphs: [
        "Configuration dependencies are cross-product. If Product A is ordered with spec X, Product B in the same configuration cannot also carry spec Y. That rule lives in one document; the products it constrains live in others.",
        "Vector similarity cannot see this. The chunk describing Product B's spec Y and the chunk carrying the exclusion rule are not semantically close: they share almost no language. A retrieval pass ranked purely on similarity returns a confident, complete-looking answer with the dependency silently missing, which is worse than returning nothing.",
      ],
      pullQuote:
        "The failure mode isn't a bad answer. It's a plausible answer that omits the one constraint that invalidates it.",
    },
    {
      kind: "options",
      ordinal: "03",
      kicker: "03, Considered and rejected",
      options: [
        {
          verdict: "rejected",
          title: "Uniform chunking, flat vector search",
          body: "The default. Fast to stand up, and it misses every cross-product dependency in the corpus. Document structure varies enough per product that a fixed window also cuts specs in half.",
        },
        {
          verdict: "rejected",
          title: "Wider retrieval, more context",
          body: "Retrieving more chunks raises the odds of catching a dependency by accident. It doesn't make it reliable, and it degrades every answer around it.",
        },
        {
          verdict: "built",
          title: "Semantic search, then traversal",
          body: "Similarity finds the entry point. An identifier-based relationship model then pulls in everything structurally connected to it, whether or not it reads alike.",
        },
      ],
    },
    {
      kind: "architecture",
      ordinal: "04",
      kicker: "04, The architecture",
      heading: "Chunk to the document's own structure, then model the links",
      paragraphs: [
        "**Per-product, per-section dynamic chunking.** Chunk boundaries follow each product's own document structure rather than a fixed token window, so a section stays whole and stays addressable.",
        "**An identifier-based relationship model.** Products, documents, and sections are connected by identifier. A chunk isn't a loose piece of text: it knows which product it belongs to, which document it came from, and which other sections reference it.",
        "**Retrieval in two passes.** Semantic search locates the relevant sections. Relationship traversal then follows the identifiers out from those sections to collect the constraints attached to them. The assembled context contains both what the question was about and what limits it.",
      ],
      figures: [
        {
          figure: "jarvis-query-path",
          caption:
            "Similarity finds the entry point; the relationship model decides what else has to come with it.",
        },
        {
          figure: "jarvis-relationship-model",
          caption:
            "The rule sits in a third document neither product mentions by name. Only the identifier links reach it.",
        },
      ],
    },
    {
      kind: "prose",
      ordinal: "05",
      kicker: "05, Outcome",
      paragraphs: [
        "JARVIS consolidated the corpus into one queryable system for presales engineers, resolving cross-product configuration dependencies that similarity search alone could not surface.",
        "On top of it I built the foundation for an AI-assisted presales workflow that evaluates customer requirements and surfaces ranked solution options.",
        "The pattern outlived the project. The assistant on my own site runs the same two-pass approach over my work history, and it's the first thing I reach for whenever a corpus has structure worth respecting.",
      ],
    },
  ],
};

export const CASE_STUDIES: CaseStudy[] = [GV_STORYBOOTH, ASSOCIATION_AUDIT, JARVIS];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((study) => study.slug);
}
