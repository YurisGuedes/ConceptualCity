"use client";

import { useI18n } from "@/lib/i18n-context";
import { LegalPageLayout } from "@/components/legal-page-layout";

export function PrivacyContent() {
  const { t } = useI18n();
  return (
    <LegalPageLayout titleKey="privacy.title" updatedKey="privacy.updated" introKey="privacy.intro">
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
    </LegalPageLayout>
  );
}
