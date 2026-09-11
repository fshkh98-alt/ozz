# Ozaib — Personal Cybersecurity Portfolio

Bilingual (Arabic/English) personal site: Digital CV + Portfolio + Blog +
Writeups, fully content-aware (empty sections stay hidden) and fully
manageable from `/admin` without touching code.

This package contains the completed Phase 5 implementation. It includes the full database
schema, auth scaffolding, design system, i18n, content-aware navigation, and
a working homepage/about/skills page — but not yet the full Admin CRUD UI or
every content page (those come in the next phases, exactly as planned in
`ozaib-phase1-architecture.md`).

## Features

- Next.js App Router, TypeScript, Tailwind, RTL/LTR i18n (`ar`/`en`)
- Prisma schema covering every content type from the spec (skills, projects,
  experience, education, certifications, blog, writeups, achievements,
  social links, media, messages, site settings, analytics)
- Dark/Light/System theme, saved per-visitor
- Content-aware `Navbar`/`Footer` (a nav item only renders if that content
  type has at least one row in the database)
- Auth.js (NextAuth) credentials-based admin login at `/admin/login`,
  middleware-guarded `/admin/*`
- Rate-limited, honeypot-protected `/api/contact` endpoint
- `robots.ts` / `sitemap.ts`, security headers (CSP, X-Frame-Options, etc.)
- Seed script that creates **only** one admin account + default settings —
  zero fake content

## Tech stack

Next.js 15 · TypeScript · PostgreSQL · Prisma · Auth.js · Tailwind CSS ·
Zod · deployed on Vercel

## Getting started (local)

```bash
npm install

cp .env.example .env
# then fill in DATABASE_URL, AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

npx prisma migrate dev --name init
npm run db:seed        # creates your one admin account only

npm run dev
```

Visit `http://localhost:3000` (redirects to `/ar`) and
`http://localhost:3000/admin/login` to sign in with the admin credentials
you set in `.env`.

### Generating `AUTH_SECRET`

```bash
openssl rand -base64 32
```

## Database setup

Any PostgreSQL provider works. For Vercel, the two easiest options:

- **Neon** (https://neon.tech) — free tier, native Vercel integration
- **Supabase** (https://supabase.com) — free tier, includes storage too
  (useful later for the Media Library)

Copy the connection string they give you into `DATABASE_URL`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel → New Project.
3. Add environment variables in Vercel's dashboard (same keys as `.env.example`,
   with production values — **never commit real secrets to git**).
4. Set the Vercel Postgres/Neon/Supabase connection string as `DATABASE_URL`.
5. In Vercel's build settings, make sure migrations run on deploy — add a
   `postinstall` script or a Vercel deploy hook that runs
   `npx prisma migrate deploy`.
6. Run the seed script **once**, from your local machine, pointed at the
   production `DATABASE_URL` (or via `vercel env pull` + `npm run db:seed`),
   to create your one admin account.
7. Deploy. Then log in at `https://yourdomain.com/admin/login` and start
   adding real content — nothing appears on the public site until you do.

## Security notes

- No public `/register` route — the only way to create an admin is the seed
  script, run manually with credentials you choose.
- Passwords hashed with bcrypt (cost 12).
- Sessions are JWT-based, HttpOnly/Secure cookies.
- `/admin/*` is guarded both in `middleware.ts` and (to be added per-route as
  Admin CRUD endpoints are built) inside each Server Action / API handler —
  never trust the middleware alone.
- Contact form: server-side Zod validation, honeypot field, and a basic
  in-memory rate limiter (swap for Upstash Redis in a multi-instance/
  production deployment — see the comment in `src/app/api/contact/route.ts`).

## Public pages

All remaining public pages are now built, following the same pattern as
Home/About/Skills: Server Components reading straight from Prisma, an
`EmptyState` when there's no data yet, and full AR/RTL + EN/LTR support.

- `/projects` + `/projects/[slug]`
- `/experience`, `/education`, `/certifications`, `/achievements`
- `/blog` + `/blog/[slug]` (with per-post SEO metadata via `generateMetadata`)
- `/writeups` + `/writeups/[slug]`
- `/contact` — client-side form posting to the existing `/api/contact`
  (honeypot + rate limit + Zod, unchanged)
- `/resume` — shows the CV download button only if one has been uploaded
  via Settings, otherwise a clean empty state
- Navbar now includes a working mobile hamburger menu, and conditionally
  shows Resume/Contact based on real data (`SiteSettings.cvUrl`)

**Still simplified for now, to be finished in the Admin phase:**
- Blog/Writeup `content` is rendered as plain text — the rich MDX renderer
  (headings, code blocks with syntax highlighting, tables, images) needs the
  same content structure the Admin's rich-text editor will produce, so it's
  best built together with that editor rather than guessed at now.
- No content exists in the database yet in this delivered package (by
  design — see rule #50 in the original brief), so every one of these pages
  will show its `EmptyState` until you add real content. Once the Admin CRUD
  is built, or you insert rows directly via Prisma Studio (`npx prisma
  studio`), they'll populate immediately — no code changes needed.

## Admin Dashboard

The full Admin CRUD is now built at `/admin`, structured exactly as specified:

- **Auth**: `/admin/login` (its own unguarded route group) → everything else
  lives in a `(protected)` route group whose layout checks the session
  server-side and redirects to login otherwise — on top of the existing
  `middleware.ts` guard and the `requireAdmin()` check inside every single
  Server Action that writes data (three independent layers, as the brief
  asked for).
- **Sidebar** matches the requested structure: Dashboard → Content (Blog,
  Writeups, Projects, Achievements) → Profile (About, Skills, Experience,
  Education, Certifications) → Social Links, Media, Messages, Analytics,
  SEO, Settings.
- **Full Create/Read/Update/Delete** for: Skills, Projects, Experience,
  Education, Certifications, Achievements, Social Links, Blog posts, and
  Writeups — each with its own list page (table, edit links), a "New" form,
  and an "Edit" form, all backed by Zod-validated Server Actions that
  `revalidatePath()` both the admin list and the corresponding public pages.
- Blog/Writeup forms auto-create/attach **Categories and Tags** from plain
  comma-separated input (no separate tag-management UI needed yet).
- **Profile** (About) and **Settings** are single-record edit forms (no
  list/create, since there's only ever one of each).
- **Messages**: list, mark read/unread, delete.
- **Delete confirmation** on every destructive action (`DeleteButton`
  component uses a native `confirm()` dialog before submitting).

**Intentionally left as documented follow-ups, not silently skipped**
(rich text editing is now done — see Phase 5 below):
- **Media upload** — `/admin/media` explains why: real file upload needs a
  storage provider (Vercel Blob / S3 / Supabase Storage) and its own
  credentials, which only you can choose and provision. Every image/file
  field across the whole site (avatar, project images, blog covers,
  certificate files, CV) already accepts a plain URL in the meantime, so
  nothing is blocked — you can host files anywhere and paste the link.
- **Analytics collection** — `/admin/analytics` reads from the `PageView`
  table and will show real numbers as soon as a small per-request logger is
  added; it's not included yet so no visitor data is collected before you
  decide exactly what you want tracked.
- **Structured data / Open Graph images per page** — noted in Phase 1, not
  yet implemented.

## Rich text editor

The "plain textarea for now" placeholder in Blog/Writeup forms is replaced
with a real WYSIWYG editor:

- **Editor**: Tiptap (`src/components/admin/RichTextEditor.tsx`) — bold,
  italic, strikethrough, headings, bullet/numbered lists, blockquote, inline
  code, **code blocks with syntax highlighting** (Python, JavaScript,
  TypeScript, C++, Java, Bash, HTML, CSS, SQL, JSON, via `lowlight` +
  `highlight.js`), links, images (URL-based, consistent with the rest of
  the site), and tables. It mirrors its HTML into a hidden `<input>`, so it
  plugs into the existing plain `<form action={serverAction}>` pattern with
  no extra client-side wiring.
- **Security**: the HTML is sanitized server-side with `sanitize-html`
  (`src/lib/sanitize.ts`) — a strict allow-list of tags/attributes — both
  when it's saved (in the Blog/Writeup Server Actions) and again when it's
  rendered on the public page, so a direct database edit can never
  reintroduce something unsafe. `<script>`, inline event handlers, and
  `javascript:` URLs are stripped either way; this is what satisfies the
  brief's "Output Encoding / XSS Protection" requirement for user-authored
  content specifically.
- Public `/blog/[slug]` and `/writeups/[slug]` now render this HTML
  directly (inside the existing `.prose` styling) instead of showing plain
  text. Reading time is computed from the sanitized HTML with tags stripped
  first, so it stays an accurate word count.
- Added `@tailwindcss/typography` (needed for the `prose`/`prose-invert`
  classes already used across the site) and a `highlight.js` theme
  stylesheet import in both the public and admin layouts.

**Honest caveat**: this sandbox has no network access, so none of this
(`npm install`, `next dev`, `next build`) has actually been run or
type-checked here — only written by hand against the documented Tiptap v2 /
lowlight v3 / sanitize-html APIs. Run `npm install` locally; if a peer
dependency wants a slightly different Tiptap/lowlight version pairing than
what's pinned in `package.json`, bump to whatever `npm install` resolves —
the code itself doesn't depend on an exact patch version.

## What's not built yet

- Media upload and analytics logging (see Phase 4 notes above for why)
- Structured data (Person/Article schema) and per-page Open Graph images

Everything else from the original 50-point brief is implemented and wired
end-to-end: add a project in `/admin/projects`, and it appears on
`/projects` immediately — no code changes, matching rule #50 from the
original brief.
