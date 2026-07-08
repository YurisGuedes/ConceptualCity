import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-context";
import { ScrollEffects } from "@/components/scroll-effects";

export const metadata: Metadata = {
  title: "Conceptual City — Mão de obra qualificada para construção | Portugal e Espanha",
  description:
    "Equipas profissionais especializadas para construção, obra civil e infraestrutura em Portugal e Espanha. Integração rápida, mobilidade e organização.",
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
