import { SIDE_PROJECTS } from "../data/profile";
import { Section } from "@/shared/components/layout";
import { Kicker, Prose, SectionHeading } from "@/shared/components/ui";

export function OtherWorkSection() {
  return (
    <Section>
      <Kicker className="mb-[18px]">Freelance · 2022–present</Kicker>

      <SectionHeading className="mb-3.5 max-w-[20ch]">Other work</SectionHeading>

      <Prose className="mb-10 max-w-[60ch] text-[15.5px] text-text/68">
        10+ production projects delivered end to end for startups, SMEs, and enterprise clients
        across B2B, finance, retail, lifestyle, and education. Four of them:
      </Prose>

      {/* A 1px gap over a divider-colored ground draws the grid's own rules. */}
      <div className="grid gap-px overflow-hidden rounded-lg border border-divider bg-divider [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
        {SIDE_PROJECTS.map((project) => (
          <article
            key={project.id}
            className="flex flex-col gap-[11px] bg-bg p-[clamp(20px,2.6vw,28px)]"
          >
            <h4 className="m-0 text-[17px] tracking-[-0.016em]">{project.title}</h4>
            <Prose size="sm" className="flex-1 text-text/66">
              {project.summary}
            </Prose>
            <div className="font-mono text-[10.5px] tracking-[0.06em] text-text/55">
              {project.stack}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
