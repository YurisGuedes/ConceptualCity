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
    phone: "+351 933 659 117",
    phoneHref: "tel:+351933659117",
    whatsapp: "+351 933 659 117",
    whatsappHref: "https://wa.me/351933659117",
    email: "portugal@conceptualcity.com",
    address: "Av. da Liberdade 706 1º Esq, 4710-249 Braga",
    mapEmbedSrc:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent("Av. da Liberdade 706 1º Esq, 4710-249 Braga") +
      "&output=embed",
  },
  es: {
    phone: "+34 649 803 134",
    phoneHref: "tel:+34649803134",
    whatsapp: "+34 649 803 134",
    whatsappHref: "https://wa.me/34649803134",
    email: "cityconceptual@gmail.com",
    address: "La Telva 2C - 15181, Cambre - A Coruña",
    mapEmbedSrc:
      "https://maps.google.com/maps?q=" +
      encodeURIComponent("La Telva 2C - 15181, Cambre - A Coruña") +
      "&output=embed",
  },
};
