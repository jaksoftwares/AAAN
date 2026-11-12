import Link from "next/link";
import type { Metadata } from "next";
import { facts, taglines } from "@/content/facts";
import { media } from "@/content/media";
import { cropFamilies } from "@/content/crops";
import { getCrops, getNews, getPartners, getTestimonial } from "@/lib/gateways/content";
import { HeroVideo } from "@/components/media/hero-video";
import { Photo } from "@/components/media/photo";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { H2, H3, Eyebrow } from "@/components/ui/typography";
import { CropCard, NewsCard, StatGrid, Testimonial } from "@/components/sections/blocks";
import { WHATSAPP_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "AAAN · From African Soil to Global Tables",
  description:
    "Pan-African agribusiness growing, processing and exporting cocoa, cashew, fruit, roots and vegetables from Kenya, Ghana and Côte d'Ivoire.",
  alternates: { canonical: "/en" },
};

const seedToShelf = [
  { title: "Seedlings", text: "Certified, disease-free planting material from our six nurseries.", href: "/en/what-we-do/seedlings" },
  { title: "Farming", text: "Modern methods, soil science and organic practice on partner farms.", href: "/en/what-we-do/farming-and-technology" },
  { title: "Harvest", text: "Careful collection, grading and storage that cut losses.", href: "/en/what-we-do/export-and-trade" },
  { title: "Value addition", text: "Cocoa, cashew, cassava and dairy processed in our own facilities.", href: "/en/what-we-do/value-addition", highlight: true },
  { title: "Markets", text: "Traceable produce for local tables and buyers in 15 countries.", href: "/en/what-we-do/export-and-trade" },
];

const countryCards = [
  {
    name: "Kenya",
    text: "Head office in Nairobi. Seedlings, seed potatoes, dairy, vegetables, bananas, pineapples, maize and cashew.",
    image: media.nurseryInterior,
    alt: "Inside a shade-net seedling nursery in Kenya",
  },
  {
    name: "Ghana",
    text: "West Africa operations in Kumasi. Cocoa, yams, cassava, plantains, oil palm and cashew.",
    image: media.nurseryGhana,
    alt: "A large cocoa seedling nursery in Ghana",
  },
  {
    name: "Côte d'Ivoire",
    text: "Francophone hub in Abidjan. Cocoa, cashew, bananas, pineapples, oil palm and cassava.",
    image: media.abidjanSkyline,
    alt: "The business district of Abidjan",
  },
];

const valuePairs = [
  ["Cocoa beans", "cocoa butter and powder"],
  ["Raw cashew", "graded kernels"],
  ["Cassava", "gari, flour and attieké"],
  ["Fresh milk", "yoghurt and ghee"],
];

export default async function HomePage({ searchParams }: { searchParams: Promise<{ family?: string }> }) {
  const { family } = await searchParams;
  const activeFamily = cropFamilies.find((f) => f === family);
  const allCrops = getCrops();
  const crops = (activeFamily ? allCrops.filter((c) => c.family === activeFamily) : allCrops).slice(0, 6);
  const news = getNews().slice(0, 3);
  const partners = getPartners();
  const testimonial = getTestimonial();

  return (
    <>
      {/* Hero: text on a brand panel, video beside it. Text is never placed directly over video. */}
      <section className="relative bg-forest text-ivory">
        <div className="grid min-h-[78vh] lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col justify-center px-4 py-20 md:px-8 lg:px-[max(2rem,calc((100vw-1200px)/2+2rem))]">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-gold">Pan-African agribusiness · Since {facts.foundedYear}</p>
            <h1 className="max-w-[16ch] font-display text-[44px] font-semibold leading-[48px] md:text-[64px] md:leading-[68px]">
              {taglines.primary}
            </h1>
            <p className="mt-6 max-w-[50ch] text-[18px] leading-[30px] text-ivory/90">
              We grow, process and export quality produce from Kenya, Ghana and Côte d&apos;Ivoire to {facts.exportCountries} countries.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/en/request-a-quote" variant="gold">Request a quote</ButtonLink>
              <ButtonLink href="/en/about" variant="light">Discover our work</ButtonLink>
            </div>
            <p className="mt-12 text-[14px] font-semibold tracking-wide text-ivory/80">Kenya · Ghana · Côte d&apos;Ivoire</p>
          </div>
          <div className="relative min-h-[360px] lg:min-h-full">
            <HeroVideo src={media.heroLoop} poster={media.heroPoster} label={media.heroPosterAlt} />
          </div>
        </div>
      </section>

      <Section tone="ivory" bordered={false}>
        <StatGrid
          items={[
            { value: facts.farmersInNetwork, label: "farmers in our network" },
            { value: facts.seedlingsSinceFounding, label: "seedlings planted since 2015" },
            { value: facts.tonnesHandledPerYear, label: "tonnes of produce a year" },
            { value: facts.exportCountries, label: "export countries" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <H2>One network, from the seedling to the shelf.</H2>
            <p className="mt-6 max-w-[62ch] text-[17px] leading-7 text-ink">
              AAAN began in {facts.foundedYear} with a nursery and 120 farmers in Nyandarua, Kenya. We gave them clean seed, better methods and a guaranteed buyer, and their harvests grew. Today, from our head office in Nairobi, we run that same model across Kenya, Ghana and Côte d&apos;Ivoire. We work with more than {facts.farmersInNetwork} farmers, add value to what they grow, and deliver it to buyers in {facts.exportCountries} countries.
            </p>
            <div className="mt-8">
              <ButtonLink href="/en/about" variant="ghost">Our story</ButtonLink>
            </div>
          </div>
          <Photo src={media.farmerYoung} alt="A young Kenyan farmer standing in his vegetable field" className="aspect-[4/3] rounded-xl" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHeader
          eyebrow="Seed to shelf"
          title="From seed to shelf, with value added in Africa."
          intro="We work across the whole value chain, so quality is in our hands at every step."
        />
        <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-5">
          {seedToShelf.map((step, i) => (
            <li key={step.title} className={`flex flex-col gap-3 p-6 ${step.highlight ? "bg-forest text-ivory" : "bg-surface"}`}>
              <span className={`text-xs font-bold ${step.highlight ? "text-gold" : "text-ink-brand"}`}>0{i + 1}</span>
              <h3 className="font-display text-[22px] font-semibold">{step.title}</h3>
              <p className={`text-[15px] leading-6 ${step.highlight ? "text-ivory/90" : "text-ink-muted"}`}>{step.text}</p>
              <Link href={step.href} className={`mt-auto pt-2 text-[14px] font-bold underline-offset-4 hover:underline ${step.highlight ? "text-gold" : "text-ink-brand"}`}>
                Learn more
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="crops">
        <SectionHeader eyebrow="Our crops" title="What we grow and supply." intro="Twelve crops, sourced where each grows best, supplied fresh or processed." />
        <nav aria-label="Filter crops by family" className="mb-10 flex flex-wrap gap-2">
          <Link
            href="/en#crops"
            aria-current={!activeFamily ? "page" : undefined}
            className={`min-h-10 rounded-full border px-4 py-2 text-[14px] font-semibold ${!activeFamily ? "border-forest bg-forest text-ivory" : "border-line-strong text-ink hover:bg-surface-ivory"}`}
          >
            All
          </Link>
          {cropFamilies.map((f) => (
            <Link
              key={f}
              href={`/en?family=${encodeURIComponent(f)}#crops`}
              aria-current={activeFamily === f ? "page" : undefined}
              className={`min-h-10 rounded-full border px-4 py-2 text-[14px] font-semibold ${activeFamily === f ? "border-forest bg-forest text-ivory" : "border-line-strong text-ink hover:bg-surface-ivory"}`}
            >
              {f}
            </Link>
          ))}
        </nav>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crops.map((c) => (
            <CropCard key={c.slug} crop={c} />
          ))}
        </div>
        <div className="mt-12">
          <ButtonLink href="/en/crops" variant="ghost">See all 12 crops</ButtonLink>
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHeader
          eyebrow="Where we operate"
          title="Rooted in three countries. Trusted in fifteen."
          intro="Seventeen sites, from the Kenyan highlands to the cocoa belt of West Africa."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {countryCards.map((c) => (
            <article key={c.name} className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
              <Photo src={c.image} alt={c.alt} className="aspect-[16/10]" sizes="(min-width: 768px) 33vw, 100vw" />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <H3>{c.name}</H3>
                <p className="text-[15px] leading-6 text-ink-muted">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-[62ch] text-[15px] leading-6 text-ink-muted">
          Shipped to {facts.exportCountries} countries in Africa, Europe, the Middle East and North America.
        </p>
        <div className="mt-8">
          <ButtonLink href="/en/where-we-operate" variant="ghost">Explore our network</ButtonLink>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <H2>See how a seed becomes a global product.</H2>
          </div>
          <figure>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-forest">
              <video
                className="h-full w-full object-cover"
                src={media.brandFilmPreview}
                poster={media.heroPoster}
                controls
                preload="metadata"
                aria-label="Brand film: highland fields at sunrise in Nyandarua"
              />
            </div>
          </figure>
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Value addition</Eyebrow>
            <H2>More of every harvest&apos;s value stays in Africa.</H2>
            <p className="mt-6 max-w-[62ch] text-[17px] leading-7 text-ink">
              We do not only ship raw crops. In five processing and packing facilities, we turn them into products buyers want and pay more for.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {valuePairs.map(([from, to]) => (
                <li key={from} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-bold text-ink">{from}</span>
                  <span aria-hidden="true" className="hidden text-ink-brand sm:inline">→</span>
                  <span className="text-ink-muted">{to}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/en/what-we-do/value-addition" variant="ghost">How we add value</ButtonLink>
            </div>
          </div>
          <Photo src={media.processingCocoa} alt="A modern cocoa processing line with stainless steel equipment" className="aspect-[4/5] rounded-xl" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>Impact</Eyebrow>
            <H2>Growing better. Feeding further.</H2>
            <dl className="mt-10 grid gap-8 sm:grid-cols-3">
              <div className="border-t border-line pt-5">
                <dt className="text-[15px] text-ink-muted">of our farmers are women</dt>
                <dd className="mt-2 font-display text-[44px] font-semibold text-ink-brand">{facts.womenFarmersShare}</dd>
              </div>
              <div className="border-t border-line pt-5">
                <dt className="text-[15px] text-ink-muted">average yield increase</dt>
                <dd className="mt-2 font-display text-[44px] font-semibold text-ink-brand">{facts.averageYieldIncrease}</dd>
              </div>
              <div className="border-t border-line pt-5">
                <dt className="text-[15px] text-ink-muted">seasonal jobs every year</dt>
                <dd className="mt-2 font-display text-[44px] font-semibold text-ink-brand">{facts.seasonalJobsPerYear}</dd>
              </div>
            </dl>
            <div className="mt-10">
              <ButtonLink href="/en/sustainability" variant="ghost">Our impact</ButtonLink>
            </div>
          </div>
          <Testimonial {...testimonial} />
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Quality you can trust</Eyebrow>
            <H2>Quality you can trace, from farm to container.</H2>
            <ol className="mt-8 space-y-6">
              {[
                ["Mapped farms", "Every partner farm is registered and geolocated."],
                ["Tested lots", "Every lot is graded and lab-tested."],
                ["Traced shipments", "Every shipment carries its lot history."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5">
                  <span className="font-display text-[28px] font-semibold text-gold-ink">{i + 1}</span>
                  <div>
                    <h3 className="text-[18px] font-bold">{t}</h3>
                    <p className="mt-1 text-[16px] leading-6 text-ink-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <ButtonLink href="/en/quality" variant="ghost">Quality and certifications</ButtonLink>
            </div>
          </div>
          <Photo src={media.labTechnician} alt="A food safety technician in a white coat in the laboratory" className="aspect-[4/3] rounded-xl" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Partners" title="Working alongside Africa's leading institutions." />
        <div className="grid gap-6 md:grid-cols-2">
          {partners.groups.map((g) => (
            <div key={g.heading} className="rounded-lg border border-line bg-surface p-6">
              <h3 className="text-[16px] font-bold text-ink-brand">{g.heading}</h3>
              <p className="mt-2 text-[15px] leading-7 text-ink-muted">{g.names.slice(0, 4).join(" · ")} and more.</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/en/partners" variant="ghost">See all partners</ButtonLink>
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHeader eyebrow="Latest news" title="News from the field." />
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
        <div className="mt-12">
          <ButtonLink href="/en/news" variant="ghost">All news</ButtonLink>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-8 md:p-10">
            <H3>Buying?</H3>
            <p className="text-[16px] leading-7 text-ink-muted">Reliable, traceable supply of African produce.</p>
            <div className="mt-auto pt-4">
              <ButtonLink href="/en/request-a-quote">Request a quote</ButtonLink>
            </div>
          </div>
          <div className="flex flex-col gap-5 rounded-xl bg-forest p-8 text-ivory md:p-10">
            <h3 className="font-display text-[24px] font-semibold">Farming?</h3>
            <p className="text-[16px] leading-7 text-ivory/90">Better seedlings, training and a guaranteed buyer.</p>
            <div className="mt-auto flex flex-wrap gap-4 pt-4">
              <ButtonLink href="/en/join" variant="gold">Join the network</ButtonLink>
              <ButtonLink href={WHATSAPP_URL} variant="light">Chat on WhatsApp</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

    </>
  );
}
