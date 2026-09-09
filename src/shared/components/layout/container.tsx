import type { ElementType, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type ContainerProps = {
  children: ReactNode;
  /**
   * Vertical rhythm preset. Pick one rather than overriding it from
   * `className` — two `py-*` utilities on one element resolve by stylesheet
   * order, not by the order they appear in the class list.
   */
  padding?: "section" | "section-tight" | "bar" | "none";
  as?: ElementType;
  className?: string;
};

const paddingClass: Record<NonNullable<ContainerProps["padding"]>, string> = {
  section: "py-[clamp(56px,7vw,96px)]",
  "section-tight": "py-[clamp(48px,6vw,76px)]",
  bar: "py-3",
  none: "",
};

/** The 1180px measure every band of the page is aligned to. */
export function Container({
  children,
  padding = "none",
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1180px] px-[clamp(20px,4vw,56px)]",
        paddingClass[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
