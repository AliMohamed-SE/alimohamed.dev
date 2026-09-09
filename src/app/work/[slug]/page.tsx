import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyArticle, getCaseStudy, getCaseStudySlugs } from "@/features/case-study";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.lede,
    openGraph: { title: study.title, description: study.lede },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  return <CaseStudyArticle study={study} />;
}
