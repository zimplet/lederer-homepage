"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";

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
        gsap.fromTo(
          ".blog-header",
          { opacity: 0, y: 28, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "entrance",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".blog-featured",
          { opacity: 0, y: 36, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "entrance",
            scrollTrigger: {
              trigger: ".blog-featured",
              start: "top 86%",
              once: true,
            },
          }
        );

        ScrollTrigger.batch(".blog-card", {
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { opacity: 0, y: 36, filter: "blur(8px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "entrance",
                stagger: 0.12,
              }
            ),
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
      className="relative bg-cream-dark py-[var(--space-section)]"
    >
      {/* Top rule */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-dark/12 to-transparent"
        aria-hidden="true"
      />

      <div className="container-fluid">
        {/* Header */}
        <div
          className="blog-header mb-[var(--space-2xl)] flex items-end justify-between"
          style={{ opacity: 0 }}
        >
          <div>
            <h2 className="font-heading text-[var(--text-4xl)] font-black leading-tight tracking-[-0.03em] text-dark-deep">
              {t("title")}
            </h2>
            <p className="mt-[var(--space-sm)] font-body text-[var(--text-lg)] text-dark/50">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-2 font-heading text-[var(--text-base)] font-semibold text-red transition-all duration-300 hover:gap-4 lg:flex"
          >
            {t("allPosts")} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="blog-featured group mb-[var(--space-md)] flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-dark-deep shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.14)] lg:flex-row"
          style={{ opacity: 0 }}
        >
          {/* Image area — warm gradient placeholder until CMS images arrive */}
          <div className="relative flex h-64 flex-shrink-0 items-end overflow-hidden bg-gradient-to-br from-dark to-dark-deep lg:h-auto lg:w-2/5">
            {/* Abstract yarn visual */}
            <svg
              className="absolute inset-0 h-full w-full opacity-15"
              viewBox="0 0 400 300"
              aria-hidden="true"
            >
              <path
                d="M 40 0 C 38 80, 44 160, 40 300"
                stroke="#e73137"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="4 8"
              />
              <path
                d="M 200 0 C 204 100, 196 200, 200 300"
                stroke="#e73137"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 360 0 C 358 90, 364 180, 360 300"
                stroke="#e73137"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="2 6"
              />
            </svg>

            {/* Tag badge */}
            <span className="relative m-[var(--space-md)] rounded-full border border-red/25 bg-red/15 px-3 py-1 font-body text-[var(--text-xs)] font-medium text-red/90">
              {featured.tag}
            </span>

            {/* Right accent line on hover */}
            <div
              className="absolute inset-y-0 right-0 w-[2px] origin-top scale-y-0 bg-red transition-transform duration-600 group-hover:scale-y-100"
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-[var(--space-xl)]">
            <span className="mb-[var(--space-sm)] font-body text-[var(--text-xs)] uppercase tracking-[0.18em] text-white/30">
              {formatDate(featured.date)}
            </span>
            <h3 className="font-heading text-[var(--text-2xl)] font-bold leading-tight tracking-[-0.02em] text-white">
              {featured.title}
            </h3>
            <p className="mt-[var(--space-sm)] max-w-[52ch] font-body text-[var(--text-base)] leading-relaxed text-white/55">
              {featured.excerpt}
            </p>
            <div className="mt-[var(--space-lg)] flex items-center gap-2 font-heading text-[var(--text-sm)] font-semibold text-red transition-all duration-300 group-hover:gap-4">
              {t("readMore")} <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

        {/* Secondary posts — 2-column, asymmetric (not 3 equal cards) */}
        <div className="grid gap-[var(--space-sm)] sm:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card group overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-[0_1px_8px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
              style={{ opacity: 0 }}
            >
              {/* Minimal image header */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-cream to-cream-dark">
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-red to-red/0 transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
                {/* Tag */}
                <span className="absolute left-[var(--space-md)] top-[var(--space-md)] rounded-full border border-red/15 bg-white px-3 py-1 font-body text-[var(--text-xs)] font-medium text-red">
                  {post.tag}
                </span>
              </div>

              <div className="p-[var(--space-md)]">
                <span className="font-body text-[var(--text-xs)] uppercase tracking-[0.18em] text-dark/35">
                  {formatDate(post.date)}
                </span>
                <h3 className="mt-2 font-heading text-[var(--text-xl)] font-bold leading-tight tracking-[-0.02em] text-dark-deep">
                  {post.title}
                </h3>
                <p className="mt-[var(--space-xs)] font-body text-[var(--text-sm)] leading-relaxed text-dark/55">
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
