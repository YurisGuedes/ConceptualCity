import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Projects } from "@/components/sections/projects";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.pt["page.projetos.title"];
const DESCRIPTION = translations.pt["page.projetos.description"];
const PATH = ROUTES.projetos.pt;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.projetos.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.projetos.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.projetos.pt}`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ProjetosPage() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader currentRoute="projetos" />
      <main>
        <Projects headingLevel="h1" />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
