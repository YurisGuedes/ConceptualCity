import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CV_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: bots fill every field, including this hidden one. Pretend success.
  if (form.get("website")) {
    return NextResponse.json({ ok: true });
  }

  const name = form.get("name")?.toString().trim();
  const email = form.get("email")?.toString().trim();
  const phone = form.get("phone")?.toString().trim();
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

  // TODO: once Resend is configured, send the notification email here,
  // attaching the CV buffer (await cv.arrayBuffer()) if present, e.g.
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({ from, to, subject, attachments: [...] });
  console.log("[careers] new application", {
    name,
    email,
    phone,
    message,
    cv: hasCv ? { name: cv.name, size: cv.size, type: cv.type } : null,
  });

  return NextResponse.json({ ok: true });
}
