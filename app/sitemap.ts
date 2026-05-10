import type { MetadataRoute } from "next";
import { getStoryTravels } from "@/lib/travel";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const storyTravels = getStoryTravels();

  return [
    {
      url: siteUrl,
      lastModified: new Date()
    },
    ...storyTravels.map((travel) => ({
      url: `${siteUrl}/countries/${travel.slug}`,
      lastModified: new Date()
    }))
  ];
}
