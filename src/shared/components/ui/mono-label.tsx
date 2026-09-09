import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

/** A small mono caption used for field labels and diagram titles. */
export function MonoLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "font-mono text-[10.5px] uppercase tracking-[0.12em] text-text/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
