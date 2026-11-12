import type { Metadata } from "next";
import { countrySites, exportRegions } from "@/content/sites";
import { facts } from "@/content/facts";
import { media } from "@/content/media";
import { PageHero, StatGrid } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/ui/section";
import { H3 } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Where We Operate · Kenya, Ghana, Côte d'Ivoire",
  description:
    "Seventeen AAAN sites, from our Nairobi head office to cocoa and cashew hubs in West Africa, shipping to 15 countries.",
  alternates: { canonical: "/en/where-we-operate" },
};

export default function WhereWeOperatePage() {
  return (
    <>
      <PageHero
        eyebrow="Where we operate"
        title="Seventeen sites. Three countries. One network."
        lead="Each site sits where its crop grows best, or where produce leaves for market."
        image={media.officeNairobi}
        imageAlt="A business meeting in a bright modern Nairobi office"
      />

      <Section>
        <StatGrid
          items={[
            { value: facts.sites, label: "sites" },
            { value: "3", label: "countries" },
            { value: facts.nurseries, label: "nurseries" },
            { value: facts.exportCountries, label: "export countries" },
          ]}
        />
      </Section>

      {countrySites.map((c, i) => (
        <Section key={c.country} tone={i % 2 === 0 ? "ivory" : "light"} id={c.country.toLowerCase().replace(/[^a-z]+/g, "-")}>
          <SectionHeader title={c.country} intro={c.intro} />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.sites.map((s) => (
              <li key={s.name} className="rounded-lg border border-line bg-surface p-6">
                <H3 className="text-[19px]">{s.name}</H3>
                <p className="mt-1 text-[14px] font-bold text-ink-brand">{s.location}</p>
                <p className="mt-3 text-[15px] leading-6 text-ink-muted">{s.role}</p>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section>
        <SectionHeader eyebrow="Export reach" title="From four ports to fifteen countries." intro="Our produce leaves through Mombasa, Tema, Abidjan and San-Pédro, and by air from Nairobi, for buyers across Africa, Europe, the Middle East and North America." />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[16px]">
            <caption className="sr-only">Export destinations by region</caption>
            <thead>
              <tr className="border-b-2 border-forest">
                <th scope="col" className="py-3 pr-6 font-bold text-ink">Region</th>
                <th scope="col" className="py-3 font-bold text-ink">Countries</th>
              </tr>
            </thead>
            <tbody>
              {exportRegions.map((r) => (
                <tr key={r.region} className="border-b border-line">
                  <th scope="row" className="py-4 pr-6 font-bold text-ink">{r.region}</th>
                  <td className="py-4 text-ink-muted">{r.countries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
