import { HeroSection } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { AboutTeaserSection } from "@/components/sections/about-teaser";
import { ProductsShowcaseSection } from "@/components/sections/products-showcase";
import { CareerTeaserSection } from "@/components/sections/career-teaser";
import { CertificatesMarqueeSection } from "@/components/sections/certificates-marquee";
import { BlogTeaserSection } from "@/components/sections/blog-teaser";
import { ContactCtaSection } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AboutTeaserSection />
      <ProductsShowcaseSection />
      <CareerTeaserSection />
      <CertificatesMarqueeSection />
      <BlogTeaserSection />
      <ContactCtaSection />
    </main>
  );
}
