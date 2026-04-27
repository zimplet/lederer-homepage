import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/"],
      },
    ],
    sitemap: "https://lederer-elastic.de/sitemap.xml",
    host: "https://lederer-elastic.de",
  };
}
