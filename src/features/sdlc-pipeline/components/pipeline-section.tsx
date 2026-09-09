"use client";

import { GateMarker } from "./gate-marker";
import { StageCard } from "./stage-card";
import { StageDetail } from "./stage-detail";
import { PIPELINE_STAGES, PIPELINE_STATS } from "../data/stages";
import { usePipelineAutoplay } from "../hooks/use-pipeline-autoplay";
import { Section } from "@/shared/components/layout";
import { Kicker, Prose, SectionHeading } from "@/shared/components/ui";
import { useReducedMotion } from "@/shared/hooks/use-reduced-motion";
import { cn } from "@/shared/lib/cn";

/**
 * The AI-assisted SDLC pipeline, walking itself. Owns the active-stage state
 * and hands it down to the rail and the detail panel.
 */
export function PipelineSection({ id = "pipeline" }: { id?: string }) {
  // The walk is the one piece of motion on the page a stylesheet cannot stop.
  const prefersReducedMotion = useReducedMotion();
  const { activeIndex, litGate, select } = usePipelineAutoplay({
    stageCount: PIPELINE_STAGES.length,
    autoplay: !prefersReducedMotion,
  });
  const activeStage = PIPELINE_STAGES[activeIndex];

  return (
    <Section id={id} surface="glow">
      <Kicker className="mb-[18px]">Automation &amp; agents · Ark Development</Kicker>

      <div className="mb-10 flex flex-wrap items-end justify-between gap-[clamp(20px,4vw,64px)]">
        <div className="max-w-[34ch]">
          <SectionHeading className="mb-3.5">The AI-assisted SDLC pipeline</SectionHeading>
          <Prose className="text-[15.5px] text-text/68">
            A card&rsquo;s status in Jira or Linear is the trigger. Moving it starts the next phase;
            a human has to approve before it moves again. It runs on its own below; click any stage
            to stop and read.
          </Prose>
        </div>

        <dl className="m-0 flex items-end gap-[clamp(20px,3vw,40px)]">
          {PIPELINE_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(index > 0 && "border-l border-divider pl-[clamp(20px,3vw,40px)]")}
            >
              <dd
                className={cn(
                  "m-0 font-display text-[clamp(34px,4.6vw,52px)] leading-none font-medium tracking-[-0.04em]",
                  stat.emphasis && "text-accent",
                )}
              >
                {stat.value}
              </dd>
              <dt className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-text/55">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.08em] text-text/50">
        <span className="inline-flex items-center gap-[7px]">
          <span
            aria-hidden
            className="size-[9px] rounded-[2px] border border-neutral-600 bg-surface"
          />
          automated
        </span>
        <span className="inline-flex items-center gap-[7px]">
          <span aria-hidden className="size-[9px] rotate-45 border border-accent bg-accent/25" />
          human gate
        </span>
      </div>

      <div className="mb-[26px] flex flex-nowrap items-stretch gap-1.5 overflow-x-auto py-2 [scrollbar-width:none]">
        {PIPELINE_STAGES.map((stage, index) => (
          <div key={stage.id} className="flex flex-[1_0_130px] items-stretch gap-1.5">
            <StageCard
              stage={stage}
              isActive={index === activeIndex}
              onSelect={() => select(index)}
            />
            {index < PIPELINE_STAGES.length - 1 ? <GateMarker isLit={litGate === index} /> : null}
          </div>
        ))}
      </div>

      <StageDetail stage={activeStage} />

      <Prose size="sm" className="mt-[22px] max-w-[70ch] text-[14px] text-text/58">
        The practices around this pipeline, including the indexed documentation architecture,
        per-topic chunking, and a Skills and subagents framework, were adopted company-wide at Ark
        Development. I trained the engineering team on context engineering, planning workflows, and
        agent orchestration.
      </Prose>
    </Section>
  );
}
