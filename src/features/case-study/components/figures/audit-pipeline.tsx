import { FlowSteps, type FlowStep } from "./flow-steps";
import { MonoLabel } from "@/shared/components/ui";

const AUDIT_STAGES: FlowStep[] = [
  {
    ordinal: "01 · Deterministic",
    title: "Crawl",
    body: "Firecrawl to a configured depth",
  },
  {
    ordinal: "02 · AI",
    title: "Signal extraction",
    body: "Video placement, CTA proximity, quotes",
    emphasis: true,
  },
  {
    ordinal: "03 · Deterministic",
    title: "Scoring engine",
    body: "Fixed rules and weights over the signals",
  },
  {
    ordinal: "04 · Output",
    title: "Score",
    body: "Reproducible, and traceable to its signals",
  },
];

export function AuditPipeline() {
  return (
    <>
      <MonoLabel className="mb-[22px]">Audit pipeline</MonoLabel>

      <FlowSteps steps={AUDIT_STAGES} className="mb-[22px]" />

      <div className="border-t border-divider pt-[18px] font-mono text-[11px] uppercase tracking-[0.06em] text-text/55">
        The model observes. It does not score.
      </div>
    </>
  );
}
