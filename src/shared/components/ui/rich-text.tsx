import Link from "next/link";
import type { ReactNode } from "react";

/**
 * A deliberately tiny inline formatter so content data stays plain strings:
 * `**lead-in**` becomes a light-weight emphasis run, `[label](/href)` becomes a
 * link, `_word_` becomes an `<em>`. Anything else is rendered verbatim.
 */
const TOKEN = /(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)]+\))/g;

export function RichText({ value }: { value: string }) {
  return <>{parse(value)}</>;
}

function parse(value: string): ReactNode[] {
  return value.split(TOKEN).map((chunk, index) => {
    if (!chunk) return null;

    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={index} className="font-medium text-text">
          {chunk.slice(2, -2)}
        </strong>
      );
    }

    if (chunk.startsWith("_") && chunk.endsWith("_")) {
      return <em key={index}>{chunk.slice(1, -1)}</em>;
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(chunk);
    if (link) {
      const [, label, href] = link;
      const className = "text-accent no-underline transition-colors hover:text-accent-300";
      return href.startsWith("/") ? (
        <Link key={index} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={index} href={href} className={className}>
          {label}
        </a>
      );
    }

    return chunk;
  });
}
