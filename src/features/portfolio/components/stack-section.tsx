import { SKILL_GROUPS } from "../data/profile";
import { Section } from "@/shared/components/layout";
import { Kicker, Tag, TagList } from "@/shared/components/ui";

export function StackSection() {
  return (
    <Section surface="glow">
      <Kicker className="mb-9">Stack</Kicker>

      <div className="grid gap-[clamp(24px,3vw,44px)] [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
        {SKILL_GROUPS.map((group) => (
          <div key={group.id} className="flex flex-col gap-3">
            <Kicker tone="muted" className="text-[11px] tracking-[0.1em]">
              {group.label}
            </Kicker>
            <TagList>
              {group.items.map((item) => (
                <Tag key={item} tone={group.tone}>
                  {item}
                </Tag>
              ))}
            </TagList>
          </div>
        ))}
      </div>
    </Section>
  );
}
