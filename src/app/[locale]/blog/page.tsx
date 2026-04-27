import { getAllPosts, getFeaturedPost } from "@/lib/blog-data";
import { BlogPageContent } from "./_blog-content";

export const revalidate = 3600; // revalidate every hour

export default async function BlogPage() {
  const [featured, allPosts] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(),
  ]);

  // Fallback: use first post as featured if none is flagged
  const featuredPost = featured ?? allPosts[0];
  const rest = allPosts.filter((p) => p.slug !== featuredPost?.slug);

  if (!featuredPost) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <p className="font-body text-gray-400">Keine Beiträge gefunden.</p>
      </main>
    );
  }

  return <BlogPageContent featured={featuredPost} rest={rest} />;
}
