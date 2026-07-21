import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveDomainFromHost } from "@/lib/domain";
import { ES_REWRITE_MAP } from "@/lib/routes";

// Infra paths that must reach their own route/handler regardless of domain —
// app/robots.ts, app/sitemap.ts etc. already return host-aware content
// themselves (see lib/request-context.ts), they just can't be rewritten away.
// icon/apple-icon are served at these exact paths (no extension, a query
// string carries the hash) per Next's file-convention icon routes.
const ES_PASSTHROUGH = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icon",
  "/apple-icon",
]);

// Next.js 16 renamed the `middleware` file convention to `proxy` — this is
// not the old middleware.ts under a new name by mistake, it's the current
// API (node_modules/next/dist/docs/.../proxy.md).
export function proxy(request: NextRequest) {
  const domain = resolveDomainFromHost(request.headers.get("host"));

  // .pt and .com serve the existing app/ tree completely unrewritten — it
  // already matches the .pt target structure 1:1, and .com's own
  // redirect-to-.pt happens at the Vercel domain level, not here.
  if (domain !== "es") return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/") || ES_PASSTHROUGH.has(pathname)) return NextResponse.next();

  const internalPath = ES_REWRITE_MAP[pathname];
  if (internalPath) return NextResponse.rewrite(new URL(internalPath, request.url));

  // Strict allow-list: anything not in the map — a PT-shaped slug, or a
  // direct hit on the internal /es/... route this same rewrite normally
  // hides — 404s instead of accidentally rendering PT content on .es.
  // "/__es_404__" is not a real route on purpose, so this always 404s.
  return NextResponse.rewrite(new URL("/__es_404__", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|img/).*)"],
};
