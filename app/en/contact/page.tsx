import type { Metadata } from "next";
import { offices, openingHours, enquiryReasons, WHATSAPP_URL, MAIN_EMAIL, type EnquiryType } from "@/content/site";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/sections/blocks";
import { Section } from "@/components/ui/section";
import { H3 } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact AAAN · Nairobi, Kumasi, Abidjan",
  description: "Reach our trade, farmer, partnership and media teams by form, phone or WhatsApp.",
  alternates: { canonical: "/en/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ reason?: string }> }) {
  const { reason } = await searchParams;
  const defaultType = enquiryReasons.map((r) => r.value).find((v) => v === reason) as EnquiryType | undefined;

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk." lead="Tell us what you need and we will connect you with the right team." />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl bg-surface">
            <EnquiryForm defaultType={defaultType} sourcePage={`/en/contact${reason ? `?reason=${reason}` : ""}`} />
          </div>

          <aside className="space-y-10">
            <div>
              <H3>Our offices</H3>
              <ul className="mt-6 space-y-6">
                {offices.map((o) => (
                  <li key={o.name} className="border-t border-line pt-5">
                    <p className="font-bold text-ink">
                      {o.name}
                      {o.isHeadOffice ? <span className="ml-2 text-[13px] font-semibold text-ink-brand">Head office</span> : null}
                    </p>
                    <p className="text-[15px] text-ink-muted">{o.role}</p>
                    <p className="mt-1 text-[15px] text-ink">
                      {o.city}, {o.country}
                    </p>
                    {o.phone ? (
                      <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="mt-1 block text-[15px] font-bold text-ink-brand underline-offset-4 hover:underline">
                        {o.phone}
                      </a>
                    ) : null}
                    {o.altPhones?.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="mt-1 block text-[15px] font-bold text-ink-brand underline-offset-4 hover:underline">
                        {p}
                      </a>
                    ))}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-forest p-8 text-ivory">
              <h2 className="font-display text-[22px] font-semibold">Prefer WhatsApp?</h2>
              <p className="mt-3 text-[15px] leading-6 text-ivory/90">Message our team in Kenya, Ghana or Côte d&apos;Ivoire.</p>
              <div className="mt-6 flex flex-col gap-3">
                {/* The main WhatsApp line comes first; the other country lines follow. */}
                {offices
                  .filter((o) => o.whatsapp)
                  .sort((a, b) => Number(b.whatsapp === WHATSAPP_URL) - Number(a.whatsapp === WHATSAPP_URL))
                  .map((o) => (
                    <ButtonLink key={o.name} href={o.whatsapp ?? WHATSAPP_URL} variant="gold" external>
                      {o.whatsapp === WHATSAPP_URL ? "Chat on WhatsApp (main line)" : `Chat on WhatsApp · ${o.country}`}
                    </ButtonLink>
                  ))}
              </div>
            </div>

            <div>
              <H3 className="text-[18px]">Opening hours</H3>
              <p className="mt-2 text-[15px] text-ink-muted">{openingHours}</p>
            </div>

            <div>
              <H3 className="text-[18px]">Email</H3>
              <a href={`mailto:${MAIN_EMAIL}`} className="mt-2 block text-[15px] font-bold text-ink-brand underline-offset-4 hover:underline">
                {MAIN_EMAIL}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
