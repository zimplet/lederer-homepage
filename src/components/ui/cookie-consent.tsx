"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/motion";
import { useRef } from "react";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "lederer-cookie-consent";

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const t = useTranslations("Cookie");
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!visible || !bannerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(bannerRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.6,
          ease: "entrance",
          delay: 1,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(bannerRef.current, { opacity: 1 });
      });
    },
    { scope: bannerRef, dependencies: [visible] }
  );

  const saveConsent = useCallback((consent: ConsentState) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    // Dispatch event for other components to react
    window.dispatchEvent(
      new CustomEvent("cookie-consent-update", { detail: consent })
    );
    setVisible(false);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  }, [saveConsent]);

  const acceptNecessary = useCallback(() => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  }, [saveConsent]);

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-label={t("title")}
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-[100] p-[var(--space-sm)]"
    >
      <div className="container-fluid">
        <div className="rounded-[var(--radius-lg)] border border-gray-200 bg-white p-[var(--space-md)] shadow-lg">
          <div className="flex flex-col gap-[var(--space-sm)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h2 className="font-heading text-[var(--text-base)] font-bold text-dark-deep">
                {t("title")}
              </h2>
              <p className="mt-1 text-[var(--text-sm)] text-gray-500">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-shrink-0 gap-[var(--space-xs)]">
              <button
                onClick={acceptNecessary}
                className="rounded-full border border-gray-300 px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-sm)] font-medium text-dark transition-colors hover:border-dark hover:bg-gray-100"
              >
                {t("acceptNecessary")}
              </button>
              <button
                onClick={acceptAll}
                className="rounded-full bg-red px-[var(--space-md)] py-[var(--space-xs)] text-[var(--text-sm)] font-semibold text-white transition-colors hover:bg-red-dark"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to check if a specific consent category has been granted.
 * Usage: const hasAnalytics = useConsent("analytics");
 */
export function useConsent(category: keyof ConsentState): boolean {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const check = () => {
      const consent = getStoredConsent();
      setGranted(consent ? consent[category] : false);
    };

    check();
    window.addEventListener("cookie-consent-update", check);
    return () => window.removeEventListener("cookie-consent-update", check);
  }, [category]);

  return granted;
}
