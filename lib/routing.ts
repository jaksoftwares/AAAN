import type { EnquiryInput } from "@/lib/validation";

// Where each enquiry is routed. Source: "AAAN Website Design Specification.md", section 8 (enquiry handling).
// Phase 1 stores the routed team on each row. Staff read the enquiries in Supabase until email alerts exist.

export const TEAMS = {
  tradeAbidjan: "Trade and Export, Abidjan",
  tradeNairobi: "Nairobi trade office",
  partnerships: "Partnerships and Sustainability office",
  finance: "Finance and Investment office",
  communications: "Communications, head office",
  hr: "HR, careers",
  country: "Country office for the chosen hub",
} as const;

export function routeEnquiry(input: Pick<EnquiryInput, "type" | "country">): string {
  switch (input.type) {
    case "quote":
      return input.country === "Kenya" ? TEAMS.tradeNairobi : TEAMS.tradeAbidjan;
    case "partnership":
      return TEAMS.partnerships;
    case "investor":
      return TEAMS.finance;
    case "media":
      return TEAMS.communications;
    case "careers":
      return TEAMS.hr;
    default:
      return TEAMS.communications;
  }
}

export function routeFarmerSignup(country: string): string {
  return `${TEAMS.country}: ${country}`;
}

// Reply targets, in business days, from the same specification table.
export const REPLY_TARGET_DAYS: Record<string, number> = {
  quote: 1,
  partnership: 3,
  investor: 3,
  media: 1,
  careers: 0,
  general: 1,
  farmer: 2,
};
