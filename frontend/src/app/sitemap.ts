import type { MetadataRoute } from "next";

import { fallbackData } from "@/lib/fallbackData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    ...fallbackData.projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
