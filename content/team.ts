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
  // Optional until supplied: the page only shows what AAAN has confirmed.
  qualification?: string;
  bio: string;
  // Optional until the photograph is supplied; the page shows the initials instead.
  photo?: string;
  photoAlt: string;
};

export const team: Person[] = [
  {
    slug: "aaron-appiagyei",
    name: "Aaron Appiagyei",
    role: "Country Director, Kenya",
    group: "Board of Directors",
    office: "Nairobi, Kenya",
    qualification: "BSc Agricultural Science",
    bio: "Aaron leads AAAN's agronomy, nurseries and farm operations in Kenya. He built the seedling and farmer-training model that AAAN started with in Nyandarua, and he oversees the growth of AAAN's Kenyan sites into new crops and regions.",
    photo: "/media/aaron-v2.jpg",
    photoAlt: "Portrait of Aaron Appiagyei",
  },
  {
    slug: "antwi-kingsley",
    name: "Antwi Kingsley",
    role: "Head of ICT, across the group",
    group: "Board of Directors",
    office: "Nairobi, Kenya",
    qualification: "BSc Information Technology",
    bio: "Antwi leads ICT across the whole group. He built AAAN's digital backbone: farm records, the farmer advisory app, GPS farm mapping and lot traceability, and he leads the work to bring modern data tools to smallholder farming.",
    photo: "/media/kingsley.jpg",
    photoAlt: "Portrait of Antwi Kingsley",
  },
  {
    slug: "margaret-paula",
    name: "Margaret Paula",
    role: "Director of Corporate Communications and International Relations",
    group: "Board of Directors",
    office: "Nairobi, Kenya",
    qualification: "BSc Food and Nutrition",
    bio: "Margaret leads AAAN's corporate communications and international relations, sharing the company's story with partners, buyers and the public across the markets AAAN serves.",
    photo: "/media/margaret-v2.jpg",
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
    role: "Country Manager, Ghana",
    group: "Country management",
    office: "Ghana",
    qualification: "BSc Agribusiness Management; MBA",
    bio: "Leads Ghana's team of agronomists, extension officers and quality specialists.",
    photo: "/media/joseph-kariuki.png",
    photoAlt: "Portrait of Joseph Kariuki",
  },
{
  slug: "bruno-comoe",
  name: "Bruno Comoé",
  role: "Country Manager, Côte d'Ivoire",
  group: "Board of Directors",
  office: "Abidjan, Côte d'Ivoire",
  qualification: "Procurement",
  bio: "Bruno leads AAAN's operations in Côte d'Ivoire from Abidjan, working with cocoa, cashew and fruit farmers and cooperatives across the country.",
  photo: "/media/bruno-comoe.png",
  photoAlt: "Portrait of Bruno Comoé",
},
{
  slug: "adjoumani-camara",
  name: "Adjoumani Camara",
  role: "Head of Processing Operations, Côte d'Ivoire",
  group: "Board of Directors",
  office: "Bouaké, Côte d'Ivoire",
  qualification: "BSc Business Management",
  bio: "Adjoumani leads AAAN's processing plants in Côte d'Ivoire, where cocoa and cashew become products ready for export. She oversees production, food safety and the plants' teams.",
  photo: "/media/camara-v2.png",
  photoAlt: "Portrait of Adjoumani Camara",
},
];

export const boardMembers = team.filter((p) => p.group === "Board of Directors");
export const executiveTeam = team.filter((p) => p.group === "Executive team");
export const countryManagers = team.filter((p) => p.group === "Country management");
