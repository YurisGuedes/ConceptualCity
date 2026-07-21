import { DOMAIN_ORIGINS } from "@/lib/site-config";
import type { Lang } from "@/lib/translations";

interface Crumb {
  name: string;
  /** Relative, same-domain path (e.g. ROUTES.servicos[lang]). */
  path: string;
}

/** Plain function component (no hooks) — safe to import from either a
 * Server Component page.tsx or a "use client" section like ServiceDetail. */
export function BreadcrumbJsonLd({ lang, items }: { lang: Lang; items: Crumb[] }) {
  const origin = DOMAIN_ORIGINS[lang];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
