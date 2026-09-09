import { EDUCATION } from "../data/profile";
import { Section } from "@/shared/components/layout";
import { Kicker, Prose, SectionHeading, Tag, TagList } from "@/shared/components/ui";

export function EducationSection() {
  return (
    <Section density="tight">
      <Kicker className="mb-[18px]">Education</Kicker>

      <div className="grid gap-[clamp(16px,3vw,48px)] pt-2 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
        <div>
          <SectionHeading level={3} className="mb-1.5 text-[22px] tracking-[-0.02em]">
            {EDUCATION.school}
          </SectionHeading>
          <div className="mb-2 text-[14.5px] text-accent-300">{EDUCATION.degree}</div>
          <div className="font-mono text-[11.5px] tracking-[0.06em] text-text/55">
            {EDUCATION.meta}
          </div>
        </div>

        <div className="col-span-2 flex min-w-0 flex-col gap-3">
          <Prose>{EDUCATION.body}</Prose>
          <TagList className="mt-0.5">
            {EDUCATION.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>
        </div>
      </div>
    </Section>
  );
}
