export type MessageAuthor = "user" | "assistant";

export type AssistantMessage = {
  id: string;
  author: MessageAuthor;
  text: string;
  /**
   * Nodes the retrieval pass traversed to build the answer. Today the mock
   * engine fills these from a hand-written graph; when JARVIS-style retrieval
   * runs for real they come back from the traversal pass unchanged.
   */
  nodes: string[];
  createdAt: string;
};

export type AssistantSuggestion = {
  id: string;
  label: string;
  prompt: string;
};

/** `GET /api/assistant/session` — the transcript a fresh visitor starts with. */
export type AssistantSessionResponse = {
  conversationId: string;
  greeting: AssistantMessage;
  suggestions: AssistantSuggestion[];
};

/** `POST /api/assistant/messages` */
export type SendMessageRequest = {
  conversationId: string;
  message: string;
};

export type SendMessageResponse = {
  conversationId: string;
  reply: AssistantMessage;
};
