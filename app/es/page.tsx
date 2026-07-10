import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Strip } from "@/components/sections/strip";
import { Services } from "@/components/sections/services";
import { Trades } from "@/components/sections/trades";
import { Pillars } from "@/components/sections/pillars";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";
import { Contact } from "@/components/sections/contact";
import { CareersForm } from "@/components/sections/careers-form";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";

const TITLE = translations.es["meta.title"];
const DESCRIPTION = translations.es["meta.description"];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es",
    languages: { "pt-PT": "/", "es-ES": "/es", "x-default": "/" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/es",
    locale: "es_ES",
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function HomeEs() {
  return (
    <I18nProvider fixedLang="es">
      <SiteHeader />
      <main id="top">
        <Hero />
        <About />
        <Strip />
        <Services />
        <Trades />
        <Pillars />
        <Projects />
        <Process />
        <CtaBand />
        <Contact />
        <CareersForm />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
