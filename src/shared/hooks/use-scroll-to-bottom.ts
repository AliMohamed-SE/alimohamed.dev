"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Keeps scrollable logs pinned to their newest entry. Returns a stable
 * registrar so every viewport rendering the same list (the inline panel and the
 * dock both show the assistant transcript) scrolls together.
 */
export function useScrollToBottom(dependency: unknown) {
  const viewports = useRef(new Map<number, HTMLElement | null>());
  // Ref callbacks are cached per slot so React does not detach and re-attach
  // the ref on every render.
  const callbacks = useRef(new Map<number, (element: HTMLElement | null) => void>());

  const register = useCallback((index: number) => {
    const cached = callbacks.current.get(index);
    if (cached) return cached;

    const callback = (element: HTMLElement | null) => {
      viewports.current.set(index, element);
    };
    callbacks.current.set(index, callback);
    return callback;
  }, []);

  useEffect(() => {
    for (const viewport of viewports.current.values()) {
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [dependency]);

  return { register };
}
