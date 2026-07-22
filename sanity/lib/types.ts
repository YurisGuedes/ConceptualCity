import type { SanityImageSource } from "@sanity/image-url";

// Loosely typed on purpose — the exact Portable Text block shape comes from
// @portabletext/types, a transitive dependency of next-sanity we don't
// import directly. PortableText (rendered via components/blog/portable-text-components.tsx)
// only needs this to be an array of typed objects.
export type PortableTextContent = Array<{ _type: string; _key: string; [key: string]: unknown }>;

export interface PostCategory {
  title: string;
  slug: string;
}

export interface PostCard {
  title: string;
  slug: string;
  excerpt: string;
  mainImage: SanityImageSource & { alt?: string };
  publishedAt: string;
  category: PostCategory | null;
  readTimeMinutes: number;
}

export interface PostAuthor {
  name: string;
  image?: SanityImageSource;
}

export interface Post extends Omit<PostCard, "mainImage"> {
  mainImage: SanityImageSource & { alt?: string };
  body: PortableTextContent;
  seoTitle?: string;
  seoDescription?: string;
  author: PostAuthor | null;
}
