import { headers } from "next/headers";
import { cache } from "react";
import { DOMAIN_ORIGINS } from "@/lib/site-config";
import { resolveDomainFromHost, type Domain } from "@/lib/domain";
import type { Lang } from "@/lib/translations";

export type { Domain };

export interface RequestContext {
  domain: Domain;
  lang: Lang;
  /** Absolute origin metadata/sitemap/robots/JSON-LD should use for this
   * request. .com always resolves to the .pt origin (it's a redirect hub,
   * never a real content source), so callers never need a .com special case. */
  origin: string;
  isProduction: boolean;
}

// React `cache()` de-dupes this per request (headers() is a request-time API,
// so this — and anything that calls it — opts the whole app into dynamic
// rendering; see the plan doc for why that trade-off is accepted here).
export const getRequestContext = cache(async (): Promise<RequestContext> => {
  const hostHeader = (await headers()).get("host");
  const domain = resolveDomainFromHost(hostHeader);
  const lang: Lang = domain === "es" ? "es" : "pt";
  const origin = domain === "com" ? DOMAIN_ORIGINS.pt : DOMAIN_ORIGINS[domain];
  const isProduction = process.env.VERCEL_ENV === "production";
  return { domain, lang, origin, isProduction };
});
