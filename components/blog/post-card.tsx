import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { translations } from "@/lib/translations";
import type { PostCard as PostCardData } from "@/sanity/lib/types";

const t = (key: string) => translations.pt[key] ?? key;

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <article className="blog-card">
      <div className="blog-card-media">
        <Image
          src={urlFor(post.mainImage).width(640).height(400).fit("crop").url()}
          alt={post.mainImage.alt ?? post.title}
          fill
          sizes="(max-width: 820px) 100vw, (max-width: 980px) 50vw, 25vw"
        />
      </div>
      <div className="blog-card-body">
        {post.category && <span className="blog-cat-tag">{post.category.title}</span>}
        <h3>{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <span className="blog-meta">{Math.max(1, post.readTimeMinutes)} {t("blog.card.readTimeSuffix")}</span>
        <Link href={`/${post.slug}`} className="blog-card-link">
          {t("blog.card.readMore")}
        </Link>
      </div>
    </article>
  );
}
