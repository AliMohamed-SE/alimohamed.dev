import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type SectionHeadingProps = {
  children: ReactNode;
  level?: 2 | 3 | 4;
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
};

const sizeClass: Record<NonNullable<SectionHeadingProps["size"]>, string> = {
  xl: "text-[clamp(30px,4.2vw,46px)] leading-[1.06] tracking-[-0.028em]",
  lg: "text-[clamp(26px,3.4vw,36px)] leading-[1.1] tracking-[-0.026em]",
  md: "text-[clamp(24px,3vw,34px)] leading-[1.1] tracking-[-0.026em]",
  sm: "text-[21px] leading-[1.2] tracking-[-0.018em]",
};

export function SectionHeading({
  children,
  level = 2,
  size = "xl",
  className,
}: SectionHeadingProps) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";
  return <Tag className={cn("m-0", sizeClass[size], className)}>{children}</Tag>;
}
