import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projectsData } from "@/lib/projects-data";
import { notes } from "@/lib/notes";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/projects", "/blog", "/learning"].map((route) => ({
      url: new URL(route, site.url).href,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
    })),
    ...projectsData.map((project) => ({
      url: `${site.url}/projects/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...notes
      .filter((note) => note.status === "published")
      .map((note) => ({
        url: `${site.url}/blog/${note.slug}`,
        ...(note.publishedAt
          ? { lastModified: new Date(note.publishedAt) }
          : {}),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
