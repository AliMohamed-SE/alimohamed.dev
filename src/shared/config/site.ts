export type SocialLink = {
  label: string;
  href: string;
  /** Shown on the right of the contact row — the address, handle or an arrow. */
  display: string;
};

export const siteConfig = {
  name: "Ali Mohamed",
  role: "Senior Software Engineer",
  shortRole: "Sr. Software Engineer",
  location: "Cairo, Egypt",
  email: "alimohamed.dev@gmail.com",
  description:
    "Senior software engineer building production products end to end, retrieval systems that understand how documents relate to each other, and automation that keeps a human at every gate.",
  url: "https://alimohamed.dev",
} as const;

export const contactLinks: SocialLink[] = [
  { label: "Email", href: `mailto:${siteConfig.email}`, display: siteConfig.email },
  { label: "LinkedIn", href: "https://www.linkedin.com/", display: "↗" },
  { label: "GitHub", href: "https://github.com/", display: "↗" },
];
