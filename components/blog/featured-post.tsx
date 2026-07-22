import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { translations } from "@/lib/translations";
import type { PostCard as PostCardData } from "@/sanity/lib/types";

const t = (key: string) => translations.pt[key] ?? key;

export function FeaturedPost({ post }: { post: PostCardData }) {
  return (
    <section className="blog-featured reveal">
      <div className="blog-featured-media">
        <Image
          src={urlFor(post.mainImage).width(900).height(680).fit("crop").url()}
          alt={post.mainImage.alt ?? post.title}
          fill
          sizes="(max-width: 980px) 100vw, 50vw"
        />
      </div>
      <div className="blog-featured-body">
        <span className="eyebrow">{t("blog.featured.eyebrow")}</span>
        {post.category && <span className="blog-cat-tag">{post.category.title}</span>}
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="blog-meta">{Math.max(1, post.readTimeMinutes)} {t("blog.card.readTimeSuffix")}</span>
        <Link href={`/${post.slug}`} className="btn btn-ghost">
          {t("blog.card.readMore")}
        </Link>
      </div>
    </section>
  );
}
