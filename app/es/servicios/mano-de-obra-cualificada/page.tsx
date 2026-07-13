import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { ServiceDetail } from "@/components/sections/service-detail";
import { CtaBand } from "@/components/sections/cta-band";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";

const TITLE = `${translations.es["svc1.h3"]} | Conceptual City`;
const DESCRIPTION = translations.es["svcpage1.intro"];
const PATH = "/es/servicios/mano-de-obra-cualificada";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { "pt-PT": "/servicos/mao-de-obra-qualificada", "es-ES": PATH, "x-default": "/servicos/mao-de-obra-qualificada" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "es_ES" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ManoDeObraCualificadaPage() {
  return (
    <I18nProvider fixedLang="es">
      <SiteHeader />
      <main>
        <ServiceDetail index={1} />
        <CtaBand />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
