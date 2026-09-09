import { Kicker } from "./kicker";
import { SectionHeading } from "./section-heading";
import { contactLinks, siteConfig } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

type ContactPanelProps = {
  /** The portfolio page runs this large; case studies run it small. */
  size?: "lg" | "sm";
  blurb?: string;
  className?: string;
};

export function ContactPanel({ size = "lg", blurb, className }: ContactPanelProps) {
  const isLarge = size === "lg";

  return (
    <div
      className={cn(
        "grid items-start gap-[clamp(24px,4vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]",
        className,
      )}
    >
      <div>
        <Kicker className="mb-[18px]">Contact</Kicker>
        <SectionHeading
          className={cn(
            "mb-3.5 max-w-[18ch]",
            isLarge
              ? "text-[clamp(28px,3.6vw,40px)] leading-[1.08]"
              : "text-[clamp(24px,3vw,32px)] leading-[1.1]",
          )}
        >
          Open to roles and to project work
        </SectionHeading>
        <p
          className={cn(
            "m-0 text-pretty text-text/66",
            isLarge ? "max-w-[46ch] text-[15px] leading-[1.62]" : "max-w-[44ch] text-[14.5px] leading-[1.62]",
          )}
        >
          {blurb ??
            `Email is the fastest route. Based in ${siteConfig.location}, working with clients and teams across time zones.`}
        </p>
      </div>

      <ul className="m-0 flex list-none flex-col p-0">
        {contactLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className={cn(
                "flex items-baseline justify-between gap-4 border-b border-divider text-text no-underline transition-colors hover:text-accent",
                isLarge ? "py-4" : "py-3.5",
              )}
            >
              <span className={cn("tracking-[-0.015em]", isLarge ? "text-[17px]" : "text-[16px]")}>
                {link.label}
              </span>
              <span className="font-mono text-[12px] text-text/50">{link.display}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
