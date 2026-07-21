import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { ScrollEffects } from "@/components/scroll-effects";
import { StructuredData } from "@/components/structured-data";
import { CookieConsent } from "@/components/cookie-consent";
import { SITE_NAME } from "@/lib/site-config";
import { getRequestContext } from "@/lib/request-context";
import { translations } from "@/lib/translations";
import { consentDefaultsScript } from "@/lib/consent";

// One GTM container per domain — the client can't reuse the Beedigital-managed
// GTM-PKKCH2Q container (no account access), so these are new containers the
// client creates themselves and provides the ID for. Unset = no-op, not an
// error: GoogleTagManager below is only rendered once an ID exists.
const GTM_ID = {
  pt: process.env.NEXT_PUBLIC_GTM_ID_PT,
  es: process.env.NEXT_PUBLIC_GTM_ID_ES,
} as const;

// Self-hosted, no external Google Fonts request (render-blocking previously —
// see the removed <link> tags this replaces). Inter is a variable font, so
// omitting `weight` loads the full 100-900 range instead of a fixed list.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Search Console ownership verification, one per domain. ES already had a
// property verified pre-migration (given by the client) — kept as a fallback
// so it survives the switch without re-verifying from scratch. PT has no
// fallback: only set once a real code exists, never invent one.
const GSC_VERIFICATION = {
  pt: process.env.NEXT_PUBLIC_GSC_VERIFICATION_PT,
  es: process.env.NEXT_PUBLIC_GSC_VERIFICATION_ES ?? "pDlAIGKF3ejqg3VtYNKvw847x0Nfut-DllvKe-HKWHk",
} as const;

// Base/fallback metadata — every page under app/**/page.tsx exports its own
// `metadata` on top of this (title/description/OG, canonical + hreflang
// alternates for its own domain/language). This is what's left when a page
// doesn't override a field (e.g. legal pages don't set `openGraph`, so they
// inherit this one for link previews). metadataBase and the noindex-on-
// preview gate (R3) have to be resolved per request, since they depend on
// which of the 3 domains served this request — see lib/request-context.ts.
export async function generateMetadata(): Promise<Metadata> {
  const { domain, lang, origin, isProduction } = await getRequestContext();
  const title = translations[lang]["meta.title"];
  const description = translations[lang]["meta.description"];

  return {
    metadataBase: new URL(origin),
    title,
    description,
    alternates: { canonical: "/" },
    verification: GSC_VERIFICATION[domain === "es" ? "es" : "pt"]
      ? { google: GSC_VERIFICATION[domain === "es" ? "es" : "pt"] }
      : undefined,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      locale: lang === "es" ? "es_ES" : "pt_PT",
      images: [{ url: "/img/hero-sunset.jpg", width: 1536, height: 864 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/img/hero-sunset.jpg"],
    },
    // R3: a Vercel preview deployment must never be indexable — it would be
    // duplicate content competing with the real domain. VERCEL_ENV is unset
    // locally and "preview" on preview deployments, only "production" on the
    // real domains, so this can't be forgotten per-deploy like a manual flag.
    robots: isProduction ? undefined : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { domain, lang } = await getRequestContext();
  const gtmId = GTM_ID[domain === "es" ? "es" : "pt"];

  return (
    <html lang={lang} className={inter.variable}>
      <head>
        {/* Consent Mode defaults must be set before GTM's own script runs —
            this has to be a plain synchronous inline script, not next/script
            with a deferred strategy, or the first pageview could fire before
            the "denied" defaults are in place. */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript() }} />
        <StructuredData domain={domain} />
      </head>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body>
        <ScrollEffects />
        {children}
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}
