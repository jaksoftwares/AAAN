import type { Metadata } from "next";
import Link from "next/link";
import { crops } from "@/content/crops";
import { articles } from "@/content/news";
import { whatWeDoPages } from "@/content/what-we-do";
import { Section } from "@/components/ui/section";
import { H1, Lead } from "@/components/ui/typography";
import { mainNav } from "@/content/site";

export const metadata: Metadata = {
  title: "Search · AAAN",
  description: "Search AAAN's crops, news and pages.",
  robots: { index: false, follow: true },
};

type Entry = { title: string; href: string; kind: string; text: string };

const pages: Entry[] = [
  ...mainNav.map((n) => ({ title: n.label, href: n.href, kind: "Page", text: n.label })),
  ...whatWeDoPages.map((p) => ({ title: p.title, href: `/en/what-we-do/${p.slug}`, kind: "What we do", text: `${p.headline} ${p.problem}` })),
  { title: "Leadership and team", href: "/en/about/leadership", kind: "Page", text: "Founders, directors and country management" },
  { title: "Join the network", href: "/en/join", kind: "Farmers", text: "Certified seedlings, training, inputs on credit and a guaranteed buyer" },
  { title: "Request a quote", href: "/en/request-a-quote", kind: "Buyers", text: "Request a quote for AAAN products" },
  { title: "Quality and certifications", href: "/en/quality", kind: "Page", text: "Traceability, laboratory testing and certifications" },
  { title: "Privacy Policy", href: "/en/privacy", kind: "Legal", text: "How we handle your information" },
];

const index: Entry[] = [
  ...pages,
  ...crops.map((c) => ({ title: c.name, href: `/en/crops/${c.slug}`, kind: "Crop", text: `${c.subline} ${c.products.map((p) => p.name).join(" ")}` })),
  ...articles.map((a) => ({ title: a.title, href: `/en/news/${a.slug}`, kind: "News", text: a.summary })),
];

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase();
  const results = term
    ? index.filter((e) => `${e.title} ${e.text}`.toLowerCase().includes(term))
    : [];

  return (
    <Section>
      <H1 className="text-[40px] md:text-[48px] md:leading-[54px]">Search</H1>
      <form action="/en/search" role="search" className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <label htmlFor="q" className="sr-only">Search AAAN</label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search crops, news and pages"
          className="min-h-12 flex-1 rounded-md border border-line-strong bg-surface px-4 py-3 text-[16px] focus:border-forest focus:outline-2 focus:outline-offset-0 focus:outline-focus"
        />
        <button type="submit" className="min-h-12 rounded-md bg-forest px-6 py-3 text-[15px] font-bold text-ivory hover:bg-forest-hover">
          Search
        </button>
      </form>

      <div aria-live="polite" className="mt-10">
        {term ? (
          results.length > 0 ? (
            <>
              <p className="mb-6 text-[15px] text-ink-muted">
                {results.length} {results.length === 1 ? "result" : "results"} for “{q}”
              </p>
              <ul className="divide-y divide-line border-y border-line">
                {results.map((r) => (
                  <li key={r.href} className="py-5">
                    <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink-brand">{r.kind}</p>
                    <Link href={r.href} className="mt-1 block font-display text-[22px] font-semibold text-ink hover:underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Lead>No results for “{q}”. Try a crop name, a country or a page name, or <Link href="/en/contact" className="font-bold text-ink-brand underline underline-offset-4">contact us</Link>.</Lead>
          )
        ) : (
          <Lead>Search crops, news and pages.</Lead>
        )}
      </div>
    </Section>
  );
}
