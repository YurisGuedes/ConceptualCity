import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { About } from "@/components/sections/about";
import { Pillars } from "@/components/sections/pillars";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.es["page.quemsomos.title"];
const DESCRIPTION = translations.es["page.quemsomos.description"];
// Absolute — see app/es/page.tsx for why (still reachable via .pt today).
const PATH = `${DOMAIN_ORIGINS.es}${ROUTES.quemSomos.es}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.quemSomos.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.quemSomos.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.quemSomos.pt}`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "es_ES" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function QuienesSomosPage() {
  return (
    <I18nProvider fixedLang="es">
      <SiteHeader currentRoute="quemSomos" />
      <main>
        <About headingLevel="h1" />
        <Pillars />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
