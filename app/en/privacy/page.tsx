import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, LegalSection } from "@/components/legal/legal-document";
import { MAIN_EMAIL, MAIN_PHONE } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy · AAAN",
  description: "How AAAN collects, uses, stores and protects the information you send us through this website.",
  alternates: { canonical: "/en/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy">
      <LegalSection title="Who we are">
        <p>
          This notice covers the African Agricultural Advancement Network (AAAN) and this website. Our head office is in Upper Hill, Nairobi, Kenya, and we
          also operate in Ghana and Côte d&apos;Ivoire. For any question about your information, call us on{" "}
          <a href={`tel:${MAIN_PHONE.replace(/\s/g, "")}`} className="font-bold text-ink-brand underline underline-offset-4">
            {MAIN_PHONE}
          </a>{" "}
          or use the <Link href="/en/contact" className="font-bold text-ink-brand underline underline-offset-4">contact form</Link>.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <p>We only collect what you choose to send us through the forms on this site:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Enquiries and quote requests:</strong> your name, email address, and optionally your phone number, company, country, crop, product,
            quantity, unit, destination, delivery period and message.
          </li>
          <li>
            <strong>Farmer and cooperative sign-ups:</strong> your full name, phone number, country, nearest town or hub, the crops you grow, your farm size
            and unit, and whether you belong to a cooperative.
          </li>
          <li>
            <strong>Newsletter:</strong> your email address.
          </li>
          <li>
            <strong>Your consent:</strong> a record that you agreed to be contacted, when you agreed, and which version of the consent wording you saw.
          </li>
          <li>
            <strong>Technical details of a submission:</strong> the page you sent the form from and your browser&apos;s identification text (user agent).
          </li>
        </ul>
        <p>
          We do not store your internet address with your submission. We use it only for a short time, in memory, to limit repeated submissions from one
          connection. This website does not use analytics, advertising trackers or third-party scripts.
        </p>
      </LegalSection>

      <LegalSection title="Why we use it and our legal basis">
        <p>We use your details to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>answer your enquiry or quote request and pass it to the right AAAN team (trade, partnerships, careers, media or general);</li>
          <li>arrange your farmer or cooperative sign-up, including a visit or call from your nearest hub;</li>
          <li>send the monthly harvest update, if you subscribe.</li>
        </ul>
        <p>
          We rely on your consent for contact and newsletters, which you can withdraw at any time. Where you ask us for a quote or a visit, we use the
          information to take those steps before a contract. We do not sell your information, and we do not use it for advertising.
        </p>
      </LegalSection>

      <LegalSection title="Who sees your information">
        <p>
          Your submission is seen by the AAAN team responsible for it. Trade enquiries go to our trade team, farmer sign-ups go to the hub in your country,
          and other enquiries go to the relevant team. We share information with service providers who run the website and its database for us, only to
          the extent they need it to do so. We do not share it with anyone else unless the law requires it.
        </p>
      </LegalSection>

      <LegalSection title="Where it is stored">
        <p>
          Submissions are stored in a secure cloud database. That database is not publicly accessible; only AAAN&apos;s website server can write to it. The
          database provider may store data in data centres outside your country. Where that happens, we choose providers that protect personal data to a
          standard we consider adequate.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep enquiries and sign-ups only as long as needed to respond to you and to keep the records our business requires. We keep newsletter details
          until you unsubscribe. When a record is no longer needed, we delete it or remove the details that identify you.
        </p>
      </LegalSection>

      <LegalSection title="Keeping your information safe">
        <p>
          The website connects to you over an encrypted connection. Access to the database is limited to AAAN systems and authorised staff, and we do not
          keep more information than we need. No online system is completely secure, so please tell us straight away if you think your details have been
          misused.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>You can ask us to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>tell you what information we hold about you;</li>
          <li>correct information that is wrong or incomplete;</li>
          <li>delete your information;</li>
          <li>stop using it for newsletters or contact, by unsubscribing or by telling us.</li>
        </ul>
        <p>
          To use these rights, contact us by phone, by email at{" "}
          <a href={`mailto:${MAIN_EMAIL}`} className="font-bold text-ink-brand underline underline-offset-4">{MAIN_EMAIL}</a>, or through the contact form. We will respond within the time set by the data protection law that applies
          to you. If you are not satisfied with our response, you can complain to the data protection authority in your country: the Office of the Data
          Protection Commissioner (Kenya), the Data Protection Commission (Ghana), or the Autorité de Régulation des Télécommunications de Côte d&apos;Ivoire
          (ARTCI), which handles personal data in Côte d&apos;Ivoire.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>This website is for businesses, farmers and cooperatives. We do not knowingly collect information from anyone under 18.</p>
      </LegalSection>

      <LegalSection title="Changes to this notice">
        <p>
          We may update this notice when our services or the law change. The date at the top shows when it was last updated. The version that applied when
          you sent us information remains the one that governs that information.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
