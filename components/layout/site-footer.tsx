import Link from "next/link";
import { footerColumns, offices } from "@/content/site";
import { taglines } from "@/content/facts";
import { NewsletterForm } from "@/components/forms/newsletter-form";

// The footer shows three office cards, as set out in the approved copy (section 1).
const footerOffices = ["Nairobi", "Kumasi", "Abidjan"];

export function SiteFooter() {
  return (
    <footer className="bg-forest text-ivory">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logos/svg/aaan-logo-horizontal-reversed.svg" alt="AAAN" className="h-12 w-auto" />
            <p className="mt-6 max-w-[40ch] text-[16px] leading-7 text-ivory/90">
              African Agricultural Advancement Network (AAAN) grows, processes and exports quality produce from Kenya, Ghana and Côte d&apos;Ivoire. Head office: Nairobi, Kenya.
            </p>
            <p className="mt-4 font-display text-[20px] font-semibold text-gold">{taglines.primary}</p>

            <div className="mt-10 space-y-6">
              {offices.filter((o) => footerOffices.includes(o.name)).map((office) => (
                <div key={office.name}>
                  <p className="text-[15px] font-bold">
                    {office.name}
                    {office.isHeadOffice ? " (head office)" : ""}
                  </p>
                  <p className="text-[14px] text-ivory/85">
                    {office.city}, {office.country}
                  </p>
                  {office.phone ? (
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-[14px] text-ivory underline underline-offset-4">
                      {office.phone}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)]">
            {footerColumns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-gold">{col.heading}</h2>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex min-h-6 items-center text-[15px] text-ivory/90 underline-offset-4 hover:text-ivory hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-ivory/20 pt-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-display text-[22px] font-semibold">Get our monthly harvest update.</h2>
            <p className="mt-2 max-w-[48ch] text-[15px] text-ivory/85">Harvest updates, market news and stories from the field, once a month.</p>
            <div className="mt-5 max-w-md">
              <NewsletterForm tone="dark" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ivory/20 pt-8 text-[13px] text-ivory/80 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} African Agricultural Advancement Network. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-6">
            <Link href="/en/privacy" className="hover:text-ivory hover:underline">Privacy</Link>
            <Link href="/en/cookies" className="hover:text-ivory hover:underline">Cookies</Link>
            <Link href="/en/terms" className="hover:text-ivory hover:underline">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-ivory hover:underline">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
