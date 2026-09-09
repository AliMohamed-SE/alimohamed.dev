import { MonoLabel, Tag, TagList } from "@/shared/components/ui";

const ADMIN_CONFIG = ["Branding", "Prompt templates", "Target audience", "Event settings"];

const INTAKE_PATHS = [
  {
    label: "On-premise kiosk",
    steps: ["Badge scan → identity", "Camera + head-position check", "Unattended start"],
  },
  {
    label: "Remote",
    steps: [
      "Participant joins on own device",
      "Operator start / end control",
      "No hardware preconditions",
    ],
  },
];

/** One configuration fans out into two intake paths, then back into one session. */
export function StoryboothConfigFlow() {
  return (
    <>
      <MonoLabel className="mb-5">Configuration → intake → session</MonoLabel>

      <div className="mb-2.5 rounded-md border border-accent bg-accent/8 p-[18px]">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
          Admin app · one event configuration
        </div>
        <TagList className="gap-2">
          {ADMIN_CONFIG.map((item) => (
            <Tag key={item} tone="accent">
              {item}
            </Tag>
          ))}
        </TagList>
      </div>

      <Arrow />

      <div className="mb-2.5 grid gap-2.5 [grid-template-columns:repeat(auto-fit,minmax(min(250px,100%),1fr))]">
        {INTAKE_PATHS.map((path) => (
          <div key={path.label} className="rounded-md border border-divider bg-bg p-[18px]">
            <MonoLabel className="mb-3 tracking-[0.1em]">{path.label}</MonoLabel>
            <div className="flex flex-col gap-2">
              {path.steps.map((step) => (
                <div key={step} className="rounded-sm bg-text/5 px-[11px] py-2 text-[13.5px]">
                  {step}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Arrow />

      <div className="rounded-md border border-divider bg-bg p-[18px]">
        <MonoLabel className="mb-2 tracking-[0.1em]">Shared session</MonoLabel>
        <div className="text-[14px] leading-[1.6] text-text/76">
          Real-time AI interview driven by the event&rsquo;s prompt templates. Identical on both
          paths.
        </div>
      </div>
    </>
  );
}

function Arrow() {
  return (
    <div aria-hidden className="pt-1 pb-2.5 text-center text-[14px] text-accent">
      ↓
    </div>
  );
}
