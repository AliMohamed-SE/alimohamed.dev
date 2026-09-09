"use client";

import { useContext } from "react";

import { AssistantContext, type AssistantContextValue } from "../components/assistant-provider";

/** Reads the conversation owned by the nearest `AssistantProvider`. */
export function useAssistant(): AssistantContextValue {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error("useAssistant must be used inside an <AssistantProvider>.");
  }
  return context;
}
