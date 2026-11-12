import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { H1, Lead } from "@/components/ui/typography";

// 404 copy from "AAAN Website Content (English).md", section 1.
export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-[60ch] py-16">
        <H1 className="text-[40px] md:text-[56px] md:leading-[60px]">This page has not been planted yet.</H1>
        <Lead className="mt-6">
          The page you are looking for may have moved. Try a search, or start from one of these:
        </Lead>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/en">Home</ButtonLink>
          <ButtonLink href="/en/crops" variant="ghost">Crops and products</ButtonLink>
          <ButtonLink href="/en/contact" variant="ghost">Contact</ButtonLink>
          <ButtonLink href="/en/search" variant="ghost">Search</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
