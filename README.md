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

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Browser localStorage for MVP drafts/profiles
- Built-in deterministic campaign generator
- Optional Gemini AI generation via `GEMINI_API_KEY`
- Supabase database schema for production persistence

## AI Generation Flow

- Campaign Builder calls `/api/generate-campaign`.
- If `GEMINI_API_KEY` is present, the API tries Gemini generation.
- If the key is missing or the API fails, it automatically returns the built-in fallback campaign.
- The app never promises guaranteed leads, sales or income.

## Supabase Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run the SQL from `supabase/schema.sql`.
4. Add these environment variables in Vercel and `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Open `/setup` in the app to confirm env variables are present.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local`.

```bash
cp .env.example .env.local
```

Then add:

```bash
GEMINI_API_KEY=your_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Next Build Steps

- Add auth UI for magic link login
- Move localStorage drafts to Supabase tables after login
- Add Razorpay subscriptions
- Add campaign export as real server-side PDF
- Add analytics optimizer input for CTR, CPC, CPL, CPM and ROAS
- Add team/agency multi-client workspace
