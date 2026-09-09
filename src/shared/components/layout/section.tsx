import type { ReactNode } from "react";

import { Container } from "./container";
import { Reveal, RevealGroup } from "@/shared/components/ui/reveal";
import { cn } from "@/shared/lib/cn";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** `glow` adds the soft top-down surface gradient used on alternating bands. */
  surface?: "flat" | "glow";
  /** Supporting bands (pillars, education) sit on a slightly tighter rhythm. */
  density?: "normal" | "tight";
  divided?: boolean;
  /** `none` opts a band out of the entrance motion. */
  reveal?: "children" | "block" | "none";
  className?: string;
  containerClassName?: string;
};

/**
 * A full-width page band: optional top rule, optional gradient, centered
 * measure, and the site-wide entrance motion as its content comes into view.
 */
export function Section({
  children,
  id,
  surface = "flat",
  density = "normal",
  divided = true,
  reveal = "children",
  className,
  containerClassName,
}: SectionProps) {
  // Each block of the band is observed on its own, so it animates as it comes
  // into view rather than the whole band firing off the bottom of the screen.
  const body =
    reveal === "none" ? (
      children
    ) : reveal === "block" ? (
      <Reveal>{children}</Reveal>
    ) : (
      <RevealGroup>{children}</RevealGroup>
    );

  return (
    <section
      id={id}
      className={cn(
        divided && "border-t border-divider",
        surface === "glow" && "bg-linear-to-b from-surface/40 to-transparent to-60%",
        className,
      )}
    >
      <Container
        padding={density === "tight" ? "section-tight" : "section"}
        className={containerClassName}
      >
        {body}
      </Container>
    </section>
  );
}
