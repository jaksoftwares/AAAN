import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Allow indexing on the production domain. Staging deployments set ROBOTS_NOINDEX=true to block indexing.
export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  if (process.env.ROBOTS_NOINDEX === "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/en/thank-you"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
