# Gamified Finances

A **personal finance learning** experience with a **retro pixel-art** look. Users explore **themed journey levels** (theory + quizzes), earn **coins**, track **journey progress** in the browser, and browse a **leaderboard**—with a **demo wallet connect** flow (no real chain integration yet).

## Tech stack

| Area | Choice |
|------|--------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI | React 19, [Tailwind CSS](https://tailwindcss.com) 4 |
| Language | TypeScript |
| Icons | [Font Awesome](https://fontawesome.com) (React) |
| Fonts | [Geist](https://vercel.com/font), [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) (pixel headings) |

## Features

- **Home** — Hero with background art and a **Connect wallet** call-to-action (same modal as the navbar).
- **Wallet (demo)** — Modal to paste a **fake address**; progress is stored in `localStorage`. **Disconnect** returns home; connected users see **Journey** in the nav.
- **Journey** (`/journey`) — Slide-based levels loaded from JSON (`data/level_01.json`, `data/level_02.json`, …). Theory slides + multiple-choice questions; **coins** for correct answers; **Back / Next** navigation; **Next level** advances journey stage when a pack is finished.
- **Ranking** (`/ranking`) — Table of **nickname**, **wallet**, **level**, and **coins** (demo data in `data/ranking.ts`).
- **Design system** — Central palette in `app/globals.css` (`--pf-*` CSS variables). Navbar uses a navy bar; primary actions use `.btn-primary` / `.btn-back` in global CSS.

## Project layout (high level)

```
app/
  layout.tsx          # Root layout, fonts, WalletConnectProvider, Navbar
  page.tsx            # Home (Hero)
  journey/page.tsx    # Journey + sidebar
  ranking/page.tsx    # Leaderboard
components/
  Navbar.tsx
  Hero.tsx
  WalletConnect.tsx
  journey/            # Journey slides, header, footer
data/
  level_01.json       # Level content (slides)
  level_02.json
  ranking.ts          # Demo leaderboard rows
hooks/
  useJourneyProgress.ts   # Journey level + coins (localStorage)
  useLevelSlideIndex.ts   # Slide index per level pack
lib/
  journey-level-data.ts   # Maps journey stage → level JSON
```

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # Production build
npm run start   # Run production server
npm run lint    # ESLint
```

## Content & assets

- **Level packs**: Add `data/level_0N.json` and register it in `lib/journey-level-data.ts`. Slides support `theory` and `question` types (see `types/level.ts`).
- **Images**: Reference files under `public/` (e.g. images named in level JSON).
- **Hero background**: `public/gamified_finances_bg2.png` (if present).

## Agent notes for contributors

This repo includes `AGENTS.md` / `CLAUDE.md` pointing to Next.js docs under `node_modules/next/dist/docs/`—this project may use **newer Next.js APIs** than older tutorials; check local docs when in doubt.

## License

Private project (`"private": true` in `package.json`). Adjust as needed.
