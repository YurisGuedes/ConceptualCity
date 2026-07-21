import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { CareersFormCard } from "@/components/sections/careers-form-card";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.pt["page.trabalheconnosco.title"];
const DESCRIPTION = translations.pt["page.trabalheconnosco.description"];
const PATH = ROUTES.trabalheConnosco.pt;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.trabalheConnosco.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.trabalheConnosco.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.trabalheConnosco.pt}`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function TrabalheConnoscoPage() {
  const t = translations.pt;
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader currentRoute="trabalheConnosco" />
      <main>
        <section className="careers-page-hero">
          <div className="wrap careers-page-inner">
            <div className="careers-page-head reveal">
              <span className="eyebrow">{t["cf.eyebrow"]}</span>
              <h1 className="sec-title" dangerouslySetInnerHTML={{ __html: t["cf.h2"] }} />
              <p>{t["cf.p"]}</p>
            </div>
            <div className="careers-page-form">
              <CareersFormCard />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
