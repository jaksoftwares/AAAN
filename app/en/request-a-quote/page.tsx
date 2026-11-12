import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/sections/blocks";
import { Section } from "@/components/ui/section";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Request a Quote · AAAN",
  description: "Request a quote for cocoa, cashew, palm oil, cassava, yams, fruit, grains, dairy or vegetables from AAAN.",
  alternates: { canonical: "/en/request-a-quote" },
};

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us the product, quantity and destination."
        lead="Our trade team replies within one business day. Need us sooner? Chat with us on WhatsApp."
        image={media.packhouseVegetables}
        imageAlt="Pallets of fresh produce wrapped in plastic, ready for shipment"
      />
      <Section>
        <div className="mx-auto max-w-[880px] rounded-xl bg-surface">
          <EnquiryForm lockedType="quote" sourcePage="/en/request-a-quote" submitLabel="Request a quote" />
        </div>
      </Section>
    </>
  );
}
