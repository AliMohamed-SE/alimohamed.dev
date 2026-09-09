import Link from "next/link";

import { siteConfig } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

type BrandMarkProps = {
  href?: string;
  /** Tightens the wordmark — the sticky header sets this once it leaves the top. */
  compact?: boolean;
  /** Fades the role sub-label out, freeing the compact header's single line. */
  hideRole?: boolean;
  className?: string;
};

const [firstName, ...restOfName] = siteConfig.name.split(" ");

/** The wordmark plus its mono role sub-label, in Chakra Petch as the design specifies. */
export function BrandMark({
  href = "/",
  compact = false,
  hideRole = false,
  className,
}: BrandMarkProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-baseline gap-3 text-text no-underline", className)}
    >
      <span
        className={cn(
          "font-display font-semibold whitespace-nowrap uppercase tracking-[0.06em] transition-[font-size] duration-500 ease-emphasized",
          compact ? "text-[13.5px]" : "text-[16px]",
        )}
      >
        {firstName}
        <span className="font-normal">&nbsp;{restOfName.join(" ")}</span>
      </span>
      <span
        aria-hidden={hideRole}
        className={cn(
          "font-mono text-[10.5px] whitespace-nowrap uppercase tracking-[0.16em] text-text/42 transition-opacity duration-400 ease-emphasized",
          hideRole ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="mr-2 text-accent/60">/</span>
        {siteConfig.shortRole}
      </span>
    </Link>
  );
}
