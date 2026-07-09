import { Resend } from "resend";

/** `null` until RESEND_API_KEY is set (e.g. in local dev before the key is configured) — callers must handle that case instead of sending. */
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const CAREERS_FROM = process.env.RESEND_FROM_EMAIL ?? "Conceptual City <onboarding@resend.dev>";
export const CAREERS_TO = process.env.RESEND_TO_EMAIL ?? "portugal@conceptualcity.com";
