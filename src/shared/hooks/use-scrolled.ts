"use client";

import { useEffect, useState } from "react";

type Options = {
  /** Scrolled away from the top past this many px. */
  enter?: number;
  /** Back at the top once within this many px. */
  exit?: number;
};

/**
 * Whether the page has left its top position.
 *
 * Two thresholds rather than one so momentum and sub-pixel scroll offsets
 * cannot flip the state back and forth on the boundary. State only updates on
 * an actual change, so scrolling a long page re-renders the consumer twice:
 * once on leaving the top, once on returning.
 */
export function useScrolled({ enter = 12, exit = 4 }: Options = {}): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled((current) => (current ? y > exit : y > enter));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [enter, exit]);

  return scrolled;
}
