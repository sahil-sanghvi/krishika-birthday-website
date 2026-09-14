# Krishika Birthday Website — Design Spec

Date: 2026-09-13

## Purpose

A personal, static, single-page birthday website for Krishika: a digital
scrapbook combining childhood photos, family wishes, 20+ friend messages, a
general memory gallery, and a closing emotional message. Meant to be sent to
her directly as a surprise. Not a template — every section should read as
made specifically for her.

## Non-Goals

- No backend, database, authentication, or API. Fully static.
- No generic birthday clip-art, confetti/balloon overload, or childish UI.
- No invented personal information (real friend names, real messages, real
  photos) — content ships as clearly-labeled, structurally-realistic
  placeholders the owner fills in later.

## Tech Stack

- **Vite + React 18**, JavaScript (no TypeScript — content site, not worth the
  overhead).
- **Tailwind CSS** for styling.
- **Framer Motion** for scroll-reveal / entrance / stagger animations, all
  gated behind `prefers-reduced-motion` (via `useReducedMotion`).
- **embla-carousel-react** for the friends carousel (drag/swipe, responsive
  slides-per-view, custom arrow/dot UI, keyboard nav).
- **yet-another-react-lightbox** for the memory gallery lightbox (swipe,
  keyboard nav, captions, prev/next built in).
- **lucide-react** for icons.
- Google Fonts: **Fraunces** (display/headings) + **Inter** (body).

## Visual System

**Palette** (warm, nostalgic, premium — not childish):

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FDF8F3` | page background |
| `blush` | `#F4A9A8` | soft accents, backgrounds |
| `rose` | `#D88C9A` | primary accent |
| `terracotta` | `#C97B63` | secondary accent, CTAs |
| `plum` (text) | `#3D2C3E` | body/heading text |
| `gold` | `#D4A373` | dividers, highlights, small details |

**Typography**: Fraunces for all headings (warm, editorial, slightly
handwritten feel); Inter for body copy. Generous line-height and whitespace
throughout — this is a scrapbook, not a dashboard.

**Motif**: polaroid/scrapbook cards with slight rotation (-2deg to 3deg) and
warm drop shadows, straightening and lifting slightly on hover — used for
childhood photos and the friend photo collage.

## Content & Naming

- Her real first name, **Krishika**, is used directly in headings and copy
  (e.g. "Happy Birthday, Krishika ❤️") since it's not sensitive information
  being invented — it's the site's known subject.
- Friend names, family names, messages, and photos remain **placeholder data**
  (e.g. "Sarah — Best friend — [Add Sarah's message here]") since inventing
  fake personal details about real third parties is out of scope. The data
  files are structured so the owner can swap in real names/photos/messages
  file-by-file without touching UI code.
- The final closing message (Section 7) ships as an explicit placeholder
  block in `content.js` clearly marked for the owner to write personally.

## Placeholder Image Strategy

No real photos exist yet. Rather than pulling random stock/people photos
(which would be network-dependent and cosmetically misleading), all images
render through a shared `PlaceholderImage` component:

- Soft gradient card (rotating through the warm palette) + camera icon +
  caption like `"Add Krishika's photo here"` or `"Add Sarah's photo here"`.
- Used both when a data entry has no `image` path, and as the `onError`
  fallback for any real image path that fails to load — so a missing or
  broken file never visually breaks the layout.

## Data Layer

```
src/data/
  content.js    // { name: "Krishika", heroSubtitle, finalMessage (placeholder), ... }
  childhood.js  // [{ image, year, caption, description? }]
  family.js     // [{ name, relationship, image, message }]
  friends.js    // [{ name, image, message, relationship }] — seeded with 22 sample entries
  memories.js   // [{ image, caption, category }] for the masonry gallery
```

All content edits happen in these files only. No UI component hardcodes a
person's name, message, or image path.

## Image Directory

```
public/images/
  hero/
  childhood/
  family/
  friends/
  memories/
```
Empty for now (placeholders cover absence); paths in `src/data/*.js` point
here so dropping in real files "just works" without code changes.

## Component Breakdown

```
src/components/
  Navigation.jsx        // sticky nav, mobile hamburger, smooth-scroll to sections
  Hero.jsx              // entrance animation, scroll indicator
  ChildhoodGallery.jsx  // editorial polaroid layout, mixed sizes, rotations
  FamilySection.jsx     // intimate cards / vertical timeline
  FriendCarousel.jsx    // embla carousel: 1/2/3 per view responsive, arrows+dots+swipe+keyboard
  PhotoCollage.jsx      // scattered "people behind the memories" wall, hover/tap enlarge
  MemoryGallery.jsx     // masonry grid, opens Lightbox
  Lightbox.jsx          // thin wrapper around yet-another-react-lightbox
  FinalMessage.jsx      // closing section + "one last surprise" reveal
  PlaceholderImage.jsx  // shared gradient/icon/caption fallback, used everywhere
```

`App.jsx` composes sections in emotional order: Hero → Her Story (childhood)
→ Family → Friends (carousel + collage) → Memories → Final Message.

Each component receives its content via props/data imports — no section
component contains hardcoded copy beyond structural labels ("Previous",
"Next", etc.).

## Section-by-Section Behavior

1. **Hero** — full-viewport, name + subtitle + one hero photo (placeholder),
   Framer Motion entrance (fade+rise, staggered), animated scroll-down
   indicator. Must load fast — no heavy animation library gating first paint.
2. **Her Story (childhood)** — heading + editorial gallery: one large featured
   photo, smaller surrounding photos, polaroid rotation, hover lift, each
   card shows year + caption on hover/below.
3. **Family Wishes** — heading + cards (photo optional, name, relationship,
   message). Longer text allowed; card sizing accommodates variable message
   length without looking crowded (min-height + flexible text area, not fixed
   height truncation).
4. **Friends** — heading + Embla carousel, 22 seeded sample entries. Desktop
   ~3 visible, tablet ~2, mobile 1. Prev/next arrows, dot pagination, swipe,
   and keyboard (arrow keys) navigation when the carousel has focus.
5. **People Behind the Memories** — scattered/collage layout reusing friend
   photos, hover/tap subtle scale-up, kept visually calm (not overlapping
   chaotically).
6. **Memory Gallery** — masonry grid mixing all category photos (her, friends,
   family, trips, funny moments). Click opens Lightbox: full image, caption,
   prev/next, close, keyboard (arrows/Escape), and mobile swipe.
7. **Final Message** — "One more thing..." heading, explicit placeholder
   paragraph for the personal closing message (clearly commented in
   `content.js`), closing line "Happy Birthday, Krishika ❤️", final photo.
8. **Surprise Reveal** — a subtle "One last surprise..." button that reveals
   a hidden message/photo/animation inline (no jump-scare, no gimmick sound).

## Navigation

Sticky top nav: Home / Her Story / Family / Friends / Memories / ❤️ (scrolls
to Final Message). Compact hamburger menu on mobile, sliding panel, closes on
link click or outside tap. All links smooth-scroll via anchor + `scrollIntoView`.

## Animation Rules

Framer Motion `whileInView` fade-up reveals per section, staggered children
where useful (e.g. childhood gallery items, friend cards). Hover scale on
photos. No infinite bouncing/spinning, no confetti bursts, no autoplay sound.
All motion respects `prefers-reduced-motion: reduce` by swapping to instant/
no-op transitions via a shared `useReducedMotion` check.

## Responsiveness

Mobile-first Tailwind. Verified breakpoints: 375, 390, 430 (mobile), tablet
(~768), 1366 and 1920 (desktop). No horizontal scroll at any width — verified
by explicit browser checks, not assumption. Carousel slide count and collage
density scale down on narrow viewports.

## Verification Plan

After implementation, using the Playwright browser tool against the running
Vite dev server:

- Load and screenshot each section at 375/390/430/768/1366/1920 widths.
- Confirm no horizontal overflow at any width.
- Exercise the friend carousel: arrow clicks, dot clicks, swipe/drag,
  keyboard arrow navigation, confirm all 22 sample entries reachable.
- Open the lightbox from the memory gallery: verify next/prev, close,
  Escape key, and caption display.
- Toggle the mobile hamburger menu and confirm smooth-scroll navigation
  works for every section.
- Temporarily point a data entry at a non-existent image path and confirm
  `PlaceholderImage` fallback renders instead of a broken layout.

## Out of Scope / Future

- Deployment configuration (Vercel/Netlify/GitHub Pages) — not requested,
  can be added later since the build is a plain static Vite output.
- Real content population — owner fills in `src/data/*.js` and
  `public/images/*` after launch.
