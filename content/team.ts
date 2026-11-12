// Leadership and team. Roles and co-founder profiles: "AAAN Website Content (English).md", section 3.
// Names, qualifications and photographs: "AAAN Leadership Team.xlsx" and the supplied portraits.
// Email addresses are deliberately not included.
// The Kenya country manager is shown as "Joseph Kariuki" per AAAN's confirmation; the spreadsheet
// lists "James Kariuki Njoroge". Confirm the full name before launch.

export type Person = {
  slug: string;
  name: string;
  role: string;
  group: "Board of Directors" | "Executive team" | "Country management";
  office: string;
  qualification: string;
  bio: string;
  photo: string;
  photoAlt: string;
};

export const team: Person[] = [
  {
    slug: "aaron-appiagyei",
    name: "Aaron Appiagyei",
    role: "Co-founder and Managing Director",
    group: "Board of Directors",
    office: "Nairobi, Kenya",
    qualification: "BSc Agricultural Science",
    bio: "Aaron leads AAAN's agronomy, nurseries and farm operations across all three countries. He built the seedling and farmer-training model that AAAN started with in Nyandarua, and he oversees the company's growth into new crops and regions.",
    photo: "/media/aaron1.jpg",
    photoAlt: "Portrait of Aaron Appiagyei",
  },
  {
    slug: "antwi-kingsley",
    name: "Antwi Kingsley",
    role: "Co-founder and Director of Technology and Innovation",
    group: "Board of Directors",
    office: "Nairobi, Kenya",
    qualification: "BSc Information Technology",
    bio: "Antwi built AAAN's digital backbone: farm records, the farmer advisory app, GPS farm mapping and lot traceability. He leads AAAN's work to bring modern data tools to smallholder farming.",
    photo: "/media/kingsley.jpg",
    photoAlt: "Portrait of Antwi Kingsley",
  },
  {
    slug: "margaret-paula",
    name: "Margaret Paula",
    role: "Co-founder and Director of Food Safety and Value Addition",
    group: "Board of Directors",
    office: "Nairobi, Kenya",
    qualification: "BSc Food and Nutrition",
    bio: "Margaret leads AAAN's processing facilities, quality assurance and laboratory testing. She makes sure every product meets the food-safety standards of the markets AAAN serves.",
    photo: "/media/margaret-paula.jpg",
    photoAlt: "Portrait of Margaret Paula",
  },
  {
    slug: "grace-wanjiku-mwangi",
    name: "Grace Wanjiku Mwangi",
    role: "Director of Finance and Investment",
    group: "Executive team",
    office: "Nairobi, Kenya",
    qualification: "BCom Finance; CPA (Kenya)",
    bio: "Leads group finance, investor relations and funding for new facilities.",
    photo: "/media/grace.png",
    photoAlt: "Portrait of Grace Wanjiku Mwangi",
  },
  {
    slug: "koffi-yao-kouassi",
    name: "Koffi Yao Kouassi",
    role: "Director of Trade and Export, Abidjan",
    group: "Executive team",
    office: "Abidjan, Côte d'Ivoire",
    qualification: "MBA, International Trade",
    bio: "Leads buyer relationships, export logistics and AAAN's francophone markets.",
    photo: "/media/koffiyaokouassi.png",
    photoAlt: "Portrait of Koffi Yao Kouassi",
  },
  {
    slug: "esi-mensah-boateng",
    name: "Esi Mensah-Boateng",
    role: "Director of Partnerships and Sustainability",
    group: "Executive team",
    office: "Accra, Ghana",
    qualification: "MSc Environmental Science",
    bio: "Leads partnerships with governments, research institutes and development organisations, as well as certification and impact reporting.",
    photo: "/media/esi-mensah-boateng.png",
    photoAlt: "Portrait of Esi Mensah-Boateng",
  },
  {
    slug: "joseph-kariuki",
    name: "Joseph Kariuki",
    role: "Country Manager, Kenya",
    group: "Country management",
    office: "Nairobi, Kenya",
    qualification: "BSc Agribusiness Management; MBA",
    bio: "Leads Kenya's team of agronomists, extension officers and quality specialists.",
    photo: "/media/joseph-kariuki.png",
    photoAlt: "Portrait of Joseph Kariuki",
  },
];

export const boardMembers = team.filter((p) => p.group === "Board of Directors");
export const executiveTeam = team.filter((p) => p.group === "Executive team");
export const countryManagers = team.filter((p) => p.group === "Country management");
