import { BLOG_POSTS } from "@/lib/blog";
import { BlogPostContent } from "./_post-content";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  const locales = ["de", "en"];
  return locales.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({ locale, slug: post.slug }))
  );
}

export default function BlogPostPage({ params }: PageProps) {
  return <BlogPostContent params={params} />;
}
