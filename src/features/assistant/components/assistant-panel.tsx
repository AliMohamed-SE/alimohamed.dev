"use client";

import { Composer } from "./composer";
import { SuggestionChips } from "./suggestion-chips";
import { Transcript } from "./transcript";
import { ASSISTANT_COPY } from "../constants";
import { useAssistant } from "../hooks/use-assistant";
import { Panel, PulseDot } from "@/shared/components/ui";
import { cn } from "@/shared/lib/cn";

/**
 * The assistant as it appears in the hero. Its wrapper is the anchor the dock
 * watches: once this scrolls away, the dock takes the conversation over.
 */
export function AssistantPanel() {
  const { messages, isThinking, isAnchorVisible, anchorRef, registerTranscript } = useAssistant();

  return (
    <div ref={anchorRef} className="min-h-[300px] max-w-[640px]">
      <Panel
        tone="raised"
        padding="none"
        className={cn(
          "px-4 pt-4 pb-3.5 transition-[opacity,translate,scale,visibility] duration-500 ease-spring",
          // Once the dock takes over, this copy leaves the tab order and the
          // accessibility tree so the conversation is only reachable once.
          isAnchorVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-2.5 scale-[0.985] opacity-0",
        )}
      >
        <div className="mb-3 flex items-center gap-2">
          <PulseDot />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text/58">
            {ASSISTANT_COPY.panelLabel}
          </span>
        </div>

        <Transcript
          messages={messages}
          isThinking={isThinking}
          showNodes
          isLive={isAnchorVisible}
          viewportRef={registerTranscript(0)}
          className="mb-3 max-h-[236px]"
        />

        <Composer placeholder={ASSISTANT_COPY.heroPlaceholder} submitLabel="Ask" />

        <div className="mt-3">
          <SuggestionChips />
        </div>
      </Panel>
    </div>
  );
}
