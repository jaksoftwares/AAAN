import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found · AAAN",
  robots: { index: false, follow: true },
};

// Site-wide 404 for paths outside /en. The English 404 (app/en/not-found.tsx) keeps the header and footer.
// 404 copy from "AAAN Website Content (English).md", section 1.
export default function RootNotFound() {
  return (
    <main id="main" className="mx-auto max-w-[60ch] px-4 py-24">
      <h1 className="font-display text-[40px] font-semibold leading-[46px] text-forest md:text-[56px] md:leading-[60px]">
        This page has not been planted yet.
      </h1>
      <p className="mt-6 text-[18px] leading-[30px] text-ink-muted">
        The page you are looking for may have moved. Try a search, or start from one of these:
      </p>
      <nav aria-label="Helpful links" className="mt-10 flex flex-wrap gap-4">
        <Link href="/en" className="rounded-md bg-forest px-5 py-3 font-bold text-ivory">Home</Link>
        <Link href="/en/crops" className="rounded-md border-2 border-forest px-5 py-3 font-bold text-forest">Crops and products</Link>
        <Link href="/en/contact" className="rounded-md border-2 border-forest px-5 py-3 font-bold text-forest">Contact</Link>
      </nav>
    </main>
  );
}
