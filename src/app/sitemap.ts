import type { MetadataRoute } from "next";
import { getAllVillas } from "@/data/villas";
import { getAllPosts } from "@/data/posts";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/villas", priority: 0.9 },
    { path: "/destinations", priority: 0.8 },
    { path: "/magazine", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  const villaRoutes = getAllVillas().map((villa) => ({
    url: `${siteUrl}/villas/${villa.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteUrl}/magazine/${post.slug}`,
    lastModified: new Date(post.isoDate),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...villaRoutes, ...postRoutes];
}
