import type { Metadata } from "next";
import { Chakra_Petch, IBM_Plex_Mono, Inter } from "next/font/google";

import "./globals.css";
import { AppProviders } from "@/shared/providers/app-providers";
import { siteConfig } from "@/shared/config/site";

/* The design system pairs Inter over Inter; the wordmark and mono labels are
   Chakra Petch and IBM Plex Mono. All three are self-hosted by next/font. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /*
      No `data-scroll-behavior` attribute here: it opts into Next.js forcing
      `scroll-behavior: auto` around navigations, which defeats the smooth
      in-page scrolling the anchor nav depends on.
    */
    <html
      lang="en"
      className={`${inter.variable} ${chakraPetch.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/*
          The scroll entrance starts hidden, so without the script that reveals
          it the page would have no content. An inline script setting a flag on
          `<html>` would be cleared by React's development remount; this cannot.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{ __html: "[data-reveal]{opacity:1;translate:none}" }}
          />
        </noscript>
      </head>
      <body className="min-h-dvh bg-bg font-sans text-text">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
