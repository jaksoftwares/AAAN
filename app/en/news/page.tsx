import Link from "next/link";
import type { Metadata } from "next";
import { getNews } from "@/lib/gateways/content";
import { media } from "@/content/media";
import { newsCategories, type Article } from "@/content/news";
import { PageHero, NewsCard } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/ui/section";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "News and Insights · AAAN",
  description:
    "Company news, harvest updates and insights from AAAN's network across East and West Africa.",
  alternates: { canonical: "/en/news" },
};

type SearchParams = Promise<{ category?: string }>;

export default async function NewsPage({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams;
  const active = newsCategories.find((c) => c === category);
  const all = getNews();
  const articles: Article[] = active ? all.filter((a) => a.category === active) : all;

  return (
    <>
      <PageHero
        eyebrow="News and insights"
        title="News from the field."
        lead="Company news, harvest updates and ideas from across our network."
        image={media.processingBouake}
        imageAlt="Workers at the cashew processing plant in Côte d'Ivoire"
      />

      <Section>
        <nav aria-label="Filter news by category" className="mb-10 flex flex-wrap gap-3">
          <FilterLink href="/en/news" current={!active} label="All" />
          {newsCategories.map((c) => (
            <FilterLink key={c} href={`/en/news?category=${encodeURIComponent(c)}`} current={active === c} label={c} />
          ))}
        </nav>

        {articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="text-[18px] leading-8 text-ink-muted">No stories in this category yet. Browse all news, or subscribe below for monthly updates.</p>
        )}
      </Section>

      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Newsletter" title="Get our monthly harvest update." intro="Harvest updates, market news and stories from the field, once a month." />
            <div className="max-w-md">
              <NewsletterForm />
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Press" title="Journalist?" intro="Download our logos, fact sheet and leadership photos." />
            <div>
              <ButtonLink href="/downloads/press-kit.zip" variant="ghost">Download press kit</ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function FilterLink({ href, current, label }: { href: string; current: boolean; label: string }) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`rounded-full border px-5 py-2 text-[15px] font-bold transition-colors ${
        current ? "border-forest bg-forest text-ivory" : "border-line-strong text-ink hover:border-forest hover:text-forest"
      }`}
    >
      {label}
    </Link>
  );
}
