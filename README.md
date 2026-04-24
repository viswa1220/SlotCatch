# SlotCatch.ai — Next.js Landing Page

Premium dark-theme landing page for SlotCatch.ai, an AI WhatsApp booking agent for service businesses. Built with Next.js 14 (App Router), React 18, and pure CSS.

## Features

- **Hero** with typing headline, animated particles, and phone mockup showing live chat script per business preset
- **Business selector** (dropdown) — Car Detailing, Cleaning, HVAC, Lawn Care, Dental — live-switches every example on the page
- **Interactive demo** chat widget backed by `/api/chat` (keyword matching; swap for your own LLM)
- **Retention flow** — auto-playing 4-scene storyboard showing how SlotCatch re-engages past customers at day 30
- **Roadmap** — WhatsApp Booking → Review Booster → Ads & Lead Gen → Follow-up & Referrals → Invoicing & Payments → Inventory Tracking
- **Apply form** posts to `/api/apply` (log-only placeholder)
- **SEO** — metadata API, OpenGraph, Twitter cards, JSON-LD `SoftwareApplication` schema

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connecting your own AI backend

By default the `/api/chat` route uses keyword matching against the presets in `lib/business.ts`. To connect to your own FastAPI / LLM backend, edit `app/api/chat/route.ts` — a commented-out example is already in place (`SLOTCATCH_API_URL`).

## Project structure

```
app/
  layout.tsx        # Metadata, fonts, JSON-LD
  page.tsx          # Section composition
  globals.css       # All styles (dark theme, animations, retention flow)
  api/chat/         # Chat endpoint
  api/apply/        # Apply form endpoint
components/
  Navbar.tsx
  HeroSection.tsx
  ProblemSection.tsx
  HowSection.tsx
  DemoSection.tsx        # Chat widget
  RetentionFlow.tsx      # 4-scene auto-playing storyboard
  RoadmapSection.tsx
  FeaturesSection.tsx
  PricingSection.tsx
  ApplySection.tsx
  BusinessInput.tsx      # Dropdown selector
  BusinessContext.tsx    # React context
  PhoneMock.tsx
  Particles.tsx
  Icon.tsx               # All icons (inline SVGs)
  Logo.tsx               # Custom SlotCatch mark (chat + calendar + check)
lib/
  business.ts       # Business presets (replies, chat scripts, pricing)
  hooks.ts          # useInView
```

## Deploy

```bash
npm run build
npm start
```

Or push to Vercel — it deploys as-is.
# SlotCatch
