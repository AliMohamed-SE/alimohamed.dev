import { FlowSteps, type FlowStep } from "./flow-steps";
import { MonoLabel } from "@/shared/components/ui";

const QUERY_PATH: FlowStep[] = [
  {
    ordinal: "01",
    title: "Query",
    body: "Natural-language configuration question",
  },
  {
    ordinal: "02",
    title: "Semantic search",
    body: "Ranks section chunks by embedding similarity",
  },
  {
    ordinal: "03",
    title: "Relationship traversal",
    body: "Follows identifiers to linked products, documents, sections",
    emphasis: true,
  },
  {
    ordinal: "04",
    title: "Assembled context",
    body: "Matched sections plus the constraints attached to them",
  },
];

export function JarvisQueryPath() {
  return (
    <>
      <MonoLabel className="mb-[22px]">Query path</MonoLabel>
      <FlowSteps steps={QUERY_PATH} />
    </>
  );
}

/**
 * The dependency similarity misses: the exclusion rule lives in a third
 * document that neither product names, reachable only by identifier link.
 */
export function JarvisRelationshipModel() {
  return (
    <>
      <MonoLabel className="mb-2">
        Relationship model, the dependency similarity misses
      </MonoLabel>

      <svg
        viewBox="0 0 660 300"
        role="img"
        aria-label="Product A has spec X; Product B cannot have spec Y. Both link by identifier to an exclusion rule in a third document."
        className="block h-auto w-full min-w-[560px] font-mono"
      >
        <g className="fill-bg stroke-neutral-700">
          <rect x="8" y="40" width="150" height="56" rx="8" />
          <rect x="8" y="196" width="150" height="56" rx="8" />
          <rect x="500" y="40" width="152" height="56" rx="8" />
          <rect x="500" y="196" width="152" height="56" rx="8" />
        </g>
        <rect
          x="252"
          y="118"
          width="156"
          height="56"
          rx="8"
          className="fill-accent-900 stroke-accent"
        />

        <g className="fill-text" fontSize="14">
          <text x="24" y="64">
            Product A
          </text>
          <text x="24" y="220">
            Product B
          </text>
          <text x="516" y="64">
            spec X
          </text>
          <text x="516" y="220">
            spec Y
          </text>
        </g>
        <text x="268" y="142" fontSize="14" className="fill-accent-300">
          Exclusion rule
        </text>

        <g className="fill-neutral-500" fontSize="11">
          <text x="24" y="82">
            doc-1140 · §3.2
          </text>
          <text x="24" y="238">
            doc-2077 · §7.1
          </text>
          <text x="516" y="82">
            selected
          </text>
          <text x="516" y="238">
            blocked
          </text>
          <text x="300" y="60">
            has
          </text>
          <text x="300" y="216">
            cannot have
          </text>
        </g>
        <g className="fill-accent-400" fontSize="11">
          <text x="268" y="160">
            doc-0931 · §12
          </text>
          <text x="252" y="200">
            identifier link, not semantic similarity
          </text>
        </g>

        <line x1="158" y1="68" x2="500" y2="68" strokeWidth="1" className="stroke-neutral-700" />
        <line
          x1="158"
          y1="224"
          x2="500"
          y2="224"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="stroke-neutral-700"
        />

        <g strokeWidth="1.5" className="stroke-accent">
          <line x1="158" y1="82" x2="252" y2="140" />
          <line x1="158" y1="210" x2="252" y2="152" />
          <line x1="408" y1="146" x2="500" y2="210" />
        </g>
      </svg>
    </>
  );
}
