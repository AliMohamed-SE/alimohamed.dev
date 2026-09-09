import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type ProseProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass: Record<NonNullable<ProseProps["size"]>, string> = {
  sm: "text-[13.5px] leading-[1.6]",
  md: "text-[14.5px] leading-[1.65]",
  lg: "text-[16px] leading-[1.68]",
};

/** Body copy at the three measures this design uses, always pretty-wrapped. */
export function Prose({ children, size = "md", className }: ProseProps) {
  return (
    <p className={cn("m-0 text-pretty text-text/72", sizeClass[size], className)}>{children}</p>
  );
}
