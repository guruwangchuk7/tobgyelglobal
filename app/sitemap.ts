import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tobgyelglobalxpos.com";

  const staticRoutes = [
    "",
    "/events",
    "/exhibit",
    "/visit",
    "/participants",
    "/partners",
    "/news",
    "/info",
    "/contact",
    "/register",
    "/regulations",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const dynamicEntries = [
    {
      url: `${baseUrl}/events/himalayan-food-trade-innovation-expo-2026`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news/bin-trade-showcase-2027-registration-open`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news/new-international-partnerships-announced`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news/bhutan-next-hub-business-investment`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return [...staticEntries, ...dynamicEntries];
}

