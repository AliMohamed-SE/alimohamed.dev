import Link from "next/link";

import { cn } from "@/shared/lib/cn";

type ArrowLinkProps = {
  href: string;
  children: string;
  tone?: "accent" | "muted";
  direction?: "forward" | "back" | "up";
  className?: string;
};

/**
 * The mono, uppercase call-to-action link ("READ THE CASE STUDY →").
 * Uses `next/link` so in-app routes get client navigation and prefetching.
 */
export function ArrowLink({
  href,
  children,
  tone = "accent",
  direction = "forward",
  className,
}: ArrowLinkProps) {
  const classes = cn(
    "inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.09em] transition-colors",
    tone === "accent" ? "text-accent hover:text-accent-300" : "text-text/55 hover:text-accent",
    className,
  );

  const content = (
    <>
      {direction === "back" ? <span aria-hidden>←</span> : null}
      {children}
      {direction === "forward" ? <span aria-hidden>→</span> : null}
      {direction === "up" ? <span aria-hidden>↑</span> : null}
    </>
  );

  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
