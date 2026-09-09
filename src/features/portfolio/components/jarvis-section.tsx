import { JARVIS_SUMMARY } from "../data/profile";
import { Section } from "@/shared/components/layout";
import {
  ArrowLink,
  Kicker,
  MonoLabel,
  Panel,
  Prose,
  RichText,
  SectionHeading,
  Tag,
  TagList,
} from "@/shared/components/ui";

export function JarvisSection({ id = "jarvis" }: { id?: string }) {
  return (
    <Section id={id} surface="glow">
      <Kicker className="mb-[18px]">{JARVIS_SUMMARY.kicker}</Kicker>

      <SectionHeading className="mb-3.5 max-w-[22ch]">{JARVIS_SUMMARY.heading}</SectionHeading>

      <Prose className="mb-11 max-w-[62ch] text-[15.5px] text-text/68">
        {JARVIS_SUMMARY.lede}
      </Prose>

      <div className="grid items-start gap-[clamp(24px,4vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
        <div className="flex flex-col gap-3.5">
          <SectionHeading
            level={3}
            className="mb-0.5 text-[clamp(21px,2.4vw,26px)] tracking-[-0.022em]"
          >
            JARVIS
          </SectionHeading>

          {JARVIS_SUMMARY.body.map((paragraph) => (
            <Prose key={paragraph.slice(0, 24)} className="text-[15px] leading-[1.64]">
              <RichText value={paragraph} />
            </Prose>
          ))}

          <TagList className="mt-1">
            {JARVIS_SUMMARY.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagList>

          <ArrowLink href={JARVIS_SUMMARY.href} className="mt-2">
            Read the case study
          </ArrowLink>
        </div>

        <Panel className="flex flex-col gap-5">
          <MonoLabel>How a query runs</MonoLabel>

          <ol className="m-0 flex list-none flex-col gap-4 p-0">
            {JARVIS_SUMMARY.querySteps.map((step) => (
              <li key={step.ordinal} className="flex gap-3.5">
                <span className="flex-none pt-0.5 font-mono text-[11px] text-accent">
                  {step.ordinal}
                </span>
                <div>
                  <div className="mb-[5px] text-[15px] tracking-[-0.014em]">{step.title}</div>
                  <Prose size="sm" className="text-text/66">
                    {step.body}
                  </Prose>
                </div>
              </li>
            ))}
          </ol>

          <Prose size="sm" className="border-t border-divider pt-4 text-text/60">
            {JARVIS_SUMMARY.footnote}
          </Prose>
        </Panel>
      </div>
    </Section>
  );
}
