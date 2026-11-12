// Open roles. Empty at launch: the careers page shows the "no open roles" message.
// Phase 2 moves this list into Supabase. Shape kept identical so the page does not change.

export type JobPosting = {
  slug: string;
  title: string;
  country: "Kenya" | "Ghana" | "Côte d'Ivoire" | "Regional";
  department: string;
  jobType: "Full time" | "Part time" | "Seasonal" | "Contract";
  summary: string;
  closes: string; // ISO date
};

export const jobs: JobPosting[] = [];

export const noRolesMessage =
  "No open roles right now. Send us your CV and we will contact you when a role fits.";
