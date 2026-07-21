// Host -> domain map, shared between proxy.ts (edge/Node runtime, no
// next/headers) and lib/request-context.ts (Server Components). Kept as one
// file so the two never drift apart on which hostnames mean what.
export type Domain = "pt" | "es" | "com";

export const HOST_TO_DOMAIN: Record<string, Domain> = {
  "conceptualcity.pt": "pt",
  "www.conceptualcity.pt": "pt",
  "conceptualcity.es": "es",
  "www.conceptualcity.es": "es",
  "conceptualcity.com": "com",
  "www.conceptualcity.com": "com",
};

export function resolveDomainFromHost(hostHeader: string | null): Domain {
  const hostname = (hostHeader ?? "").split(":")[0].toLowerCase();
  const devDefault = (process.env.NEXT_PUBLIC_DEV_DOMAIN as Domain | undefined) ?? "pt";
  return HOST_TO_DOMAIN[hostname] ?? devDefault;
}
