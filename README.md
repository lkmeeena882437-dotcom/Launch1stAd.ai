# Launch1stAd.ai

**AI Assistant + Ad Launch System for Businesses**

Launch1stAd.ai helps Indian businesses create ready-to-launch campaign packs for Meta, Google, WhatsApp and landing pages with AI-powered strategy, audience targeting, ad copy, creative ideas, budget planning and optimization guidance.

> Safe promise: AI-optimized campaigns designed to improve leads, CTR and conversions. Results are not guaranteed.

## Brand

- **Display name:** Launch1stAd.ai
- **Tagline:** Launch your first professional ad campaign with AI.
- **Hindi line:** Business batao, AI se pehla ad launch karo.
- **Positioning:** AI Marketing OS for Indian Businesses
- **Style:** warm cream canvas, coral CTA, dark premium product panels, editorial SaaS spacing.

## MVP Features

1. Landing page with premium brand positioning
2. Business profile save system
3. Campaign builder with saved profile auto-fill
4. Meta campaign structure
5. Google campaign structure
6. Hindi / English / Hinglish ad copy
7. WhatsApp lead conversion script
8. 7-day optimization plan
9. Campaign history and saved drafts
10. Full campaign report page
11. Use again / duplicate campaign flow
12. PDF export through browser print
13. Gemini AI provider with deterministic fallback
14. Supabase schema foundation and setup status page
15. Account access page and usage quota foundation
16. Analytics metric checker for CTR, CPC, CPL and ROAS

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Browser localStorage for MVP drafts/profiles
- Built-in deterministic campaign generator
- Optional Gemini AI generation via `GEMINI_API_KEY`
- Supabase database schema for production persistence
- Environment readiness page at `/setup`

## AI Generation Flow

- Campaign Builder calls `/api/generate-campaign`.
- If `GEMINI_API_KEY` is present, the API tries Gemini generation.
- If the key is missing or the API fails, it automatically returns the built-in fallback campaign.
- The app never promises guaranteed leads, sales or income.

## Supabase Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run the SQL from `supabase/schema.sql`.
4. Add Supabase environment variables in Vercel and `.env.local`.
5. Open `/setup` in the app to confirm env variables are present.

## Environment Options

Copy `.env.example` to `.env.local`.

```bash
cp .env.example .env.local
```

Available env options:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
GEMINI_API_KEY=your_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GROWTH_LINK=your_growth_access_or_payment_link
NEXT_PUBLIC_TEAM_LINK=your_team_access_or_payment_link
NEXT_PUBLIC_WHATSAPP_NUMBER=91882437XXXX
NEXT_PUBLIC_SUPPORT_EMAIL=support@launch1stad.ai
```

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Next Build Steps

- Add server-side PDF export
- Add campaign share page
- Add client workspace / multi-business management
- Add admin checklist for launch readiness
- Connect real payment confirmation later
