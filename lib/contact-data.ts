import type { Lang } from "@/lib/translations";

export interface ContactInfo {
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
  mapEmbedSrc: string;
}

export const contactData: Record<Lang, ContactInfo> = {
  pt: {
    phone: "+351 932 176 872",
    phoneHref: "tel:+351932176872",
    whatsapp: "+351 932 176 872",
    whatsappHref: "https://wa.me/351932176872",
    email: "portugal@conceptualcity.com",
    address: "Av. da Liberdade 706 1º Esq, 4710-249 Braga",
    // Pinned by coordinates (not the text address) so the embed drops a single
    // marker — a text query at this building resolves to several registered
    // businesses and Google renders a multi-result search view instead of one pin.
    // Coordinates match Manteigaria (Av. da Liberdade 712), right next to no. 706.
    mapEmbedSrc: "https://maps.google.com/maps?q=41.5504048,-8.4222549&z=18&output=embed",
  },
  es: {
    phone: "+34 649 803 134",
    phoneHref: "tel:+34649803134",
    whatsapp: "+34 649 803 134",
    whatsappHref: "https://wa.me/34649803134",
    email: "cityconceptual@gmail.com",
    address: "La Telva 2C - 15181, Cambre - A Coruña",
    mapEmbedSrc: "https://maps.google.com/maps?q=43.2961589,-8.3597759&z=16&output=embed",
  },
};
