"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { contactData } from "@/lib/contact-data";

export function CtaBand() {
  const { t, lang } = useI18n();
  const info = contactData[lang];
  return (
    <section className="cta-band">
      <div className="wrap">
        <div className="cta-inner reveal">
          <span className="eyebrow">{t("cta.eyebrow")}</span>
          <h2>{t("cta.h2")}</h2>
          <p>{t("cta.p")}</p>
          <div className="cta-actions">
            <a href={info.whatsappHref} target="_blank" rel="noopener" className="btn btn-primary">
              {t("cta.btn1")} <ArrowRight />
            </a>
            <a href={info.phoneHref} className="btn btn-ghost">
              {t("cta.btn2")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
