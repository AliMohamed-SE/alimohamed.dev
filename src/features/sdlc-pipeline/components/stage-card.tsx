"use client";

import type { PipelineStage } from "../data/stages";
import { cn } from "@/shared/lib/cn";

type StageCardProps = {
  stage: PipelineStage;
  isActive: boolean;
  onSelect: () => void;
};

/** One tappable stage in the rail. Active state lifts it and lights its bar. */
export function StageCard({ stage, isActive, onSelect }: StageCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={isActive}
      className={cn(
        "flex min-w-[118px] flex-[1_0_130px] cursor-pointer flex-col gap-[7px] rounded-md border px-3.5 pt-3.5 pb-3 text-left text-text transition-[background-color,border-color,translate] duration-520 ease-spring hover:border-accent-600",
        isActive
          ? "-translate-y-[3px] border-accent bg-accent/10"
          : "translate-y-0 border-divider bg-surface",
      )}
    >
      <span className="font-mono text-[10px] tracking-[0.1em] text-text/55">{stage.ordinal}</span>
      <span className="font-display text-[14px] font-medium tracking-[-0.01em]">{stage.name}</span>
      <span
        aria-hidden
        className={cn(
          "h-[2px] rounded-sm transition-colors duration-520",
          isActive ? "bg-accent" : "bg-text/10",
        )}
      />
    </button>
  );
}
