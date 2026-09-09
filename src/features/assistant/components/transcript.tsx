"use client";

import { MessageBubble } from "./message-bubble";
import { ASSISTANT_COPY } from "../constants";
import type { AssistantMessage } from "../types";
import { cn } from "@/shared/lib/cn";

type TranscriptProps = {
  messages: AssistantMessage[];
  isThinking: boolean;
  showNodes?: boolean;
  /** Only the surface the reader is actually looking at announces updates. */
  isLive?: boolean;
  /** From `registerTranscript(index)` — keeps this viewport scrolled to the end. */
  viewportRef: (element: HTMLElement | null) => void;
  className?: string;
};

/** The scrollable conversation log, shared by the inline panel and the dock. */
export function Transcript({
  messages,
  isThinking,
  showNodes = false,
  isLive = false,
  viewportRef,
  className,
}: TranscriptProps) {
  return (
    <div
      ref={viewportRef}
      aria-live={isLive ? "polite" : "off"}
      className={cn("flex flex-col gap-3.5 overflow-y-auto", className)}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} showNodes={showNodes} />
      ))}

      {isThinking ? (
        <div className="animate-pulse-fast font-mono text-[11px] text-text/55">
          {ASSISTANT_COPY.thinking}
        </div>
      ) : null}
    </div>
  );
}
