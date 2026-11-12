import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, LegalSection } from "@/components/legal/legal-document";
import { CookieReset } from "@/components/legal/cookie-reset";

export const metadata: Metadata = {
  title: "Cookie Notice · AAAN",
  description: "The cookies and browser storage used by the AAAN website, and how to change your choice.",
  alternates: { canonical: "/en/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalDocument title="Cookie Notice">
      <LegalSection title="What this notice covers">
        <p>
          Cookies are small files, and browser storage is similar information kept on your device. This notice explains what the AAAN website stores on
          your device and why.
        </p>
      </LegalSection>

      <LegalSection title="What we use">
        <p>
          This website does not set advertising cookies, analytics cookies or tracking cookies, and it does not load third-party scripts. The only item it
          stores is your answer to the cookie notice.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-[15px]">
            <caption className="sr-only">Browser storage used by this website</caption>
            <thead>
              <tr className="border-b-2 border-forest">
                <th scope="col" className="py-3 pr-4 font-bold text-ink">Name</th>
                <th scope="col" className="py-3 pr-4 font-bold text-ink">Type</th>
                <th scope="col" className="py-3 pr-4 font-bold text-ink">Purpose</th>
                <th scope="col" className="py-3 font-bold text-ink">Kept for</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-4 pr-4 font-bold text-ink">aaan-cookie-choice</th>
                <td className="py-4 pr-4 text-ink-muted">Browser local storage</td>
                <td className="py-4 pr-4 text-ink-muted">Remembers that you answered the cookie notice, so it does not appear on every page.</td>
                <td className="py-4 text-ink-muted">Until you clear it, using the button below.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Forms on this site also send a secure request to our server when you submit them. That request is not a cookie and does not track you across other
          websites.
        </p>
      </LegalSection>

      <LegalSection title="Your choice">
        <p>
          When the cookie notice first appears you can accept all, reject non-essential storage, or open this page to read more. Because the site uses no
          advertising or tracking storage, the choices currently have the same effect on this website. If we add optional storage in future, we will ask
          before we use it and this notice will be updated.
        </p>
        <CookieReset />
        <p>
          You can also control storage in your browser settings, for example by blocking site data or deleting it. Blocking storage may stop the cookie
          notice from remembering your choice, but the rest of the site will still work.
        </p>
      </LegalSection>

      <LegalSection title="More information">
        <p>
          For how we handle the information you send us through forms, read our{" "}
          <Link href="/en/privacy" className="font-bold text-ink-brand underline underline-offset-4">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
