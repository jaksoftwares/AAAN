import type { Metadata } from "next";
import { media } from "@/content/media";
import { SpecSheetForm } from "@/components/forms/spec-sheet-form";
import { Section, SectionHeader } from "@/components/ui/section";
import { H3 } from "@/components/ui/typography";
import { Photo } from "@/components/media/photo";

export const metadata: Metadata = {
  title: "Quality and Certifications · AAAN",
  description:
    "Five quality checkpoints from seed to shipment, laboratory testing, traceability and internationally recognised certifications.",
  alternates: { canonical: "/en/quality" },
};

const checkpoints = [
  ["Certified planting material", "From our own nurseries."],
  ["Registered, mapped farms", "Following our growing standards."],
  ["Grading at collection", "Moisture, size, defects and outturn checked before we buy."],
  ["Laboratory testing", "Pesticide residues, aflatoxin and microbiology, depending on the product."],
  ["Traced shipments", "Every bag, carton and container carries a lot code linked to its farms."],
];

const certifications = [
  "GlobalG.A.P.",
  "KS 1758",
  "EU Organic and USDA Organic",
  "Rainforest Alliance",
  "Fairtrade",
  "RSPO",
  "EUDR compliance",
  "HACCP and ISO 22000",
  "BRCGS",
  "Halal",
  "KEBS, Ghana FDA and CODINORM product approvals",
  "KEPHIS seed certification",
];

export default function QualityPage() {
  return (
    <>
      <section className="bg-surface-ivory">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-ink-brand">Quality and certifications</p>
            <h1 className="font-display text-[44px] font-semibold leading-[48px] text-forest md:text-[56px] md:leading-[60px]">Quality you can trace.</h1>
            <p className="mt-6 max-w-[56ch] text-[18px] leading-[30px] text-ink-muted">
              Buyers trust AAAN because every product has a history we can show: where it was grown, how it was handled and how it was tested.
            </p>
          </div>
          <Photo src={media.labTechnician} alt="A food safety technician in a white coat at work in the laboratory" priority className="aspect-[4/3] rounded-xl" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
      </section>

      <Section>
        <SectionHeader title="Five quality checkpoints, from seed to shipment" />
        <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
          {checkpoints.map(([t, d], i) => (
            <li key={t} className="flex flex-col gap-3 bg-surface p-6">
              <span className="font-display text-[26px] font-semibold text-gold-ink">{i + 1}</span>
              <H3 className="text-[18px]">{t}</H3>
              <p className="text-[15px] leading-6 text-ink-muted">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ivory">
        <SectionHeader title="Certifications and standards" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <li key={c} className="flex min-h-16 items-center rounded-lg border border-line bg-surface px-5 py-4 text-[16px] font-bold text-ink">
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader title="Specification sheets" intro="Download full specifications for any product. We will send the sheet straight to your inbox." />
          </div>
          <div className="rounded-xl bg-surface p-8 md:p-10">
            <SpecSheetForm />
          </div>
        </div>
      </Section>
    </>
  );
}
