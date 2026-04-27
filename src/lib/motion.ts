"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

// Register all plugins once
gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText, Flip, useGSAP);

// ── Easing Registration ──────────────────────────────────────
// Entrances
CustomEase.create("entrance", "M0,0 C0.1,0 0.0,1 1,1");
CustomEase.create("entrance.soft", "M0,0 C0.05,0 0.0,1 1,1");
CustomEase.create("entrance.crisp", "M0,0 C0.25,0 0.0,1 1,1");

// Exits
CustomEase.create("exit", "M0,0 C0.55,0 1,0.45 1,1");
CustomEase.create("exit.fast", "M0,0 C0.7,0 1,0.3 1,1");

// Emphasis
CustomEase.create(
  "emphasis",
  "M0,0 C0.14,0 0.242,1.169 0.38,1.006 0.518,0.843 0.722,1.03 1,1"
);
CustomEase.create(
  "spring",
  "M0,0 C0.2,0 0.2,1.6 0.4,1 0.5,0.8 0.7,1.02 1,1"
);
CustomEase.create(
  "bounce.soft",
  "M0,0 C0.3,0 0.2,1.12 0.5,1 0.65,0.94 0.8,1.01 1,1"
);

// Smooth
CustomEase.create("smooth", "M0,0 C0.4,0 0.2,1 1,1");
CustomEase.create("smooth.slow", "M0,0 C0.35,0 0.1,1 1,1");

// Dramatic
CustomEase.create("dramatic", "M0,0 C0.7,0 0.3,1 1,1");
CustomEase.create("reveal", "M0,0 C0.05,0 0.0,1 1,1");

// Interaction
CustomEase.create("press", "M0,0 C0.4,0 0.6,1 1,1");
CustomEase.create("hover", "M0,0 C0.3,0 0.1,1 1,1");

// Disable lag smoothing for scroll-driven animations
gsap.ticker.lagSmoothing(0);

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
