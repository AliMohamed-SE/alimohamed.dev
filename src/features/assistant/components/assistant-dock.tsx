"use client";

import { useEffect, useRef } from "react";

import { Composer } from "./composer";
import { Transcript } from "./transcript";
import { ASSISTANT_COPY } from "../constants";
import { useAssistant } from "../hooks/use-assistant";
import { PulseDot } from "@/shared/components/ui";
import { cn } from "@/shared/lib/cn";

/**
 * The floating assistant. It only becomes interactive once the hero panel has
 * scrolled out of view, so the conversation is never presented twice at once.
 */
export function AssistantDock() {
  const {
    messages,
    isThinking,
    isAnchorVisible,
    isDockOpen,
    openDock,
    closeDock,
    registerTranscript,
  } = useAssistant();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isDocked = !isAnchorVisible;

  useEffect(() => {
    if (!isDockOpen || !isDocked) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 320);
    return () => window.clearTimeout(timer);
  }, [isDockOpen, isDocked]);

  return (
    <div
      className={cn(
        "fixed right-[clamp(14px,3vw,28px)] bottom-[clamp(14px,3vw,24px)] z-60 flex w-[min(370px,calc(100vw-28px))] flex-col items-end transition-[opacity,translate,scale,visibility] duration-500 ease-spring",
        isDocked
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-3 scale-[0.97] opacity-0",
      )}
    >
      <div
        className={cn(
          "w-full origin-bottom overflow-hidden rounded-lg border border-divider bg-surface/95 shadow-lg backdrop-blur-[14px] transition-[max-height,opacity,translate,scale,visibility] duration-500 ease-spring",
          // `invisible` keeps the collapsed panel's controls out of the tab order.
          isDockOpen
            ? "max-h-[460px] translate-y-0 scale-100 opacity-100"
            : "invisible max-h-0 translate-y-2 scale-[0.98] opacity-0",
        )}
      >
        <div className="flex items-center gap-[9px] border-b border-divider px-3.5 py-3">
          <PulseDot />
          <span className="mr-auto font-mono text-[10px] uppercase tracking-[0.14em] text-text/60">
            {ASSISTANT_COPY.dockLabel}
          </span>
          <button
            type="button"
            onClick={closeDock}
            aria-label="Collapse assistant"
            className="cursor-pointer border-none bg-transparent px-1 py-0.5 text-[15px] leading-none text-text/55 transition-colors duration-300 hover:text-accent"
          >
            ↓
          </button>
        </div>

        <Transcript
          messages={messages}
          isThinking={isThinking}
          isLive={isDocked && isDockOpen}
          viewportRef={registerTranscript(1)}
          className="h-[260px] p-3.5"
        />

        <Composer
          placeholder={ASSISTANT_COPY.dockPlaceholder}
          submitLabel="Send"
          inputRef={inputRef}
          className="border-t border-divider px-3.5 pt-3 pb-3.5"
        />
      </div>

      {/*
        The pill collapses its own height rather than being display-toggled, so
        it eases out of the way as the panel opens instead of vanishing.
      */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-500 ease-spring",
          isDockOpen ? "max-h-0 opacity-0" : "max-h-20 opacity-100",
        )}
      >
        <button
          type="button"
          onClick={openDock}
          tabIndex={isDockOpen || !isDocked ? -1 : undefined}
          className={cn(
            "mt-2.5 inline-flex cursor-pointer items-center gap-[9px] rounded-full border border-accent bg-surface/95 px-[18px] py-2.5 text-[13.5px] text-text shadow-md backdrop-blur-[14px] transition-[background-color,translate] duration-300 ease-spring hover:bg-accent/18 hover:-translate-y-px",
            isDockOpen && "pointer-events-none",
          )}
        >
          <PulseDot />
          {ASSISTANT_COPY.pillLabel}
        </button>
      </div>
    </div>
  );
}
