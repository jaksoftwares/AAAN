import type { Metadata } from "next";
import Link from "next/link";
import { getJobs } from "@/lib/gateways/content";
import { noRolesMessage } from "@/content/jobs";
import { media } from "@/content/media";
import { PageHero } from "@/components/sections/blocks";
import { Section, SectionHeader } from "@/components/ui/section";
import { H3 } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/media/photo";

export const metadata: Metadata = {
  title: "Careers at AAAN · Build Africa's Agricultural Future",
  description:
    "Jobs and graduate programmes in Kenya, Ghana and Côte d'Ivoire, in nurseries, processing, trade and technology.",
  alternates: { canonical: "/en/careers" },
};

const why = [
  ["Purpose you can see", "Your work changes harvests and incomes."],
  ["Room to grow", "Training, mentoring and moves between countries and teams."],
  ["One team, three countries", "English and French, East and West Africa."],
  ["Fair and safe workplaces", "Safety first in every plant and field."],
];

export default function CareersPage() {
  const jobs = getJobs();
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build Africa's agricultural future with us."
        lead="From nursery technicians in Nyandarua to export coordinators in Abidjan, our 420+ people make the network work. We look for people who care about farmers, food and doing things well."
        image={media.agronomist}
        imageAlt="An agronomist in a dark green polo shirt"
      />

      <Section>
        <SectionHeader title="Why AAAN" />
        <dl className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {why.map(([t, d]) => (
            <div key={t} className="border-t-2 border-gold pt-6">
              <dt className="font-display text-[21px] font-semibold">{t}</dt>
              <dd className="mt-3 text-[15px] leading-7 text-ink-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="ivory">
        <SectionHeader title="Open roles" />
        {jobs.length === 0 ? (
          <div className="rounded-xl border border-line bg-surface p-8 md:p-10">
            <p className="font-display text-[24px] leading-9 text-ink">{noRolesMessage}</p>
          </div>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {jobs.map((j) => (
              <li key={j.slug} className="flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <H3 className="text-[19px]">{j.title}</H3>
                  <p className="text-[14px] text-ink-muted">
                    {j.country} · {j.department} · {j.jobType}
                  </p>
                </div>
                <Link href={`/en/careers/${j.slug}`} className="font-bold text-ink-brand hover:underline">
                  View role →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              title="Graduate programme"
              intro="Our 12-month graduate programme rotates new agronomists, food scientists and engineers through our nurseries, plants and trade teams."
            />
            <ButtonLink href="/en/contact?reason=careers" variant="ghost">Apply now</ButtonLink>
          </div>
          <Photo src={media.nurseryInterior} alt="Seedling trays in a shade-net nursery" className="aspect-[4/3] rounded-xl" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </Section>
    </>
  );
}
