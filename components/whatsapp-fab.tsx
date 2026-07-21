"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useI18n } from "@/lib/i18n-context";
import { contactData } from "@/lib/contact-data";

export function WhatsappFab() {
  const { lang } = useI18n();
  const info = contactData[lang];
  return (
    <a
      href={info.whatsappHref}
      target="_blank"
      rel="noopener"
      className="wa-fab"
      aria-label="WhatsApp"
      onClick={() => sendGTMEvent({ event: "whatsapp_click" })}
    >
      <span className="wa-fab-ring" aria-hidden="true" />
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.25 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.24-.01-.37.11-.5.11-.11.25-.29.37-.43.13-.14.17-.24.25-.4.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.24-.86.85-.86 2.06s.88 2.39 1 2.56c.13.17 1.74 2.66 4.22 3.72.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z" />
      </svg>
    </a>
  );
}
