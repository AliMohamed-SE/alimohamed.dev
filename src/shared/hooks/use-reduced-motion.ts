"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  if (typeof window.matchMedia !== "function") return () => {};

  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia(QUERY).matches;
}

/** The server has no preference to read; hydration settles it. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Whether the reader has asked for less motion.
 *
 * Only for motion a stylesheet cannot reach on its own — anything that plays on
 * a timer. Presentational motion belongs in a `prefers-reduced-motion` media
 * query instead, where it costs no JavaScript and is right on the first paint.
 *
 * Reads as a subscription rather than state in an effect, so it also follows
 * the preference changing mid-session — which is how this behaves while the
 * setting is being toggled to check both branches.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
