import { Container } from "@/shared/components/layout";
import { ArrowLink, ContactPanel } from "@/shared/components/ui";
import { RevealGroup } from "@/shared/components/ui/reveal";
import { siteConfig } from "@/shared/config/site";

export function ContactSection({ id = "contact" }: { id?: string }) {
  return (
    <section id={id} className="border-t border-divider">
      <Container className="pt-[clamp(56px,7vw,96px)] pb-10">
        <RevealGroup>
          <ContactPanel
            blurb={`If the assistant hasn't already answered it, email is the fastest route. Based in ${siteConfig.location}, working with clients and teams across time zones.`}
          />

          <div className="mt-[clamp(40px,6vw,72px)] flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] tracking-[0.06em] text-text/45">
              {siteConfig.name} · {siteConfig.location}
            </span>
            <ArrowLink
              href="#top"
              tone="muted"
              direction="up"
              className="text-[11px] tracking-[0.06em]"
            >
              Back to top
            </ArrowLink>
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
