import { Fragment } from "react";

import { cn } from "@/shared/lib/cn";

export type FlowStep = {
  ordinal: string;
  title: string;
  body: string;
  /** Highlights the one step that is doing the interesting work. */
  emphasis?: boolean;
};

/**
 * The horizontal "step → step → step" diagram both the JARVIS query path and
 * the audit pipeline are drawn with.
 */
export function FlowSteps({ steps, className }: { steps: FlowStep[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-stretch gap-2", className)}>
      {steps.map((step, index) => (
        <Fragment key={step.ordinal}>
          <div
            className={cn(
              "min-w-[130px] flex-[1_1_150px] rounded-md border p-3.5",
              step.emphasis ? "border-accent bg-accent/10" : "border-divider bg-bg",
            )}
          >
            <div
              className={cn(
                "mb-2 font-mono text-[10px] tracking-[0.1em]",
                step.emphasis ? "text-accent" : "text-text/55",
              )}
            >
              {step.ordinal}
            </div>
            <div className="mb-1.5 text-[14px] font-medium">{step.title}</div>
            <div
              className={cn(
                "text-[12.5px] leading-[1.5]",
                step.emphasis ? "text-text/72" : "text-text/60",
              )}
            >
              {step.body}
            </div>
          </div>

          {index < steps.length - 1 ? (
            <div aria-hidden className="grid w-[22px] flex-none place-items-center text-accent">
              →
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
