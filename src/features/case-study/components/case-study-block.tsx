import { CaseStudyFigure } from "./case-study-figure";
import type { CaseStudyBlock as Block } from "../types";
import { Kicker, Prose, RichText, SectionHeading } from "@/shared/components/ui";
import { Reveal } from "@/shared/components/ui/reveal";
import { cn } from "@/shared/lib/cn";

/** Renders one authored block of a case study, whichever shape it is. */
export function CaseStudyBlock({ block }: { block: Block }) {
  return (
    <Reveal as="section" className="mb-[clamp(48px,7vw,80px)]">
      <Kicker className="mb-4">{block.kicker}</Kicker>

      {block.kind === "prose" ? <ProseBlockBody block={block} /> : null}
      {block.kind === "options" ? <OptionsBlockBody block={block} /> : null}
      {block.kind === "architecture" ? <ArchitectureBlockBody block={block} /> : null}
    </Reveal>
  );
}

function ProseBlockBody({ block }: { block: Extract<Block, { kind: "prose" }> }) {
  return (
    <>
      {block.heading ? (
        <SectionHeading size="lg" className="mb-5 max-w-[26ch]">
          {block.heading}
        </SectionHeading>
      ) : null}

      <div className="flex max-w-[68ch] flex-col gap-4">
        {block.paragraphs.map((paragraph) => (
          <Prose key={paragraph.slice(0, 24)} size="lg" className="text-text/76">
            <RichText value={paragraph} />
          </Prose>
        ))}
      </div>

      {block.pullQuote ? (
        <blockquote className="mt-7 max-w-[60ch] border-l-2 border-accent py-1 pl-5">
          <p className="m-0 text-[16.5px] leading-[1.6] tracking-[-0.01em]">{block.pullQuote}</p>
        </blockquote>
      ) : null}
    </>
  );
}

function OptionsBlockBody({ block }: { block: Extract<Block, { kind: "options" }> }) {
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
      {block.options.map((option) => {
        const built = option.verdict === "built";
        return (
          <article
            key={option.title}
            className={cn(
              "rounded-[12px] border p-[22px]",
              built ? "border-accent/45 bg-accent/7" : "border-divider",
            )}
          >
            <div
              className={cn(
                "mb-3 font-mono text-[10.5px] uppercase tracking-[0.1em]",
                built ? "text-accent" : "text-text/55",
              )}
            >
              {built ? "Built" : "Rejected"}
            </div>
            <h4 className="m-0 mb-2.5 text-[17px] tracking-[-0.016em]">{option.title}</h4>
            <Prose size="sm" className={built ? "text-text/76" : "text-text/68"}>
              {option.body}
            </Prose>
          </article>
        );
      })}
    </div>
  );
}

function ArchitectureBlockBody({ block }: { block: Extract<Block, { kind: "architecture" }> }) {
  return (
    <>
      <SectionHeading size="lg" className="mb-6 max-w-[26ch]">
        {block.heading}
      </SectionHeading>

      <div className="mb-10 flex max-w-[68ch] flex-col gap-3.5">
        {block.paragraphs.map((paragraph) => (
          <Prose key={paragraph.slice(0, 24)} size="lg" className="text-text/76">
            <RichText value={paragraph} />
          </Prose>
        ))}
      </div>

      <div className="flex flex-col gap-9">
        {block.figures.map((figure) => (
          <CaseStudyFigure key={figure.figure} figure={figure.figure} caption={figure.caption} />
        ))}
      </div>
    </>
  );
}
