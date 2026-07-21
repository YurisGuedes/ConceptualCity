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
import { translations } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.es["meta.title"];
const DESCRIPTION = translations.es["meta.description"];
// Absolute, not relative: this page is still reachable via the .pt host too
// (the /es/* bridge, removed only at the end of the migration per R4) — a
// relative canonical would resolve against whichever host served THIS
// request, producing a broken URL when that host is .pt. Always pointing at
// the real .es domain is correct in both cases.
const PATH = `${DOMAIN_ORIGINS.es}${ROUTES.home.es}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.home.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.home.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.home.pt}`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
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
