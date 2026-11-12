import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";
import { H1, H2, Prose } from "@/components/ui/typography";

// Shared layout for the legal pages, so privacy, cookies and terms read the same way.
export const LEGAL_UPDATED = "12 November 2026";

export function LegalDocument({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Section>
      <div className="mx-auto max-w-[72ch]">
        <H1 className="text-[40px] md:text-[48px] md:leading-[54px]">{title}</H1>
        <p className="mt-4 text-[14px] font-semibold text-ink-muted">Last updated {LEGAL_UPDATED}</p>
        <Prose className="mt-10 space-y-10">{children}</Prose>
      </div>
    </Section>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <H2 className="text-[24px] md:text-[26px]">{title}</H2>
      {children}
    </section>
  );
}
