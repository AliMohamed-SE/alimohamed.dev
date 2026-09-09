"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import { assistantApi } from "../api/assistant-api";
import { ASSISTANT_COPY } from "../constants";
import { useAssistantSession } from "../hooks/use-assistant-session";
import type { AssistantMessage, AssistantSuggestion } from "../types";
import { useInView } from "@/shared/hooks/use-in-view";
import { useScrollToBottom } from "@/shared/hooks/use-scroll-to-bottom";

export type AssistantContextValue = {
  messages: AssistantMessage[];
  suggestions: AssistantSuggestion[];
  /** True while a reply is in flight — drives the "traversing graph…" line. */
  isThinking: boolean;
  isReady: boolean;
  draft: string;
  setDraft: (value: string) => void;
  send: (text: string) => void;
  submitDraft: () => void;
  /** Attach to the element that holds the inline panel; when it scrolls out of
   *  view the floating dock takes over. */
  anchorRef: RefObject<HTMLDivElement | null>;
  isAnchorVisible: boolean;
  isDockOpen: boolean;
  openDock: () => void;
  closeDock: () => void;
  /** Registers a scrollable transcript viewport so it stays pinned to the end. */
  registerTranscript: (index: number) => (element: HTMLElement | null) => void;
};

export const AssistantContext = createContext<AssistantContextValue | null>(null);

/**
 * Owns the one conversation the page has. The inline hero panel and the
 * floating dock are two views of this state, so it lives in their common
 * parent rather than being duplicated or lifted through props.
 */
export function AssistantProvider({ children }: { children: ReactNode }) {
  const session = useAssistantSession();
  const [turns, setTurns] = useState<AssistantMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isDockOpen, setDockOpen] = useState(false);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  /**
   * The hero keeps the conversation for as long as any part of its panel is
   * clear of the sticky header. Requiring a fraction of it to be visible
   * instead would hand over to the dock on load at laptop heights, where the
   * panel starts partly below the fold — leaving a hole in the hero.
   */
  const isAnchorVisible = useInView(anchorRef, {
    threshold: 0,
    rootMargin: "-88px 0px 0px 0px",
  });

  const messages = useMemo(() => {
    const greeting = session.data?.greeting;
    return greeting ? [greeting, ...turns] : turns;
  }, [session.data?.greeting, turns]);

  const { register: registerTranscript } = useScrollToBottom(messages.length);

  const conversationId = session.data?.conversationId;

  const sendMessage = useMutation({
    mutationFn: (text: string) => {
      if (!conversationId) throw new Error("The assistant session is not open yet.");
      return assistantApi.sendMessage({ conversationId, message: text });
    },
    onSuccess: ({ reply }) => {
      setTurns((current) => [...current, reply]);
    },
    onError: () => {
      setTurns((current) => [
        ...current,
        {
          id: `error-${current.length}`,
          author: "assistant",
          text: ASSISTANT_COPY.failure,
          nodes: [],
          createdAt: new Date().toISOString(),
        },
      ]);
    },
  });

  const { mutate: requestReply, isPending: isThinking } = sendMessage;

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !conversationId || isThinking) return;

      setTurns((current) => [
        ...current,
        {
          id: `local-${current.length}`,
          author: "user",
          text: trimmed,
          nodes: [],
          createdAt: new Date().toISOString(),
        },
      ]);
      setDraft("");
      if (!isAnchorVisible) setDockOpen(true);
      requestReply(trimmed);
    },
    [conversationId, isAnchorVisible, isThinking, requestReply],
  );

  const value = useMemo<AssistantContextValue>(
    () => ({
      messages,
      suggestions: session.data?.suggestions ?? [],
      isThinking,
      isReady: Boolean(conversationId),
      draft,
      setDraft,
      send,
      submitDraft: () => send(draft),
      anchorRef,
      isAnchorVisible,
      isDockOpen,
      openDock: () => setDockOpen(true),
      closeDock: () => setDockOpen(false),
      registerTranscript,
    }),
    [
      conversationId,
      draft,
      isAnchorVisible,
      isDockOpen,
      isThinking,
      messages,
      registerTranscript,
      send,
      session.data?.suggestions,
    ],
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}
