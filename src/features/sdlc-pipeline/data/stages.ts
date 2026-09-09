export type StageActor = {
  label: string;
  /** `accent` marks an AI actor, `neutral` a human or a deterministic step. */
  tone: "accent" | "neutral";
};

export type PipelineStage = {
  id: string;
  /** Two-digit stage number as the design labels it. */
  ordinal: string;
  name: string;
  headline: string;
  body: string[];
  actor: StageActor;
  exitGate: string;
};

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "backlog",
    ordinal: "00",
    name: "Backlog",
    headline: "The status column is the trigger",
    body: [
      "A ticket sits in Jira or Linear like any other. Nothing automated fires until someone moves it. The pipeline listens to status transitions rather than owning its own queue, so the team's existing board stays the single source of truth.",
    ],
    actor: { label: "Human", tone: "neutral" },
    exitGate: "A person moves the card to Analysis. No card enters the pipeline on its own.",
  },
  {
    id: "analysis",
    ordinal: "01",
    name: "Analysis",
    headline: "The card gets rewritten before anyone plans it",
    body: [
      "A Claude routine reads the project's documentation index and the relevant parts of the codebase, then rewrites the card with requirements, constraints, and success criteria. The documentation is chunked per topic and indexed, so the agent pulls only what the ticket actually touches.",
      "Most of the quality of everything downstream is decided here.",
    ],
    actor: { label: "Claude · requirement analysis", tone: "accent" },
    exitGate:
      "An engineer reads the rewritten card and approves it. Wrong scope is caught here, not after a PR exists.",
  },
  {
    id: "planning",
    ordinal: "02",
    name: "Planning",
    headline: "Opus writes the implementation plan",
    body: [
      "Files to touch, order of work, test strategy, and the risks worth flagging. Planning runs on the stronger model deliberately: a bad plan costs more than a bad diff, because the diff is cheap to regenerate and the plan is what the reviewer is actually approving.",
    ],
    actor: { label: "Opus · implementation planning", tone: "accent" },
    exitGate: "The plan is reviewed and approved before a single branch is created.",
  },
  {
    id: "development",
    ordinal: "03",
    name: "Development",
    headline: "Sonnet builds the branch and opens the PR",
    body: [
      "Implementation follows the approved plan rather than the original ticket. Because the plan is explicit about ordering and scope, the faster model is enough here, and the cost profile of the whole pipeline depends on that split.",
    ],
    actor: { label: "Sonnet · branch & PR generation", tone: "accent" },
    exitGate: "Normal code review. The PR is a PR: it goes through the same review the team already runs.",
  },
  {
    id: "testing",
    ordinal: "04",
    name: "Testing",
    headline: "Failures loop back with their context attached",
    body: [
      "Automated tests run against the PR. A failure doesn't end the run: it returns to Development carrying the failing output, so the next attempt starts from the error rather than from the ticket again.",
    ],
    actor: { label: "Automated test suite", tone: "neutral" },
    exitGate: "A person signs off on the green run before release.",
  },
  {
    id: "release",
    ordinal: "05",
    name: "Release",
    headline: "Release notes come out of the merged work",
    body: [
      "Notes are generated from what actually merged, not from what the ticket promised. The card closes with a record of the change that someone can read six months later.",
    ],
    actor: { label: "Claude · release notes", tone: "accent" },
    exitGate: "Published on approval.",
  },
];

export const PIPELINE_STATS = [
  { value: "~3×", label: "faster cycle time", emphasis: false },
  { value: "3hr → ~1hr", label: "fully optimized flow", emphasis: true },
];
