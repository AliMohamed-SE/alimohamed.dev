import { PILLARS } from "../data/profile";
import { Section } from "@/shared/components/layout";
import { ArrowLink, Kicker, Prose, SectionHeading } from "@/shared/components/ui";

export function PillarsSection() {
  return (
    <Section density="tight">
      <SectionHeading size="md" className="mb-9">
        What I work on
      </SectionHeading>

      <div className="grid gap-[clamp(28px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
        {PILLARS.map((pillar) => (
          <article key={pillar.id} className="flex flex-col gap-2.5">
            <Kicker>{pillar.kicker}</Kicker>
            <SectionHeading level={3} size="sm">
              {pillar.title}
            </SectionHeading>
            <Prose className="text-text/68">{pillar.body}</Prose>
            <ArrowLink href={pillar.link.href} className="mt-1">
              {pillar.link.label}
            </ArrowLink>
          </article>
        ))}
      </div>
    </Section>
  );
}
