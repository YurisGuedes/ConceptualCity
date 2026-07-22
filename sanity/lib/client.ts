import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// useCdn:false is deliberate: revalidation is webhook-driven (see
// app/api/revalidate/route.ts), so Next's own Data Cache is the single
// source of truth for freshness. Layering Sanity's CDN edge cache
// underneath — which has its own independent TTL — risks a request that
// should be fresh right after a revalidateTag() call still momentarily
// hitting stale edge-cached data.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
