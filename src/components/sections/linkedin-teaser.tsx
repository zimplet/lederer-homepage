"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/motion";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { LINKEDIN_URL } from "@/lib/social";

export function LinkedInTeaserSection() {
  const t = useTranslations("LinkedIn");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".linkedin-card",
          { opacity: 0, y: 36, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "entrance",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".linkedin-card", { opacity: 1 });
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
        <div
          className="linkedin-card flex flex-col gap-[var(--space-lg)] overflow-hidden rounded-[var(--radius-xl)] bg-dark-deep p-[var(--space-xl)] shadow-[0_2px_16px_rgba(0,0,0,0.08)] lg:flex-row lg:items-center lg:justify-between"
          style={{ opacity: 0 }}
        >
          <div>
            <h2 className="font-heading text-[length:var(--text-4xl)] font-black leading-tight text-white">
              {t("title")}
            </h2>
            <p className="mt-[var(--space-sm)] max-w-[52ch] font-body text-[length:var(--text-lg)] leading-relaxed text-white/55">
              {t("subtitle")}
            </p>
          </div>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-shrink-0 items-center gap-3 self-start rounded-full bg-red px-[var(--space-lg)] py-[var(--space-sm)] font-heading text-[length:var(--text-base)] font-semibold text-white transition-colors duration-300 hover:bg-red-dark lg:self-auto"
          >
            <LinkedInIcon className="h-5 w-5" />
            {t("cta")}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
