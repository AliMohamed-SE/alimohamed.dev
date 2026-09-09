import { CaseStudiesSection } from "./case-studies-section";
import { ContactSection } from "./contact-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { HeroSection } from "./hero-section";
import { JarvisSection } from "./jarvis-section";
import { OtherWorkSection } from "./other-work-section";
import { PillarsSection } from "./pillars-section";
import { SiteHeader } from "./site-header";
import { StackSection } from "./stack-section";
import { AssistantDock, AssistantProvider } from "@/features/assistant";
import { PipelineSection } from "@/features/sdlc-pipeline";

/**
 * The landing page. It owns the assistant conversation because two of its
 * children render it — the hero panel and the floating dock — and they have to
 * be looking at the same transcript.
 */
export function PortfolioPage() {
  return (
    <AssistantProvider>
      <SiteHeader />

      <main>
        <HeroSection />
        <PillarsSection />
        <PipelineSection />
        <CaseStudiesSection />
        <JarvisSection />
        <OtherWorkSection />
        <ExperienceSection />
        <EducationSection />
        <StackSection />
        <ContactSection />
      </main>

      <AssistantDock />
    </AssistantProvider>
  );
}
