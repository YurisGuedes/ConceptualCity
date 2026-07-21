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
import { CareersBanner } from "@/components/sections/careers-banner";
import { I18nProvider } from "@/lib/i18n-context";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: ROUTES.home.pt,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.home.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.home.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.home.pt}`,
    },
  },
};

export default function Home() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader currentRoute="home" />
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
        <CareersBanner />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
