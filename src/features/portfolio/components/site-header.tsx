"use client";

import { NAV_ITEMS } from "../data/profile";
import { Container } from "@/shared/components/layout";
import { BrandMark } from "@/shared/components/ui";
import { useScrolled } from "@/shared/hooks/use-scrolled";
import { cn } from "@/shared/lib/cn";

/** How long the header takes to settle between its two shapes. */
const SHAPE_TRANSITION = "duration-500 ease-emphasized";

/**
 * The sticky header. It has exactly two shapes — expanded at the top of the
 * page, compact once the page has scrolled away from it — and eases between
 * them once per crossing rather than tracking the scroll position.
 */
export function SiteHeader() {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-[14px] transition-[background-color,border-color]",
        SHAPE_TRANSITION,
        scrolled ? "border-divider bg-bg/94" : "border-transparent bg-bg/55",
      )}
    >
      <Container
        className={cn(
          "flex flex-wrap items-baseline gap-x-[clamp(16px,2.4vw,28px)] gap-y-2 transition-[padding]",
          SHAPE_TRANSITION,
          scrolled ? "py-[7px]" : "py-4",
        )}
      >
        <BrandMark href="#top" compact={scrolled} hideRole={scrolled} className="mr-auto" />

        <nav
          aria-label="Sections"
          className="flex flex-wrap items-baseline gap-x-[clamp(16px,2.4vw,28px)] gap-y-2"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-text/62 no-underline transition-colors duration-300 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}
