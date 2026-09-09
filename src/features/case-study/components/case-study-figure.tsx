import { FIGURE_REGISTRY } from "./figures";
import type { FigureKey } from "../types";
import { Panel } from "@/shared/components/ui";
import { cn } from "@/shared/lib/cn";

type CaseStudyFigureProps = {
  figure: FigureKey;
  caption: string;
  className?: string;
};

/** A diagram in its framed surface, with the caption that explains the point. */
export function CaseStudyFigure({ figure, caption, className }: CaseStudyFigureProps) {
  const Diagram = FIGURE_REGISTRY[figure];

  return (
    <figure className={cn("m-0", className)}>
      <Panel tone="quiet" className="bg-surface/50 overflow-x-auto">
        <Diagram />
      </Panel>
      <figcaption className="mt-2.5 text-[12px] text-text/50">{caption}</figcaption>
    </figure>
  );
}
