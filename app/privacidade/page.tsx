"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export default function PrivacyPage() {
  const { t } = useI18n();
  return (
    <main className="legal-page">
      <div className="wrap">
        <Link href="/" className="legal-back">
          ← {t("privacy.back")}
        </Link>
        <img src="/img/logo-conceptualcity.png" alt="Conceptual City" className="legal-logo" />
        <h1>{t("privacy.title")}</h1>
        <p className="legal-updated">{t("privacy.updated")}</p>
        <p className="legal-intro">{t("privacy.intro")}</p>

        <h2>{t("privacy.controller.h3")}</h2>
        <p dangerouslySetInnerHTML={{ __html: t("privacy.controller.p") }} />

        <h2>{t("privacy.data.h3")}</h2>
        <p>{t("privacy.data.p")}</p>

        <h2>{t("privacy.purpose.h3")}</h2>
        <p>{t("privacy.purpose.p")}</p>

        <h2>{t("privacy.retention.h3")}</h2>
        <p>{t("privacy.retention.p")}</p>

        <h2>{t("privacy.rights.h3")}</h2>
        <p>{t("privacy.rights.p")}</p>
      </div>
    </main>
  );
}
