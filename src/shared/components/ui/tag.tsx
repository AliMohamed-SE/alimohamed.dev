import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type TagProps = {
  children: ReactNode;
  tone?: "neutral" | "accent";
  className?: string;
};

const toneClass: Record<NonNullable<TagProps["tone"]>, string> = {
  neutral: "border-divider bg-text/5 text-text/80",
  accent: "border-accent/40 bg-accent/12 text-accent-300",
};

/** The design system's `.tag` — a small label tinted from the ramps. */
export function Tag({ children, tone = "neutral", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-[3px] text-[11.5px] leading-none tracking-[0.02em]",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Wraps a run of tags with the standard gap. */
export function TagList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-center gap-1.5", className)}>{children}</div>;
}
