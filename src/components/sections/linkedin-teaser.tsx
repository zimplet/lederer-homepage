"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { LINKEDIN_URL } from "@/lib/social";
import { LINKEDIN_POSTS } from "@/lib/linkedin-posts";

export function LinkedInTeaserSection() {
  const t = useTranslations("LinkedIn");
  const locale = useLocale();
  const containerRef = useRef<HTMLElement>(null);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".linkedin-header",
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

        ScrollTrigger.batch(".linkedin-post", {
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
        gsap.set(".linkedin-header, .linkedin-post", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

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
          className="linkedin-header mb-[var(--space-2xl)] flex flex-col gap-[var(--space-md)] sm:flex-row sm:items-end sm:justify-between"
          style={{ opacity: 0 }}
        >
          <div>
            <h2 className="font-heading text-[length:var(--text-4xl)] font-black leading-tight text-dark-deep">
              {t("title")}
            </h2>
            <p className="mt-[var(--space-sm)] max-w-[52ch] font-body text-[length:var(--text-lg)] text-dark/50">
              {t("subtitle")}
            </p>
          </div>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-shrink-0 items-center gap-3 self-start rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[length:var(--text-base)] font-semibold text-white transition-colors duration-300 hover:bg-red-dark sm:self-auto"
          >
            <LinkedInIcon className="h-5 w-5" />
            {t("cta")}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Posts */}
        <div className="grid gap-[var(--space-sm)] md:grid-cols-3">
          {LINKEDIN_POSTS.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-post group flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-white p-[var(--space-md)] shadow-[0_1px_8px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
              style={{ opacity: 0 }}
            >
              <time
                dateTime={post.date}
                className="font-heading text-[length:var(--text-xs)] uppercase tracking-[0.18em] text-dark/35"
              >
                {formatDate(post.date)}
              </time>
              <p className="mt-[var(--space-xs)] line-clamp-6 font-body text-[length:var(--text-base)] leading-relaxed text-dark/70">
                {post.excerpt}
              </p>
              <span className="mt-auto flex items-center gap-2 pt-[var(--space-md)] font-heading text-[length:var(--text-sm)] font-semibold text-red transition-all duration-300 group-hover:gap-3">
                <LinkedInIcon className="h-4 w-4" />
                {t("viewPost")}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
