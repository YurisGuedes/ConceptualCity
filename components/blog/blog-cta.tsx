import Link from "next/link";
import { translations } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";

const t = (key: string) => translations.pt[key] ?? key;

export function BlogCta() {
  return (
    <section className="blog-cta">
      <div className="wrap">
        <h2>{t("blog.cta.h2")}</h2>
        <p>{t("blog.cta.p")}</p>
        <Link href={ROUTES.contacto.pt} className="btn btn-primary">
          {t("blog.cta.btn")}
        </Link>
      </div>
    </section>
  );
}
