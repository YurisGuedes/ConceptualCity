// Per-domain origins — this project now serves three real domains from one
// deployment (www.conceptualcity.pt, www.conceptualcity.es, and the
// www.conceptualcity.com hub, which always canonicalizes to .pt). Canonical
// tags, hreflang, og:url, sitemap.xml, robots.txt and JSON-LD all need the
// origin of whichever domain served the request — see lib/request-context.ts,
// which resolves that per-request from the Host header and reads these.
//
// Each origin has its own env var (falls back loudly to a hardcoded default
// in production if unset) because a single shared SITE_URL constant is what
// caused conceptualcity.pt's canonical/sitemap/robots/JSON-LD to silently
// point at a dead Vercel preview URL for weeks before an SEO audit caught it
// — see git history on this file. Don't regress that protection.
function resolveOrigin(envVarName: string, value: string | undefined, fallback: string): string {
  if (!value && process.env.NODE_ENV === "production") {
    console.warn(
      `[site-config] ${envVarName} is not set. Falling back to ${fallback} — this will be ` +
        "published as the canonical domain in metadata, sitemap.xml, robots.txt, and JSON-LD " +
        "for this domain. Set it in this project's environment variables (see .env.example)."
    );
  }
  return (value ?? fallback).replace(/\/$/, "");
}

export const DOMAIN_ORIGINS = {
  // NEXT_PUBLIC_SITE_URL (no suffix) is the pre-existing var name already
  // configured in Vercel for .pt — kept as a fallback so this migration
  // doesn't require re-entering it under a new name.
  pt: resolveOrigin(
    "NEXT_PUBLIC_SITE_URL_PT",
    process.env.NEXT_PUBLIC_SITE_URL_PT ?? process.env.NEXT_PUBLIC_SITE_URL,
    "https://www.conceptualcity.pt"
  ),
  es: resolveOrigin("NEXT_PUBLIC_SITE_URL_ES", process.env.NEXT_PUBLIC_SITE_URL_ES, "https://www.conceptualcity.es"),
  com: resolveOrigin(
    "NEXT_PUBLIC_SITE_URL_COM",
    process.env.NEXT_PUBLIC_SITE_URL_COM,
    "https://www.conceptualcity.com"
  ),
} as const;

// Backward-compatible single-origin export for the one remaining consumer
// that isn't domain-aware (the careers notification email template just
// needs *a* working absolute URL for a static logo asset identical on every
// domain — not the requester's domain).
export const SITE_URL = DOMAIN_ORIGINS.pt;

export const SITE_NAME = "Conceptual City";

// Real registered identity (from the sister site's Aviso Legal — see README).
// Sole proprietorship, not a registered company.
export const LEGAL_NAME = "Jesus Lamas Alvarez";
