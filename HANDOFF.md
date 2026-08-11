# Handoff — continue tomorrow

Status of the **Bruno Martinez portfolio** (Astro + all-Cloudflare). The site is
built and verified locally. What remains is getting it onto GitHub and live on
Cloudflare, plus final content. Pick up here.

---

## 0. Where things stand

- ✅ Full site built: one-page, bilingual **EN (`/`) / ES (`/es/`)**, all sections, GSAP motion, client-side form validation.
- ✅ Contact endpoint (`src/pages/api/contact.ts`) sends via the **Cloudflare `send_email` binding** (no Resend, no API key).
- ✅ Build + `wrangler deploy --dry-run` pass; all bindings validated.
- ⏳ Not done yet: **GitHub repo**, **deploy to Cloudflare**, **Email Routing** (required for the form to actually send), **custom domain**, and content (photo, links, CV, OG image).

### Run it locally
```bash
pnpm install          # if node_modules is missing
pnpm dev          # http://localhost:4321  (both / and /es/)
pnpm build        # production build → dist/
pnpm preview      # build + wrangler dev on the built worker
```
> Note: the contact form's **actual send only works once deployed** with Email
> Routing set up (step 3). Locally a valid submit returns 502 by design.

---

## 1. Create the GitHub repo

**Option A — GitHub CLI (fastest):**
```bash
# one-time: gh auth login   (run as: ! gh auth login)
gh repo create personal-portfolio --private --source=. --remote=origin --push
```
That creates the repo, adds `origin`, and pushes `main` in one go.

**Option B — manual:**
1. Create an empty repo at https://github.com/new (name e.g. `personal-portfolio`, no README/gitignore/license — the repo already has them).
2. Then:
   ```bash
   git remote add origin git@github.com:<your-username>/personal-portfolio.git
   git push -u origin main
   ```

---

## 2. Connect + deploy to Cloudflare

The project targets **Cloudflare Workers** (via `@astrojs/cloudflare`). Two ways —
CLI is simplest and already verified.

### Option A — CLI deploy (recommended)
```bash
# one-time: log in to Cloudflare   (run as: ! pnpm exec wrangler login)
pnpm run deploy
```
`pnpm run deploy` runs `astro build && wrangler deploy -c dist/server/wrangler.json`.
First deploy gives you a `*.workers.dev` URL to test immediately.

### Option B — Git-connected auto-deploy (Workers Builds)
In the Cloudflare dashboard → **Workers & Pages → Create → Connect to Git**:
1. Select the GitHub repo from step 1.
2. **Build command:** `pnpm build`
3. **Deploy command:** `pnpm exec wrangler deploy -c dist/server/wrangler.json`
   (the root `wrangler.jsonc` has the bindings but not `main`/`assets`; the
   adapter injects those into the generated `dist/server/wrangler.json` — so the
   deploy must point at that file.)
4. Every push to `main` then builds + deploys.

> Bindings/vars/flags live in **`wrangler.jsonc`** at the repo root (the
> `send_email` binding `SEB`, `nodejs_compat`, and `CONTACT_FROM`/`CONTACT_TO`).
> The adapter merges them into the generated config at build time — don't edit
> `dist/server/wrangler.json` by hand (it's regenerated + gitignored).

---

## 3. Cloudflare Email Routing — REQUIRED for the contact form

The `send_email` binding can only deliver to a **verified destination address**.
Until this is done, real submissions fail.

1. Cloudflare dashboard → your `bmartinez.dev` zone → **Email → Email Routing**.
2. Enable Email Routing (it adds the needed **MX/SPF DNS records** for you — one click since the domain is already on Cloudflare).
3. Under **Destination addresses**, add **`bmartinez.fullstack@gmail.com`** and click the verification link Cloudflare emails you.
4. That address is already wired as the binding's destination in `wrangler.jsonc`
   (`send_email[0].destination_address`) and as `CONTACT_TO`. The sender is
   `CONTACT_FROM = form@bmartinez.dev` (an address on your verified domain).

After this, redeploy (or it's already deployed) and a real form submit lands in
your Gmail, with the visitor's email as **Reply-To**.

---

## 4. Custom domain `bmartinez.dev`

Registered at Cloudflare Registrar already. Point it at the Worker:

1. Cloudflare dashboard → **Workers & Pages → `personal-portfolio` → Settings → Domains & Routes**.
2. **Add custom domain** → `bmartinez.dev` (and optionally `www.bmartinez.dev`).
   DNS + TLS are automatic since the domain is in your account.
3. `astro.config.mjs` already sets `site: 'https://bmartinez.dev'` (canonical URLs, sitemap, hreflang).

---

## 5. Final content (works with placeholders today)

In `src/data/projects.ts` and `public/`:
- [ ] Real hero photo → replace `public/images/hero-portrait.png` (currently the placeholder avatar; design wants your real LinkedIn photo, true color).
- [ ] Real `live` / `code` URLs for each project, plus `contactLinks.github` and `contactLinks.cv` (all `#` today).
- [ ] Screenshot for **project 03 (Task Board)** → set its `img` (else it shows the hatched "image pending" cell).
- [ ] `public/og-image.png` (1200×630) for social/link previews — referenced in `BaseLayout.astro`.
- [ ] Optional: swap placeholder bio / spec-strip copy in `src/i18n/ui.ts` if you want different wording.

---

## Quick reference

| Thing | Where |
| --- | --- |
| Pages | `src/pages/index.astro` (en), `src/pages/es/index.astro` (es) |
| Sections | `src/components/*.astro` (`Portfolio.astro` composes them) |
| Copy (EN/ES) | `src/i18n/ui.ts` |
| Projects data | `src/data/projects.ts` |
| Contact endpoint | `src/pages/api/contact.ts` |
| Cloudflare config | `wrangler.jsonc` (root) |
| Design tokens / CSS | `src/styles/tokens.css`, `src/styles/global.css` |
| Client scripts | `src/scripts/{drawer,contact-form,motion}.ts` |
| Original design ref | `design/` (kept for reference, not built) |

### Gotchas already handled
- mimetext `Reply-To` needs a `new Mailbox(email)` instance (a bare string throws).
- `nodejs_compat` flag is required (mimetext imports `node:os`) — set in `wrangler.jsonc`.
- `output: 'static'` + `prerender = false` on the one API route (Astro removed `hybrid`).
