import type { Metadata } from "next";
import { countrySites } from "@/content/sites";
import { media } from "@/content/media";
import { offices, WHATSAPP_URL } from "@/content/site";
import { FarmerSignupForm } from "@/components/forms/farmer-signup-form";
import { PageHero } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/ui/section";
import { H3 } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/media/photo";

export const metadata: Metadata = {
  title: "Join the AAAN Farmer Network",
  description:
    "Certified seedlings, training, inputs on credit and a guaranteed buyer for farmers in Kenya, Ghana and Côte d'Ivoire.",
  alternates: { canonical: "/en/join" },
};

const benefits = [
  ["Good seedlings", "Certified, healthy planting material for better harvests."],
  ["Training", "Field schools and visits from our agronomists."],
  ["Inputs on credit", "Seedlings, fertiliser and tools, repaid when you harvest."],
  ["A guaranteed buyer", "We agree the price and quality before you plant, and pay on time."],
];

const steps = [
  "Find your nearest AAAN hub below.",
  "Send us your details, or chat with us on WhatsApp.",
  "Our field officer visits your farm and explains the programme.",
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Join the network"
        title="Grow more. Earn more. Join the AAAN network."
        lead="AAAN works with farmers and cooperatives in Kenya, Ghana and Côte d'Ivoire. When you join, you are not alone with your farm."
        image={media.farmerWoman}
        imageAlt="A confident farmer standing in her field"
        actions={<ButtonLink href="#sign-up" variant="gold">Join the network</ButtonLink>}
      />

      <Section>
        <SectionHeader title="What you get" />
        <dl className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([t, d]) => (
            <div key={t} className="border-t-2 border-forest pt-6">
              <dt className="font-display text-[21px] font-semibold">{t}</dt>
              <dd className="mt-3 text-[15px] leading-7 text-ink-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="ivory">
        <SectionHeader title="How to join" />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((t, i) => (
            <li key={t} className="rounded-lg bg-surface p-6">
              <span className="font-display text-[28px] font-semibold text-gold-ink">{i + 1}</span>
              <p className="mt-3 text-[17px] font-bold leading-7 text-ink">{t}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="hubs">
        <SectionHeader eyebrow="Hub finder" title="Choose your country, then your hub." />
        <div className="grid gap-8 lg:grid-cols-3">
          {countrySites.map((c) => (
            <div key={c.country} className="rounded-lg border border-line p-6">
              <H3 className="text-[20px]">{c.country}</H3>
              <ul className="mt-5 space-y-3">
                {c.sites.map((s) => (
                  <li key={s.name} className="border-t border-line pt-3">
                    <p className="font-bold text-ink">{s.name}</p>
                    <p className="text-[14px] text-ink-muted">{s.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          {offices
            .filter((o) => o.whatsapp)
            .map((o) => (
              <ButtonLink key={o.name} href={o.whatsapp ?? WHATSAPP_URL} variant="ghost" external>
                Chat on WhatsApp · {o.country}
              </ButtonLink>
            ))}
        </div>
      </Section>

      <Section tone="ivory" id="sign-up">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHeader title="Join the network" />
            <Photo src={media.cooperative} alt="Members of an Ivorian cocoa cooperative weighing their harvest" className="aspect-[4/3] rounded-xl" sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
          <div className="rounded-xl bg-surface p-8 md:p-10">
            <FarmerSignupForm sourcePage="/en/join" />
          </div>
        </div>
      </Section>
    </>
  );
}
