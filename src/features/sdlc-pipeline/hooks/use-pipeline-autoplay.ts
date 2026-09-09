"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BASE_DWELL_MS = 3_400;
/** How long a gate stays lit before the stage advances. */
const GATE_LEAD_MS = 900;
/** After a click, autoplay resumes on its own once the reader goes idle. */
const RESUME_AFTER_MS = 10_000;

type Options = {
  stageCount: number;
  autoplay?: boolean;
  /** 1 is the authored pace; higher is faster. */
  speed?: number;
};

export type PipelineAutoplay = {
  activeIndex: number;
  /** Index of the gate currently lit, or -1 when none is. */
  litGate: number;
  isRunning: boolean;
  select: (index: number) => void;
};

/**
 * Walks the pipeline on its own, lighting each human-approval gate just before
 * the transition it guards. Clicking a stage pins it and pauses; the walk picks
 * back up after a spell of inactivity.
 */
export function usePipelineAutoplay({
  stageCount,
  autoplay = true,
  speed = 1,
}: Options): PipelineAutoplay {
  const [activeIndex, setActiveIndex] = useState(0);
  const [litGate, setLitGate] = useState(-1);
  const [isRunning, setRunning] = useState(autoplay);

  const timers = useRef<number[]>([]);
  const resumeTimer = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
  }, []);

  useEffect(() => {
    // `isRunning` is seeded from `autoplay`, so it cannot see the caller turn
    // autoplay off a tick later — which is exactly when a reduced-motion
    // preference is measured. Both have to hold for the walk to run.
    if (!isRunning || !autoplay || stageCount === 0) return;

    const dwell = BASE_DWELL_MS / (speed || 1);

    timers.current.push(
      window.setTimeout(() => {
        setLitGate((current) => (activeIndex < stageCount - 1 ? activeIndex : current));
      }, Math.max(500, dwell - GATE_LEAD_MS)),
    );

    timers.current.push(
      window.setTimeout(() => {
        setLitGate(-1);
        setActiveIndex((current) => (current + 1) % stageCount);
      }, dwell),
    );

    return clearTimers;
  }, [activeIndex, autoplay, clearTimers, isRunning, speed, stageCount]);

  useEffect(
    () => () => {
      clearTimers();
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    },
    [clearTimers],
  );

  const select = useCallback(
    (index: number) => {
      clearTimers();
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);

      setActiveIndex(index);
      setLitGate(-1);
      setRunning(false);

      if (!autoplay) return;
      resumeTimer.current = window.setTimeout(() => setRunning(true), RESUME_AFTER_MS);
    },
    [autoplay, clearTimers],
  );

  return { activeIndex, litGate, isRunning, select };
}
