import { cn } from "@/shared/lib/cn";

/** The small accent dot that marks a live surface. */
export function PulseDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("size-1.5 shrink-0 animate-pulse-slow rounded-full bg-accent", className)}
    />
  );
}
