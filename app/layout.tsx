import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-context";
import { ScrollEffects } from "@/components/scroll-effects";
import { StructuredData } from "@/components/structured-data";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const TITLE = "Conceptual City — Mão de obra qualificada para construção | Portugal e Espanha";
const DESCRIPTION =
  "Equipas profissionais especializadas para construção, obra civil e infraestrutura em Portugal e Espanha. Integração rápida, mobilidade e organização.";

// Base/fallback metadata — "/" (app/page.tsx) and "/es" (app/es/page.tsx)
// each export their own `metadata` on top of this (title/description/OG in
// the right language, canonical + hreflang alternates). Legal pages don't
// override, so they inherit this PT-default and patch <title>/description
// client-side instead (see lib/i18n-context.tsx) — known limitation, low
// priority since those pages don't carry much SEO weight.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
    languages: { "pt-PT": "/", "es-ES": "/es", "x-default": "/" },
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
        </I18nProvider>
      </body>
    </html>
  );
}
