// A blog post slug lives at the domain root (e.g. /como-contratar-pladuristas),
// sharing the same namespace as every other top-level app/ route. Next.js
// always resolves a static folder over a dynamic [slug] sibling, so a post
// slug matching one of these would never 404 — it would just be silently
// unreachable, with no error anywhere. Blocked here instead, loudly, at
// authoring time in the Studio (see the slug field validation in postType.ts).
export const RESERVED_SLUGS = [
  // real top-level app/ route folders
  "servicos",
  "contacto",
  "projetos",
  "quem-somos",
  "trabalhe-connosco",
  "aviso-legal",
  "privacidade",
  "politica-de-cookies",
  "declaracao-de-acessibilidade",
  "es",
  // this feature's own routes
  "blog",
  "admin",
  "studio",
  "api",
  // file-convention / infra paths
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
  "manifest.webmanifest",
  "icon",
  "apple-icon",
  "img",
  "_next",
];
