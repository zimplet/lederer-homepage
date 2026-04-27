"use client";

import { useRef, use } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag } from "lucide-react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/lib/motion";
import { getPostBySlug, getRecentPosts, formatPostDate } from "@/lib/blog";
import { YarnLines } from "@/components/animations/yarn-lines";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export function BlogPostContent({ params }: PageProps) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const t = useTranslations("Blog");
  const pageRef = useRef<HTMLDivElement>(null);
  const related = getRecentPosts(3, slug);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".post-headline", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: () =>
            gsap.from(split.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.06,
              ease: "entrance",
            }),
        });

        gsap.from(".post-meta", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "entrance",
          delay: 0.3,
        });

        gsap.from(".post-body", {
          opacity: 0,
          y: 30,
          filter: "blur(6px)",
          duration: 0.8,
          ease: "entrance",
          scrollTrigger: {
            trigger: ".post-body",
            start: "top 85%",
            once: true,
          },
        });

        ScrollTrigger.batch(".related-card", {
          onEnter: (els) =>
            gsap.from(els, {
              opacity: 0,
              y: 40,
              duration: 0.6,
              stagger: 0.1,
              ease: "entrance",
            }),
          start: "top 88%",
          once: true,
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".post-headline, .post-meta, .post-body, .related-card", { opacity: 1 });
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark-deep pt-[var(--space-3xl)] pb-[var(--space-section)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(231,49,55,0.1),transparent_60%)]" aria-hidden="true" />
        <YarnLines color="rgba(231,49,55,0.12)" />

        <div className="container-fluid relative z-10 max-w-[75ch]">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-[var(--space-lg)] inline-flex items-center gap-2 font-body text-[var(--text-sm)] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Alle Beiträge
          </Link>

          {/* Tag */}
          <div className="mb-[var(--space-sm)]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red/20 px-3 py-1 font-body text-[var(--text-xs)] font-medium text-red">
              <Tag className="h-3 w-3" /> {post.tag}
            </span>
          </div>

          <h1
            className="post-headline font-heading text-[var(--text-4xl)] font-black leading-tight tracking-tight text-white"
            style={{ visibility: "hidden" }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="post-meta mt-[var(--space-md)] flex flex-wrap items-center gap-[var(--space-md)] border-t border-white/10 pt-[var(--space-md)]" style={{ opacity: 0 }}>
            <span className="flex items-center gap-2 font-body text-[var(--text-sm)] text-white/50">
              <User className="h-4 w-4" /> {post.author}
            </span>
            <span className="flex items-center gap-2 font-body text-[var(--text-sm)] text-white/50">
              <Calendar className="h-4 w-4" /> {formatPostDate(post.date)}
            </span>
            <span className="flex items-center gap-2 font-body text-[var(--text-sm)] text-white/50">
              <Clock className="h-4 w-4" /> {post.readingTime} Min. Lesezeit
            </span>
          </div>
        </div>
      </section>

      {/* ── Article Body ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-[var(--space-section)]">
        <div className="container-fluid">
          <div className="lg:flex lg:gap-[var(--space-xl)]">
            {/* Main content */}
            <article
              className="post-body max-w-[75ch] flex-1"
              style={{ opacity: 0 }}
            >
              {/* Lead */}
              <p className="mb-[var(--space-lg)] font-body text-[var(--text-xl)] leading-relaxed text-gray-600">
                {post.excerpt}
              </p>

              {/* HTML content – replace with Portable Text renderer in Phase 5 */}
              <div
                className="prose-lederer"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA */}
              <div className="mt-[var(--space-xl)] border-t border-gray-200 pt-[var(--space-lg)]">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[var(--text-base)] font-semibold text-white transition-all duration-300 hover:bg-red-dark hover:gap-3"
                >
                  Kontakt aufnehmen <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="mt-[var(--space-xl)] w-full shrink-0 lg:mt-0 lg:w-72">
              <div className="sticky top-[calc(var(--space-section)+var(--space-md))] space-y-[var(--space-md)]">
                {/* Author card */}
                <div className="rounded-[var(--radius-xl)] border border-dark/8 bg-white p-[var(--space-lg)]">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red/10 font-heading font-black text-red">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-heading text-[var(--text-base)] font-bold text-dark-deep">{post.author}</div>
                      <div className="font-body text-[var(--text-xs)] text-gray-400">Jörg Lederer GmbH</div>
                    </div>
                  </div>
                </div>

                {/* Quick links */}
                <div className="rounded-[var(--radius-xl)] border border-dark/8 bg-white p-[var(--space-lg)]">
                  <h3 className="mb-3 font-heading text-[var(--text-base)] font-bold text-dark-deep">
                    Weiterführendes
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/produkte" className="font-body text-[var(--text-sm)] text-red hover:underline">
                        → Unsere Produkte
                      </Link>
                    </li>
                    <li>
                      <Link href="/kontakt" className="font-body text-[var(--text-sm)] text-red hover:underline">
                        → Kontakt & Anfrage
                      </Link>
                    </li>
                    <li>
                      <Link href="/karriere" className="font-body text-[var(--text-sm)] text-red hover:underline">
                        → Karriere bei Lederer
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related Posts ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-cream-dark py-[var(--space-section)]">
          <div className="container-fluid">
            <h2 className="mb-[var(--space-xl)] font-heading text-[var(--text-3xl)] font-black tracking-tight text-dark-deep">
              Weitere Beiträge
            </h2>
            <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/blog/${relPost.slug}`}
                  className="related-card group overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                  style={{ opacity: 0 }}
                >
                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-dark/8 to-cream">
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                  </div>
                  <div className="p-[var(--space-md)]">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-body text-[var(--text-xs)] text-red">{relPost.tag}</span>
                      <span className="font-body text-[var(--text-xs)] text-gray-400">
                        {formatPostDate(relPost.date)}
                      </span>
                    </div>
                    <h3 className="font-heading text-[var(--text-lg)] font-bold leading-tight text-dark-deep">
                      {relPost.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 font-heading text-[var(--text-sm)] font-semibold text-red transition-all duration-300 group-hover:gap-4">
                      {t("readMore")} <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
