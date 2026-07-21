import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Services } from "@/components/sections/services";
import { Trades } from "@/components/sections/trades";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.es["page.servicos.title"];
const DESCRIPTION = translations.es["page.servicos.description"];
// Absolute — see app/es/page.tsx for why (still reachable via .pt today).
const PATH = `${DOMAIN_ORIGINS.es}${ROUTES.servicos.es}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.servicos.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.servicos.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.servicos.pt}`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "es_ES" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ServiciosPage() {
  return (
    <I18nProvider fixedLang="es">
      <BreadcrumbJsonLd
        lang="es"
        items={[
          { name: translations.es["nav.home"], path: ROUTES.home.es },
          { name: translations.es["nav.services"], path: ROUTES.servicos.es },
        ]}
      />
      <SiteHeader currentRoute="servicos" />
      <main>
        <Services headingLevel="h1" />
        <Trades />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
