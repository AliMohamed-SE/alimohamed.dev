import Link from "next/link";

import { CASE_STUDY_CARDS } from "../data/profile";
import { Section } from "@/shared/components/layout";
import { Kicker, Prose, SectionHeading, Tag, TagList } from "@/shared/components/ui";

export function CaseStudiesSection({ id = "cases" }: { id?: string }) {
  return (
    <Section id={id}>
      <Kicker className="mb-[18px]">
        Product engineering · Gather Voices, via Ark Development
      </Kicker>

      <SectionHeading className="mb-3.5 max-w-[20ch]">Two products, built end to end</SectionHeading>

      <Prose className="mb-11 max-w-[62ch] text-[15.5px] text-text/68">
        Each case study follows the same shape: the problem, the constraint that made it hard, what
        was considered and rejected, the architecture, the outcome.
      </Prose>

      <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
        {CASE_STUDY_CARDS.map((study) => (
          <Link
            key={study.id}
            href={study.href}
            className="group flex flex-col gap-4 rounded-lg border border-divider bg-surface p-[clamp(22px,3vw,32px)] text-text no-underline transition-[background-color,border-color,translate] duration-400 ease-spring hover:-translate-y-0.5 hover:border-accent-600 hover:bg-accent-900/45"
          >
            <Kicker size="sm">{study.index}</Kicker>
            <SectionHeading
              level={3}
              className="text-[clamp(22px,2.6vw,28px)] tracking-[-0.022em]"
            >
              {study.title}
            </SectionHeading>
            <Prose className="text-text/70">{study.summary}</Prose>
            <TagList>
              {study.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>
            <span className="mt-1 inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.09em] text-accent transition-colors group-hover:text-accent-300">
              Read the case study <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
