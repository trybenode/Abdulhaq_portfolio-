import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/"],
    },
    sitemap: "https://abdulhaq.trybenode.online/sitemap.xml",
    host: "https://abdulhaq.trybenode.online",
  }
}
