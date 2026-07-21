// Google Consent Mode v2. Defaults to fully denied, set via an inline
// synchronous script in <head> (see consentDefaultsScript, rendered in
// app/layout.tsx) — it has to run before GTM's own script executes, so it
// can't be a next/script with a deferred strategy. components/cookie-consent.tsx
// calls updateConsent() once the visitor actually chooses.
export type ConsentStatus = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_FIELDS = ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"] as const;

export function consentDefaultsScript(): string {
  const denied = CONSENT_FIELDS.map((field) => `${field}:'denied'`).join(",");
  return (
    "window.dataLayer=window.dataLayer||[];" +
    "function gtag(){window.dataLayer.push(arguments);}" +
    "window.gtag=gtag;" +
    `gtag('consent','default',{${denied},wait_for_update:500});`
  );
}

export function updateConsent(status: ConsentStatus) {
  if (typeof window === "undefined" || !window.gtag) return;
  const update = Object.fromEntries(CONSENT_FIELDS.map((field) => [field, status]));
  window.gtag("consent", "update", update);
}
