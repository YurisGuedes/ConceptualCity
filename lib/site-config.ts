// Single source of truth for the deployed URL. Set NEXT_PUBLIC_SITE_URL once a
// custom domain goes live (e.g. https://www.conceptualcity.com) — until then
// this falls back to the current Vercel deployment URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://conceptual-city.vercel.app").replace(
  /\/$/,
  ""
);

export const SITE_NAME = "Conceptual City";

// Real registered identity (from the sister site's Aviso Legal — see README).
// Sole proprietorship, not a registered company.
export const LEGAL_NAME = "Jesus Lamas Alvarez";
