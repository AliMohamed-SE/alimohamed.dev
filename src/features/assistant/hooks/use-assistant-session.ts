"use client";

import { useQuery } from "@tanstack/react-query";

import { assistantApi } from "../api/assistant-api";
import { assistantQueryKeys } from "../constants";

/**
 * Opens (and caches) the conversation the whole page shares. The greeting and
 * suggestion chips come from the server so they can become personalised later
 * without touching the components.
 */
export function useAssistantSession() {
  return useQuery({
    queryKey: assistantQueryKeys.session(),
    queryFn: ({ signal }) => assistantApi.openSession(signal),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
