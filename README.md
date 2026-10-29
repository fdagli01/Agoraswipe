# Agoraswipe

**Brainscrolling instead of doomscrolling.** Agoraswipe borrows the vertical snap-scroll mechanic of short-video feeds and fills it with bite-sized insights from philosophy, history, sociology, religion and books, each with a cited source.

**Live demo:** <https://fdagli01.github.io/Agoraswipe/>

## Overview

Agoraswipe is a mobile-first web app prototype. Each full-screen card presents one idea (for example the Panopticon, Amor Fati or the Ship of Theseus) as a short hook, a few sentences of explanation and a source attribution. Instead of an endless feed, the app offers a curated daily set of five cards and then gently tells you that you are done for today.

The main prototype is a single, dependency-free `index.html` that installs as a Progressive Web App and works offline. The interface and content are in Turkish.

## Features

- **Vertical snap feed.** Full-height (`100dvh`) cards with mandatory scroll snapping; navigate with touch, mouse wheel or arrow keys.
- **Today's Agora.** A daily rotation picks five cards based on the date, followed by a closing screen ("that's it for today") as a deliberate limit on endless scrolling. You can still continue past it.
- **Daily streak.** A badge in the top bar counts consecutive days the app was opened.
- **Library.** Saved cards appear in a bottom sheet; tapping one scrolls back to that card.
- **Interactions.** Like and save with small pop animations, double-tap to like, toast notifications, and sharing via the Web Share API with a clipboard fallback.
- **Installable and offline.** Web app manifest plus a service worker that caches the app shell and serves it offline.
- **Accessibility.** Progress rail, first-card scroll hint, ARIA labels on actions and `prefers-reduced-motion` support.
- **"Night Agora" design language.** Dark ink background, warm serif typography, one accent colour per category, Greek letters as background glyphs (Φ, Χ, Π, Θ, Β) and a temple logo mark. `brand.html` documents logo variants, palette, typography and the category system.

## Tech stack

| Area | Technology |
| --- | --- |
| Main prototype | Plain HTML, CSS and vanilla JavaScript in one file, no build step, no external resources |
| PWA | Web App Manifest, Service Worker (Cache API) |
| Persistence | `localStorage` (likes, saves, streak) |
| Alternative component | React, Tailwind CSS, framer-motion (`Agoraswipe.jsx`) |
| Hosting | GitHub Pages via GitHub Actions |

```
index.html ──► DATA array (cards) ──► daily rotation ──► snap-scroll feed
    │                                                    │
    ├─► sw.js (offline cache)                            └─► localStorage
    └─► manifest.json + icons/ (install)                     (liked, saved, streak)
```

Cards are defined in a `DATA` array. Every card has a stable `id`, which the streak, likes, saves and library rely on.

## Getting started

There is nothing to install or build. Serve the repository root with any static file server, for example:

```sh
git clone https://github.com/fdagli01/Agoraswipe.git
cd Agoraswipe
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Opening `index.html` directly from the file system also works, but the service worker is only registered over HTTP(S).

To install it on a phone, host the files on any HTTPS static host (GitHub Pages, Netlify, Vercel), open the page and use the browser's "Add to Home Screen" option.

### Using the React component

`Agoraswipe.jsx` is a single-file React version of the same feed experience. Drop it into an existing Vite or Next.js project that has `react`, `framer-motion` and Tailwind CSS set up, and render `<Agoraswipe />`. It does not include the newer daily selection, streak, library or offline features of `index.html`.

## Deployment

`.github/workflows/pages.yml` deploys the repository root to GitHub Pages on every push to the default branch, or manually via `workflow_dispatch`.

## Project structure

```
.
├── index.html            Main PWA prototype (markup, styles, script and card data)
├── manifest.json         Web app manifest
├── sw.js                 Service worker (offline cache)
├── icons/                App icons, favicon and Apple touch icon
├── brand.html            Brand board: logo, palette, typography, categories
├── Agoraswipe.jsx        React + Tailwind + framer-motion component version
└── .github/workflows/
    └── pages.yml         GitHub Pages deployment
```

## Content

The prototype ships with 9 cards across 5 categories (philosophy, history, sociology, religion, books), including the Panopticon, Amor Fati, the Cleopatra time paradox, the Stoic dichotomy of control, the Axial Age, Orwell vs. Huxley, the Ship of Theseus, Dunbar's number and Göbekli Tepe. Each card names its source.

## Status and limitations

- This is an early prototype, not a finished product.
- Content is hard-coded in the `DATA` array; there is no backend, CMS or user account.
- The UI and content are Turkish only.
- Like counts shown on cards are randomly generated placeholders, not real data.
- All state lives in the browser's `localStorage` and is not synced across devices.
- There are no automated tests.
