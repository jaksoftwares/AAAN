import type { Metadata } from "next";
import Link from "next/link";
import { cropFamilies } from "@/content/crops";
import { getCrops } from "@/lib/gateways/content";
import { PageHero, CropCard } from "@/components/sections/blocks";
import { Section } from "@/components/ui/section";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Crops and Products · AAAN",
  description:
    "Twelve crops from three countries, fresh and processed: cocoa, cashew, palm oil, cassava, yams, bananas, pineapples, potatoes, dairy and more.",
  alternates: { canonical: "/en/crops" },
};

export default async function CropsPage({ searchParams }: { searchParams: Promise<{ family?: string }> }) {
  const { family } = await searchParams;
  const active = cropFamilies.find((f) => f === family);
  const crops = getCrops().filter((c) => !active || c.family === active);

  return (
    <>
      <PageHero
        eyebrow="Crops and products"
        title="What we grow and supply."
        lead="Twelve crops, each grown where it grows best and handled by people who know it. Choose a crop to see where it comes from, the products we supply and the standards we meet."
        image={media.fields}
        imageAlt="Vast pineapple fields stretching to the horizon"
      />
      <Section>
        <nav aria-label="Filter crops by family" className="mb-10 flex flex-wrap gap-2">
          <Link href="/en/crops" aria-current={!active ? "page" : undefined} className={`min-h-10 rounded-full border px-4 py-2 text-[14px] font-semibold ${!active ? "border-forest bg-forest text-ivory" : "border-line-strong text-ink hover:bg-surface-ivory"}`}>
            All
          </Link>
          {cropFamilies.map((f) => (
            <Link
              key={f}
              href={`/en/crops?family=${encodeURIComponent(f)}`}
              aria-current={active === f ? "page" : undefined}
              className={`min-h-10 rounded-full border px-4 py-2 text-[14px] font-semibold ${active === f ? "border-forest bg-forest text-ivory" : "border-line-strong text-ink hover:bg-surface-ivory"}`}
            >
              {f}
            </Link>
          ))}
        </nav>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crops.map((c) => (
            <CropCard key={c.slug} crop={c} />
          ))}
        </div>
      </Section>
    </>
  );
}
