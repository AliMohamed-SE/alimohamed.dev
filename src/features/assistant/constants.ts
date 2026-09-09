export const ASSISTANT_ENDPOINTS = {
  session: "/assistant/session",
  messages: "/assistant/messages",
} as const;

export const assistantQueryKeys = {
  all: ["assistant"] as const,
  session: () => [...assistantQueryKeys.all, "session"] as const,
};

/** Copy the UI needs even when the network fails. */
export const ASSISTANT_COPY = {
  thinking: "traversing graph…",
  traversedLabel: "traversed",
  heroPlaceholder: "Hiring? Building something? Start here.",
  dockPlaceholder: "Ask anything…",
  panelLabel: "Assistant · relationship retrieval",
  dockLabel: "Assistant",
  pillLabel: "Ask me anything",
  failure:
    "That didn't go through — the assistant is unreachable right now. Email is in the Contact section at the bottom.",
} as const;
