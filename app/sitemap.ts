import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tobgyelglobalxpos.com";

  const routes = [
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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
