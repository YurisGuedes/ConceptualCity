"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { contactData } from "@/lib/contact-data";

export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" } = {}) {
  const { t, lang } = useI18n();
  const info = contactData[lang];
  const Heading = headingLevel;
  return (
    <section className="pad" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-copy reveal">
            <span className="eyebrow">{t("contact.eyebrow")}</span>
            <Heading className="sec-title" dangerouslySetInnerHTML={{ __html: t("contact.h2") }} />
            <p>{t("contact.p")}</p>
            <div className="contact-list">
              <a href={info.phoneHref} className="crow">
                <span className="ic">
                  <Phone />
                </span>
                <div>
                  <div className="lbl">{t("crow.phone")}</div>
                  <div className="val">{info.phone}</div>
                </div>
              </a>
              <a href={`mailto:${info.email}`} className="crow">
                <span className="ic">
                  <Mail />
                </span>
                <div>
                  <div className="lbl">{t("crow.email")}</div>
                  <div className="val">{info.email}</div>
                </div>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`}
                target="_blank"
                rel="noopener"
                className="crow"
              >
                <span className="ic">
                  <MapPin />
                </span>
                <div>
                  <div className="lbl">{t("crow.address")}</div>
                  <div className="val">{info.address}</div>
                </div>
              </a>
            </div>
          </div>
          <div className="contact-map reveal">
            <iframe
              key={lang}
              src={info.mapEmbedSrc}
              title={info.address}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
