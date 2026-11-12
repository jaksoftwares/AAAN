// "What we do" overview and sub-pages. Source: "AAAN Website Content (English).md", section 4.

export type Step = { title: string; text: string };

export type WhatWeDoPage = {
  slug: string;
  title: string;
  headline: string;
  problem: string;
  steps: Step[];
  proof: { value: string; label: string }[];
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
  seo: { title: string; description: string };
  facilities?: { name: string; text: string }[];
  video?: { src: string; alt: string };
};

export const whatWeDoOverview = {
  headline: "We work on every link of the chain.",
  intro:
    "Most agricultural companies do one thing: grow, buy or trade. AAAN does all of it, from the seedling to the buyer, so that quality, traceability and value are in our hands at every step.",
};

export const whatWeDoPages: WhatWeDoPage[] = [
  {
    slug: "seedlings",
    title: "Seedlings and nurseries",
    headline: "Every good harvest starts with a good seedling.",
    problem:
      "Many African farmers plant saved or uncertified material that carries disease and gives low yields. No amount of hard work can make up for a poor start.",
    steps: [
      { title: "Six nurseries", text: "In Kenya, Ghana and Côte d'Ivoire, raising planting material under controlled conditions." },
      { title: "Improved varieties", text: "Hybrid cocoa, grafted cashew, clean cassava cuttings, tissue-culture bananas and plantains, certified seed potatoes and vegetable seedlings." },
      { title: "Certification", text: "Our seed and plant material is inspected and certified by national seed authorities, including KEPHIS in Kenya." },
      { title: "Delivery and planting support", text: "Seedlings reach farmers with planting guidance and a follow-up visit." },
    ],
    proof: [
      { value: "2.5 million+", label: "seedlings a year" },
      { value: "15 million", label: "since 2015" },
      { value: "2,000 tonnes", label: "certified seed potatoes a year" },
    ],
    cta: { label: "Order seedlings for your farm or cooperative", href: "/en/join" },
    image: "/media/inside-a-large-shade-net-seedling-nursery-in-kenya.png",
    imageAlt: "Inside a large shade-net seedling nursery in Kenya",
    video: { src: "/media/seedling-nursery-at-dawn.mp4", alt: "Seedling nursery at dawn" },
    seo: {
      title: "Seedlings and Nurseries · What We Do",
      description: "Certified, disease-free seedlings from six AAAN nurseries in Kenya, Ghana and Côte d'Ivoire, with planting support and follow-up.",
    },
  },
  {
    slug: "farming-and-technology",
    title: "Farming and technology",
    headline: "Better methods. Bigger harvests.",
    problem:
      "Smallholders often farm without soil data, timely advice or water control, so yields stay low and risk stays high.",
    steps: [
      { title: "Soil testing", text: "Soil testing and precise fertiliser plans for each farm." },
      { title: "Water", text: "Drip irrigation and greenhouses for vegetables in Kenya." },
      { title: "Integrated pest management", text: "Methods that cut chemical use." },
      { title: "The AAAN farmer app", text: "Weather alerts, crop advice and market prices on the farmer's phone." },
      { title: "GPS farm mapping", text: "Proof of where every crop was grown." },
    ],
    proof: [
      { value: "35%", label: "average yield increase for network farmers" },
      { value: "18,000+", label: "hectares under AAAN-supported production" },
    ],
    cta: { label: "See how our technology traces your supply", href: "/en/quality" },
    image: "/media/two-adult-african-hands-cupping-rich-dark-soil-wit.png",
    imageAlt: "Two hands cupping rich dark soil",
    seo: {
      title: "Farming and Technology · What We Do",
      description: "Soil testing, drip irrigation, integrated pest management, a farmer app and GPS mapping: the methods behind AAAN's yield gains.",
    },
  },
  {
    slug: "value-addition",
    title: "Value addition and processing",
    headline: "More of every harvest's value stays in Africa.",
    problem:
      "Raw crops earn the lowest prices, and the jobs and margins of processing happen elsewhere.",
    steps: [],
    facilities: [
      { name: "San-Pédro, Côte d'Ivoire", text: "Cocoa processing into cocoa liquor, butter and powder." },
      { name: "Bouaké, Côte d'Ivoire", text: "Cashew shelling, peeling and grading into export kernels." },
      { name: "Kumasi, Ghana", text: "Cassava into gari and high-quality cassava flour." },
      { name: "Kinangop, Kenya", text: "Milk chilling and processing into pasteurised milk, yoghurt and ghee." },
      { name: "Nairobi, Kenya", text: "An export packhouse for fresh vegetables and fruit." },
    ],
    proof: [
      { value: "5", label: "processing and packing facilities" },
      { value: "HACCP", label: "based food-safety systems in every plant" },
    ],
    cta: { label: "Explore our processed products", href: "/en/crops" },
    image: "/media/modern-cocoa-processing-line-with-stainless-steel.png",
    imageAlt: "A modern cocoa processing line with stainless steel equipment",
    seo: {
      title: "Value Addition and Processing · What We Do",
      description: "Five AAAN facilities process cocoa, cashew, cassava and milk in Africa, so more of each harvest's value stays on the continent.",
    },
  },
  {
    slug: "export-and-trade",
    title: "Export and trade",
    headline: "Reliable supply to 15 countries.",
    problem:
      "Buyers need consistent volumes, clear specifications and paperwork they can trust, every time.",
    steps: [
      { title: "Sourcing from 17 sites", text: "In three countries, so supply never depends on one harvest." },
      { title: "Specifications and samples", text: "Before every contract." },
      { title: "Export logistics", text: "Through the Mombasa, Tema, Abidjan and San-Pédro ports and Nairobi's JKIA airport." },
      { title: "Full documentation", text: "Phytosanitary certificates, certificates of origin, quality certificates and lot traceability." },
    ],
    proof: [
      { value: "30,000+", label: "tonnes exported a year" },
      { value: "15", label: "countries across Africa, Europe, the Middle East and North America" },
    ],
    cta: { label: "Request a quote", href: "/en/request-a-quote" },
    image: "/media/refrigerated-shipping-containers-at-tema-port-ghan.png",
    imageAlt: "Refrigerated shipping containers at Tema port, Ghana",
    seo: {
      title: "Export and Trade · What We Do",
      description: "Consistent volumes from 17 sites, export logistics through four ports and JKIA, and full export documentation for buyers in 15 countries.",
    },
  },
  {
    slug: "farmer-network",
    title: "Farmer network and training",
    headline: "Growing together.",
    problem:
      "Farmers working alone have little access to inputs, knowledge or fair markets.",
    steps: [
      { title: "Field schools and demonstration farms", text: "At Ol Kalou, Kumasi and Bouaké." },
      { title: "Inputs on credit", text: "Seedlings, fertiliser and tools, repaid at harvest." },
      { title: "A guaranteed buyer", text: "Agreed prices and quality grades before planting." },
      { title: "Cooperative support", text: "Organising, record-keeping and certification." },
    ],
    proof: [
      { value: "12,000+", label: "farmers" },
      { value: "160+", label: "cooperatives and groups" },
      { value: "28,000+", label: "farmers trained" },
      { value: "42%", label: "women" },
    ],
    cta: { label: "Join the network", href: "/en/join" },
    image: "/media/group-of-adult-ivorian-farmers-learning-yam-stakin.png",
    imageAlt: "A group of farmers learning yam staking in a field school",
    video: { src: "/media/agronomist-farmer-field-discussion.mp4", alt: "An agronomist discussing crop care with farmers" },
    seo: {
      title: "Farmer Network and Training · What We Do",
      description: "Field schools, inputs on credit, guaranteed buyers and cooperative support for farmers in Kenya, Ghana and Côte d'Ivoire.",
    },
  },
];

export function getWhatWeDo(slug: string): WhatWeDoPage | undefined {
  return whatWeDoPages.find((p) => p.slug === slug);
}
