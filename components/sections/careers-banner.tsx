"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { PAGE_HREFS } from "@/lib/routes";

/** Lightweight homepage teaser — the full application form now lives on its
 * own page (/trabalhe-connosco), linked from here. Keeps the same
 * background photo the form used to sit on. */
export function CareersBanner() {
  const { t, lang } = useI18n();
  return (
    <section className="careers-banner">
      <div className="wrap">
        <div className="careers-banner-inner reveal">
          <span className="eyebrow">{t("cf.eyebrow")}</span>
          <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: t("cf.h2") }} />
          <p>{t("cf.p")}</p>
          <Link href={PAGE_HREFS.trabalheConnosco[lang]} className="btn btn-primary">
            {t("cf.banner.cta")} <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
