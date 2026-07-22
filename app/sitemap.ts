import type { MetadataRoute } from "next";
import { getRequestContext } from "@/lib/request-context";
import { DOMAIN_ORIGINS } from "@/lib/site-config";
import { ROUTES, ALL_ROUTE_KEYS, LEGAL_ROUTE_KEYS_LIST, type RouteKey } from "@/lib/routes";
import { client } from "@/sanity/lib/client";
import { ALL_POST_SLUGS_QUERY } from "@/sanity/lib/queries";

const PRIORITIES: Partial<Record<RouteKey, number>> = {
  home: 1,
  servicos: 0.9,
  quemSomos: 0.8,
  projetos: 0.8,
  contacto: 0.8,
  maoDeObra: 0.7,
  edificacao: 0.7,
  obraCivil: 0.7,
  servicosAuxiliares: 0.7,
  trabalheConnosco: 0.6,
};

const LEGAL_KEYS: readonly string[] = LEGAL_ROUTE_KEYS_LIST;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { domain, isProduction } = await getRequestContext();
  // R3 (preview never indexable) and .com (a redirect hub with no content
  // of its own, once the Vercel-level redirect exists this is never even
  // requested) both get an empty sitemap.
  if (!isProduction || domain === "com") return [];

  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = ALL_ROUTE_KEYS.map((key) => {
    const route = ROUTES[key];
    const isLegal = LEGAL_KEYS.includes(key);
    return {
      url: `${DOMAIN_ORIGINS[domain]}${route[domain]}`,
      lastModified,
      changeFrequency: isLegal ? ("yearly" as const) : ("monthly" as const),
      priority: PRIORITIES[key] ?? (isLegal ? 0.3 : 0.5),
      alternates: {
        // pt-PT is always the x-default: PT is the primary market, same
        // convention this sitemap used before the domain split.
        languages: {
          "pt-PT": `${DOMAIN_ORIGINS.pt}${route.pt}`,
          "es-ES": `${DOMAIN_ORIGINS.es}${route.es}`,
          "x-default": `${DOMAIN_ORIGINS.pt}${route.pt}`,
        },
      },
    };
  });

  // Blog is PT-only (confirmed decision) — nothing more to add on .es.
  if (domain !== "pt") return staticEntries;

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch<Array<{ slug: string; publishedAt: string }>>(ALL_POST_SLUGS_QUERY);
    blogEntries = [
      { url: `${DOMAIN_ORIGINS.pt}/blog`, lastModified, changeFrequency: "daily", priority: 0.7 },
      ...posts.map((post) => ({
        url: `${DOMAIN_ORIGINS.pt}/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch (err) {
    // A Sanity outage/misconfiguration should cost the sitemap its blog
    // URLs, never the whole sitemap (and every static route's SEO with it).
    console.error("[sitemap] failed to fetch blog slugs, omitting from sitemap", err);
  }

  return [...staticEntries, ...blogEntries];
}
