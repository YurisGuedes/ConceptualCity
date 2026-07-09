# Conceptual City — Website

Institutional site for Conceptual City (skilled construction labor supply,
Portugal + Spain). Next.js 16 (App Router, Turbopack) + React 19 + TypeScript +
Tailwind v4 + shadcn primitives, deployed on Vercel.

This file is written so a fresh chat (Claude Code or otherwise) can pick up
this project cold. Read it before making changes.

## Stack & structure

- `app/page.tsx` — assembles the whole one-page site from `components/sections/*.tsx`, in order.
- `app/globals.css` — **the actual design system.** Marketing sections are NOT built with Tailwind utility classes — they use hand-written CSS custom properties and classes (`--amber`, `.wrap`, `.pad`, `.sec-title`, `.btn`, `.card`, etc.), organized in numbered section comments. Tailwind v4 + shadcn (`components.json`, `components/ui/*`) are present but only lightly used (see below) — match the existing custom-CSS convention for any new section rather than introducing Tailwind utility markup.
- `lib/i18n-context.tsx` + `lib/translations.ts` — i18n. Two languages: `pt` (default/primary market) and `es`. All copy lives as flat keys in `translations.ts`. On first visit (no saved preference), the language is auto-detected from the browser (`navigator.language` starting with `es` → Spanish, everything else → Portuguese); after that the user's toggle choice is persisted to `localStorage` under `cc-lang`.
- `lib/contact-data.ts` — phone/WhatsApp/email/address/map-embed per language.
- `components/scroll-effects.tsx` — reveal-on-scroll (`.reveal`/`.stagger` classes) via `IntersectionObserver`, plus the services-card tilt effect. Runs once on mount.
- `components/site-header.tsx` / `site-footer.tsx` — global chrome. Mobile nav is a slide-in drawer; body scroll is locked while it's open (`body.menu-open`).
- `components/whatsapp-fab.tsx` — floating WhatsApp button, bottom-right, on every page (wired in `app/layout.tsx`). Uses the current language's WhatsApp number from `contact-data.ts`.
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

## Privacy policy (`/privacidade`)

Minimal but real GDPR/RGPD notice (data collected, purpose, retention,
rights), written to actually support the careers form's consent checkbox.
The page still has an inline note flagging the legal identity as pending —
that's now resolved (see SEO section below: Jesus Lamas Alvarez, NIF
76356554G, sole proprietor, no NIPC), just not yet written into the page
content. That update, plus the Aviso Legal / Cookies / Acessibilidade pages,
is planned but not started — see "Known pending items."

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

The SEO work is planned in phases; **Phase 1 (technical foundations) is done**:

- `app/robots.ts`, `app/sitemap.ts` — sitemap currently only lists `/` and
  `/privacidade`, the only two real routes that exist today. Add every new
  route here as Phase 2/3 pages get built.
- `app/layout.tsx` — `metadataBase`, canonical, Open Graph + Twitter card
  metadata. **Known limitation:** this is all server-rendered and therefore
  PT-only — the ES version only ever patches `<title>`/meta description
  client-side after the language toggle fires (see `lib/i18n-context.tsx`),
  so crawlers never see it. Real per-language `<head>` output needs Phase 2's
  routing.
- `components/structured-data.tsx` — JSON-LD (`EmploymentAgency`), one node
  per country (PT/ES) rather than one node with two addresses, matching
  Google's structured-data guidance for multi-location businesses.
- `lib/site-config.ts` — `SITE_URL` (fed by `NEXT_PUBLIC_SITE_URL`, currently
  falls back to the `.vercel.app` URL — **set this env var once a custom
  domain goes live**, it feeds metadataBase/canonical/sitemap/robots/JSON-LD
  everywhere), `SITE_NAME`, `LEGAL_NAME`.
- Alt-text and heading-hierarchy audit: already clean, nothing to fix (every
  `<img>` has descriptive alt text, exactly one `<h1>` per page).

**Not done yet** — Phase 2 (real per-language routes + dedicated service/
about/contact pages, fixes the PT-only-crawlable problem above — this is the
single biggest remaining SEO lever) and Phase 3 (blog/insights content, city
pages, case studies). Ask the user before starting Phase 2, it's a real
restructuring that touches nearly every route.

## Known pending items (don't forget these)

- Legal pages beyond `/privacidade`: Aviso Legal, Política de Cookies,
  Declaração de Acessibilidade — content plan agreed (Portugal-correct law,
  honest cookie audit, accessibility *commitment* rather than a compliance
  claim under a Spanish public-sector law that doesn't apply) but not yet
  written. Real identity to use: Jesus Lamas Alvarez, NIF 76356554G (see SEO
  section above) — no NIPC needed, this isn't a registered company.
- Whether to reference the Nudimu group relationship in on-site copy.
- No B2B quote-request form currently exists (see Forms section above).
- SEO Phase 2 (real routes) and Phase 3 (content) — see SEO section above.
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
