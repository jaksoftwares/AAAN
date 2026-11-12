import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { whatWeDoPages, getWhatWeDo } from "@/content/what-we-do";
import { PageHero, StatGrid } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/ui/section";
import { H3 } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/media/photo";
import { media } from "@/content/media";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return whatWeDoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const page = getWhatWeDo(slug);
  if (!page) return {};
  return { title: page.seo.title, description: page.seo.description, alternates: { canonical: `/en/what-we-do/${slug}` } };
}

export default async function WhatWeDoDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const page = getWhatWeDo(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero eyebrow="What we do" title={page.headline} lead={page.problem} image={page.image} imageAlt={page.imageAlt} />

      {page.steps.length > 0 ? (
        <Section>
          <SectionHeader title="How we do it" />
          <ol className="grid gap-6 md:grid-cols-2">
            {page.steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-lg border border-line bg-surface p-6">
                <span className="font-display text-[28px] font-semibold text-gold-ink">{i + 1}</span>
                <div>
                  <H3 className="text-[18px]">{s.title}</H3>
                  <p className="mt-2 text-[16px] leading-7 text-ink-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      {page.facilities ? (
        <Section>
          <SectionHeader title="How we do it, in five facilities" />
          <ul className="divide-y divide-line border-y border-line">
            {page.facilities.map((f) => (
              <li key={f.name} className="grid gap-2 py-6 md:grid-cols-[1fr_2fr] md:gap-10">
                <h3 className="text-[18px] font-bold text-ink">{f.name}</h3>
                <p className="text-[16px] leading-7 text-ink-muted">{f.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Photo src={media.processingBouake} alt="Women in aprons and hairnets at a processing line" className="aspect-[4/3] rounded-xl" sizes="(min-width: 768px) 50vw, 100vw" />
            <Photo src={media.processingGhana} alt="Women roasting and processing at a Ghanaian plant" className="aspect-[4/3] rounded-xl" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </Section>
      ) : null}

      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <StatGrid items={page.proof.map((p) => ({ value: p.value, label: p.label }))} />
          {page.video ? (
            <figure className="space-y-3">
              <video className="aspect-video w-full rounded-xl bg-forest object-cover" src={page.video.src} controls preload="metadata" aria-label={page.video.alt} />
              <figcaption className="text-[13px] text-ink-muted">{page.video.alt}</figcaption>
            </figure>
          ) : null}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={page.cta.href}>{page.cta.label}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
