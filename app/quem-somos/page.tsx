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

const TITLE = translations.pt["page.quemsomos.title"];
const DESCRIPTION = translations.pt["page.quemsomos.description"];
const PATH = ROUTES.quemSomos.pt;

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
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function QuemSomosPage() {
  return (
    <I18nProvider fixedLang="pt">
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
