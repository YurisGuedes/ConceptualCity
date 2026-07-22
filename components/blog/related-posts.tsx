import { translations } from "@/lib/translations";
import { PostCard } from "@/components/blog/post-card";
import type { PostCard as PostCardData } from "@/sanity/lib/types";

const t = (key: string) => translations.pt[key] ?? key;

export function RelatedPosts({ posts }: { posts: PostCardData[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="blog-related wrap">
      <h2>{t("blog.related.h2")}</h2>
      <div className="blog-related-grid">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
