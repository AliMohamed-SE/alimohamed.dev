"use client";

import type { FormEvent, RefObject } from "react";

import { useAssistant } from "../hooks/use-assistant";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/lib/cn";

type ComposerProps = {
  placeholder: string;
  submitLabel: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  className?: string;
};

/** The single-line ask box. Both surfaces write into the same shared draft. */
export function Composer({ placeholder, submitLabel, inputRef, className }: ComposerProps) {
  const { draft, setDraft, submitDraft, isReady, isThinking } = useAssistant();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitDraft();
  };

  return (
    <form onSubmit={onSubmit} className={cn("flex items-stretch gap-2", className)}>
      <label className="sr-only" htmlFor={`assistant-input-${submitLabel}`}>
        {placeholder}
      </label>
      <input
        id={`assistant-input-${submitLabel}`}
        ref={inputRef}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={placeholder}
        disabled={!isReady}
        autoComplete="off"
        className="min-h-10 min-w-0 flex-1 rounded-md border border-divider bg-bg/60 px-3 py-2 font-sans text-[14.5px] text-text caret-accent transition-colors placeholder:text-text/45 focus:border-accent focus:outline-none disabled:opacity-50"
      />
      <Button type="submit" disabled={!isReady || isThinking || !draft.trim()}>
        {submitLabel}
      </Button>
    </form>
  );
}
