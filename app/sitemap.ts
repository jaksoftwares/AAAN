import type { MetadataRoute } from "next";
import { crops } from "@/content/crops";
import { articles } from "@/content/news";
import { whatWeDoPages } from "@/content/what-we-do";
import { site } from "@/content/site";

// Sitemap for the English site. Phase 2 adds /fr entries with hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticPaths = [
    "/en",
    "/en/about",
    "/en/about/leadership",
    "/en/what-we-do",
    ...whatWeDoPages.map((p) => `/en/what-we-do/${p.slug}`),
    "/en/crops",
    ...crops.map((c) => `/en/crops/${c.slug}`),
    "/en/where-we-operate",
    "/en/sustainability",
    "/en/quality",
    "/en/partners",
    "/en/join",
    "/en/contact",
    "/en/request-a-quote",
    "/en/careers",
    "/en/news",
    ...articles.map((a) => `/en/news/${a.slug}`),
    "/en/privacy",
    "/en/cookies",
    "/en/terms",
  ];
  return staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/en/news" || path === "/en" ? "weekly" : "monthly",
    priority: path === "/en" ? 1 : 0.7,
  }));
}
