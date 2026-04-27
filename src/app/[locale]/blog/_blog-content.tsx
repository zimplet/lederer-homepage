"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Calendar, Tag, Clock } from "lucide-react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/motion";
import { formatPostDate, type BlogPostData } from "@/lib/blog-data";
import { YarnLines } from "@/components/animations/yarn-lines";

const TAG_COLORS: Record<string, string> = {
  Partnerschaft: "bg-red/10 text-red",
  Nachhaltigkeit: "bg-green-100 text-green-700",
  Unternehmen: "bg-blue-100 text-blue-700",
  Zertifizierungen: "bg-amber-100 text-amber-700",
  Unternehmenskultur: "bg-purple-100 text-purple-700",
  Karriere: "bg-dark/10 text-dark",
  Produkte: "bg-orange-100 text-orange-700",
  Technologie: "bg-cyan-100 text-cyan-700",
  Innovation: "bg-violet-100 text-violet-700",
  Branche: "bg-gray-100 text-gray-700",
};

function TagBadge({ tag }: { tag: string }) {
  const colorClass = TAG_COLORS[tag] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-[var(--text-xs)] font-medium ${colorClass}`}>
      <Tag className="h-3 w-3" />
      {tag}
    </span>
  );
}

interface BlogPageContentProps {
  featured: BlogPostData;
  rest: BlogPostData[];
}

export function BlogPageContent({ featured, rest }: BlogPageContentProps) {
  const t = useTranslations("Blog");
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".blog-headline", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.08,
              ease: "entrance",
            }),
        });

        gsap.from(".featured-post", {
          opacity: 0,
          y: 50,
          filter: "blur(8px)",
          duration: 1,
          ease: "entrance",
          scrollTrigger: {
            trigger: ".featured-post",
            start: "top 85%",
            once: true,
          },
        });

        ScrollTrigger.batch(".post-card", {
          onEnter: (els) =>
            gsap.from(els, {
              opacity: 0,
              y: 40,
              filter: "blur(6px)",
              duration: 0.7,
              stagger: 0.1,
              ease: "entrance",
            }),
          start: "top 88%",
          once: true,
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".blog-headline, .featured-post, .post-card", { opacity: 1 });
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark-deep pt-[var(--space-3xl)] pb-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(231,49,55,0.1),transparent_60%)]" aria-hidden="true" />
        <YarnLines color="rgba(231,49,55,0.12)" />

        <div className="container-fluid relative z-10">
          <div className="mb-[var(--space-sm)] flex items-center gap-3">
            <div className="h-[1px] w-8 bg-red" aria-hidden="true" />
            <span className="font-body text-[var(--text-sm)] uppercase tracking-[0.2em] text-red">
              News & Aktuelles
            </span>
          </div>
          <h1
            className="blog-headline font-heading text-[var(--text-hero)] font-black leading-[0.95] tracking-[-0.03em] text-white"
            style={{ visibility: "hidden" }}
          >
            {t("title")}
          </h1>
          <p className="mt-[var(--space-lg)] max-w-[50ch] font-body text-[var(--text-lg)] text-white/60">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* ── Featured Post ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-[var(--space-section)]">
        <div className="container-fluid">
          <Link
            href={`/blog/${featured.slug}`}
            className="featured-post group mb-[var(--space-xl)] flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl lg:flex-row"
            style={{ opacity: 0 }}
          >
            {/* Visual area */}
            <div className="relative flex h-72 flex-shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-red/15 via-red/5 to-cream lg:h-auto lg:w-5/12">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true" preserveAspectRatio="none">
                <path d="M0 20 C33 18, 67 22, 100 20" stroke="#e73137" strokeWidth="0.3" fill="none" strokeDasharray="1 1.5" />
                <path d="M0 50 C33 48, 67 52, 100 50" stroke="#e73137" strokeWidth="0.2" fill="none" />
                <path d="M0 80 C33 78, 67 82, 100 80" stroke="#e73137" strokeWidth="0.3" fill="none" strokeDasharray="0.5 2" />
              </svg>
              <div className="relative z-10 text-center">
                <TagBadge tag={featured.tag} />
              </div>
              <div className="absolute inset-y-0 right-0 w-[3px] origin-top scale-y-0 bg-red transition-transform duration-700 group-hover:scale-y-100" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-[var(--space-xl)]">
              <div className="mb-[var(--space-sm)] flex flex-wrap items-center gap-3">
                <TagBadge tag={featured.tag} />
                <span className="flex items-center gap-1.5 font-body text-[var(--text-xs)] text-gray-400">
                  <Calendar className="h-3 w-3" />
                  {formatPostDate(featured.date)}
                </span>
                <span className="flex items-center gap-1.5 font-body text-[var(--text-xs)] text-gray-400">
                  <Clock className="h-3 w-3" />
                  {featured.readingTime} Min. Lesezeit
                </span>
              </div>

              <h2 className="font-heading text-[var(--text-3xl)] font-bold leading-tight text-dark-deep">
                {featured.title}
              </h2>
              <p className="mt-[var(--space-sm)] font-body text-[var(--text-lg)] leading-relaxed text-gray-500">
                {featured.excerpt}
              </p>

              <div className="mt-[var(--space-lg)] flex items-center gap-2 font-heading text-[var(--text-base)] font-semibold text-red transition-all duration-300 group-hover:gap-4">
                {t("readMore")} <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Link>

          {/* ── Post Grid ──────────────────────────────────────────────── */}
          <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="post-card group flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                style={{ opacity: 0 }}
              >
                {/* Card visual */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-dark/8 to-cream-dark">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true" preserveAspectRatio="none">
                    <path d="M0 50 C25 45, 75 55, 100 50" stroke="#525149" strokeWidth="0.2" fill="none" strokeDasharray="0.7 1.2" />
                    <path d="M0 70 C30 65, 70 75, 100 70" stroke="#525149" strokeWidth="0.3" fill="none" />
                  </svg>
                  <div className="absolute bottom-[var(--space-sm)] left-[var(--space-sm)]">
                    <TagBadge tag={post.tag} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-[var(--space-md)]">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex items-center gap-1.5 font-body text-[var(--text-xs)] text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {formatPostDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-[var(--text-xs)] text-gray-400">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} Min.
                    </span>
                  </div>

                  <h3 className="font-heading text-[var(--text-xl)] font-bold leading-tight text-dark-deep">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-[var(--text-sm)] leading-relaxed text-gray-500">
                    {post.excerpt}
                  </p>

                  <div className="mt-[var(--space-md)] flex items-center gap-2 font-heading text-[var(--text-sm)] font-semibold text-red transition-all duration-300 group-hover:gap-4">
                    {t("readMore")} <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
