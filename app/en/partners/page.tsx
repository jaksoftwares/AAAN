import type { Metadata } from "next";
import { getPartners } from "@/lib/gateways/content";
import { media } from "@/content/media";
import { PageHero } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { H3 } from "@/components/ui/typography";
import { Photo } from "@/components/media/photo";

export const metadata: Metadata = {
  title: "Source from AAAN · Partners and Buyers",
  description:
    "Reliable, traceable African produce for importers, processors and retailers. Request a quote or start a partnership.",
  alternates: { canonical: "/en/partners" },
};

const whyBuyers = [
  ["One partner, three origins", "Cocoa, cashew, fruit, roots, grains, dairy and vegetables from Kenya, Ghana and Côte d'Ivoire."],
  ["Quality in our hands", "We control the chain from the seedling to the container."],
  ["Traceable by design", "Farm maps and lot codes for every shipment, ready for EUDR and retailer audits."],
  ["Reliable logistics", "Four ports, air freight from Nairobi, and full export documentation."],
];

const ordering = [
  ["Enquiry", "Tell us the product, volume and destination."],
  ["Specifications and samples", "We send specification sheets and, where needed, samples."],
  ["Contract", "Agreed price, Incoterms (FOB, CIF or CFR), quality grade and schedule."],
  ["Shipment", "We load, document and track your order to its port."],
];

const partnerModels = ["Research and trials", "Farmer development programmes", "Blended and impact finance", "Offtake and supply agreements"];

export default function PartnersPage() {
  const partners = getPartners();
  return (
    <>
      <PageHero
        eyebrow="Partners and buyers"
        title="Grow your business with Africa's harvest."
        lead="Whether you buy, invest or work for development, AAAN is a partner you can build on."
        actions={
          <>
            <ButtonLink href="/en/request-a-quote" variant="gold">Request a quote</ButtonLink>
            <ButtonLink href="/en/contact?reason=partnership" variant="ghost">Start a partnership</ButtonLink>
          </>
        }
        image={media.dockLoading}
        imageAlt="Dock workers loading jute sacks of cocoa"
      />

      <Section>
        <SectionHeader eyebrow="For buyers" title="Why source from AAAN" />
        <dl className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {whyBuyers.map(([t, d]) => (
            <div key={t} className="border-t-2 border-gold pt-6">
              <dt className="font-display text-[21px] font-semibold">{t}</dt>
              <dd className="mt-3 text-[15px] leading-7 text-ink-muted">{d}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-16">
          <H3>How ordering works</H3>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
            {ordering.map(([t, d], i) => (
              <li key={t} className="flex flex-col gap-3 bg-surface p-6">
                <span className="font-display text-[24px] font-semibold text-gold-ink">{i + 1}</span>
                <h4 className="text-[17px] font-bold">{t}</h4>
                <p className="text-[15px] leading-6 text-ink-muted">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <ButtonLink href="/en/request-a-quote">Request a quote</ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="For partners" title="Partner with us" intro="We work with ministries, research institutes, universities, development organisations and financiers to bring better seed, knowledge and markets to more farmers." />
            <ul className="space-y-3">
              {partnerModels.map((m) => (
                <li key={m} className="flex items-center gap-3 text-[16px] font-bold text-ink">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/en/contact?reason=partnership">Start a partnership</ButtonLink>
            </div>
          </div>
          <div className="space-y-8">
            {partners.groups.map((g) => (
              <div key={g.heading}>
                <h3 className="text-[16px] font-bold text-ink-brand">{g.heading}</h3>
                <p className="mt-2 text-[15px] leading-7 text-ink-muted">{g.names.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="For investors" title="Invest in Africa's agricultural rise" intro="AAAN combines the scale of a three-country network with the impact of a farmer-first model. Since 2015 we have grown to 12,000+ farmers, five processing and packing facilities, and customers in 15 countries." />
            <ButtonLink href="/en/contact?reason=general" variant="ghost">Contact investor relations</ButtonLink>
          </div>
          <Photo src={media.officeAccra} alt="A bright modern office reception" className="aspect-[4/3] rounded-xl" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </Section>
    </>
  );
}
