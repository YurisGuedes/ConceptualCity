import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-context";
import { ScrollEffects } from "@/components/scroll-effects";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { StructuredData } from "@/components/structured-data";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const TITLE = "Conceptual City — Mão de obra qualificada para construção | Portugal e Espanha";
const DESCRIPTION =
  "Equipas profissionais especializadas para construção, obra civil e infraestrutura em Portugal e Espanha. Integração rápida, mobilidade e organização.";

// Metadata is currently PT-only (server-rendered, language-independent) — the
// PT/ES toggle only patches <title>/meta description client-side after
// mount (see lib/i18n-context.tsx), so crawlers only ever see the PT version.
// Real per-language <head> output needs the routed pages from SEO Phase 2.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    locale: "pt_PT",
    images: [{ url: "/img/hero-sunset.jpg", width: 1536, height: 864 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/img/hero-sunset.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body>
        <I18nProvider>
          <ScrollEffects />
          {children}
          <WhatsappFab />
        </I18nProvider>
      </body>
    </html>
  );
}
