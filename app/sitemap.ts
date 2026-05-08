import type { MetadataRoute } from "next";
import { travels } from "@/data/travels";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date()
    },
    ...travels.map((travel) => ({
      url: `${siteUrl}/countries/${travel.slug}`,
      lastModified: new Date()
    }))
  ];
}
