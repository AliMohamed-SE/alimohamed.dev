import { ROLES } from "../data/profile";
import { Section } from "@/shared/components/layout";
import { Kicker, Prose, SectionHeading } from "@/shared/components/ui";
import { cn } from "@/shared/lib/cn";

export function ExperienceSection({ id = "experience" }: { id?: string }) {
  return (
    <Section id={id}>
      <Kicker className="mb-[18px]">Experience</Kicker>

      <SectionHeading className="mb-12 max-w-[20ch]">Where the work happened</SectionHeading>

      <div className="flex flex-col">
        {ROLES.map((role, index) => (
          <article
            key={role.id}
            className={cn(
              "grid gap-[clamp(16px,3vw,48px)] border-t border-divider py-8 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]",
              index === ROLES.length - 1 && "border-b",
            )}
          >
            <div>
              <SectionHeading level={3} className="mb-1.5 text-[22px] tracking-[-0.02em]">
                {role.company}
              </SectionHeading>
              <div className="mb-2 text-[14.5px] text-accent-300">{role.title}</div>
              <div className="font-mono text-[11.5px] tracking-[0.06em] text-text/55">
                {role.meta}
              </div>
            </div>

            <div className="col-span-2 flex min-w-0 flex-col gap-3">
              {role.body.map((paragraph) => (
                <Prose key={paragraph.slice(0, 24)}>{paragraph}</Prose>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
