// Read gateways for content. Pages call these functions, never the content files directly.
// Phase 1: these return the typed arrays in content/. Phase 2: the same functions query Supabase,
// and the return types stay the same.

import { crops, getCrop, type Crop } from "@/content/crops";
import { articles, getArticle, type Article } from "@/content/news";
import { team, boardMembers, executiveTeam, countryManagers, type Person } from "@/content/team";
import { partnerGroups } from "@/content/partners";
import { jobs, type JobPosting } from "@/content/jobs";
import { testimonial, type Testimonial } from "@/content/testimonials";

export function getCrops(): Crop[] {
  return crops;
}
export function getCropBySlug(slug: string): Crop | undefined {
  return getCrop(slug);
}
export function getTeam(): { board: Person[]; executive: Person[]; countryManagers: Person[]; all: Person[] } {
  return { board: boardMembers, executive: executiveTeam, countryManagers, all: team };
}
export function getNews(): Article[] {
  return articles;
}
export function getArticleBySlug(slug: string): Article | undefined {
  return getArticle(slug);
}
export function getPartners() {
  return { groups: partnerGroups };
}
export function getJobs(): JobPosting[] {
  return jobs;
}
export function getTestimonial(): Testimonial {
  return testimonial;
}
