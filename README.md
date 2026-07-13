# Conceptual City — Website

Institutional site for Conceptual City (skilled construction labor supply,
Portugal + Spain). Next.js 16 (App Router, Turbopack) + React 19 + TypeScript +
Tailwind v4 + shadcn primitives, deployed on Vercel.

This file is written so a fresh chat (Claude Code or otherwise) can pick up
this project cold. Read it before making changes.

## Stack & structure

- `app/page.tsx` (PT, at `/`) and `app/es/page.tsx` (ES, at `/es`) — each assembles the same one-page site from `components/sections/*.tsx`, in order. Two real routes, not one page with a client-side toggle — see the SEO section's "Phase 2" below for why and how.
- `app/globals.css` — **the actual design system.** Marketing sections are NOT built with Tailwind utility classes — they use hand-written CSS custom properties and classes (`--amber`, `.wrap`, `.pad`, `.sec-title`, `.btn`, `.card`, etc.), organized in numbered section comments. Tailwind v4 + shadcn (`components.json`, `components/ui/*`) are present but only lightly used (see below) — match the existing custom-CSS convention for any new section rather than introducing Tailwind utility markup.
- `lib/i18n-context.tsx` + `lib/translations.ts` — i18n. Two languages: `pt` (default/primary market) and `es`. All copy lives as flat keys in `translations.ts` — **no em dashes in any of it**, the user explicitly asked for that; use periods/commas/colons instead. On `/` and `/es`, language comes from the URL (`I18nProvider fixedLang`). The four legal pages are still single-URL and client-detected (see SEO section for the full explanation and the trade-off).
- `lib/contact-data.ts` — phone/WhatsApp/email/address/map-embed per language.
- `components/scroll-effects.tsx` — reveal-on-scroll (`.reveal`/`.stagger` classes) via `IntersectionObserver`, plus the services-card tilt effect. Re-runs on every route change (tracks `usePathname()`) — it used to run once on mount, but that broke when `/` and `/es` became real client-side-navigable routes sharing the same root layout (see git history if this regresses again, it's a one-line fix: re-scan on pathname change).
- `components/site-header.tsx` / `site-footer.tsx` — global chrome. Mobile nav is a slide-in drawer; body scroll is locked while it's open (`body.menu-open`).
- `components/whatsapp-fab.tsx` — floating WhatsApp button, bottom-right. Rendered inside each page tree individually (`app/page.tsx`, `app/es/page.tsx`, `components/legal-page-layout.tsx`), NOT in the root layout — it has to be a descendant of whichever `I18nProvider` is active to show the right country's number.
- Favicon/app icons: `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `app/manifest.ts`, `public/img/icon-192.png` / `icon-512.png`. All derived from the real logo mark (cropped out of `public/img/logo-conceptualcity.png`, not a generic placeholder) — transparent for the favicon/icon, opaque amber background for the apple/manifest icons since iOS and Android ignore transparency.
- `components/ui/button.tsx`, `components/ui/text-reveal.tsx` — shadcn/Magic-UI primitives that came with the scaffolding. Currently unused by any section (sections use plain `<a className="btn ...">` etc.) — available if a future component wants them, not wired to anything today.

### Images

- `public/img/` — **only real photos**, committed, optimized (converted with `magick ... -quality ~82`, resized if needed). Nothing in the portfolio/services/hero is a placeholder or stock-feeling AI image at this point — keep it that way.
- `source-images/` — gitignored scratch folder for raw/unoptimized photos dropped in before conversion. If the user drops new real photos here (or anywhere), convert with `imagemagick` (`magick in.png -resize 2000x2000\> -quality 82 public/img/name.jpg`) before referencing them from a component.

## Forms

There is **one** form on the site: the "Trabalhe Connosco" / "Trabaja con
Nosotros" **careers/job-application** form at the bottom of the page
(`components/sections/careers-form.tsx`), which is deliberately styled like
a lead-gen quote form (background photo + glass card) but its purpose is
recruitment, not B2B quote requests.

> **Note for continuity:** a prior version of this section was a B2B
> "request a quote" form. It was intentionally replaced with the careers
> form. The only B2B/company-side contact paths now are the phone/WhatsApp
> CTAs (hero, CTA band, Contact section, floating WhatsApp button) — there
> is no structured quote-request form anywhere. If the user wants one back,
> it needs a new home (it doesn't belong back in the careers section).

Flow: `careers-form.tsx` → `POST multipart/form-data` → `app/api/careers/route.ts`
→ `lib/resend.ts` → Resend API. Fields: name, email (required), phone,
message, CV (PDF, ≤5MB, validated server-side), plus a honeypot field and a
required privacy-policy consent checkbox linking to `/privacidade`.

### Resend setup (do this to make the form actually send email)

1. Sign up at [resend.com](https://resend.com) and create an API key at
   **resend.com/api-keys**.
2. Put it in `.env.local` (already scaffolded, gitignored):
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. **Sandbox limitation:** until a sending domain is verified in the Resend
   dashboard (**resend.com/domains**), Resend only lets you send FROM
   `onboarding@resend.dev` and only delivers TO the email address the Resend
   account itself was signed up with. That's fine for testing the flow, but
   to actually receive applications at `portugal@conceptualcity.com` in
   production, verify a real domain (e.g. `conceptualcity.com`) in Resend
   first, then set:
   ```
   RESEND_FROM_EMAIL="Conceptual City <careers@conceptualcity.com>"
   RESEND_TO_EMAIL=portugal@conceptualcity.com
   ```
   (Both have sane fallback defaults in `lib/resend.ts` if left unset — see
   `.env.example` for the full reference.)
4. **Also set these same variables in Vercel** (Project → Settings →
   Environment Variables) — `.env.local` is gitignored and never deployed.
5. If `RESEND_API_KEY` is unset, the API route doesn't fail — it logs the
   application to the server console and returns success, so the form UX is
   still testable before the key exists.

## Legal pages

Four pages, all under `components/legal-page-layout.tsx` (shared shell: logo,
back link, title, updated date), all linked from the footer (`.foot-legal`),
all in `app/sitemap.ts`:

- `/privacidade` — GDPR/RGPD notice (data collected, purpose, retention,
  rights). Real identity: **Jesus Lamas Alvarez, NIF 76356554G**, sole
  proprietor — pulled from the sister site's Aviso Legal (see SEO section).
  PT cites Lei 58/2019 + CNPD, ES cites the AEPD — correct per-jurisdiction,
  not copied wholesale from the sister site (which uses Spanish law on both
  its `/pt` and default paths).
- `/aviso-legal` — legal notice per Portuguese e-commerce law (Decree-Law
  7/2004 Art. 10): identity, object, IP, access terms, liability, applicable
  law. ES version mirrors it under Spanish law instead.
- `/politica-de-cookies` — deliberately NOT copied from the sister site (its
  cookie page has no real content, just an empty cookie-consent widget).
  Written to describe what this site actually does: no third-party/analytics
  cookies, only the `cc-lang` localStorage preference.
- `/declaracao-de-acessibilidade` — framed as a WCAG 2.1 AA **commitment**,
  not a compliance claim. The sister site cites RD 1112/2018 (Spanish
  *public-sector* web accessibility law) even though it's a private company
  — that's not actually applicable, so this doesn't repeat that claim.

## Sister company: nudimu.es

Conceptual City and [nudimu.es](https://nudimu.es) share the same owner and
projects (per the user). Nudimu's site claims "40 años de experiencia" and
has a fuller legal footer (Política de Privacidad, Aviso Legal, workplace
safety policy, whistleblower channel) that Conceptual City doesn't have yet.
Do **not** assume Nudimu's numbers/claims apply to Conceptual City without
the user confirming — this was flagged, not yet resolved, as of this
writing.

## Map pins (`lib/contact-data.ts`)

The Google Maps embeds use hand-picked **coordinates**, not the text
address — a text-address query at the Braga building resolves to several
registered businesses and Google renders an ambiguous multi-result search
view instead of one pin. Coordinates were found via OpenStreetMap Nominatim
(no Google Maps API key configured) and, for Braga, nudged to sit exactly on
a known landmark (Manteigaria, Av. da Liberdade 712) at the user's request.
The Spain (Cambre) pin is only street-level accurate, not verified to the
exact house number — good enough visually, but worth double-checking if it
ever matters precisely.

## SEO

There's a live sister site, [conceptualcity.es](https://www.conceptualcity.es),
built by an agency (Beedigital) — real registered identity was pulled from
its Aviso Legal page: **Jesus Lamas Alvarez**, NIF `76356554G`, sole
proprietor (not a registered company — there's no NIPC, that assumption from
earlier was wrong). That's now in `lib/site-config.ts` and used in the JSON-LD
below. Its legal pages cite **Spanish** law even on the `/pt` path (looks like
one boilerplate reused for both markets, not actually localized) — decided
**not** to copy that as-is; Conceptual City's own legal pages should cite
Portuguese law (Lei 58/2019 + CNPD) for the PT side once written (still
pending — see below).

The SEO work is planned in phases. **Phase 0, 1, and (the routing half of)
Phase 2 are all done.**

**Phase 1 — technical foundations:**

- `app/robots.ts`, `app/sitemap.ts` — every real route is listed, `/` and
  `/es` carry `alternates.languages` (hreflang) pointing at each other.
- `app/layout.tsx` — `metadataBase`, canonical, Open Graph + Twitter card
  metadata (PT default/fallback — see Phase 2 below for the real per-language
  version).
- `components/structured-data.tsx` — JSON-LD (`EmploymentAgency`), one node
  per country (PT/ES) rather than one node with two addresses, matching
  Google's structured-data guidance for multi-location businesses. `url` on
  each node now points at its real route (`/` vs `/es`).
- `lib/site-config.ts` — `SITE_URL` (fed by `NEXT_PUBLIC_SITE_URL`, currently
  falls back to the `.vercel.app` URL — **set this env var once a custom
  domain goes live**, it feeds metadataBase/canonical/sitemap/robots/JSON-LD
  everywhere), `SITE_NAME`, `LEGAL_NAME`.
- Alt-text and heading-hierarchy audit: already clean, nothing to fix.

**Phase 2 — real per-language routes** (the biggest lever: ES content used
to be invisible to crawlers, only reachable via a client-side toggle on the
same PT URL):

- `/` (PT) and `/es` (ES) are now two real, independently server-rendered
  pages — verified with plain `curl` (no JS execution) that each returns its
  own `<title>`, `<h1>`, and body copy in the right language. Each has its
  own `metadata` export (title/description/OG locale) plus
  `alternates.canonical` + `alternates.languages` (hreflang, both directions
  + `x-default` → `/`).
- `lib/i18n-context.tsx` — `I18nProvider` now takes an optional `fixedLang`
  prop. Set (on `/` and `/es`): language comes from the URL, no
  localStorage/browser detection, and the header's PT/ES toggle does a real
  `router.push` between the two routes instead of just flipping local state.
  Unset (the four legal pages, still wrapped by the root layout's provider):
  unchanged client-detected/toggleable behavior — **legal pages don't have
  their own `/es/...` routes yet**, they stay single-URL and infer language
  from `localStorage`, which `/` and `/es` keep in sync on every visit
  (including a direct/organic landing, not just a toggle click) so a visitor
  who was just on `/es` and clicks through to `/privacidade` sees it in
  Spanish. Verified with Playwright.
- `components/locale-redirect.tsx` — rendered only on `/`. First-ever visit,
  no stored preference yet, Spanish browser language → `router.replace`
  to `/es`. Never fires again once a preference is recorded (won't fight a
  visitor who deliberately navigates back to `/`). This replaces the old
  content-swap auto-detect with a real navigation. Verified with Playwright
  using both `es-ES` and `pt-PT` browser locales.
- `WhatsappFab` moved from the root layout into each page tree individually
  (`app/page.tsx`, `app/es/page.tsx`, `components/legal-page-layout.tsx`) —
  it has to be a descendant of whichever `I18nProvider` is active to show the
  right country's phone number. It was rendered as a sibling of `{children}`
  in the root layout before, which would've shown the PT number on `/es`.
  Verified per-route with Playwright (`wa.me/351...` vs `wa.me/34...`).
- **Known limitation:** `<html lang="...">` is still hardcoded `"pt"` in the
  root layout and only gets corrected client-side after mount (same
  `document.documentElement.lang = lang` effect as before). Only the root
  layout can render `<html>`/`<body>` in the App Router, so getting this
  server-side-correct on `/es` needs converting to an `app/[lang]/layout.tsx`
  dynamic-segment structure — a bigger refactor than this pass, and the
  content/title/hreflang (the parts that actually matter most for ranking)
  are already correct server-side. Low priority to fix, but real.

**Not done yet — the rest of Phase 2 and all of Phase 3:** dedicated
service/about/contact pages as real routes (currently still anchor sections
within `/` and `/es`, not separately indexable — this was the other half of
the original Phase 2 plan and didn't happen in this pass), blog/insights
content, city/region pages, case studies.

## Known pending items (don't forget these)

- Whether to reference the Nudimu group relationship in on-site copy.
- No B2B quote-request form currently exists (see Forms section above).
- Rest of SEO Phase 2 (dedicated service/about/contact pages as real routes)
  and all of Phase 3 (content) — see SEO section above.
- `<html lang>` is still server-side hardcoded to `"pt"` — see SEO section's
  "Known limitation" for why and what fixing it properly would take.
- Legal pages don't have `/es/...` equivalents yet — still single-URL,
  client-detected language (kept in sync from `/` and `/es`, see SEO section).
- More real photos are welcome any time — drop in `source-images/`, they'll
  get optimized into `public/img/` and slotted into the relevant section.

## Commands

```bash
npm run dev      # local dev server, http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint     # eslint
```

## Deploy

Vercel, auto-deploys on push to `main`. `vercel.json` explicitly pins
`"framework": "nextjs"` (the Vercel project was originally set up for a
pre-migration static-site deploy — don't remove that line or the dashboard's
cached "Other" preset can win on redeploy).
