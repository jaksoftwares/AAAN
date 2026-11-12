// Every AAAN figure used on the site, in one place.
// Source: "AAAN Website Content (English).md" (decision D1, 12 Nov 2026).
// Change a figure here and it changes everywhere. Do not type figures into pages.

export const facts = {
  foundedYear: 2015,
  headOffice: { city: "Nairobi", country: "Kenya", area: "Upper Hill" },
  farmersInNetwork: "12,000+",
  womenFarmersShare: "42%",
  cooperativesAndGroups: "160+",
  farmersTrainedSince2015: "28,000+",
  seedlingsSinceFounding: "15 million",
  seedlingsPerYear: "2.5 million+",
  certifiedSeedPotatoesPerYear: "2,000 tonnes",
  tonnesHandledPerYear: "55,000",
  tonnesExportedPerYear: "30,000+",
  exportCountries: "15",
  sites: "17",
  nurseries: "6",
  processingFacilities: "5",
  hectaresSupported: "18,000+",
  averageYieldIncrease: "35%",
  directEmployees: "420+",
  seasonalJobsPerYear: "2,000+",
  milkLitresPerDay: "25,000",
  countries: ["Kenya", "Ghana", "Côte d'Ivoire"],
} as const;

export const taglines = {
  primary: "From African Soil to Global Tables.",
  export: "Seed to Shelf. Africa to the World.",
  corporate: "Advancing Africa's Harvest",
  farmers: "Better Seeds. Better Harvests. Better Lives.",
} as const;

export const yearsOperating = new Date().getFullYear() - facts.foundedYear;
