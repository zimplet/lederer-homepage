/**
 * Unified blog data layer.
 * Fetches from Sanity when configured, falls back to static BLOG_POSTS.
 */
import type { PortableTextBlock } from "@portabletext/types";
import { isSanityConfigured } from "@/lib/sanity/client";
import {
  getAllBlogPosts,
  getFeaturedBlogPost,
  getRecentBlogPosts,
  getBlogPostBySlug,
  getAllBlogSlugs,
} from "@/lib/sanity/queries";
import {
  BLOG_POSTS,
  getFeaturedPost as getStaticFeatured,
  getRecentPosts as getStaticRecent,
  getPostBySlug as getStaticBySlug,
  formatPostDate,
} from "@/lib/blog";

// Re-export formatPostDate for convenience
export { formatPostDate };

/** A normalized blog post that works from both sources */
export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  author: string;
  readingTime: number;
  featured: boolean;
  /** Sanity Portable Text blocks – preferred renderer */
  contentBlocks?: PortableTextBlock[];
  /** Static HTML fallback */
  contentHtml?: string;
}

// ─── List queries ────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPostData[]> {
  if (isSanityConfigured()) {
    const posts = await getAllBlogPosts();
    return posts.map(toData);
  }
  return BLOG_POSTS.map(fromStatic);
}

export async function getFeaturedPost(): Promise<BlogPostData | null> {
  if (isSanityConfigured()) {
    const post = await getFeaturedBlogPost();
    return post ? toData(post) : null;
  }
  const post = getStaticFeatured();
  return post ? fromStatic(post) : null;
}

export async function getRecentPosts(
  limit = 3,
  excludeSlug?: string
): Promise<BlogPostData[]> {
  if (isSanityConfigured()) {
    const posts = await getRecentBlogPosts(limit, excludeSlug);
    return posts.map(toData);
  }
  return getStaticRecent(limit, excludeSlug).map(fromStatic);
}

// ─── Detail query ─────────────────────────────────────────────────────────────

export async function getPostBySlug(
  slug: string
): Promise<BlogPostData | null> {
  if (isSanityConfigured()) {
    const post = await getBlogPostBySlug(slug);
    return post ? toData(post) : null;
  }
  const post = getStaticBySlug(slug);
  return post ? fromStatic(post) : null;
}

// ─── Slug list for generateStaticParams ──────────────────────────────────────

export async function getAllPostSlugs(): Promise<string[]> {
  if (isSanityConfigured()) {
    return getAllBlogSlugs();
  }
  return BLOG_POSTS.map((p) => p.slug);
}

// ─── Adapters ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toData(sanityPost: any): BlogPostData {
  return {
    slug: sanityPost.slug?.current ?? sanityPost.slug,
    title: sanityPost.title,
    excerpt: sanityPost.excerpt,
    tag: sanityPost.tag,
    date: sanityPost.date,
    author: sanityPost.author ?? "Redaktion Lederer",
    readingTime: sanityPost.readingTime ?? 5,
    featured: sanityPost.featured ?? false,
    contentBlocks: sanityPost.content,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromStatic(staticPost: any): BlogPostData {
  return {
    slug: staticPost.slug,
    title: staticPost.title,
    excerpt: staticPost.excerpt,
    tag: staticPost.tag,
    date: staticPost.date,
    author: staticPost.author,
    readingTime: staticPost.readingTime,
    featured: staticPost.featured,
    contentHtml: staticPost.content,
  };
}
