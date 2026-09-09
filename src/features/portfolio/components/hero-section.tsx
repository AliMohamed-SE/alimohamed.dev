import { HERO } from "../data/profile";
import { AssistantPanel } from "@/features/assistant";
import { Container } from "@/shared/components/layout";
import { Kicker } from "@/shared/components/ui";

/**
 * The hero settles in on first paint, one line at a time. It is above the fold
 * on every viewport, so this runs on a CSS animation rather than waiting for
 * an observer — no JavaScript stands between the reader and the first screen.
 */
export function HeroSection({ id = "top" }: { id?: string }) {
  return (
    <section id={id}>
      <Container className="pt-[clamp(56px,9vw,116px)] pb-[clamp(48px,7vw,88px)]">
        <Kicker className="mb-7 animate-enter text-[11.5px]">{HERO.kicker}</Kicker>

        <h1 className="m-0 mb-8 max-w-[14ch] animate-enter text-[clamp(46px,8vw,84px)] leading-[0.98] tracking-[-0.035em] [animation-delay:80ms]">
          {HERO.title}
        </h1>

        <p className="m-0 mb-[22px] max-w-[30ch] animate-enter text-pretty text-[clamp(19px,2.3vw,27px)] leading-[1.42] tracking-[-0.012em] [animation-delay:170ms]">
          {HERO.lede}
        </p>

        <p className="m-0 mb-11 max-w-[58ch] animate-enter text-pretty text-[15.5px] leading-[1.6] text-text/66 [animation-delay:260ms]">
          {HERO.body}
        </p>

        <div className="animate-enter [animation-delay:360ms]">
          <AssistantPanel />
        </div>
      </Container>
    </section>
  );
}
