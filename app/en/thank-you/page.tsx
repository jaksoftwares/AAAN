import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { H1, Lead } from "@/components/ui/typography";
import { WHATSAPP_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "Thank you · AAAN",
  robots: { index: false, follow: true },
};

// Messages from the content file, section 1 ("Forms: shared wording").
const messages: Record<string, { title: string; text: string; whatsapp?: boolean }> = {
  quote: {
    title: "Thank you.",
    text: "Your request has reached our trade team, and we will reply within one business day. Need us sooner? Chat with us on WhatsApp.",
    whatsapp: true,
  },
  farmer: {
    title: "Welcome.",
    text: "Our team at your nearest hub will call or message you within two business days.",
  },
  partnership: { title: "Thank you.", text: "Thank you for getting in touch. The right person at AAAN will reply soon." },
  investor: { title: "Thank you.", text: "Thank you for getting in touch. The right person at AAAN will reply soon." },
  media: { title: "Thank you.", text: "Thank you for getting in touch. The right person at AAAN will reply soon." },
  careers: { title: "Thank you.", text: "Thank you for getting in touch. The right person at AAAN will reply soon." },
  general: { title: "Thank you.", text: "Thank you for getting in touch. The right person at AAAN will reply soon." },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ kind?: string }> }) {
  const { kind = "general" } = await searchParams;
  const message = messages[kind] ?? messages.general;

  return (
    <Section>
      <div className="mx-auto max-w-[60ch] py-10">
        <H1 className="text-[40px] md:text-[52px] md:leading-[58px]">{message.title}</H1>
        <Lead className="mt-6">{message.text}</Lead>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/en">Back to home</ButtonLink>
          <ButtonLink href="/en/crops" variant="ghost">Explore our crops</ButtonLink>
          {message.whatsapp ? (
            <ButtonLink href={WHATSAPP_URL} variant="ghost" external>Chat on WhatsApp</ButtonLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
