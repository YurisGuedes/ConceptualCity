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

const TITLE = `${translations.pt["svc1.h3"]} | Conceptual City`;
const DESCRIPTION = translations.pt["svcpage1.intro"];
const PATH = ROUTES.maoDeObra.pt;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.maoDeObra.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.maoDeObra.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.maoDeObra.pt}`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function MaoDeObraQualificadaPage() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader currentRoute="maoDeObra" />
      <main>
        <ServiceDetail index={1} />
        <CtaBand />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
