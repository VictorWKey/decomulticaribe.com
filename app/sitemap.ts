import type { MetadataRoute } from "next";

import { locales } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `https://decomulticaribe.com/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "es" ? 1 : 0.9,
  }));
}