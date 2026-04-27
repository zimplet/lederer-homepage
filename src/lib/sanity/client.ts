import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-01-01";

/** Returns true when Sanity env vars are configured */
export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}

function makeClient(useCdn: boolean, token?: string) {
  if (!projectId) {
    throw new Error("Sanity projectId is not configured");
  }
  return createClient({ projectId, dataset, apiVersion, useCdn, token });
}

// Lazy singletons — created on first use, only when projectId is available
let _client: ReturnType<typeof createClient> | null = null;
let _previewClient: ReturnType<typeof createClient> | null = null;

export function getClient() {
  if (!_client) _client = makeClient(true);
  return _client;
}

export function getPreviewClient() {
  if (!_previewClient)
    _previewClient = makeClient(false, process.env.SANITY_API_TOKEN);
  return _previewClient;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return imageUrlBuilder({ projectId, dataset }).image(source);
}
