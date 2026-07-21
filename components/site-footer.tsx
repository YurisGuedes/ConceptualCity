"use client";

import Link from "next/link";
import Image from "next/image";
import { sendGTMEvent } from "@next/third-parties/google";
import { useI18n } from "@/lib/i18n-context";
import { contactData } from "@/lib/contact-data";
import { PAGE_HREFS, SERVICE_HREFS, ROUTES } from "@/lib/routes";

export function SiteFooter() {
  const { t, lang } = useI18n();
  const info = contactData[lang];
  const svcHrefs = SERVICE_HREFS[lang];
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Image src="/img/logo-conceptualcity.png" alt="Conceptual City" width={489} height={200} />
            <p>{t("footer.brand.p")}</p>
          </div>
          <div className="foot-cols">
            <div className="fcol">
              <h4>{t("services.eyebrow")}</h4>
              <Link href={svcHrefs[0]}>{t("svc1.h3")}</Link>
              <Link href={svcHrefs[1]}>{t("svc2.h3")}</Link>
              <Link href={svcHrefs[2]}>{t("svc3.h3")}</Link>
              <Link href={svcHrefs[3]}>{t("svc4.h3")}</Link>
            </div>
            <div className="fcol">
              <h4>{t("footer.company")}</h4>
              <Link href={PAGE_HREFS.quemSomos[lang]}>{t("nav.about")}</Link>
              <Link href={PAGE_HREFS.trades[lang]}>{t("footer.perfis")}</Link>
              <Link href={PAGE_HREFS.projetos[lang]}>{t("nav.projects")}</Link>
              <Link href={PAGE_HREFS.contacto[lang]}>{t("nav.contact")}</Link>
              <Link href={PAGE_HREFS.trabalheConnosco[lang]}>{t("nav.careers")}</Link>
            </div>
            <div className="fcol">
              <h4>{t("nav.contact")}</h4>
              <a href={info.phoneHref} onClick={() => sendGTMEvent({ event: "phone_click" })}>
                {info.phone}
              </a>
              <a href={`mailto:${info.email}`} onClick={() => sendGTMEvent({ event: "email_click" })}>
                {info.email}
              </a>
              <a
                href={info.whatsappHref}
                target="_blank"
                rel="noopener"
                onClick={() => sendGTMEvent({ event: "whatsapp_click" })}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t("footer.rights")}</span>
          <div className="foot-legal">
            <Link href={ROUTES.avisoLegal[lang]}>{t("legal.title")}</Link>
            <Link href={ROUTES.privacidade[lang]}>{t("privacy.title")}</Link>
            <Link href={ROUTES.politicaCookies[lang]}>{t("cookies.title")}</Link>
            <Link href={ROUTES.acessibilidade[lang]}>{t("accessibility.title")}</Link>
          </div>
          <span>Portugal · España</span>
        </div>
      </div>
    </footer>
  );
}
