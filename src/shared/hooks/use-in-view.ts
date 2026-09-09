"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** Visible fraction that counts as in view. */
  threshold?: number;
  /** Insets the viewport the element is measured against. */
  rootMargin?: string;
  /** Value used until the observer first reports, and if it cannot run. */
  initial?: boolean;
};

/** Reports whether the observed element is intersecting the viewport. */
export function useInView(
  ref: RefObject<Element | null>,
  { threshold = 0, rootMargin, initial = true }: Options = {},
): boolean {
  const [inView, setInView] = useState(initial);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
      rootMargin,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return inView;
}
