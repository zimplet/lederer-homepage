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
        // Blur reveal for the whole section
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "entrance",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // CountUp animations
        STATS.forEach((stat, i) => {
          const el = containerRef.current!.querySelector(
            `[data-count="${stat.key}"]`
          ) as HTMLElement;
          if (!el) return;

          const countObj = { val: 0 };

          gsap.to(countObj, {
            val: stat.value,
            duration: 2,
            ease: "power2.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
            onUpdate: () => {
              el.textContent =
                stat.prefix +
                formatNumber(Math.round(countObj.val)) +
                stat.suffix;
            },
          });
        });

        // Stagger the stat items
        gsap.from(".stat-item", {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "entrance",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Show final values directly
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
      className="relative overflow-hidden bg-dark py-[var(--space-section)]"
      style={{ opacity: 0 }}
    >
      {/* Red glow background */}
      <div
        className="absolute left-1/2 top-1/2 h-[60%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/8 blur-[100px]"
        aria-hidden="true"
      />

      {/* Yarn line accent */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container-fluid">
        <div className="grid grid-cols-2 gap-[var(--space-lg)] md:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="stat-item flex flex-col items-start gap-[var(--space-xs)]"
              style={{ opacity: 0 }}
            >
              <div className="font-heading text-[var(--text-4xl)] font-black leading-none tracking-tight text-white">
                <span data-count={stat.key}>0</span>
              </div>
              <div className="h-[2px] w-8 bg-red" aria-hidden="true" />
              <div className="font-body text-[var(--text-sm)] leading-snug text-white/50">
                {t(stat.key)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red/40 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
