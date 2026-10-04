import type { MetadataRoute } from "next";

// Tells search engines they may read the whole site, and where the sitemap is.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://createovate.io/sitemap.xml",
  };
}
