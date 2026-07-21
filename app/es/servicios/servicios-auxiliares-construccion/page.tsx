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

const TITLE = `${translations.es["svc4.h3"]} | Conceptual City`;
const DESCRIPTION = translations.es["svcpage4.intro"];
// Absolute — see app/es/page.tsx for why (still reachable via .pt today).
const PATH = `${DOMAIN_ORIGINS.es}${ROUTES.servicosAuxiliares.es}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.servicosAuxiliares.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.servicosAuxiliares.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.servicosAuxiliares.pt}`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "es_ES" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ServiciosAuxiliaresConstruccionPage() {
  return (
    <I18nProvider fixedLang="es">
      <SiteHeader currentRoute="servicosAuxiliares" />
      <main>
        <ServiceDetail index={4} />
        <CtaBand />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
