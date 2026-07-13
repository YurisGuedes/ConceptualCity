// Single source of truth for the deployed URL. Set NEXT_PUBLIC_SITE_URL once a
// custom domain goes live (e.g. https://www.conceptualcity.pt) — until then
// this falls back to an old Vercel deployment URL. This exact fallback silently
// leaked into production once already (every canonical/hreflang/sitemap/robots/
// JSON-LD URL on conceptualcity.pt pointed at a since-deleted Vercel deployment
// for weeks before an SEO audit caught it) — hence the loud warning below rather
// than staying silent a second time.
const FALLBACK_SITE_URL = "https://conceptual-city.vercel.app";

if (!process.env.NEXT_PUBLIC_SITE_URL && process.env.NODE_ENV === "production") {
  console.warn(
    `[site-config] NEXT_PUBLIC_SITE_URL is not set. Falling back to ${FALLBACK_SITE_URL} — ` +
      "this will be published as the canonical domain in metadata, sitemap.xml, robots.txt, " +
      "and JSON-LD. Set NEXT_PUBLIC_SITE_URL in this project's environment variables (see .env.example)."
  );
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, "");

export const SITE_NAME = "Conceptual City";

// Real registered identity (from the sister site's Aviso Legal — see README).
// Sole proprietorship, not a registered company.
export const LEGAL_NAME = "Jesus Lamas Alvarez";
