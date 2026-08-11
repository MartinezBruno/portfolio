# Handoff: Bruno Martinez — Developer Portfolio

## Overview
A one-page personal portfolio for a software developer: hero, spec strip, About, three project cards, contact form and footer. Bilingual (EN/ES) with a runtime language toggle, a mobile drawer menu, client-side form validation with a success state, and GSAP-driven motion.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (React, Next.js, Vue, Astro, etc.) using its established patterns, component library and build tooling. If no codebase exists yet, pick the framework that fits the project (a static-site generator or Next.js is a good fit for a portfolio) and implement there.

`Portfolio.dc.html` is authored for a streaming design-component runtime (`support.js`, `<x-dc>`, `{{ }}` template holes, `<sc-for>`/`<sc-if>`). **Do not port that runtime.** Read it as markup + a plain JS class: the template is the DOM, the class is the state/handlers. Every visual value is inline on the element it belongs to.

## Fidelity
**High fidelity.** Colors, typography, spacing, motion timings and copy are final. Recreate pixel-accurately, then substitute the codebase's own primitives where they exist.

---

## Design system
The design consumes the **Industry** design system (steel-blue technical wireframe: light ground, Barlow Condensed headings over Barlow, square corners, hairline borders, `+` registration marks at card corners). Its stylesheet lives at `_ds/industry-<id>/styles.css` and is included in this bundle.

The accent was overridden from Industry's steel blue to **#FEDA0A** (yellow, from the client's own Figma file), and the ground from Industry's cool #f2f2f3 to a **warm bone #F2EFE6**. Those overrides are the `:root` block at the top of the `<style>` in `Portfolio.dc.html` — reproduce them as your token layer.

Classes used from Industry: `.blueprint` (+ four `<i class="corner tl|tr|bl|br">` children), `.btn`, `.btn-primary`, `.btn-secondary`, `.tag`, `.tag-accent`, `.tag-outline`, `.duotone`.

---

## Design Tokens

### Color
| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | #F2EFE6 | page ground (warm bone) |
| `--color-surface` | #E9E5D9 | raised/tinted surfaces |
| `--color-text` | #1E1E1C | body + headings (~15:1 on ground) |
| `--color-divider` | `color-mix(in srgb, #1E1E1C 18%, transparent)` | all hairlines, 1px |
| `--color-neutral-900` | #222222 | contact band ground |
| `--color-accent` / `-500` | #FEDA0A | fills, rules, marks, primary button, accents on dark |
| `--color-accent-100` | #fffbe6 | hover tint |
| `--color-accent-200` | #fff3b8 | |
| `--color-accent-300` | #ffe97a | |
| `--color-accent-400` | #fee23f | primary button hover |
| `--color-accent-600` | #d9b800 | primary button active, tag-outline border |
| `--color-accent-700` | #a58c00 | (too weak for text on this ground — avoid) |
| `--color-accent-800` | #6f5e00 | **all accent-colored text on the light ground** (~6.9:1) |
| `--color-accent-900` | #4a3f00 | link hover |

Contrast rule: raw #FEDA0A is only 1.4:1 on the bone ground — it may only be used for fills, rules, borders and text on the #222222 band. Accent text on light **must** be `--color-accent-800`.

Error text on the dark contact band: **#ffb4b4**.

### Typography
- Headings: **Barlow Condensed** (400/500/600/700), Google Fonts.
- Body: **Barlow** (400/500/600/700), Google Fonts.
- H1 (name): 92px / line-height 0.92 / weight 700 / letter-spacing -0.02em / uppercase. Breakpoints: 58px ≤900px, 46px ≤520px.
- Section H2: 48px / 700 / -0.01em / uppercase. 34px ≤900px.
- Project H3: 30px / 700 / -0.01em / uppercase.
- Role line: 24px Barlow Condensed 600 / +0.02em / uppercase / `--color-accent-800`.
- Nav links, buttons: 15px Barlow Condensed 600 / +0.02–0.08em / uppercase.
- Kickers / labels: 12–13px Barlow Condensed / +0.16em / uppercase / `color-mix(--color-text 55%, transparent)`.
- Body copy: 15–19px Barlow 400 / line-height 1.6–1.65 / `text-wrap: pretty`.
- Section index numbers ("01"): 12–13px / +0.2em / `--color-accent-800` (or raw accent on the dark band).

### Spacing & geometry
- Content column: `max-width: 1200px`, side padding 24px.
- Section rhythm: 110px top padding between sections; hero 84px top; contact band 92px vertical.
- Grid gaps: 56px (hero/about/contact columns), 28px (project cards).
- **Border radius: 0 everywhere.** All borders 1px `--color-divider`.
- No surface fills on cards or figures — they are line drawings. The primary button is the one solid object.
- Shadows: only `--shadow-lg` on the mobile drawer.

---

## Screens / Views

### 1. Header (sticky)
- 62px tall, sticky top, z-index 40, `backdrop-filter: blur(8px)`, background `color-mix(in srgb, var(--color-bg) 88%, transparent)`, 1px bottom divider.
- Left: brand `<Bruno/>` — 22px Barlow Condensed 700; the `<` and `/>` chevrons in `--color-accent-800`, "Bruno" in `--color-text`. Links to `#top`.
- Right (>900px): ABOUT · PROJECTS · CONTACT anchors (8px 14px padding; hover = `--color-accent-800` text on `--color-accent-100`), then an EN/ES pair inside a 1px divider box, 12px to the left. Active language: `--color-accent` background, `--color-text` label. Inactive: transparent.
- Right (≤900px): the nav is hidden and a 40×40 hamburger button (1px divider border, Lucide `menu` icon at stroke 1.5) shows instead.

### 2. Mobile drawer
- Fixed right, `min(340px, 86vw)` wide, full height, z-index 50, ground `--color-bg`, 1px left divider, `--shadow-lg`.
- Slides in: `translateX(102%) → translateX(0)`, 340ms `cubic-bezier(.2,.7,.3,1)`.
- Scrim: fixed inset 0, z-index 45, `rgba(29,31,32,0.5)`, opacity 0↔1 over 300ms, `pointer-events` toggled with state. Click closes.
- Header row: 62px, "MENU" label + 36×36 close button (Lucide `x`).
- Three nav rows: 18px/24px padding, 1px bottom divider, 28px Barlow Condensed 600 uppercase, prefixed by a 12px `--color-accent-800` index ("01"/"02"/"03") with 14px gap. Any click closes the drawer.
- Footer block: "LANGUAGE" label + the ENGLISH/ESPAÑOL toggle.

### 3. Hero
- Grid `1.35fr 1fr`, 56px gap, `align-items: start`. Collapses to one column ≤900px (figure capped at 320px).
- Left: H1 "BRUNO / MARTINEZ" on two masked lines → role line → 17px blurb (`max-width: 46ch`) → button row (12px gap):
  - Primary: `.btn .btn-primary .blueprint` + 4 corner marks, 12px/22px padding, 15px, +0.06em, uppercase, links `#contact`.
  - Secondary: `.btn .btn-secondary`, same metrics, `border-radius: 0`, links `#projects`.
- Right: `figure` → `.blueprint` wrapper with 10px padding and 4 corner marks → a 4:5 image box. In the prototype this is an `<image-slot>` (drag-and-drop placeholder) holding the user's LinkedIn profile photo; **in production this is a plain `<img>`** — export the filled image and ship it as a static asset. No duotone on the portrait (deliberate: true color).
- Caption row under the figure: 12px Barlow Condensed, +0.12em, uppercase, `justify-content: space-between` — "FIG. 01 — B. MARTINEZ" and "RATIO 4:5".

### 4. Spec strip
- 4 equal cells inside one 1px divider box, 64px below the hero. Each cell: 20px/22px padding, 1px right divider (last has none).
- Cell = 12px +0.16em uppercase muted label over a 20px Barlow Condensed 600 uppercase value.
- Cells: ROLE / Developer · FOCUS / Web apps · CORE STACK / JS · PHP · React · STATUS / Open to work (value in `--color-accent-800`, preceded by an 8×8 `--color-accent` square).
- ≤900px: 2×2 (dividers rebalanced). ≤520px: single column.

### 5. About
- Header row: "01" index · H2 · a `flex: 1` 1px divider rule.
- Grid `1.25fr 1fr`, 56px gap.
- Left: 19px lead paragraph + 17px secondary paragraph at 74% text opacity.
- Right: `.blueprint` card, 26px padding, 4 corner marks. Label "TOOLS & TECHNOLOGIES", then `.tag .tag-outline` chips in a wrapping flex with 8px gap, `border-radius: 0`, Barlow Condensed +0.06em uppercase.
- Chips: JavaScript, TypeScript, React, Node.js, PHP, MySQL, PostgreSQL, Git, Figma, REST APIs.

### 6. Projects
- Header row: "02" index · H2 · rule.
- `grid-template-columns: repeat(3, 1fr)`, 28px gap; single column ≤900px.
- Card = `article.blueprint`, 16px padding, `flex-direction: column`, 16px gap, 4 corner marks. Contents in order:
  1. Image box: 16:10, 1px divider border, `overflow: hidden`, `object-fit: cover`, `object-position: top center`. **No color filter** (duotone was removed deliberately). If a project has no screenshot, render instead a hatched placeholder — `repeating-linear-gradient(135deg, transparent 0 9px, color-mix(in srgb, var(--color-text) 7%, transparent) 9px 10px)` — centered "IMAGE PENDING" label on a `--color-bg` plate.
  2. Title row: 12px `--color-accent-800` index ("01") + 30px H3.
  3. 15px description at 76% text opacity.
  4. Stack chips: `.tag .tag-accent`, 6px gap.
  5. Button row pinned to the bottom (`margin-top: auto`): `.btn-primary` "View page" + `.btn-secondary` "View code".
- Content (placeholder — **replace with real data**): 01 InstaBlogs (JavaScript · PHP · MySQL), 02 Portfolio "Mart" (HTML · CSS · JavaScript), 03 Task Board (React · Node · PostgreSQL, no screenshot). All `href` values are currently `#`.

### 7. Contact
- Full-bleed band, ground `#222222`, text `#f2f2f3`, 92px vertical padding, 110px above it.
- Header row: "03" index in raw `--color-accent` · H2 in #f2f2f3 · rule `rgba(255,255,255,0.22)`.
- Grid `1fr 1.2fr`, 56px gap.
- Left: 19px blurb at 82% white, then three full-width link rows (16px vertical padding, 1px `rgba(255,255,255,0.22)` top+bottom rules, 18px Barlow Condensed 600 uppercase, `space-between` with a Lucide arrow/download icon at stroke 1.5): LinkedIn (https://www.linkedin.com/in/bmartinez-dev/), GitHub (`#`), Download CV (`#`). Hover → `--color-accent`.
- Right: `.blueprint` card, 30px padding, border `rgba(255,255,255,0.3)`, 4 corner marks. Holds the form OR the success state.
  - Fields (name / email / message-textarea, 20px gap): 12px +0.16em uppercase label at 70% white; input background `rgba(255,255,255,0.06)`, 1px `rgba(255,255,255,0.3)` border, radius 0, 12px/14px padding, 15px Barlow, `#f2f2f3` text; a 13px #ffb4b4 error line with `min-height: 17px` reserved under each field (no layout shift).
  - Submit: `--color-accent` fill, `--color-text` label, 1px accent border, radius 0, 13px/30px padding, 15px Barlow Condensed 600 +0.08em uppercase, `.blueprint` + corner marks. Hover: background #fff and `translateY(-2px)` over 180ms; active returns to `translateY(0)`.
  - Success state: 54×54 square outlined in `--color-accent` with a Lucide `check`; 34px H3 "MESSAGE SENT"; 16px body at 78% white (`max-width: 42ch`); a ghost "SEND ANOTHER" button (transparent, 1px `rgba(255,255,255,0.4)`, hover `rgba(255,255,255,0.1)`) that returns to the form.

### 8. Footer
- Inside the 1200px column, 28px/24px/40px padding, `space-between`, 13px Barlow Condensed +0.12em uppercase, muted. "© 2026 Bruno Martinez" and the credit line.

---

## Interactions & Behavior

### Navigation
- `html { scroll-behavior: smooth }` + `#about` / `#projects` / `#contact` anchors. Header is sticky, so add `scroll-margin-top: 62px` on the section targets in production.
- Drawer opens from the hamburger, closes on scrim click, close button, or any nav link.

### Language toggle
- Two languages, EN default. Every string comes from a `COPY` dictionary keyed `en`/`es` (see `Portfolio.dc.html` logic class — it is the complete translation file; lift it wholesale). Project descriptions are per-language; titles, stacks and image URLs are shared.
- In production, prefer the framework's i18n (next-intl, vue-i18n…), persist the choice to `localStorage`, and set `<html lang>` accordingly.

### Form validation (client-side, on submit)
- name: required.
- email: required + `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`.
- message: required + minimum 10 characters.
- Messages are localized (`errRequired` / `errMail` / `errShort`). On success the form is replaced by the success state; "send another" resets. **No backend is wired** — point it at a form service or an API route.

### Motion (GSAP 3.13 + ScrollTrigger, both free)
Loaded from `https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/`. In production install `gsap` from npm and register ScrollTrigger. All motion is skipped when `prefers-reduced-motion: reduce` or the `motion` flag is false. **Initial hidden states are set by GSAP, never in CSS** — if the library fails to load the page is simply static and fully visible.

On load (single timeline, ease `power4.out` unless noted):
| Target | From | Duration |
| --- | --- | --- |
| `[data-hero-line]` (name lines, each inside an `overflow: hidden` mask) | `yPercent: 112` | 0.7s, stagger 0.06 |
| `[data-hero-copy]` (role, blurb, buttons) | `y: 20, opacity: 0` | 0.5s, stagger 0.06, overlap -0.42 |
| `[data-hero-fig]` | `clipPath: inset(0% 0% 100% 0%)`, ease `power3.inOut` | 0.75s, overlap -0.75 |
| figcaption | `opacity: 0` | 0.35s, overlap -0.2 |

On scroll (`start: "top 88%"`, `once: true`):
- Spec-strip cells: `y: 16, opacity: 0`, 0.42s, 0.06s stagger.
- About and contact blocks: `y: 26, opacity: 0`, 0.55s, ease `power3.out`.
- Section header rules: `scaleX: 0` from `left center`, 0.7s, ease `power3.inOut`.
- **Project cards — diagonal expansion from the top-left corner:** `clipPath` from `polygon(0% 0%, 0% 0%, 0% 0%)` to `polygon(0% 0%, 230% 0%, 0% 230%)`, 0.62s ease `power3.inOut`, 0.09s stagger per card; then the four `.corner` marks pop in from `opacity: 0, scale: 0.4`, 0.24s, 0.04s stagger, ease `back.out(2.4)`, overlapping -0.24; finally `clearProps: "clipPath"`.
- Parallax (scrubbed): hero figure `y: -46` (>900px only, scrub 0.6); each project image `scale 1.14 → 1` across its card's scroll span.

Safety pass (keep it): 2.6s after boot, anything still at opacity < 0.99 or holding a degenerate clip polygon is animated to its resting state. This guards against hosts where the page is scrolled by an outer container and ScrollTrigger never fires. Once running on a normal page in a real browser, this can be dropped.

### Hover / focus
- Nav links: `--color-accent-800` on `--color-accent-100`.
- `.btn-primary`: hover `--color-accent-400`, active `--color-accent-600`, label always `--color-text`.
- Contact link rows: → `--color-accent`.
- Submit: white fill + 2px lift.
- Focus: Industry's `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px }`. Note the yellow ring is weak on the bone ground — consider `--color-accent-800` for the ring in production.

## Responsive behavior
- `>900px`: full desktop grids as described.
- `≤900px`: desktop nav → hamburger + drawer; hero, about and contact collapse to one column (gaps 36px/32px); projects to one column; spec strip 2×2; H1 58px, H2 34px; hero figure capped at 320px.
- `≤520px`: H1 46px; spec strip single column.
- Not yet built: tablet-specific 2-column project grid; consider `repeat(auto-fit, minmax(320px, 1fr))`.

## State Management
| State | Type | Trigger | Effect |
| --- | --- | --- | --- |
| `lang` | `"en" \| "es"` | EN/ES buttons (header + drawer) | swaps every string from `COPY` |
| `menuOpen` | boolean | hamburger / scrim / close / any drawer link | drawer transform + scrim opacity and pointer-events |
| `sent` | boolean | valid submit / "send another" | form ↔ success state |
| `errors` | `{name?, mail?, message?}` | submit | per-field error lines |

No data fetching. Projects and copy are static module constants (`COPY`, `PROJECTS`) — in production move them to content files (MDX/JSON/CMS).

## Assets
| File | Origin | Notes |
| --- | --- | --- |
| `assets/avatar.png` | illustrated avatar from the client's Figma file | superseded by the real LinkedIn photo dropped into the hero slot — **export that image and ship it as a static asset** |
| `assets/project-instablogs.png` | Figma file | project 01 screenshot |
| `assets/project-mart.png` | Figma file | project 02 screenshot |
| Icons | **Lucide**, stroke-width 1.5, inline SVG on `currentColor` | menu, x, arrow-up-right, download, check |
| Fonts | Google Fonts — Barlow, Barlow Condensed (400/500/600/700) | self-host in production |

## Open items before launch
1. Real bio, spec-strip values and project descriptions — the current copy is plausible placeholder text (LinkedIn could not be read programmatically).
2. Real `href`s for every "View page" / "View code" button, GitHub and the CV download (all `#` today).
3. Project 03 needs a screenshot (renders as the hatched "image pending" cell).
4. A backend or form service for the contact form.
5. Export the hero portrait from the prototype's image slot as a static asset.
6. Meta/OG tags, favicon, sitemap — none exist in the prototype.

## Files
| File | What it is |
| --- | --- |
| `Portfolio.dc.html` | the design: template (markup + inline styles) then the logic class (`COPY`, `PROJECTS`, state, validation, GSAP timeline) |
| `image-slot.js` | the drag-and-drop image placeholder used for the hero portrait — prototype-only, do not port |
| `support.js` | the streaming design-component runtime — **do not port** |
| `_ds/industry-<id>/styles.css` | the Industry design system stylesheet (tokens + `.blueprint`, `.btn`, `.tag`, `.card`, `.duotone`…) |
| `_ds/industry-<id>/readme.md` | the design system's own usage guide |
| `assets/` | images |
