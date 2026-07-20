import { LEGAL_NAME, SITE_NAME, SITE_URL } from "@/lib/site-config";

// Two locations = two EmploymentAgency nodes (Google's structured-data
// guidelines want one physical address per LocalBusiness entity, not an
// address array on a single node). Static/language-neutral: name, address
// and phone don't change with the PT/ES toggle.
const listings = [
  {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/img/logo-conceptualcity.png`,
    image: `${SITE_URL}/img/hero-sunset.jpg`,
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
  {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": `${SITE_URL}/es#business`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/es`,
    logo: `${SITE_URL}/img/logo-conceptualcity.png`,
    image: `${SITE_URL}/img/hero-sunset.jpg`,
    telephone: "+34649803134",
    email: "cityconceptual@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "La Telva 2C",
      addressLocality: "Cambre, A Coruña",
      postalCode: "15181",
      addressCountry: "ES",
    },
    areaServed: "ES",
  },
];

export function StructuredData() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listings) }} />
  );
}
