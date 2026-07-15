import { SITE_URL } from "@/lib/site-config";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #ececec;font-size:13px;color:#8a8a8a;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #ececec;font-size:15px;color:#151414;font-weight:600;">${value}</td>
    </tr>`;
}

export function buildCareersEmailHtml(fields: {
  name: string;
  email: string;
  phone?: string;
  trade?: string;
  city?: string;
  message?: string;
  hasCv: boolean;
}) {
  const name = escapeHtml(fields.name);
  const email = escapeHtml(fields.email);
  const phone = fields.phone ? escapeHtml(fields.phone) : "";
  const trade = fields.trade ? escapeHtml(fields.trade) : "";
  const city = fields.city ? escapeHtml(fields.city) : "";
  const message = escapeHtml(fields.message || "(sem mensagem)").replace(/\n/g, "<br>");

  const rows = [
    row("Nome", name),
    row("Email", `<a href="mailto:${email}" style="color:#151414;text-decoration:none;font-weight:600;">${email}</a>`),
    phone ? row("Telefone", phone) : "",
    trade ? row("Área de atuação", trade) : "",
    city ? row("Cidade / Região", city) : "",
  ].join("");

  return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nova candidatura</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f0;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f2f0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e5e3;">
          <tr>
            <td style="background-color:#ffffff;padding:28px 32px;text-align:center;border-bottom:1px solid #ececec;">
              <img src="${SITE_URL}/img/logo-conceptualcity.png" width="160" height="65" alt="Conceptual City" style="display:block;margin:0 auto;border:0;max-width:160px;height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="background-color:#F4A72C;height:4px;line-height:4px;font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#F4A72C;">Recrutamento</p>
              <h1 style="margin:0 0 24px;font-size:22px;font-weight:800;color:#151414;">Nova candidatura</h1>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                ${rows}
              </table>

              <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#8a8a8a;text-transform:uppercase;letter-spacing:.05em;">Mensagem</p>
              <div style="background-color:#f7f7f5;border-radius:10px;padding:16px 18px;font-size:14px;line-height:1.65;color:#333;">${message}</div>

              ${
                fields.hasCv
                  ? `<p style="margin:24px 0 0;font-size:13px;color:#666;">📎 CV em anexo (PDF)</p>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background-color:#fafaf9;text-align:center;border-top:1px solid #ececec;">
              <p style="margin:0;font-size:12px;color:#999;">Conceptual City &middot; Portugal &middot; España</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
