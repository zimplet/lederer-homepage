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
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Main vertical yarn - left third */}
      <path
        d="M 15% 0 C 14% 20%, 16% 40%, 15% 60%, 14% 80%, 15.5% 100%"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Secondary yarn - center */}
      <path
        d="M 50% 0 C 51% 25%, 49% 50%, 50.5% 75%, 49.5% 100%"
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      {/* Accent yarn - right */}
      <path
        d="M 82% 0 C 83% 30%, 81% 55%, 82.5% 80%, 82% 100%"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Fine accent - far left */}
      <path
        d="M 5% 20% C 5.5% 40%, 4.5% 60%, 5% 80%, 5.2% 100%"
        stroke={color}
        strokeWidth="0.75"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
