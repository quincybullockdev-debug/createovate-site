import type { MetadataRoute } from "next";

// A list of this site's pages, so search engines can find them.
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-10-04");
  return [
    { url: "https://createovate.io", lastModified: updated },
    { url: "https://createovate.io/privacy", lastModified: updated },
    { url: "https://createovate.io/terms", lastModified: updated },
  ];
}
