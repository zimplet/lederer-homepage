import type { Metadata, Viewport } from "next";
import { StudioClient } from "./_studio-client";

export const metadata: Metadata = {
  title: "Lederer CMS Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function StudioPage() {
  return <StudioClient />;
}
