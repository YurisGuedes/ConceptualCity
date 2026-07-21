import { LEGAL_NAME, SITE_NAME, DOMAIN_ORIGINS } from "@/lib/site-config";
import type { Domain } from "@/lib/domain";

// Generic Gmail is a weak trust signal for a B2B construction-labor
// business — swap for a real domain mailbox once one exists (env var so it
// doesn't need another code change; see the plan doc, FASE 3).
const ES_CONTACT_EMAIL = process.env.NEXT_PUBLIC_ES_CONTACT_EMAIL ?? "cityconceptual@gmail.com";

// One EmploymentAgency node per domain (Google's structured-data guidelines
// want one physical address per LocalBusiness entity, not an address array
// on a single node) — each domain now only ever serves its own entity, see
// the `domain` prop below.
const listings = {
  pt: {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": `${DOMAIN_ORIGINS.pt}/#business`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: DOMAIN_ORIGINS.pt,
    logo: `${DOMAIN_ORIGINS.pt}/img/logo-conceptualcity.png`,
    image: `${DOMAIN_ORIGINS.pt}/img/hero-sunset.jpg`,
    telephone: "+351932176872",
    email: "portugal@conceptualcity.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. da Liberdade 706 1º Esq",
      addressLocality: "Braga",
      postalCode: "4710-249",
      addressCountry: "PT",
    },
    areaServed: "PT",
  },
  es: {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": `${DOMAIN_ORIGINS.es}/#business`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: DOMAIN_ORIGINS.es,
    logo: `${DOMAIN_ORIGINS.es}/img/logo-conceptualcity.png`,
    image: `${DOMAIN_ORIGINS.es}/img/hero-sunset.jpg`,
    telephone: "+34649803134",
    email: ES_CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "La Telva 2C",
      addressLocality: "Cambre, A Coruña",
      postalCode: "15181",
      addressCountry: "ES",
    },
    areaServed: "ES",
  },
} as const;

// .com has no entity of its own (it's a redirect hub, never a real content
// source) — falls back to the PT entity, same as its origin resolution in
// lib/request-context.ts.
export function StructuredData({ domain }: { domain: Domain }) {
  const entity = domain === "es" ? listings.es : listings.pt;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(entity) }} />;
}
