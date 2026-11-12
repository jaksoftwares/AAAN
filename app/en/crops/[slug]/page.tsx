import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { crops, getCrop } from "@/content/crops";
import { Photo } from "@/components/media/photo";
import { Section } from "@/components/ui/section";
import { H1, H3, Eyebrow, Lead } from "@/components/ui/typography";
import { CtaBand } from "@/components/sections/blocks";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return crops.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const crop = getCrop(slug);
  if (!crop) return {};
  return {
    title: crop.seo.title,
    description: crop.seo.description,
    alternates: { canonical: `/en/crops/${slug}` },
  };
}

export default async function CropPage({ params }: { params: Params }) {
  const { slug } = await params;
  const crop = getCrop(slug);
  if (!crop) notFound();

  return (
    <>
      <section className="bg-surface-ivory">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>{crop.family} · {crop.tag}</Eyebrow>
            <H1 className="max-w-[18ch] text-[40px] leading-[46px] md:text-[52px] md:leading-[58px]">{crop.title}</H1>
            <Lead className="mt-6">{crop.subline}</Lead>
          </div>
          <Photo src={crop.image} alt={crop.imageAlt} priority className="aspect-[4/3] rounded-xl" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <aside aria-label="At a glance" className="self-start rounded-xl bg-forest p-8 text-ivory">
            <h2 className="font-display text-[24px] font-semibold text-gold">At a glance</h2>
            <dl className="mt-6 space-y-5">
              {crop.atAGlance.map((row) => (
                <div key={row.label} className="border-t border-ivory/20 pt-4">
                  <dt className="text-[13px] font-bold uppercase tracking-[0.1em] text-ivory/80">{row.label}</dt>
                  <dd className="mt-1 text-[16px] leading-6">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
          <div className="space-y-10">
            <div>
              <Eyebrow>From our farms</Eyebrow>
              <p className="text-[17px] leading-8 text-ink">{crop.fromOurFarms}</p>
            </div>
            <div>
              <Eyebrow>Products</Eyebrow>
              <ul className="divide-y divide-line border-y border-line">
                {crop.products.map((p) => (
                  <li key={p.name} className="py-4">
                    <p className="font-bold text-ink">{p.name}</p>
                    {p.detail ? <p className="mt-1 text-[15px] leading-6 text-ink-muted">{p.detail}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
            {crop.note ? (
              <div className="rounded-lg border-l-0 bg-surface-ivory p-6">
                <H3 className="text-[18px]">Responsibility note</H3>
                <p className="mt-2 text-[16px] leading-7 text-ink">{crop.note}</p>
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      {crop.video ? (
        <Section tone="ivory">
          <figure className="space-y-3">
            <video className="aspect-video w-full rounded-xl bg-forest object-cover" src={crop.video.src} controls preload="metadata" aria-label={crop.video.alt} />
            <figcaption className="text-[13px] text-ink-muted">{crop.video.alt}</figcaption>
          </figure>
        </Section>
      ) : null}

      <CtaBand
        title={`Interested in ${crop.name.toLowerCase()}?`}
        text="Tell us the product, quantity and destination, and our trade team will reply within one business day."
        primary={{ label: "Request a quote", href: "/en/request-a-quote" }}
      />
    </>
  );
}
