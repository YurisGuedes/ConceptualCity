import { NextResponse } from "next/server";
import { resend, CAREERS_FROM, CAREERS_TO } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CV_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: bots (and occasionally overzealous browser autofill) fill
  // every field, including this hidden one. Pretend success either way so
  // bots can't tell they were caught — but log it, since a silently
  // swallowed real submission is otherwise indistinguishable from a bot one.
  const hpToken = form.get("hp_token");
  if (hpToken) {
    console.warn("[careers] honeypot triggered, submission ignored", { hpToken: hpToken.toString() });
    return NextResponse.json({ ok: true });
  }

  const name = form.get("name")?.toString().trim();
  const email = form.get("email")?.toString().trim();
  const phone = form.get("phone")?.toString().trim();
  const trade = form.get("trade")?.toString().trim();
  const city = form.get("city")?.toString().trim();
  const message = form.get("message")?.toString().trim();
  const cv = form.get("cv");
  const hasCv = cv instanceof File && cv.size > 0;

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }
  if (hasCv && cv.type !== "application/pdf") {
    return NextResponse.json({ ok: false, error: "cv_not_pdf" }, { status: 400 });
  }
  if (hasCv && cv.size > MAX_CV_BYTES) {
    return NextResponse.json({ ok: false, error: "cv_too_large" }, { status: 400 });
  }

  if (!resend) {
    // No RESEND_API_KEY configured yet (e.g. local dev) — log so the flow is
    // still verifiable end-to-end, but don't fail the request over it.
    console.warn("[careers] RESEND_API_KEY not set — application logged only, no email sent", {
      name,
      email,
      phone,
      trade,
      city,
      message,
      cv: hasCv ? { name: cv.name, size: cv.size, type: cv.type } : null,
    });
    return NextResponse.json({ ok: true });
  }

  const attachments = hasCv
    ? [{ filename: cv.name, content: Buffer.from(await cv.arrayBuffer()) }]
    : undefined;

  const { data, error } = await resend.emails.send({
    from: CAREERS_FROM,
    to: CAREERS_TO,
    replyTo: email,
    subject: `Nova candidatura — ${name}`,
    text: [
      `Nome: ${name}`,
      `Email: ${email}`,
      phone ? `Telefone: ${phone}` : null,
      trade ? `Área de atuação: ${trade}` : null,
      city ? `Cidade / Região: ${city}` : null,
      "",
      message || "(sem mensagem)",
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
    attachments,
  });

  if (error) {
    console.error("[careers] resend send failed", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  console.log("[careers] sent", { id: data?.id, name, email });
  return NextResponse.json({ ok: true });
}
