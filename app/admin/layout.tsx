export { metadata, viewport } from "next-sanity/studio";

// The Studio bundle (sanity.config.ts and everything it pulls in) must only
// ever be resolved in the client module graph — a transitive Sanity
// dependency (swr) has no default export in its "react-server" build
// condition, which breaks Turbopack if this import chain gets pulled into
// Server Component compilation at all. Keeping metadata/viewport here (a
// plain Server Component layout) and the actual Studio import inside the
// "use client" page below keeps the two graphs separate.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
