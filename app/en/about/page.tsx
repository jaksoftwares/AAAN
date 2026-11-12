import type { Metadata } from "next";
import { facts } from "@/content/facts";
import { media } from "@/content/media";
import { getTeam } from "@/lib/gateways/content";
import { PageHero, StatGrid, CtaBand, PersonCard } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/ui/section";
import { H3, Prose } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About AAAN · Our Story and Leadership",
  description:
    "Founded in Nyandarua in 2015 and headquartered in Nairobi, AAAN works with 12,000+ farmers across Kenya, Ghana and Côte d'Ivoire.",
  alternates: { canonical: "/en/about" },
};

const values = [
  ["Quality from the root", "Healthy food starts with clean, certified planting material."],
  ["Safe and sustainable", "We farm in ways that protect soil, water and the people who eat our food."],
  ["Innovation", "New varieties, smart tools and modern processing, put to work in the field."],
  ["Partnership", "Farmers, cooperatives, governments and buyers grow together."],
  ["Integrity", "Traceable produce, honest trade and standards our buyers can check."],
  ["African pride, global standard", "Rooted in Africa, competing with the best anywhere."],
];

const milestones = [
  ["2015", "Founded in Ol Kalou, Nyandarua, with one nursery and 120 farmers."],
  ["2016", "Our seed potato programme reaches 1,000 farmers."],
  ["2017", "Ghana operations open in Kumasi."],
  ["2019", "Head office moves to Nairobi; first international shipments."],
  ["2020", "Côte d'Ivoire operations and our Abidjan export office open."],
  ["2022", "First processing lines: cocoa in San-Pédro, cassava flour in Kumasi."],
  ["2023", "Dairy chilling and processing centre opens in Kinangop."],
  ["2024", "Digital traceability for every farmer group."],
  ["2025", "Export reach grows to 15 countries, including the United States."],
  ["2026", "12,000 farmers; cashew processing opens in Bouaké."],
];

export default function AboutPage() {
  const { board } = getTeam();
  return (
    <>
      <PageHero
        eyebrow="About AAAN"
        title="Advancing Africa's harvest since 2015."
        lead="A pan-African agribusiness network, headquartered in Nairobi and working across Kenya, Ghana and Côte d'Ivoire."
        image={media.fields}
        imageAlt="Pineapple fields stretching to the horizon"
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader eyebrow="Our story" title="It started with a question." />
          </div>
          <Prose>
            <p>
              In 2015, three graduates shared one frustration. Africa grows some of the world&apos;s most valuable crops, yet its farmers earn the least from them. Harvests were lost to poor seed and poor storage, and raw crops left the continent cheaply only to come back as expensive products.
            </p>
            <p>
              Aaron Appiagyei, an agricultural scientist, Margaret Paula, a food and nutrition specialist, and Antwi Kingsley, a technologist, asked a simple question: what if one network could fix every link, from the seedling to the shelf? They started in Ol Kalou, Nyandarua, with one nursery and 120 farmers. AAAN supplied clean seed potatoes and vegetable seedlings, trained the farmers in better methods, and promised to buy what they grew. Yields rose, losses fell, and incomes followed.
            </p>
            <p>
              The model worked, so we took it further. In 2017 we came to Ghana&apos;s cocoa and yam belt, and in 2020 to Côte d&apos;Ivoire. We added processing, so that more of each harvest&apos;s value stays in Africa. In 2019 we moved our head office to Nairobi, closer to our buyers, partners and the region&apos;s trade routes.
            </p>
            <p>
              Today AAAN works with more than 12,000 farmers and supplies buyers in {facts.exportCountries} countries. Our belief has not changed: <strong>African agriculture, advanced, can feed Africa and the world.</strong>
            </p>
          </Prose>
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid gap-8 md:grid-cols-2">
          <article className="rounded-xl bg-surface p-8 md:p-10">
            <H3>Vision</H3>
            <p className="mt-4 font-display text-[24px] leading-9 text-ink">An Africa that feeds itself and supplies the world with safe, high-quality food.</p>
          </article>
          <article className="rounded-xl bg-forest p-8 text-ivory md:p-10">
            <h3 className="text-[20px] font-bold">Mission</h3>
            <p className="mt-4 text-[17px] leading-8 text-ivory/95">
              To advance African agriculture by giving farmers better seedlings, modern technology and fair markets, and by adding value to what Africa grows, so that more of the wealth from every harvest stays on the continent.
            </p>
          </article>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Our values" />
        <dl className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {values.map(([t, d]) => (
            <div key={t} className="border-t-2 border-gold pt-6">
              <dt className="font-display text-[22px] font-semibold text-ink">{t}</dt>
              <dd className="mt-3 text-[16px] leading-7 text-ink-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="ivory">
        <SectionHeader title="Milestones" />
        <ol className="relative space-y-8 border-l border-line-strong pl-8">
          {milestones.map(([year, text]) => (
            <li key={year} className="relative">
              <span aria-hidden="true" className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-gold" />
              <p className="font-display text-[22px] font-semibold text-ink-brand">{year}</p>
              <p className="mt-1 max-w-[60ch] text-[16px] leading-7 text-ink">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeader eyebrow="AAAN in numbers" title="The network today." />
        <StatGrid
          columns={3}
          items={[
            { value: facts.farmersInNetwork, label: "farmers" },
            { value: facts.womenFarmersShare, label: "women farmers" },
            { value: facts.farmersTrainedSince2015, label: "farmers trained" },
            { value: facts.seedlingsSinceFounding, label: "seedlings" },
            { value: facts.nurseries, label: "nurseries" },
            { value: facts.processingFacilities, label: "processing and packing facilities" },
            { value: facts.tonnesHandledPerYear, label: "tonnes a year" },
            { value: facts.exportCountries, label: "export countries" },
            { value: facts.directEmployees, label: "employees" },
          ]}
        />
      </Section>

      <Section tone="ivory">
        <SectionHeader eyebrow="Leadership" title="The people behind the network." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {board.map((p) => (
            <PersonCard key={p.slug} person={p} />
          ))}
        </div>
        <div className="mt-12">
          <ButtonLink href="/en/about/leadership" variant="ghost">Full leadership team</ButtonLink>
        </div>
      </Section>

      <CtaBand title="Grow with us." primary={{ label: "Partner with us", href: "/en/partners" }} secondary={{ label: "See careers", href: "/en/careers" }} />
    </>
  );
}
