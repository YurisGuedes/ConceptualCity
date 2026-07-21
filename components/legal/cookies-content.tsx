"use client";

import { useI18n } from "@/lib/i18n-context";
import { LegalPageLayout } from "@/components/legal-page-layout";

export function CookiesContent() {
  const { t } = useI18n();
  return (
    <LegalPageLayout titleKey="cookies.title" updatedKey="cookies.updated">
      <h2>{t("cookies.what.h3")}</h2>
      <p>{t("cookies.what.p")}</p>

      <h2>{t("cookies.used.h3")}</h2>
      <p>{t("cookies.used.p")}</p>

      <h2>{t("cookies.manage.h3")}</h2>
      <p>{t("cookies.manage.p")}</p>

      <h2>{t("cookies.consent.h3")}</h2>
      <p>{t("cookies.consent.p")}</p>

      <h2>{t("cookies.changes.h3")}</h2>
      <p>{t("cookies.changes.p")}</p>
    </LegalPageLayout>
  );
}
