"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/motion";

const STATS = [
  { value: 75, suffix: "+", key: "experience", prefix: "" },
  { value: 130, suffix: "", key: "employees", prefix: "~" },
  { value: 50000, suffix: "", key: "spindles", prefix: "" },
  { value: 20000, suffix: "", key: "production", prefix: "" },
  { value: 200, suffix: "", key: "machines", prefix: "" },
] as const;

function formatNumber(n: number): string {
  return n.toLocaleString("de-DE");
}

export function StatsSection() {
  const t = useTranslations("Stats");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Section entrance
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "entrance",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );

        // Stagger stat items up
        gsap.fromTo(
          ".stat-item",
          { opacity: 0, y: 48, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "entrance",
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Count-up per stat
        STATS.forEach((stat, i) => {
          const el = containerRef.current!.querySelector(
            `[data-count="${stat.key}"]`
          ) as HTMLElement;
          if (!el) return;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 2.2,
            ease: "power2.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 82%",
              once: true,
            },
            onUpdate: () => {
              el.textContent =
                stat.prefix + formatNumber(Math.round(obj.val)) + stat.suffix;
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        STATS.forEach((stat) => {
          const el = containerRef.current!.querySelector(
            `[data-count="${stat.key}"]`
          ) as HTMLElement;
          if (el)
            el.textContent =
              stat.prefix + formatNumber(stat.value) + stat.suffix;
        });
        gsap.set(".stat-item", { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-cream py-[var(--space-section)]"
      style={{ opacity: 0 }}
    >
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(231,49,55,0.04)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      {/* Top rule */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-dark/15 to-transparent"
        aria-hidden="true"
      />

      <div className="container-fluid">
        {/* Section eyebrow */}
        <p className="mb-[var(--space-2xl)] font-body text-[var(--text-sm)] uppercase tracking-[0.22em] text-dark/40">
          In Zahlen
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-y-[var(--space-xl)] lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.key}
              className="stat-item relative"
              style={{ opacity: 0 }}
            >
              {/* Vertical divider (not on last item) */}
              {i < STATS.length - 1 && (
                <div
                  className="absolute right-0 top-1/4 hidden h-1/2 w-[1px] bg-dark/10 lg:block"
                  aria-hidden="true"
                />
              )}

              {/* Number */}
              <div className="font-heading text-[clamp(2.6rem,4.5vw,5rem)] font-black leading-none tracking-[-0.04em] text-dark-deep">
                <span data-count={stat.key}>0</span>
              </div>

              {/* Red accent rule */}
              <div
                className="my-3 h-[2px] w-8 bg-red"
                aria-hidden="true"
              />

              {/* Label */}
              <div className="font-body text-[var(--text-sm)] leading-snug text-dark/55 lg:max-w-[12ch]">
                {t(stat.key)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dark/15 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
