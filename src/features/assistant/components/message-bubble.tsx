import { ASSISTANT_COPY } from "../constants";
import type { AssistantMessage } from "../types";
import { cn } from "@/shared/lib/cn";

type MessageBubbleProps = {
  message: AssistantMessage;
  /** The compact dock hides the traversed-node chips. */
  showNodes?: boolean;
};

export function MessageBubble({ message, showNodes = false }: MessageBubbleProps) {
  const isUser = message.author === "user";

  return (
    <div className={cn(isUser ? "max-w-[86%] self-end" : "max-w-[92%] self-start")}>
      <div
        className={cn(
          "border text-[14px] whitespace-pre-wrap",
          isUser
            ? "rounded-[10px_10px_3px_10px] border-accent/40 bg-accent/20 px-3.5 py-2.5 leading-[1.55] text-text"
            : "rounded-[10px_10px_10px_3px] border-divider bg-bg/65 px-3.5 py-[11px] leading-[1.62] text-text/88",
        )}
      >
        {message.text}
      </div>

      {showNodes && !isUser && message.nodes.length > 0 ? (
        <div className="mt-[9px] flex flex-wrap items-center gap-[5px]">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-text/55">
            {ASSISTANT_COPY.traversedLabel}
          </span>
          {message.nodes.map((node) => (
            <span
              key={node}
              className="rounded-sm border border-accent/40 px-[7px] py-[2px] font-mono text-[10px] text-accent-300"
            >
              {node}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
