/** Keys into the figure registry — each maps to a hand-drawn diagram. */
export type FigureKey = "storybooth-config-flow" | "jarvis-query-path" | "jarvis-relationship-model" | "audit-pipeline";

export type MetaEntry = { label: string; value: string };

export type OptionCard = {
  /** `built` is the option that shipped; the rest were considered and dropped. */
  verdict: "rejected" | "built";
  title: string;
  body: string;
};

export type ProseBlock = {
  kind: "prose";
  ordinal: string;
  kicker: string;
  heading?: string;
  /** Supports `**lead-in**`, `_emphasis_` and `[label](/href)`. */
  paragraphs: string[];
  pullQuote?: string;
};

export type OptionsBlock = {
  kind: "options";
  ordinal: string;
  kicker: string;
  options: OptionCard[];
};

export type ArchitectureBlock = {
  kind: "architecture";
  ordinal: string;
  kicker: string;
  heading: string;
  paragraphs: string[];
  figures: Array<{ figure: FigureKey; caption: string }>;
};

export type CaseStudyBlock = ProseBlock | OptionsBlock | ArchitectureBlock;

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  lede: string;
  /** Metadata strip under the title. */
  meta: MetaEntry[];
  blocks: CaseStudyBlock[];
};
