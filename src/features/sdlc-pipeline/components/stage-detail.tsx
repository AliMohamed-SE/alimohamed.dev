import type { PipelineStage } from "../data/stages";
import { MonoLabel, Panel, Prose, Tag } from "@/shared/components/ui";

/** The expanded read-out for whichever stage is active. */
export function StageDetail({ stage }: { stage: PipelineStage }) {
  return (
    <Panel tone="raised" className="bg-surface/55">
      <div
        key={stage.id}
        className="grid animate-rise gap-[clamp(20px,3vw,44px)] [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]"
      >
        <div>
          <MonoLabel className="mb-2.5">
            Stage {stage.ordinal} · {stage.name}
          </MonoLabel>
          <h4 className="m-0 mb-3 text-[20px] tracking-[-0.018em]">{stage.headline}</h4>
          <div className="flex flex-col gap-3">
            {stage.body.map((paragraph) => (
              <Prose key={paragraph.slice(0, 24)}>{paragraph}</Prose>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          <div>
            <MonoLabel className="mb-[7px]">Actor</MonoLabel>
            <Tag tone={stage.actor.tone}>{stage.actor.label}</Tag>
          </div>
          <div>
            <MonoLabel className="mb-[7px]">Exit gate</MonoLabel>
            <Prose size="sm" className="text-text/68">
              {stage.exitGate}
            </Prose>
          </div>
        </div>
      </div>
    </Panel>
  );
}
