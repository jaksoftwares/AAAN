// News and insights. Titles and summaries are the approved English copy from
// "AAAN Website Content (English).md", section 10. Full article text and publication dates
// are not part of the approved copy, so articles show the summary only until AAAN supplies them.

export type Article = {
  slug: string;
  title: string;
  category: "Company news" | "Harvest updates" | "Events" | "Insights";
  summary: string;
  image: string;
  imageAlt: string;
};

export const newsCategories = ["Company news", "Harvest updates", "Events", "Insights"] as const;

export const articles: Article[] = [
  {
    slug: "aaan-launches-new-website",
    title: "AAAN launches its new website in English and French",
    category: "Company news",
    summary:
      "Our new home online brings together everything AAAN does, from seedlings in Nyandarua to cocoa processing in San-Pédro, for buyers, partners and farmers in both languages.",
    image: "/media/business-meeting-in-a-bright-modern-nairobi-office.png",
    imageAlt: "A business meeting in a bright modern Nairobi office",
  },
  {
    slug: "cashew-processing-comes-to-bouake",
    title: "Cashew processing comes to Bouaké",
    category: "Company news",
    summary:
      "Our fifth facility now shells, peels and grades cashew kernels in central Côte d'Ivoire, creating skilled jobs and keeping more of cashew's value at home.",
    image: "/media/cashew-processing-plant-in-cote-d-ivoire-adult-wom.png",
    imageAlt: "Workers at the cashew processing plant in Côte d'Ivoire",
  },
  {
    slug: "every-cocoa-farm-mapped-for-the-eudr",
    title: "Every cocoa farm mapped: how we prepare for the EUDR",
    category: "Insights",
    summary:
      "How GPS mapping, lot codes and farmer training let us show buyers exactly where every bag of our cocoa was grown.",
    image: "/media/close-up-of-an-adult-ghanaian-cocoa-farmer-s-hands.png",
    imageAlt: "Close-up of a cocoa farmer's hands holding dried cocoa beans",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
