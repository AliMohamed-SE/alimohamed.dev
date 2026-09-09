import { Container } from "@/shared/components/layout";
import { BrandMark } from "@/shared/components/ui";

/** The slim bar case studies use instead of the landing page's sticky nav. */
export function CaseStudyHeader() {
  return (
    <header className="border-b border-divider bg-bg/88 backdrop-blur-[14px]">
      <Container padding="bar" className="flex items-center gap-5">
        <BrandMark href="/" compact className="mr-auto" />
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-text/55">
          Case study
        </span>
      </Container>
    </header>
  );
}
