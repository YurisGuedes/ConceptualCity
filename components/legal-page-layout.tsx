"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n-context";

export function LegalPageLayout({
  titleKey,
  updatedKey,
  introKey,
  children,
}: {
  titleKey: string;
  updatedKey: string;
  introKey?: string;
  children: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <main className="legal-page">
      <div className="wrap">
        <Link href="/" className="legal-back">
          ← {t("privacy.back")}
        </Link>
        <img src="/img/logo-conceptualcity.png" alt="Conceptual City" className="legal-logo" />
        <h1>{t(titleKey)}</h1>
        <p className="legal-updated">{t(updatedKey)}</p>
        {introKey && <p className="legal-intro">{t(introKey)}</p>}
        {children}
      </div>
    </main>
  );
}
