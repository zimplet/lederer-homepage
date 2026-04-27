import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, getRecentPosts } from "@/lib/blog-data";
import { BlogPostContent } from "./_post-content";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const locales = ["de", "en"];
  const slugs = await getAllPostSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    getPostBySlug(slug),
    getRecentPosts(3, slug),
  ]);

  if (!post) notFound();

  return <BlogPostContent post={post} related={related} />;
}
