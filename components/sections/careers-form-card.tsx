"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2, Paperclip } from "lucide-react";
import { sendGTMEvent } from "@next/third-parties/google";
import { useI18n } from "@/lib/i18n-context";

type Status = "idle" | "loading" | "success" | "error";

/** Just the form card (no section wrapper/background/copy) — reused by the
 * dedicated /trabalhe-connosco page, centered on its own. The homepage no
 * longer embeds the full form; it links out via CareersBanner instead. */
export function CareersFormCard() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [trade, setTrade] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: bots (and unfortunately some browser autofill/password-manager
  // heuristics) tend to target fields named after a recognizable category
  // like "website", "url", or "company" — this name is deliberately
  // meaningless to autofill so real users' browsers leave it alone.
  const [hpToken, setHpToken] = useState("");
  const [consent, setConsent] = useState(false);
  const [cv, setCv] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setTrade("");
    setCity("");
    setMessage("");
    setHpToken("");
    setConsent(false);
    setCv(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setStatus("idle");
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setCv(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const body = new FormData();
      body.set("name", name);
      body.set("email", email);
      body.set("phone", phone);
      body.set("trade", trade);
      body.set("city", city);
      body.set("message", message);
      body.set("hp_token", hpToken);
      if (cv) body.set("cv", cv);

      const res = await fetch("/api/careers", { method: "POST", body });
      if (!res.ok) throw new Error("request_failed");
      sendGTMEvent({ event: "careers_form_submit" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="quote-card reveal">
      {status === "success" ? (
        <div className="qf-success">
          <CheckCircle2 />
          <h3>{t("cf.success.h3")}</h3>
          <p>{t("cf.success.p")}</p>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            {t("cf.success.reset")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="hp_token"
            value={hpToken}
            onChange={(e) => setHpToken(e.target.value)}
            className="qf-hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="qf-row">
            <div className="qf-field">
              <label htmlFor="cf-name">{t("cf.label.name")}</label>
              <input
                id="cf-name"
                type="text"
                required
                placeholder={t("cf.placeholder.name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="qf-field">
              <label htmlFor="cf-email">{t("cf.label.email")}</label>
              <input
                id="cf-email"
                type="email"
                required
                placeholder={t("cf.placeholder.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="qf-row">
            <div className="qf-field">
              <label htmlFor="cf-trade">{t("cf.label.trade")}</label>
              <select id="cf-trade" value={trade} onChange={(e) => setTrade(e.target.value)}>
                <option value="">{t("cf.placeholder.trade")}</option>
                <option value={t("trade1.name")}>{t("trade1.name")}</option>
                <option value={t("trade2.name")}>{t("trade2.name")}</option>
                <option value={t("trade3.name")}>{t("trade3.name")}</option>
                <option value={t("trade4.name")}>{t("trade4.name")}</option>
                <option value={t("trade5.name")}>{t("trade5.name")}</option>
                <option value={t("trade6.name")}>{t("trade6.name")}</option>
                <option value={t("cf.trade.other")}>{t("cf.trade.other")}</option>
              </select>
            </div>
            <div className="qf-field">
              <label htmlFor="cf-city">{t("cf.label.city")}</label>
              <input
                id="cf-city"
                type="text"
                placeholder={t("cf.placeholder.city")}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="qf-field">
            <label htmlFor="cf-phone">{t("cf.label.phone")}</label>
            <input
              id="cf-phone"
              type="tel"
              placeholder={t("cf.placeholder.phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="qf-field">
            <label htmlFor="cf-cv">{t("cf.label.cv")}</label>
            <div className="cf-file">
              <input
                ref={fileInputRef}
                id="cf-cv"
                type="file"
                accept="application/pdf"
                onChange={handleFile}
                className="cf-file-input"
              />
              <label htmlFor="cf-cv" className="cf-file-btn">
                <Paperclip /> {t("cf.cv.choose")}
              </label>
              <span className="cf-file-name">{cv ? cv.name : t("cf.cv.none")}</span>
            </div>
          </div>
          <div className="qf-field">
            <label htmlFor="cf-message">{t("cf.label.message")}</label>
            <textarea
              id="cf-message"
              rows={4}
              placeholder={t("cf.placeholder.message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <label className="cf-consent">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              {t("cf.privacy.pre")}{" "}
              <a href="/privacidade" target="_blank" rel="noopener">
                {t("cf.privacy.link")}
              </a>
            </span>
          </label>

          {status === "error" && <p className="qf-error">{t("cf.error")}</p>}

          <button type="submit" className="btn btn-primary qf-submit" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="qf-spin" /> {t("cf.submitting")}
              </>
            ) : (
              <>
                {t("cf.submit")} <ArrowRight />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
