import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shanemaris.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/about`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/resume`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = portfolioProjects
    .filter((p) => p.public)
    .map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...caseStudyRoutes];
}
