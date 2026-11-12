import Link from "next/link";
import type { ReactNode } from "react";
import { Photo } from "@/components/media/photo";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, H1, Lead } from "@/components/ui/typography";
import { Container } from "@/components/ui/section";
import type { Crop } from "@/content/crops";
import type { Article } from "@/content/news";
import type { Person } from "@/content/team";

// Page hero: a headline, a lead paragraph, optional actions and an optional photograph.
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  actions,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-surface-ivory">
      <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <H1 className="max-w-[18ch] text-[40px] leading-[46px] md:text-[56px] md:leading-[60px]">{title}</H1>
          {lead ? <Lead className="mt-6">{lead}</Lead> : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
          {children}
        </div>
        {image ? <Photo src={image} alt={imageAlt} priority className="aspect-[16/10] rounded-xl md:aspect-[4/3] lg:aspect-[5/4]" sizes="(min-width: 1024px) 45vw, 100vw" /> : null}
      </Container>
    </section>
  );
}

export function StatGrid({ items, columns = 4 }: { items: { value: string; label: string }[]; columns?: 3 | 4 }) {
  const grid = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-4";
  return (
    <dl className={`grid grid-cols-2 gap-x-8 gap-y-10 ${grid}`}>
      {items.map((item) => (
        <div key={item.label} className="border-t border-line pt-6">
          <dt className="order-2 mt-2 text-[15px] leading-6 text-ink-muted">{item.label}</dt>
          <dd className="break-words font-display text-[34px] font-semibold leading-[38px] text-ink-brand sm:text-[44px] sm:leading-[48px] xl:text-[56px] xl:leading-[60px]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-forest text-ivory">
      <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <div className="max-w-[60ch]">
          <h2 className="font-display text-[30px] font-semibold leading-[1.15] md:text-[36px]">{title}</h2>
          {text ? <p className="mt-4 text-[17px] leading-7 text-ivory/90">{text}</p> : null}
        </div>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={primary.href} variant="gold">{primary.label}</ButtonLink>
          {secondary ? <ButtonLink href={secondary.href} variant="light">{secondary.label}</ButtonLink> : null}
        </div>
      </Container>
    </section>
  );
}

export function CropCard({ crop }: { crop: Crop }) {
  return (
    <Link
      href={`/en/crops/${crop.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-shadow hover:shadow-[0_12px_40px_rgba(15,26,20,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <Photo src={crop.image} alt={crop.imageAlt} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-brand">{crop.family} · {crop.tag}</p>
        <h3 className="font-display text-[24px] font-semibold leading-8 text-ink">{crop.name}</h3>
        <p className="text-[15px] leading-6 text-ink-muted">{crop.subline}</p>
        <span className="mt-auto pt-2 text-[15px] font-bold text-ink-brand group-hover:underline">Explore {crop.name.toLowerCase()} →</span>
      </div>
    </Link>
  );
}

export function NewsCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <Photo src={article.image} alt={article.imageAlt} className="aspect-[16/10]" sizes="(min-width: 1024px) 33vw, 100vw" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-brand">{article.category}</p>
        <h3 className="font-display text-[22px] font-semibold leading-7 text-ink">
          <Link href={`/en/news/${article.slug}`} className="hover:underline">{article.title}</Link>
        </h3>
        <p className="text-[15px] leading-6 text-ink-muted">{article.summary}</p>
        <Link href={`/en/news/${article.slug}`} className="mt-auto pt-2 text-[15px] font-bold text-ink-brand hover:underline">
          Read the story →
        </Link>
      </div>
    </article>
  );
}

export function PersonCard({ person }: { person: Person }) {
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      {person.photo ? (
        <Photo src={person.photo} alt={person.photoAlt} className="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" fit="cover" focus="top" />
      ) : (
        <div role="img" aria-label={person.photoAlt} className="flex aspect-[4/5] items-center justify-center bg-forest font-display text-[48px] font-semibold text-ivory">
          {initials}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-[22px] font-semibold leading-7 text-ink">{person.name}</h3>
        <p className="text-[15px] font-bold text-ink-brand">{person.role}</p>
        <p className="text-[14px] text-ink-muted">
          {[person.office, person.qualification].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-3 text-[15px] leading-6 text-ink">{person.bio}</p>
      </div>
    </article>
  );
}

export function Testimonial({ quote, attribution, image, imageAlt }: { quote: string; attribution: string; image: string; imageAlt: string }) {
  return (
    <figure className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
      <Photo src={image} alt={imageAlt} className="aspect-[4/3] rounded-xl" sizes="(min-width: 768px) 40vw, 100vw" />
      <div>
        <blockquote className="font-display text-[26px] italic leading-[36px] text-ink md:text-[30px] md:leading-[42px]">
          <p>“{quote}”</p>
        </blockquote>
        <figcaption className="mt-6 text-[15px] font-bold text-ink-brand">{attribution}</figcaption>
      </div>
    </figure>
  );
}
