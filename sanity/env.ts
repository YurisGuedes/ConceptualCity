// Shared by the Sanity client (sanity/lib/client.ts) and the embedded Studio
// config (sanity.config.ts) so they can never drift apart on which
// project/dataset they point at.
//
// Deliberately doesn't throw when unset — this blog is being added to an
// already-live site. A missing/wrong value should degrade to "the blog
// routes fail gracefully" (see the try/catch in app/sitemap.ts and
// generateStaticParams in app/[slug]/page.tsx), never "the whole site
// fails to build" just because the CMS side isn't configured yet.
export const apiVersion = "2026-01-01";

if ((!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) && process.env.NODE_ENV === "production") {
  console.warn(
    "[sanity/env] NEXT_PUBLIC_SANITY_PROJECT_ID and/or NEXT_PUBLIC_SANITY_DATASET are not set — " +
      "/blog and every article page will fail to fetch content until these are configured."
  );
}

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
// createClient()/defineConfig() both throw synchronously (at import time,
// not fetch time) on an empty projectId — an actual placeholder string is
// needed so importing this module never crashes the build. A request
// against this fake project fails at fetch time instead, which every
// caller already handles (try/catch in app/sitemap.ts and
// generateStaticParams, notFound() in app/[slug]/page.tsx).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
