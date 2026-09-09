import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type PanelProps = {
  children: ReactNode;
  /** How strongly the surface reads against the page ground. */
  tone?: "quiet" | "raised" | "solid";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
};

const toneClass: Record<NonNullable<PanelProps["tone"]>, string> = {
  quiet: "bg-surface/45",
  raised: "bg-surface/70",
  solid: "bg-surface",
};

const paddingClass: Record<NonNullable<PanelProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-[clamp(20px,3vw,30px)]",
  lg: "p-[clamp(22px,3vw,32px)]",
};

/** The bordered, rounded surface this system uses for every inset block. */
export function Panel({ children, tone = "quiet", padding = "md", className }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-divider",
        toneClass[tone],
        paddingClass[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
