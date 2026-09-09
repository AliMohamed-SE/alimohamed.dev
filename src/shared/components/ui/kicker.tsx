import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type KickerProps = {
  children: ReactNode;
  tone?: "accent" | "muted";
  size?: "sm" | "md";
  className?: string;
};

/**
 * The mono eyebrow label that opens nearly every block in this design —
 * uppercase, wide-tracked, either accent or muted.
 */
export function Kicker({ children, tone = "accent", size = "md", className }: KickerProps) {
  return (
    <div
      className={cn(
        "font-mono uppercase",
        size === "md" ? "text-[11px] tracking-[0.14em]" : "text-[10.5px] tracking-[0.12em]",
        tone === "accent" ? "text-accent-400" : "text-text/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
