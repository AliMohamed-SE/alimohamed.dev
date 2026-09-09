"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** `outline` is the system's primary action: accent border on transparent, never a fill. */
  variant?: "outline" | "chip" | "ghost";
  size?: "sm" | "md";
};

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  outline:
    "border border-accent font-display text-accent hover:bg-accent/14 disabled:opacity-45",
  chip: "rounded-full border border-divider text-text/70 hover:border-accent hover:text-accent",
  ghost: "border-none text-text/55 hover:text-accent",
};

const sizeClass: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-[5px] text-[12px]",
  md: "min-h-10 px-4 text-[14px]",
};

export function Button({
  children,
  variant = "outline",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-transparent font-medium transition-colors disabled:cursor-not-allowed",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
