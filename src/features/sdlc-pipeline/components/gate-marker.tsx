import { cn } from "@/shared/lib/cn";

/**
 * The rotated square between two stages: the human approval gate. It fills as
 * the pipeline reaches the transition it guards.
 */
export function GateMarker({ isLit }: { isLit: boolean }) {
  return (
    <div className="grid w-[26px] flex-none place-items-center" aria-hidden>
      <span
        className={cn(
          "size-[11px] rotate-45 border border-accent transition-colors duration-420",
          isLit ? "bg-accent/85" : "bg-accent/12",
        )}
      />
    </div>
  );
}
