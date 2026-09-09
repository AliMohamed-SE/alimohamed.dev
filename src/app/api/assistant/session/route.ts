import { buildGreeting, buildSuggestions } from "@/features/assistant/server/retrieval";
import type { AssistantSessionResponse } from "@/features/assistant/types";
import { apiSuccess } from "@/shared/api";

/**
 * Opens an assistant conversation. Today the greeting and suggestions are
 * static and the conversation id is a fresh uuid; once conversations are
 * persisted this is where the record gets created.
 */
export async function GET(): Promise<Response> {
  const body: AssistantSessionResponse = {
    conversationId: crypto.randomUUID(),
    greeting: buildGreeting(),
    suggestions: buildSuggestions(),
  };

  return apiSuccess(body);
}
