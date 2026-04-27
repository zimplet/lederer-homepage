"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  start?: string;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  ease = "entrance",
  stagger = 0,
  start = "top 85%",
  className,
}: RevealProps) {
  const container = useRef<HTMLDivElement>(null);

  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(container.current!.children, {
          opacity: 0,
          ...directionMap[direction],
          duration,
          ease,
          delay,
          stagger,
          scrollTrigger: {
            trigger: container.current,
            start,
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(container.current!.children, { opacity: 1 });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
