import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Projects } from "@/components/sections/projects";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";

const TITLE = translations.pt["page.projetos.title"];
const DESCRIPTION = translations.pt["page.projetos.description"];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projetos",
    languages: { "pt-PT": "/projetos", "es-ES": "/es/proyectos", "x-default": "/projetos" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/projetos", locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ProjetosPage() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader />
      <main>
        <Projects headingLevel="h1" />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
