import { CaseStudyBlock } from "./case-study-block";
import { CaseStudyHeader } from "./case-study-header";
import type { CaseStudy } from "../types";
import { Container } from "@/shared/components/layout";
import { ArrowLink, ContactPanel, Kicker } from "@/shared/components/ui";
import { RevealGroup } from "@/shared/components/ui/reveal";
import { siteConfig } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

/** The full case-study page: header, title block, meta strip, authored blocks. */
export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  return (
    <>
      <CaseStudyHeader />

      <main>
        <Container as="article" className="pt-[clamp(48px,8vw,96px)]">
          <ArrowLink
            href="/"
            tone="muted"
            direction="back"
            className="mb-8 animate-enter"
          >
            Back to work
          </ArrowLink>

          <Kicker className="mb-6 animate-enter text-[11.5px] [animation-delay:80ms]">
            {study.kicker}
          </Kicker>

          <h1 className="m-0 mb-[26px] animate-enter text-[clamp(40px,6.6vw,68px)] leading-[1.02] tracking-[-0.035em] [animation-delay:150ms]">
            {study.title}
          </h1>

          <p className="m-0 mb-10 max-w-[34ch] animate-enter text-pretty text-[clamp(18px,2.2vw,24px)] leading-[1.45] tracking-[-0.012em] [animation-delay:230ms]">
            {study.lede}
          </p>

          <dl className="m-0 mb-[clamp(48px,7vw,80px)] flex animate-enter flex-wrap border-y border-divider [animation-delay:310ms]">
            {study.meta.map((entry, index) => {
              const isFirst = index === 0;
              const isLast = index === study.meta.length - 1;

              return (
                <div
                  key={entry.label}
                  className={cn(
                    "flex-[1_1_160px] py-5",
                    isFirst ? "pl-0" : "border-l border-divider pl-6",
                    isLast ? "pr-0" : "pr-6",
                  )}
                >
                  <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text/55">
                    {entry.label}
                  </dt>
                  <dd className="m-0 text-[14.5px]">{entry.value}</dd>
                </div>
              );
            })}
          </dl>

          {study.blocks.map((block) => (
            <CaseStudyBlock key={block.ordinal} block={block} />
          ))}

          <RevealGroup
            as="section"
            id="contact"
            className="border-t border-divider pt-[clamp(44px,6vw,72px)] pb-[clamp(36px,5vw,56px)]"
          >
            <ContactPanel size="sm" />
            <p className="mt-[clamp(32px,5vw,56px)] mb-0 font-mono text-[11px] tracking-[0.06em] text-text/45">
              {siteConfig.name} · {siteConfig.location}
            </p>
          </RevealGroup>
        </Container>
      </main>
    </>
  );
}
