"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion";

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  start?: string;
}

/**
 * Reveals content from blurred to sharp on scroll enter.
 * The user's favorite effect - sections start blurred and sharpen.
 */
export function BlurReveal({
  children,
  className,
  delay = 0,
  duration = 1,
  start = "top 85%",
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, filter: "blur(12px)", y: 30 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration,
            ease: "entrance.soft",
            delay,
            scrollTrigger: {
              trigger: ref.current,
              start,
              once: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { opacity: 1 });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
