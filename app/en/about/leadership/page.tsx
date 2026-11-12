import type { Metadata } from "next";
import { getTeam } from "@/lib/gateways/content";
import { PageHero, PersonCard, CtaBand } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Leadership and Team · About AAAN",
  description: "The founders, directors and country management leading AAAN across Kenya, Ghana and Côte d'Ivoire.",
  alternates: { canonical: "/en/about/leadership" },
};

export default function LeadershipPage() {
  const { board, executive, countryManagers } = getTeam();
  return (
    <>
      <PageHero eyebrow="About AAAN" title="The people behind the network." />
      <Section>
        <SectionHeader title="Board of Directors" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {board.map((p) => (
            <PersonCard key={p.slug} person={p} />
          ))}
        </div>
      </Section>
      <Section tone="ivory">
        <SectionHeader title="Executive team" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {executive.map((p) => (
            <PersonCard key={p.slug} person={p} />
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader
          eyebrow="Country management"
          title="Leading each country."
          intro="Country managers lead each country's team of agronomists, extension officers and quality specialists."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {countryManagers.map((p) => (
            <PersonCard key={p.slug} person={p} />
          ))}
        </div>
      </Section>
      <CtaBand title="Grow with us." primary={{ label: "Partner with us", href: "/en/partners" }} secondary={{ label: "See careers", href: "/en/careers" }} />
    </>
  );
}
