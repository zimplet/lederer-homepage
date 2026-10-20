import { HeroSection } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { AboutTeaserSection } from "@/components/sections/about-teaser";
import { ProductsShowcaseSection } from "@/components/sections/products-showcase";
import { CareerTeaserSection } from "@/components/sections/career-teaser";
import { CertificatesMarqueeSection } from "@/components/sections/certificates-marquee";
import { BlogTeaserSection } from "@/components/sections/blog-teaser";
import { ContactCtaSection } from "@/components/sections/contact-cta";
import { getRecentPosts } from "@/lib/blog-data";

export default async function HomePage() {
  // Same data layer as /blog/[slug], so teaser links always resolve. A CMS
  // outage hides the teaser instead of taking the homepage down.
  const posts = await getRecentPosts(3).catch((err) => {
    console.error("[home] blog teaser:", err);
    return [];
  });

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AboutTeaserSection />
      <ProductsShowcaseSection />
      <CareerTeaserSection />
      <CertificatesMarqueeSection />
      <BlogTeaserSection posts={posts} />
      <ContactCtaSection />
    </main>
  );
}
