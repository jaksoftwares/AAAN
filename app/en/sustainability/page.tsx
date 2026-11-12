import type { Metadata } from "next";
import { facts } from "@/content/facts";
import { getTestimonial } from "@/lib/gateways/content";
import { PageHero, StatGrid, Testimonial } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/ui/section";
import { H3 } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Sustainability and Impact · AAAN",
  description:
    "Higher yields for 12,000+ farmers, jobs for women and youth, and deforestation-free, child-labour-free sourcing.",
  alternates: { canonical: "/en/sustainability" },
};

const themes = [
  ["Farmers first", "When a farmer plants clean seed, learns better methods and knows who will buy the harvest, everything improves. Our network farmers' yields have risen by 35% on average."],
  ["Food on African tables", "Most of what we handle feeds people in Kenya, Ghana and Côte d'Ivoire: potatoes, milk, maize, cassava, yams and vegetables. Drying, cold storage and processing mean less food is lost after harvest."],
  ["Jobs where they are needed", "Our nurseries, plants and packhouses employ more than 420 people and offer over 2,000 seasonal jobs each year, most of them in rural areas and many held by women and young people."],
  ["Value that stays in Africa", "Processing cocoa, cashew, cassava and milk in our own facilities creates skilled jobs and earns more per tonne for the region."],
  ["Healthy land", "Organic methods, composting, integrated pest management, efficient irrigation, and cocoa and palm oil that never come from cleared forest."],
];

const sourcing = [
  ["No deforestation", "Every cocoa and oil palm farm in our network is GPS-mapped and checked against forest maps, in line with the EU Deforestation Regulation."],
  ["No child labour", "We monitor farmer groups, train communities, and support school attendance in cocoa and cashew areas."],
  ["Fair dealing", "Prices and quality grades are agreed before planting, and payments are made on time, increasingly by mobile money."],
];

const sdgs = [
  ["Zero hunger", "2"],
  ["Gender equality", "5"],
  ["Decent work and economic growth", "8"],
  ["Responsible consumption and production", "12"],
  ["Climate action", "13"],
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability and impact"
        title="Growing better. Feeding further."
        lead="We measure our success by what changes on the farms we work with: more food, better incomes, healthier land."
      />

      <Section>
        <StatGrid
          items={[
            { value: facts.farmersInNetwork, label: "farmers" },
            { value: facts.womenFarmersShare, label: "women" },
            { value: facts.averageYieldIncrease, label: "average yield increase" },
            { value: facts.tonnesHandledPerYear, label: "tonnes of food a year" },
          ]}
        />
        <p className="mt-8 text-[16px] text-ink-muted">
          {facts.directEmployees} direct jobs and {facts.seasonalJobsPerYear} seasonal jobs.
        </p>
      </Section>

      <Section tone="ivory">
        <SectionHeader title="Five impact themes" />
        <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {themes.map(([t, d], i) => (
            <li key={t} className="flex flex-col gap-3 bg-surface p-8">
              <span className="font-display text-[26px] font-semibold text-gold-ink">{i + 1}</span>
              <H3 className="text-[20px]">{t}</H3>
              <p className="text-[15px] leading-7 text-ink-muted">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeader title="Responsible sourcing" />
        <dl className="grid gap-8 md:grid-cols-3">
          {sourcing.map(([t, d]) => (
            <div key={t} className="border-t-2 border-forest pt-6">
              <dt className="font-display text-[22px] font-semibold">{t}</dt>
              <dd className="mt-3 text-[16px] leading-7 text-ink-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="ivory">
        <Testimonial {...getTestimonial()} />
      </Section>

      <Section>
        <SectionHeader title="Our contribution to the Sustainable Development Goals" />
        <ul className="flex flex-wrap gap-3">
          {sdgs.map(([name, number]) => (
            <li key={name} className="rounded-full border border-line-strong px-4 py-2 text-[15px] font-semibold text-ink">
              {name} ({number})
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
