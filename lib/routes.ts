import type { Lang } from "@/lib/translations";

export interface RouteEntry {
  /** External path served on www.conceptualcity.pt. */
  pt: string;
  /** External path served on www.conceptualcity.es (flat, matches the live
   * Beedigital site — must not be renamed without losing its SEO equity). */
  es: string;
  /** Internal App Router path the ES external path rewrites to (proxy.ts).
   * Never expose this in a link, canonical, or sitemap entry. */
  esInternal: string;
}

// Single source of truth for every route pair in the site. Consumed by:
// proxy.ts (rewrite map), site-header.tsx/site-footer.tsx/services.tsx/
// careers-banner.tsx (external links), sitemap.ts, and each page's metadata.
export const ROUTES = {
  home: { pt: "/", es: "/", esInternal: "/es" },
  quemSomos: { pt: "/quem-somos", es: "/quienes-somos", esInternal: "/es/quienes-somos" },
  servicos: { pt: "/servicos", es: "/servicios", esInternal: "/es/servicios" },
  maoDeObra: {
    pt: "/servicos/mao-de-obra-qualificada",
    es: "/mano-de-obra-cualificada",
    esInternal: "/es/servicios/mano-de-obra-cualificada",
  },
  edificacao: {
    pt: "/servicos/edificacao",
    es: "/edificacion",
    esInternal: "/es/servicios/edificacion",
  },
  obraCivil: {
    pt: "/servicos/obra-civil",
    es: "/obra-civil",
    esInternal: "/es/servicios/obra-civil",
  },
  servicosAuxiliares: {
    pt: "/servicos/servicos-auxiliares",
    es: "/servicios-auxiliares-para-construccion",
    esInternal: "/es/servicios/servicios-auxiliares-construccion",
  },
  projetos: { pt: "/projetos", es: "/proyectos", esInternal: "/es/proyectos" },
  contacto: { pt: "/contacto", es: "/contacto", esInternal: "/es/contacto" },
  trabalheConnosco: {
    pt: "/trabalhe-connosco",
    es: "/trabaja-con-nosotros",
    esInternal: "/es/trabaja-con-nosotros",
  },
  avisoLegal: { pt: "/aviso-legal", es: "/aviso-legal", esInternal: "/es/aviso-legal" },
  privacidade: {
    pt: "/privacidade",
    es: "/politica-de-privacidad",
    esInternal: "/es/politica-de-privacidad",
  },
  politicaCookies: {
    pt: "/politica-de-cookies",
    es: "/politica-de-cookies",
    esInternal: "/es/politica-de-cookies",
  },
  acessibilidade: {
    pt: "/declaracao-de-acessibilidade",
    es: "/declaracion-de-accesibilidad",
    esInternal: "/es/declaracion-de-accesibilidad",
  },
} as const satisfies Record<string, RouteEntry>;

export type RouteKey = keyof typeof ROUTES;

// Rewrite table for proxy.ts: external ES path -> internal ES route.
export const ES_REWRITE_MAP: Record<string, string> = Object.fromEntries(
  Object.values(ROUTES).map((r) => [r.es, r.esInternal])
);

// Kept in the same shape as the old lib/service-pages.ts so callers
// (site-header.tsx, site-footer.tsx, careers-banner.tsx) don't need to
// change beyond their import path. "trades" is a same-page anchor on the
// services hub, not a distinct route, so it's derived rather than in ROUTES.
export const PAGE_HREFS = {
  quemSomos: { pt: ROUTES.quemSomos.pt, es: ROUTES.quemSomos.es },
  servicos: { pt: ROUTES.servicos.pt, es: ROUTES.servicos.es },
  trades: { pt: `${ROUTES.servicos.pt}#trades`, es: `${ROUTES.servicos.es}#trades` },
  projetos: { pt: ROUTES.projetos.pt, es: ROUTES.projetos.es },
  contacto: { pt: ROUTES.contacto.pt, es: ROUTES.contacto.es },
  trabalheConnosco: { pt: ROUTES.trabalheConnosco.pt, es: ROUTES.trabalheConnosco.es },
} satisfies Record<string, Record<Lang, string>>;

// Order matches the SERVICES array in components/sections/services.tsx (svc1..svc4).
export const SERVICE_HREFS: Record<Lang, [string, string, string, string]> = {
  pt: [ROUTES.maoDeObra.pt, ROUTES.edificacao.pt, ROUTES.obraCivil.pt, ROUTES.servicosAuxiliares.pt],
  es: [ROUTES.maoDeObra.es, ROUTES.edificacao.es, ROUTES.obraCivil.es, ROUTES.servicosAuxiliares.es],
};

const LEGAL_ROUTE_KEYS = ["avisoLegal", "privacidade", "politicaCookies", "acessibilidade"] as const;

/** Every route that has a real page on both languages (used by sitemap.ts). */
export const ALL_ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];
export const LEGAL_ROUTE_KEYS_LIST = LEGAL_ROUTE_KEYS;
