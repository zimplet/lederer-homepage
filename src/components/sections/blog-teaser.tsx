"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";

// Static placeholder posts – will be replaced by Sanity data in Phase 5
const POSTS = [
  {
    slug: "lycra-962l-dach-partner",
    tag: "Partnerschaft",
    date: "2024-03-15",
    title: "Lederer als erster LYCRA® 962L Partner in der DACH-Region",
    excerpt:
      "Wir investierten in 11 neue Umwindemaschinen und sind nun exklusiver Partner für die innovativen LYCRA® 962L Fasern in der DACH-Region.",
    featured: true,
  },
  {
    slug: "grs-zertifizierung",
    tag: "Nachhaltigkeit",
    date: "2024-01-20",
    title: "GRS-Zertifizierung für recycelte Garne",
    excerpt:
      "Jörg Lederer GmbH erhält die Global Recycled Standard Zertifizierung und setzt damit ein weiteres Zeichen für nachhaltiges Wirtschaften.",
    featured: false,
  },
  {
    slug: "neue-fuehrungsstruktur",
    tag: "Unternehmen",
    date: "2023-10-05",
    title: "Starkes Führungstrio für die Zukunft",
    excerpt:
      "Beatrice Lederer, Bernd Grupp und Jörg Lederer leiten gemeinsam die Jörg Lederer GmbH in eine erfolgreiche Zukunft.",
    featured: false,
  },
] as const;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function BlogTeaserSection() {
  const t = useTranslations("Blog");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".blog-header", {
          opacity: 0,
          y: 30,
          filter: "blur(6px)",
          duration: 0.8,
          ease: "entrance",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".blog-featured", {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
          duration: 1,
          ease: "entrance",
          scrollTrigger: {
            trigger: ".blog-featured",
            start: "top 85%",
            once: true,
          },
        });

        ScrollTrigger.batch(".blog-card", {
          onEnter: (elements) =>
            gsap.from(elements, {
              opacity: 0,
              y: 40,
              filter: "blur(8px)",
              duration: 0.7,
              ease: "entrance",
              stagger: 0.12,
            }),
          start: "top 88%",
          once: true,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".blog-header, .blog-featured, .blog-card", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  const [featured, ...rest] = POSTS;

  return (
    <section
      ref={containerRef}
      className="relative bg-cream py-[var(--space-section)]"
    >
      <div className="container-fluid">
        {/* Header */}
        <div className="blog-header mb-[var(--space-xl)] flex items-end justify-between" style={{ opacity: 0 }}>
          <div>
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
              <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
                News & Aktuelles
              </span>
            </div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-dark-deep">
              {t("title")}
            </h2>
            <p className="mt-[var(--space-sm)] font-body text-[var(--text-lg)] text-gray-500">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-2 font-heading text-[var(--text-base)] font-semibold text-red transition-all hover:gap-4 lg:flex"
          >
            {t("allPosts")} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="blog-featured group mb-[var(--space-lg)] flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl lg:flex-row"
          style={{ opacity: 0 }}
        >
          {/* Placeholder image area */}
          <div className="relative h-64 flex-shrink-0 overflow-hidden bg-gradient-to-br from-red/10 to-dark/5 lg:h-auto lg:w-2/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 opacity-20">
                <div className="h-16 w-16 rounded-full border-2 border-dark" />
                <div className="h-[1px] w-24 bg-dark" />
              </div>
            </div>
            {/* Red accent line */}
            <div className="absolute inset-y-0 right-0 w-[2px] origin-top scale-y-0 bg-red transition-transform duration-700 group-hover:scale-y-100" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-[var(--space-lg)]">
            <div className="mb-[var(--space-sm)] flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red/10 px-3 py-1 font-body text-[var(--text-xs)] font-medium text-red">
                <Tag className="h-3 w-3" />
                {featured.tag}
              </span>
              <span className="flex items-center gap-1.5 font-body text-[var(--text-xs)] text-gray-400">
                <Calendar className="h-3 w-3" />
                {formatDate(featured.date)}
              </span>
            </div>
            <h3 className="font-heading text-[var(--text-2xl)] font-bold leading-tight text-dark-deep">
              {featured.title}
            </h3>
            <p className="mt-[var(--space-sm)] font-body text-[var(--text-base)] leading-relaxed text-gray-500">
              {featured.excerpt}
            </p>
            <div className="mt-[var(--space-md)] flex items-center gap-2 font-heading text-[var(--text-sm)] font-semibold text-red transition-all duration-300 group-hover:gap-4">
              {t("readMore")} <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

        {/* Secondary posts */}
        <div className="grid gap-[var(--space-md)] sm:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card group overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              style={{ opacity: 0 }}
            >
              {/* Mini image placeholder */}
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-red/8 to-dark/5">
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-red to-red/0 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </div>

              <div className="p-[var(--space-md)]">
                <div className="mb-[var(--space-xs)] flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red/10 px-3 py-1 font-body text-[var(--text-xs)] font-medium text-red">
                    <Tag className="h-3 w-3" />
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-[var(--text-xs)] text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </span>
                </div>
                <h3 className="font-heading text-[var(--text-xl)] font-bold leading-tight text-dark-deep">
                  {post.title}
                </h3>
                <p className="mt-[var(--space-xs)] font-body text-[var(--text-sm)] leading-relaxed text-gray-500">
                  {post.excerpt}
                </p>
                <div className="mt-[var(--space-md)] flex items-center gap-2 font-heading text-[var(--text-sm)] font-semibold text-red transition-all duration-300 group-hover:gap-4">
                  {t("readMore")} <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-[var(--space-lg)] lg:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-heading text-[var(--text-base)] font-semibold text-red"
          >
            {t("allPosts")} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
