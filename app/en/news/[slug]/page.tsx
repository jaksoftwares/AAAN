import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle } from "@/content/news";
import { PageHero, NewsCard } from "@/components/sections/blocks";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/en/news/${slug}` },
    openGraph: { type: "article", title: article.title, description: article.summary },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHero eyebrow={article.category} title={article.title} lead={article.summary} image={article.image} imageAlt={article.imageAlt} />

      <Section>
        <div className="mx-auto flex max-w-[72ch] flex-col gap-8">
          <ButtonLink href="/en/news" variant="ghost" className="self-start">Back to all news</ButtonLink>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="ivory">
          <h2 className="mb-10 font-display text-[30px] font-semibold text-ink">More news</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
