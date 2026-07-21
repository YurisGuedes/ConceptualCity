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

const TITLE = `${translations.pt["svc2.h3"]} | Conceptual City`;
const DESCRIPTION = translations.pt["svcpage2.intro"];
const PATH = ROUTES.edificacao.pt;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.edificacao.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.edificacao.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.edificacao.pt}`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function EdificacaoPage() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader currentRoute="edificacao" />
      <main>
        <ServiceDetail index={2} />
        <CtaBand />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
