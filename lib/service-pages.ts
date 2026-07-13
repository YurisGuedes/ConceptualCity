import type { Lang } from "@/lib/translations";

// Real per-language routes for the 4 individual service pages (Phase 2
// continued — see README's SEO section). PT uses Portuguese slugs, ES uses
// real Spanish slugs under /es — not the sister site's mistake of Spanish
// slugs under a /pt/ path. Order matches the SERVICES array in
// components/sections/services.tsx (svc1..svc4).
export const SERVICE_HREFS: Record<Lang, [string, string, string, string]> = {
  pt: [
    "/servicos/mao-de-obra-qualificada",
    "/servicos/edificacao",
    "/servicos/obra-civil",
    "/servicos/servicos-auxiliares",
  ],
  es: [
    "/es/servicios/mano-de-obra-cualificada",
    "/es/servicios/edificacion",
    "/es/servicios/obra-civil",
    "/es/servicios/servicios-auxiliares-construccion",
  ],
};

// The other dedicated pages (About/Services-hub/Projects/Contact), per language.
export const PAGE_HREFS = {
  quemSomos: { pt: "/quem-somos", es: "/es/quienes-somos" },
  servicos: { pt: "/servicos", es: "/es/servicios" },
  trades: { pt: "/servicos#trades", es: "/es/servicios#trades" },
  projetos: { pt: "/projetos", es: "/es/proyectos" },
  contacto: { pt: "/contacto", es: "/es/contacto" },
  trabalheConnosco: { pt: "/trabalhe-connosco", es: "/es/trabaja-con-nosotros" },
} satisfies Record<string, Record<Lang, string>>;
