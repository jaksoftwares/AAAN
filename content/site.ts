// Navigation, offices and contact routes for the public site.

export const site = {
  name: "AAAN",
  fullName: "African Agricultural Advancement Network",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  description:
    "AAAN grows, processes and exports quality produce from Kenya, Ghana and Côte d'Ivoire.",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "About AAAN",
    href: "/en/about",
    children: [
      { label: "Our story and values", href: "/en/about", description: "How it started, and what we believe" },
      { label: "Leadership and team", href: "/en/about/leadership", description: "The people behind the network" },
    ],
  },
  {
    label: "What we do",
    href: "/en/what-we-do",
    children: [
      { label: "Seedlings and nurseries", href: "/en/what-we-do/seedlings" },
      { label: "Farming and technology", href: "/en/what-we-do/farming-and-technology" },
      { label: "Value addition and processing", href: "/en/what-we-do/value-addition" },
      { label: "Export and trade", href: "/en/what-we-do/export-and-trade" },
      { label: "Farmer network and training", href: "/en/what-we-do/farmer-network" },
    ],
  },
  { label: "Crops and products", href: "/en/crops" },
  { label: "Where we operate", href: "/en/where-we-operate" },
  { label: "Sustainability and quality", href: "/en/sustainability" },
  { label: "Partners and buyers", href: "/en/partners" },
  { label: "News", href: "/en/news" },
  { label: "Careers", href: "/en/careers" },
  { label: "Contact", href: "/en/contact" },
];

export const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: "About AAAN", href: "/en/about" },
      { label: "Leadership and team", href: "/en/about/leadership" },
      { label: "Where we operate", href: "/en/where-we-operate" },
      { label: "News", href: "/en/news" },
    ],
  },
  {
    heading: "What we do",
    links: [
      { label: "Seedlings and nurseries", href: "/en/what-we-do/seedlings" },
      { label: "Farming and technology", href: "/en/what-we-do/farming-and-technology" },
      { label: "Value addition", href: "/en/what-we-do/value-addition" },
      { label: "Export and trade", href: "/en/what-we-do/export-and-trade" },
    ],
  },
  {
    heading: "Crops",
    links: [
      { label: "All crops and products", href: "/en/crops" },
      { label: "Cocoa", href: "/en/crops/cocoa" },
      { label: "Cashew nuts", href: "/en/crops/cashew-nuts" },
      { label: "Irish potatoes", href: "/en/crops/irish-potatoes" },
      { label: "Dairy", href: "/en/crops/dairy" },
    ],
  },
  {
    heading: "Work with us",
    links: [
      { label: "Request a quote", href: "/en/request-a-quote" },
      { label: "Partners and buyers", href: "/en/partners" },
      { label: "Join the network", href: "/en/join" },
      { label: "Careers", href: "/en/careers" },
      { label: "Contact", href: "/en/contact" },
    ],
  },
];

export type Office = {
  name: string;
  role: string;
  city: string;
  country: string;
  address?: string;
  // Office phone number. The site-wide main number is MAIN_PHONE below.
  phone?: string;
  altPhones?: string[];
  whatsapp?: string;
  isHeadOffice?: boolean;
};

// Contact numbers supplied by AAAN. The main site number is +233 208 636 267 (Kumasi); the others are additional.
// Côte d'Ivoire numbers are not yet supplied, so that office shows its city only.
export const offices: Office[] = [
  {
    name: "Nairobi",
    role: "Group management and East Africa trade",
    city: "Upper Hill, Nairobi",
    country: "Kenya",
    phone: "+254 702 998 260",
    whatsapp: "https://wa.me/254702998260",
    isHeadOffice: true,
  },
  { name: "Ol Kalou", role: "Central nursery and farmer training centre", city: "Ol Kalou, Nyandarua", country: "Kenya" },
  {
    name: "Kumasi",
    role: "West Africa operations",
    city: "Kumasi",
    country: "Ghana",
    phone: "+233 208 636 267",
    altPhones: ["+233 247 623 975"],
    whatsapp: "https://wa.me/233208636267",
  },
  { name: "Accra", role: "Ghana corporate office", city: "Accra", country: "Ghana" },
  { name: "Abidjan", role: "Francophone hub and export office", city: "Abidjan", country: "Côte d'Ivoire" },
];

export const openingHours = "Monday to Friday, 8:00 to 17:00 local time";

// The main contact number for the whole site (header, error messages, legal pages). The other numbers are additional contacts.
export const MAIN_PHONE = "+233 208 636 267";

// The general email address for enquiries that do not need a form.
export const MAIN_EMAIL = "info@aaan.africa";

// Main WhatsApp line for the site: the same number as MAIN_PHONE.
export const WHATSAPP_URL = "https://wa.me/233208636267";

// The reasons offered on the contact page, in the order of "AAAN Website Content (English).md", section 10.
// "farmer" points visitors to the Join the network form. "investor" is handled through the general route.
export const enquiryReasons = [
  { value: "quote", label: "I want to buy products" },
  { value: "farmer", label: "I am a farmer or cooperative" },
  { value: "partnership", label: "I want to partner with AAAN" },
  { value: "media", label: "I am a journalist" },
  { value: "careers", label: "Careers" },
  { value: "general", label: "Something else" },
] as const;

export type EnquiryType = (typeof enquiryReasons)[number]["value"] | "investor";
