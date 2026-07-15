"use client";

import { useI18n } from "@/lib/i18n-context";
import { LegalPageLayout } from "@/components/legal-page-layout";

export function LegalNoticeContent() {
  const { t } = useI18n();
  return (
    <LegalPageLayout titleKey="legal.title" updatedKey="legal.updated">
      <h2>{t("legal.id.h3")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("legal.id.p") }} />

      <h2>{t("legal.object.h3")}</h2>
      <p>{t("legal.object.p")}</p>

      <h2>{t("legal.ip.h3")}</h2>
      <p>{t("legal.ip.p")}</p>

      <h2>{t("legal.use.h3")}</h2>
      <p>{t("legal.use.p")}</p>

      <h2>{t("legal.liability.h3")}</h2>
      <p>{t("legal.liability.p")}</p>

      <h2>{t("legal.law.h3")}</h2>
      <p>{t("legal.law.p")}</p>
    </LegalPageLayout>
  );
}
