"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/motion";

/**
 * Animated vertical yarn lines - the core branding element.
 * SVG paths drawn with GSAP DrawSVG triggered by scroll.
 */
export function YarnLines({
  className = "",
  color = "rgba(231, 49, 55, 0.15)",
}: {
  className?: string;
  color?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const paths = svgRef.current!.querySelectorAll("path");

        // Set initial state - not drawn
        gsap.set(paths, { drawSVG: "0%" });

        // Animate on scroll
        paths.forEach((path, i) => {
          gsap.to(path, {
            drawSVG: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: svgRef.current!.closest("section") || svgRef.current!,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1.5 + i * 0.3,
            },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const paths = svgRef.current!.querySelectorAll("path");
        gsap.set(paths, { opacity: 0.08 });
      });
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Main vertical yarn - left third */}
      <path
        d="M 15 0 C 13 25, 17 50, 15 75 C 14 88, 16 95, 15 100"
        stroke={color}
        strokeWidth="0.3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Secondary yarn - center */}
      <path
        d="M 50 0 C 51 33, 49 67, 50 100"
        stroke={color}
        strokeWidth="0.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Accent yarn - right */}
      <path
        d="M 82 0 C 84 30, 80 65, 82 100"
        stroke={color}
        strokeWidth="0.3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Fine accent - far left */}
      <path
        d="M 5 0 C 5.5 33, 4.5 67, 5 100"
        stroke={color}
        strokeWidth="0.15"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
