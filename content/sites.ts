// Seventeen AAAN sites by country. Source: "AAAN Website Content (English).md", section 7.

export type Site = { name: string; location: string; role: string };

export type CountrySites = {
  country: "Kenya" | "Ghana" | "Côte d'Ivoire";
  intro: string;
  sites: Site[];
};

export const countrySites: CountrySites[] = [
  {
    country: "Kenya",
    intro:
      "Kenya is home to our Nairobi head office and our East African operations. The cool Nyandarua highlands, where AAAN began, grow our seed potatoes, dairy and vegetables. Other regions supply bananas, pineapples, maize and cashew.",
    sites: [
      { name: "Nairobi", location: "Upper Hill", role: "Group head office and East Africa trade office; export packhouse; air freight through JKIA." },
      { name: "Ol Kalou", location: "Nyandarua", role: "Our founding site; central nursery and farmer training centre. Seed potatoes and vegetables." },
      { name: "Kinangop", location: "Nyandarua", role: "Dairy centre for milk collection, chilling and processing." },
      { name: "Meru and Kirinyaga", location: "Kenya", role: "Tissue-culture banana nursery and banana sourcing." },
      { name: "Murang'a and Thika", location: "Kenya", role: "Pineapple sourcing." },
      { name: "Kitale", location: "Trans Nzoia", role: "Maize sourcing and grain storage." },
      { name: "Mombasa", location: "Kenya", role: "Port logistics and cashew sourcing on the coast." },
    ],
  },
  {
    country: "Ghana",
    intro:
      "Our West African operations are run from Kumasi, in the heart of Ghana's cocoa and food-crop belt. Exports leave through Tema port.",
    sites: [
      { name: "Kumasi", location: "Ashanti", role: "West Africa operations hub, cocoa nursery, cassava processing and a demonstration farm." },
      { name: "Accra and Tema", location: "Greater Accra", role: "Ghana corporate office and port exports." },
      { name: "Sefwi Wiawso", location: "Western North", role: "Cocoa farmer network, fermentation and drying." },
      { name: "Techiman", location: "Bono East", role: "Yam, cashew and maize hub, with an export grading yard." },
      { name: "Eastern Region", location: "Nsawam and Kade", role: "Oil palm and pineapple sourcing." },
    ],
  },
  {
    country: "Côte d'Ivoire",
    intro:
      "In the world's largest cocoa-producing country, our Abidjan office leads francophone trade and export. Our plants in San-Pédro and Bouaké add value to cocoa, cashew and cassava.",
    sites: [
      { name: "Abidjan", location: "Côte d'Ivoire", role: "Francophone hub and export office; port of Abidjan." },
      { name: "San-Pédro and Soubré", location: "Côte d'Ivoire", role: "Cocoa sourcing and processing; San-Pédro port." },
      { name: "Bouaké", location: "Côte d'Ivoire", role: "Cashew processing plant, cassava (attieké) processing and a demonstration farm." },
      { name: "Korhogo", location: "Côte d'Ivoire", role: "Cashew sourcing in the northern savanna." },
      { name: "Aboisso and Bonoua", location: "Côte d'Ivoire", role: "Bananas, pineapples, oil palm and plantains." },
    ],
  },
];

export const exportRegions = [
  { region: "East Africa", countries: "Uganda, Tanzania, Rwanda, South Sudan" },
  { region: "West Africa", countries: "Nigeria, Burkina Faso, Togo" },
  { region: "Europe", countries: "Netherlands, Belgium, Germany, France, United Kingdom" },
  { region: "Middle East", countries: "United Arab Emirates, Saudi Arabia" },
  { region: "North America", countries: "United States" },
];
