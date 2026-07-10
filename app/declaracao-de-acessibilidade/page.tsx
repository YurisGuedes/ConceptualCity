"use client";

import { useI18n } from "@/lib/i18n-context";
import { LegalPageLayout } from "@/components/legal-page-layout";

export default function AccessibilityPage() {
  const { t } = useI18n();
  return (
    <LegalPageLayout titleKey="accessibility.title" updatedKey="accessibility.updated">
      <h2>{t("accessibility.commitment.h3")}</h2>
      <p>{t("accessibility.commitment.p")}</p>

      <h2>{t("accessibility.scope.h3")}</h2>
      <p>{t("accessibility.scope.p")}</p>

      <h2>{t("accessibility.measures.h3")}</h2>
      <p>{t("accessibility.measures.p")}</p>

      <h2>{t("accessibility.limits.h3")}</h2>
      <p>{t("accessibility.limits.p")}</p>

      <h2>{t("accessibility.contact.h3")}</h2>
      <p>{t("accessibility.contact.p")}</p>
    </LegalPageLayout>
  );
}
