"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

import { observeReveal } from "@/shared/lib/reveal-observer";

/** Added per position for items that come into view together. */
const DELAY_STEP_MS = 90;
const MAX_DELAY_STEPS = 3;

type RevealProps = {
  children: ReactNode;
  /** Position within a group of items that reveal together (0-3 steps). */
  delayStep?: number;
  as?: ElementType;
  id?: string;
  className?: string;
};

/**
 * Lifts one element into place as it enters the viewport, once.
 *
 * The hidden state is the server-rendered default — `data-reveal` without
 * `data-shown` — so it is already in place at the first paint. Applying it from
 * an effect instead would arrive a frame too late: the content would paint
 * visible, then transition *out* before it could ever transition in.
 *
 * Both states live in `globals.css`; this only decides when to flip the
 * attribute. Reduced motion is handled there too, which is why nothing is
 * gated on `matchMedia` here — those readers get the same reveal as a plain
 * cross-fade rather than no reveal at all.
 */
export function Reveal({
  children,
  delayStep = 0,
  as: Tag = "div",
  id,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isShown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // With no observer there is no way to know when the element arrives, and
    // leaving it hidden would lose the content outright. Reveal it on the
    // element rather than through state: there is no second render to make,
    // and React leaves an attribute it has never rendered a value for alone.
    if (typeof IntersectionObserver === "undefined") {
      element.setAttribute("data-shown", "");
      return;
    }

    let stop = () => {};

    stop = observeReveal(element, (isIntersecting) => {
      // Only ever reveals. An element that has not arrived yet is already in
      // its hidden state, and one that has arrived stays put when it leaves.
      if (!isIntersecting) return;
      setShown(true);
      stop();
    });

    return () => stop();
  }, []);

  const delay = Math.min(delayStep, MAX_DELAY_STEPS) * DELAY_STEP_MS;

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      data-shown={isShown ? "" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  className?: string;
};

/**
 * Reveals each direct child on its own, in reading order. Items further down
 * simply come into view later; the delay steps only matter for the ones that
 * arrive on screen together.
 */
export function RevealGroup({ children, as: Tag = "div", id, className }: RevealGroupProps) {
  const items = Children.toArray(children);

  return (
    <Tag id={id} className={className}>
      {items.map((child, index) => (
        <Reveal key={index} delayStep={index}>
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
