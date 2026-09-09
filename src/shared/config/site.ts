export type SocialLink = {
  label: string;
  href: string;
  /** Shown on the right of the contact row — the address, handle or an arrow. */
  display: string;
};

export const siteConfig = {
  name: "Ali Mohamed",
  role: "Software Architect & Engineer",
  shortRole: "Software Architect",
  location: "Cairo, Egypt",
  email: "alimohamed.dev@gmail.com",
  description:
    "Software architect and engineer in Cairo. I work out what an organisation actually needs to build, and why, then I build it: enterprise AI products, retrieval systems that follow structure, and automation with a human at every gate.",
  url: "https://alimohamed.dev",
} as const;

export const contactLinks: SocialLink[] = [
  { label: "Email", href: `mailto:${siteConfig.email}`, display: siteConfig.email },
  { label: "LinkedIn", href: "https://www.linkedin.com/", display: "↗" },
  { label: "GitHub", href: "https://github.com/", display: "↗" },
];
