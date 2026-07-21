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

const TITLE = translations.pt["page.servicos.title"];
const DESCRIPTION = translations.pt["page.servicos.description"];
const PATH = ROUTES.servicos.pt;

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
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ServicosPage() {
  return (
    <I18nProvider fixedLang="pt">
      <BreadcrumbJsonLd
        lang="pt"
        items={[
          { name: translations.pt["nav.home"], path: ROUTES.home.pt },
          { name: translations.pt["nav.services"], path: ROUTES.servicos.pt },
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
