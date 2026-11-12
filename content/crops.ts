// The twelve crops and products. Source: "AAAN Website Content (English).md", sections 5 and 6.

export type CropFamily =
  | "Tree crops"
  | "Root crops"
  | "Fruit"
  | "Grains"
  | "Highland and dairy"
  | "Vegetables";

export type Crop = {
  slug: string;
  name: string;
  family: CropFamily;
  tag: "Fresh" | "Processed" | "Fresh and processed";
  title: string;
  subline: string;
  atAGlance: { label: string; value: string }[];
  fromOurFarms: string;
  products: { name: string; detail?: string }[];
  note?: string;
  image: string;
  imageAlt: string;
  video?: { src: string; alt: string };
  seo: { title: string; description: string };
};

export const crops: Crop[] = [
  {
    slug: "cocoa",
    name: "Cocoa",
    family: "Tree crops",
    tag: "Fresh and processed",
    title: "Cocoa from the heart of the world's cocoa belt.",
    subline: "Traceable, deforestation-free cocoa beans and cocoa products from Ghana and Côte d'Ivoire.",
    atAGlance: [
      { label: "Hubs", value: "Sefwi Wiawso and Kumasi (Ghana); San-Pédro and Soubré (Côte d'Ivoire)" },
      { label: "Main crop", value: "October to March; mid-crop May to August" },
      { label: "Markets", value: "Europe, USA" },
      { label: "Certifications", value: "Rainforest Alliance, Fairtrade, organic, EUDR-ready traceability" },
    ],
    fromOurFarms:
      "Our cocoa starts in our nurseries, with high-yield seedlings for farmers who are renewing old trees. Every partner farm is GPS-mapped, so we can show that no cocoa comes from cleared forest. Beans are fermented for six days under banana leaves, sun-dried on raised tables, and checked for moisture and bean count before they are bagged. In San-Pédro we process part of the harvest into cocoa liquor, butter and powder.",
    products: [
      { name: "Cocoa beans", detail: "Grade 1, fermented and sun-dried, moisture 7.5% or less, jute bags" },
      { name: "Cocoa liquor", detail: "25 kg blocks" },
      { name: "Natural cocoa butter", detail: "25 kg cartons" },
      { name: "Cocoa powder", detail: "Natural and alkalised, 10 to 12% fat, 25 kg bags" },
      { name: "Cocoa nibs", detail: "Roasted, vacuum-packed" },
    ],
    note: "We do not allow child labour on any farm in our network. Every cooperative is monitored and supported to keep children in school.",
    image: "/media/close-up-of-an-adult-ghanaian-cocoa-farmer-s-hands.png",
    imageAlt: "Close-up of a cocoa farmer's hands holding dried cocoa beans",
    video: { src: "/media/cocoa-pod-harvest.mp4", alt: "Harvesting cocoa pods on a farm" },
    seo: {
      title: "Cocoa Beans and Products from Ghana and Côte d'Ivoire",
      description:
        "Traceable, deforestation-free cocoa beans, liquor, butter and powder from AAAN's farmer network in West Africa's cocoa belt.",
    },
  },
  {
    slug: "cashew-nuts",
    name: "Cashew nuts",
    family: "Tree crops",
    tag: "Fresh and processed",
    title: "Cashew, shelled and graded where it grows.",
    subline: "Raw cashew nuts and premium kernels from Côte d'Ivoire, Ghana and the Kenyan coast.",
    atAGlance: [
      { label: "Hubs", value: "Korhogo and Bouaké (Côte d'Ivoire); Techiman (Ghana); Mombasa coast (Kenya)" },
      { label: "Season", value: "February to May in West Africa; September to January in Kenya" },
      { label: "Markets", value: "Europe, USA, Middle East" },
      { label: "Certifications", value: "Fairtrade, organic, HACCP-based food safety for kernels" },
    ],
    fromOurFarms:
      "Cashew farmers in our network collect nuts as they fall, dry them well and sell to us at agreed grades. Every lot is cut-tested for kernel outturn before purchase. Since 2026, our Bouaké plant shells, peels and grades kernels, so that more of cashew's value stays in Côte d'Ivoire.",
    products: [
      { name: "Raw cashew nuts", detail: "Graded by kernel outturn, 80 kg jute bags" },
      { name: "Cashew kernels", detail: "W180, W240, W320 and W450, plus splits and pieces, vacuum packs in 22.68 kg (50 lb) cartons" },
      { name: "Roasted cashews", detail: "Salted and plain, retail and bulk" },
      { name: "Cashew apple juice", detail: "Seasonal" },
    ],
    image: "/media/a-small-heap-of-whole-white-cashew-kernels-with-on.png",
    imageAlt: "A heap of whole white cashew kernels",
    video: { src: "/media/cashew-nut-harvest.mp4", alt: "Cashew nut harvest" },
    seo: {
      title: "Cashew Nuts and Kernels · Côte d'Ivoire and Ghana",
      description:
        "Raw cashew nuts and W180 to W450 kernels, processed in Bouaké and sourced from AAAN farmers in Côte d'Ivoire, Ghana and Kenya.",
    },
  },
  {
    slug: "oil-palm",
    name: "Oil palm",
    family: "Tree crops",
    tag: "Processed",
    title: "Palm oil, produced responsibly.",
    subline: "Crude and refined palm oil and kernel products from Ghana and Côte d'Ivoire.",
    atAGlance: [
      { label: "Hubs", value: "Eastern Region (Ghana); Aboisso (Côte d'Ivoire)" },
      { label: "Season", value: "All year, with a peak from March to June" },
      { label: "Markets", value: "West Africa, Europe" },
      { label: "Certifications", value: "RSPO, EUDR-ready traceability" },
    ],
    fromOurFarms:
      "We work with smallholder oil palm growers on existing farmland, never on newly cleared forest. Fresh fruit bunches reach the mill within 24 hours of harvest, which keeps free fatty acids low and quality high.",
    products: [
      { name: "Crude palm oil (CPO)", detail: "Free fatty acids 5% or less, in flexitanks or drums" },
      { name: "Refined palm olein", detail: "For food manufacturing and retail" },
      { name: "Palm kernel oil" },
      { name: "Palm kernel cake", detail: "For animal feed" },
    ],
    image: "/media/a-fresh-oil-palm-fruit-bunch-with-glossy-red-orang.png",
    imageAlt: "A fresh oil palm fruit bunch",
    seo: {
      title: "Oil Palm from Ghana and Côte d'Ivoire · AAAN",
      description:
        "Crude and refined palm oil and kernel products from AAAN's oil palm growers in Ghana and Côte d'Ivoire, grown on existing farmland.",
    },
  },
  {
    slug: "cassava",
    name: "Cassava",
    family: "Root crops",
    tag: "Fresh and processed",
    title: "Cassava, from staple to stable income.",
    subline: "Fresh cassava and processed cassava foods from Ghana and Côte d'Ivoire.",
    atAGlance: [
      { label: "Hubs", value: "Kumasi (Ghana); Bouaké (Côte d'Ivoire)" },
      { label: "Season", value: "All year" },
      { label: "Markets", value: "West Africa, plus African food stores in Europe and the USA" },
      { label: "Standards", value: "HACCP-based processing; Ghana FDA registered" },
    ],
    fromOurFarms:
      "Cassava feeds millions, but fresh roots spoil within two days of harvest. We give farmers clean, disease-free cuttings and buy their roots for processing the same day, turning a perishable crop into products with a long shelf life.",
    products: [
      { name: "Gari", detail: "White and yellow, fine and coarse, in 1 kg, 5 kg and 25 kg bags" },
      { name: "High-quality cassava flour", detail: "For bakeries and food manufacturers" },
      { name: "Cassava starch", detail: "Food grade" },
      { name: "Attieké", detail: "Fresh and dried, from Côte d'Ivoire" },
    ],
    image: "/media/three-fresh-cassava-roots-one-cut-to-show-white-fl.png",
    imageAlt: "Fresh cassava roots, one cut to show the white flesh",
    seo: {
      title: "Cassava from Ghana and Côte d'Ivoire · AAAN",
      description:
        "Gari, cassava flour and starch from AAAN's processing plants in Kumasi and Bouaké, made from farmer-grown cassava.",
    },
  },
  {
    slug: "yams",
    name: "Yams",
    family: "Root crops",
    tag: "Fresh and processed",
    title: "West Africa's yams, for kitchens around the world.",
    subline: "Export-grade yams and yam flour from Ghana and Côte d'Ivoire.",
    atAGlance: [
      { label: "Hubs", value: "Techiman (Ghana); Bouaké (Côte d'Ivoire)" },
      { label: "Season", value: "August to December, stored for supply all year" },
      { label: "Markets", value: "United Kingdom, Europe, USA" },
      { label: "Certifications", value: "GlobalG.A.P." },
    ],
    fromOurFarms:
      "Our farmers grow yam from improved seed yams, staked and mulched for bigger, cleaner tubers. At our Techiman yard, each tuber is cleaned, graded, wrapped and packed for its journey.",
    products: [
      { name: "Fresh yams", detail: "White yam (Pona and Laribako) and water yam, 1.5 to 3 kg tubers, 25 kg cartons" },
      { name: "Yam flour (elubo)" },
      { name: "Yam chips", detail: "Dried" },
    ],
    image: "/media/two-large-whole-white-yam-tubers-and-one-slice-sho.png",
    imageAlt: "Two large white yam tubers and a cut slice",
    seo: {
      title: "Yams from Ghana and Côte d'Ivoire · AAAN",
      description:
        "Export-grade white and water yams, yam flour and yam chips from AAAN's yards in Techiman and Bouaké.",
    },
  },
  {
    slug: "plantains",
    name: "Plantains",
    family: "Fruit",
    tag: "Fresh and processed",
    title: "Plantains, a West African staple.",
    subline: "Fresh plantains and plantain products from Ghana and Côte d'Ivoire.",
    atAGlance: [
      { label: "Hubs", value: "Kumasi (Ghana); Aboisso and Bonoua (Côte d'Ivoire)" },
      { label: "Season", value: "All year" },
      { label: "Markets", value: "West Africa, Europe, USA" },
    ],
    fromOurFarms:
      "Our plantains grow from tissue-culture plantlets, which are free of the pests and diseases that cut yields. Many are grown as shade for young cocoa, so one farm earns from two crops.",
    products: [
      { name: "Fresh plantains", detail: "Green and ripe" },
      { name: "Plantain chips" },
      { name: "Plantain flour" },
    ],
    image: "/media/a-hand-of-green-plantains-with-one-ripe-yellow-pla.png",
    imageAlt: "A hand of green plantains with one ripe yellow plantain",
    seo: {
      title: "Plantains from Ghana and Côte d'Ivoire · AAAN",
      description:
        "Fresh plantains, plantain chips and plantain flour from AAAN's farms in Ghana and Côte d'Ivoire.",
    },
  },
  {
    slug: "bananas",
    name: "Bananas",
    family: "Fruit",
    tag: "Fresh and processed",
    title: "Bananas, clean from the plantlet to the box.",
    subline: "Export dessert bananas from Côte d'Ivoire and Kenya.",
    atAGlance: [
      { label: "Hubs", value: "Aboisso and Bonoua (Côte d'Ivoire); Meru and Kirinyaga (Kenya)" },
      { label: "Season", value: "All year" },
      { label: "Markets", value: "Europe, Middle East, East Africa" },
      { label: "Certifications", value: "GlobalG.A.P., Rainforest Alliance" },
    ],
    fromOurFarms:
      "Every plantation starts from tissue-culture plantlets raised in our nurseries. Bunches are bagged on the plant to protect the fruit, then washed, graded and boxed in our packhouses within hours of harvest.",
    products: [
      { name: "Fresh dessert bananas", detail: "In 18 kg export cartons" },
      { name: "Banana flour" },
      { name: "Dried banana" },
      { name: "Banana puree" },
    ],
    image: "/media/a-hand-of-ripe-yellow-bananas-centred-on-a-plain-i.png",
    imageAlt: "A hand of ripe yellow bananas",
    video: { src: "/media/banana-tissue-culture-lab.mp4", alt: "Banana tissue culture laboratory" },
    seo: {
      title: "Bananas from Côte d'Ivoire and Kenya · AAAN",
      description:
        "Export dessert bananas and banana products from tissue-culture plantations in Côte d'Ivoire and Kenya, GlobalG.A.P. and Rainforest Alliance.",
    },
  },
  {
    slug: "pineapples",
    name: "Pineapples",
    family: "Fruit",
    tag: "Fresh and processed",
    title: "Sweet pineapples from three countries.",
    subline: "Fresh export pineapples and pineapple products from Ghana, Côte d'Ivoire and Kenya.",
    atAGlance: [
      { label: "Hubs", value: "Eastern Region (Ghana); Bonoua (Côte d'Ivoire); Murang'a and Thika (Kenya)" },
      { label: "Season", value: "All year, with planned flowering" },
      { label: "Markets", value: "Europe, Middle East" },
      { label: "Certifications", value: "GlobalG.A.P., Rainforest Alliance" },
    ],
    fromOurFarms:
      "We grow MD2 and Smooth Cayenne varieties and harvest each field at the right ripeness for its destination, by sea or by air.",
    products: [
      { name: "Fresh pineapples", detail: "In export cartons" },
      { name: "Pineapple juice" },
      { name: "Dried pineapple" },
      { name: "Pineapple concentrate" },
    ],
    image: "/media/one-whole-ripe-golden-pineapple-with-green-crown-s.png",
    imageAlt: "A whole ripe golden pineapple with a green crown",
    seo: {
      title: "Pineapples from Ghana, Côte d'Ivoire and Kenya · AAAN",
      description:
        "Fresh export pineapples and pineapple juice, dried pineapple and concentrate from three AAAN growing regions.",
    },
  },
  {
    slug: "maize",
    name: "Maize",
    family: "Grains",
    tag: "Fresh and processed",
    title: "Maize that feeds the region.",
    subline: "Grain, certified seed and fortified flour from Kenya, Ghana and Côte d'Ivoire.",
    atAGlance: [
      { label: "Hubs", value: "Kitale (Kenya); Techiman (Ghana); Bouaké (Côte d'Ivoire)" },
      { label: "Season", value: "Main harvest August to December in Kenya; July to October in West Africa" },
      { label: "Markets", value: "East and West Africa" },
    ],
    fromOurFarms:
      "Maize is the food on most tables in our countries. We supply certified seed, dry and store grain properly, and test every lot for moisture and aflatoxin before it leaves our stores.",
    products: [
      { name: "White and yellow maize grain", detail: "90 kg bags" },
      { name: "Certified maize seed" },
      { name: "Fortified maize flour", detail: "2 kg and 25 kg packs" },
      { name: "Animal feed" },
    ],
    image: "/media/tall-maize-field-at-golden-hour-in-kitale-kenya-ba.png",
    imageAlt: "A tall maize field at golden hour in Kitale",
    seo: {
      title: "Maize from Kenya, Ghana and Côte d'Ivoire · AAAN",
      description:
        "White and yellow maize, certified maize seed and fortified maize flour from AAAN's stores in Kenya, Ghana and Côte d'Ivoire.",
    },
  },
  {
    slug: "irish-potatoes",
    name: "Irish potatoes",
    family: "Highland and dairy",
    tag: "Fresh and processed",
    title: "Where AAAN began: potatoes from Nyandarua.",
    subline: "Certified seed potatoes and quality ware potatoes from the Kenyan highlands.",
    atAGlance: [
      { label: "Hubs", value: "Ol Kalou and Kinangop, Nyandarua (Kenya)" },
      { label: "Season", value: "Two crops a year" },
      { label: "Markets", value: "Kenya and East Africa" },
      { label: "Certification", value: "Seed certified by KEPHIS" },
    ],
    fromOurFarms:
      "Potatoes are where our story started in 2015. Our Nyandarua nursery multiplies clean seed of high-yield varieties such as Shangi and Markies. Farmers who plant it harvest far more than with saved seed.",
    products: [
      { name: "Certified seed potatoes", detail: "2,000 tonnes a year" },
      { name: "Ware potatoes", detail: "Graded and bagged" },
      { name: "Crisps and fries", detail: "Through processing partners" },
      { name: "Potato flour" },
    ],
    image: "/media/a-small-group-of-fresh-clean-potatoes-one-cut-in-h.png",
    imageAlt: "A small group of fresh clean potatoes, one cut in half",
    video: { src: "/media/seed-potato-storage-barn.mp4", alt: "Seed potatoes stored in a barn" },
    seo: {
      title: "Certified Seed Potatoes Kenya · AAAN Nyandarua",
      description:
        "KEPHIS-certified seed potatoes and quality ware potatoes from AAAN's Nyandarua highlands network in Kenya.",
    },
  },
  {
    slug: "dairy",
    name: "Dairy",
    family: "Highland and dairy",
    tag: "Processed",
    title: "Fresh milk from the Kenyan highlands.",
    subline: "Milk, yoghurt and ghee from our Kinangop dairy centre.",
    atAGlance: [
      { label: "Hub", value: "Kinangop, Nyandarua (Kenya)" },
      { label: "Collection", value: "Every morning and evening" },
      { label: "Markets", value: "Kenya and East Africa" },
      { label: "Standards", value: "Kenya Dairy Board licensed; KEBS approved products" },
    ],
    fromOurFarms:
      "Every day, 25,000 litres of milk arrive at our Kinangop centre from smallholder dairy farmers. Each delivery is tested on arrival and chilled within hours of milking, then processed under strict hygiene.",
    products: [
      { name: "Pasteurised fresh milk" },
      { name: "Yoghurt", detail: "Natural and flavoured" },
      { name: "Ghee" },
      { name: "Bulk chilled milk", detail: "For processors" },
    ],
    image: "/media/early-morning-at-a-rural-milk-collection-centre-in.png",
    imageAlt: "Early morning at a rural milk collection centre",
    seo: {
      title: "Dairy from Kenya · AAAN",
      description:
        "Pasteurised milk, yoghurt and ghee from AAAN's Kinangop dairy centre, with milk collected daily from smallholder farms in Nyandarua.",
    },
  },
  {
    slug: "vegetables",
    name: "Vegetables",
    family: "Vegetables",
    tag: "Fresh and processed",
    title: "Fresh vegetables, grown well and packed with care.",
    subline: "Highland vegetables from Nyandarua for Kenyan, regional and export markets.",
    atAGlance: [
      { label: "Hubs", value: "Ol Kalou (Kenya), with export packing in Nairobi" },
      { label: "Season", value: "All year with irrigation" },
      { label: "Markets", value: "Kenya, East Africa, Europe and the Middle East (air freight)" },
      { label: "Certifications", value: "GlobalG.A.P., KS 1758" },
    ],
    fromOurFarms:
      "Cool highland nights and rich soils grow excellent vegetables. Our farmers plant AAAN seedlings, use drip irrigation, and follow residue-safe spray programmes. Produce is graded and packed in our Nairobi packhouse, often within a day of harvest.",
    products: [
      { name: "Cabbages, carrots, peas, tomatoes, onions and butternut", detail: "Fresh, graded and packed" },
      { name: "Cut and packed vegetables", detail: "For retailers" },
      { name: "Tomato paste" },
      { name: "Dried onion" },
      { name: "Frozen peas" },
    ],
    image: "/media/top-down-drone-photograph-of-neat-rows-of-cabbages.png",
    imageAlt: "Top-down view of neat rows of cabbages",
    seo: {
      title: "Vegetables from Kenya · AAAN",
      description:
        "Fresh, graded and packed highland vegetables from Ol Kalou for Kenyan, East African and European markets.",
    },
  },
];

export const cropFamilies: CropFamily[] = [
  "Tree crops",
  "Root crops",
  "Fruit",
  "Grains",
  "Highland and dairy",
  "Vegetables",
];

export function getCrop(slug: string): Crop | undefined {
  return crops.find((c) => c.slug === slug);
}
