"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useI18n } from "@/lib/i18n-context";
import { contactData } from "@/lib/contact-data";

export function Hero() {
  const { t, lang } = useI18n();
  const info = contactData[lang];
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="wrap">
          <div className="hero-content">
            <h1>{t("hero.h1")}</h1>
            <p className="lead">{t("hero.lead")}</p>
            <div className="hero-actions">
              <a
                href={info.whatsappHref}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
                onClick={() => sendGTMEvent({ event: "whatsapp_click" })}
              >
                {t("hero.cta1")}
              </a>
              <a href="#services" className="btn btn-ghost">
                {t("hero.cta2")}
              </a>
            </div>
            <div className="hero-tags">
              <span>{t("hero.tag1")}</span>
              <span>{t("hero.tag2")}</span>
              <span>{t("hero.tag3")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
