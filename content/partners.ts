// Institutions AAAN works with, in the four logo-wall groups of "AAAN Website Content (English).md", section 9.
// Shown by name. Logos are added only when each partner has given permission.

export type PartnerGroup = {
  heading: string;
  names: string[];
};

export const partnerGroups: PartnerGroup[] = [
  {
    heading: "Government",
    names: [
      "Ministry of Agriculture and Livestock Development (Kenya)",
      "Nyandarua County Government",
      "Ministry of Food and Agriculture, MoFA (Ghana)",
      "Ministère de l'Agriculture et du Développement Rural (Côte d'Ivoire)",
      "Agriculture and Food Authority (AFA)",
      "Kenya Dairy Board",
      "KEBS",
      "KEPHIS",
      "Ghana Cocoa Board (COCOBOD)",
      "Tree Crops Development Authority",
      "Ghana FDA",
      "Ghana Standards Authority",
      "Plant Protection and Regulatory Services Directorate, PPRSD (Ghana)",
      "Conseil du Café-Cacao",
      "Conseil du Coton et de l'Anacarde",
      "National seed services (Côte d'Ivoire)",
      "Kenya Export Promotion and Branding Agency, KEPROBA",
      "Ghana Export Promotion Authority, GEPA",
      "ANADER (rural development and extension)",
    ],
  },
  {
    heading: "Research",
    names: [
      "Kenya Agricultural and Livestock Research Organization (KALRO)",
      "Cocoa Research Institute of Ghana (CRIG)",
      "CSIR Crops Research Institute",
      "CSIR Oil Palm Research Institute",
      "Centre National de Recherche Agronomique (CNRA)",
    ],
  },
  {
    heading: "Universities",
    names: [
      "Egerton University",
      "JKUAT",
      "University of Nairobi",
      "KNUST",
      "University of Ghana",
      "INP-HB Yamoussoukro",
      "Université Félix Houphouët-Boigny",
    ],
  },
  {
    heading: "International partners",
    names: [
      "FAO",
      "IFAD",
      "African Development Bank",
      "AGRA",
      "IITA (cassava, yam, plantain and banana research)",
      "International Potato Center (CIP)",
      "World Cocoa Foundation",
      "Rainforest Alliance",
    ],
  },
];
