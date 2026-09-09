"use client";

import { useAssistant } from "../hooks/use-assistant";
import { Button } from "@/shared/components/ui";

/** Opening prompts, served with the session so they can change server-side. */
export function SuggestionChips() {
  const { suggestions, send, isThinking, isReady } = useAssistant();

  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.id}
          variant="chip"
          size="sm"
          disabled={!isReady || isThinking}
          onClick={() => send(suggestion.prompt)}
        >
          {suggestion.label}
        </Button>
      ))}
    </div>
  );
}
