import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { ServiceDetail } from "@/components/sections/service-detail";
import { CtaBand } from "@/components/sections/cta-band";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = `${translations.pt["svc3.h3"]} | Conceptual City`;
const DESCRIPTION = translations.pt["svcpage3.intro"];
const PATH = ROUTES.obraCivil.pt;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.obraCivil.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.obraCivil.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.obraCivil.pt}`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ObraCivilPage() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader currentRoute="obraCivil" />
      <main>
        <ServiceDetail index={3} />
        <CtaBand />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
