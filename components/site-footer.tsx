"use client";

import { useI18n } from "@/lib/i18n-context";
import { contactData } from "@/lib/contact-data";

export function SiteFooter() {
  const { t, lang } = useI18n();
  const info = contactData[lang];
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <img src="/img/logo-conceptualcity.png" alt="Conceptual City" />
            <p>{t("footer.brand.p")}</p>
          </div>
          <div className="foot-cols">
            <div className="fcol">
              <h4>{t("services.eyebrow")}</h4>
              <a href="#services">{t("svc1.h3")}</a>
              <a href="#services">{t("svc2.h3")}</a>
              <a href="#services">{t("svc3.h3")}</a>
              <a href="#services">{t("svc4.h3")}</a>
            </div>
            <div className="fcol">
              <h4>{t("footer.company")}</h4>
              <a href="#about">{t("nav.about")}</a>
              <a href="#trades">{t("footer.perfis")}</a>
              <a href="#projects">{t("nav.projects")}</a>
              <a href="#contact">{t("nav.contact")}</a>
            </div>
            <div className="fcol">
              <h4>{t("nav.contact")}</h4>
              <a href={info.phoneHref}>{info.phone}</a>
              <a href={`mailto:${info.email}`}>{info.email}</a>
              <a href={info.whatsappHref} target="_blank" rel="noopener">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t("footer.rights")}</span>
          <span>Portugal · España</span>
        </div>
      </div>
    </footer>
  );
}
