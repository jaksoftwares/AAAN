import Link from "next/link";
import type { Metadata } from "next";
import { whatWeDoOverview, whatWeDoPages } from "@/content/what-we-do";
import { media } from "@/content/media";
import { Photo } from "@/components/media/photo";
import { PageHero } from "@/components/sections/blocks";
import { Section } from "@/components/ui/section";
import { H3 } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "What We Do · Seed to Shelf · AAAN",
  description:
    "Seedlings, modern farming, processing, export and farmer training: AAAN works on every link of Africa's agricultural value chain.",
  alternates: { canonical: "/en/what-we-do" },
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={whatWeDoOverview.headline}
        lead={whatWeDoOverview.intro}
        image={media.nurseryInterior}
        imageAlt="Inside a shade-net seedling nursery"
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whatWeDoPages.map((p) => (
            <Link
              key={p.slug}
              href={`/en/what-we-do/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface hover:shadow-[0_12px_40px_rgba(15,26,20,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <Photo src={p.image} alt={p.imageAlt} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <H3>{p.title}</H3>
                <p className="text-[15px] leading-6 text-ink-muted">{p.headline}</p>
                <span className="mt-auto pt-2 text-[15px] font-bold text-ink-brand group-hover:underline">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
