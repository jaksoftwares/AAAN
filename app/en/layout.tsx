import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieBanner } from "@/components/layout/cookie-banner";

// Shell for every English page: header, main landmark, footer, cookie notice.
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="min-h-[60vh] focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <CookieBanner />
    </>
  );
}
