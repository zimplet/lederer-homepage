import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

const BASE_URL = "https://lederer-elastic.de";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/unternehmen", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/produkte", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/kompetenz", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/karriere", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/kontakt", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/impressum", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.flatMap(({ path, priority, changeFrequency }) => [
    // DE (default, no prefix)
    {
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          de: `${BASE_URL}${path}`,
          en: `${BASE_URL}/en${path}`,
        },
      },
    },
  ]);

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        de: `${BASE_URL}/blog/${post.slug}`,
        en: `${BASE_URL}/en/blog/${post.slug}`,
      },
    },
  }));

  return [...staticEntries, ...blogEntries];
}
