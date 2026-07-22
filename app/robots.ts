import type { MetadataRoute } from "next";
import { getRequestContext } from "@/lib/request-context";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { origin, isProduction } = await getRequestContext();

  // R3: preview deployments must never be crawlable — duplicate content
  // competing with the real domain once it goes live.
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    // /admin is the embedded Sanity Studio — a CMS login/editor UI, not a
    // page for search engines (also has its own noindex, see app/admin/[[...tool]]/page.tsx).
    rules: { userAgent: "*", allow: "/", disallow: ["/admin"] },
    sitemap: `${origin}/sitemap.xml`,
  };
}
