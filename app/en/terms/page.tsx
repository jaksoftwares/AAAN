import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, LegalSection } from "@/components/legal/legal-document";
import { MAIN_PHONE } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use · AAAN",
  description: "The terms that apply when you use the AAAN website and the information it contains.",
  alternates: { canonical: "/en/terms" },
};

export default function TermsPage() {
  return (
    <LegalDocument title="Terms of Use">
      <LegalSection title="About these terms">
        <p>
          These terms apply to your use of the website of the African Agricultural Advancement Network (AAAN). By using the site, you agree to them. If you do
          not agree, please do not use the site.
        </p>
      </LegalSection>

      <LegalSection title="Using the website">
        <p>
          You may browse the site, read its content, and send us enquiries, quote requests, sign-ups and newsletter requests. You agree to give accurate
          information and not to misuse the forms, for example by sending automated requests or content that is unlawful, abusive or false.
        </p>
      </LegalSection>

      <LegalSection title="Information on this site">
        <p>
          We work hard to keep the information on this site accurate and up to date. Figures, crop descriptions, product specifications, seasons and
          certifications are given for general information. They can change, and product specifications are confirmed in writing before any contract. Where
          a certification is mentioned, it applies to the products and sites covered by the relevant certificate at the time.
        </p>
      </LegalSection>

      <LegalSection title="Enquiries, quotes and sign-ups">
        <p>
          Sending an enquiry, quote request, specification sheet request or farmer sign-up does not create a contract with AAAN. Any quote is an
          indication only. A binding agreement exists only once AAAN and the other party have agreed and signed the commercial terms in writing.
        </p>
      </LegalSection>

      <LegalSection title="Our content and trademarks">
        <p>
          The text, photographs, videos, graphics, logos and other material on this site belong to AAAN or are used with permission. You may view and print
          pages for your own information, and you may use our press materials for editorial coverage that credits AAAN. You may not copy, reproduce or
          commercially exploit material from this site without our written permission.
        </p>
      </LegalSection>

      <LegalSection title="Links to other websites">
        <p>
          The site may link to websites run by others, including partners, regulators and certification bodies. We do not control those websites and are not
          responsible for their content or practices.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the extent the law allows, AAAN is not liable for losses that arise from using this site or relying on its information. Nothing in these terms
          limits liability that cannot be excluded by law, including for death or personal injury caused by negligence.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          We may update these terms. The date at the top shows the last change. Continuing to use the site after a change means you accept the updated
          terms.
        </p>
      </LegalSection>

      <LegalSection title="Governing law and contact">
        <p>
          These terms are governed by the laws of Kenya. For questions about them, call{" "}
          <a href={`tel:${MAIN_PHONE.replace(/\s/g, "")}`} className="font-bold text-ink-brand underline underline-offset-4">
            {MAIN_PHONE}
          </a>{" "}
          or use the <Link href="/en/contact" className="font-bold text-ink-brand underline underline-offset-4">contact form</Link>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
