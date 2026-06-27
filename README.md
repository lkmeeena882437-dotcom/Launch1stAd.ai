# Launch1stAd.ai

AI advertising workspace for Indian businesses.

Launch1stAd.ai helps a business sign in, add verified ad funds, generate an AI campaign, submit it for review, connect approved ad accounts, and track launch status.

## Core Promise

Create professional campaign packs with AI and manage the launch workflow in one place. Results are not guaranteed; campaigns still depend on budget, offer, audience, creative quality, account approval, and provider policies.

## Current Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase Auth and database access
- Razorpay Checkout
- Gemini AI with deterministic fallback
- GitHub Actions build workflow

## Main Product Flow

1. User signs in with email, Google, Facebook, or phone OTP.
2. User funds the wallet through verified checkout.
3. Wallet balance is synced from the database.
4. User creates an AI campaign only after verified funds are available.
5. Campaign is submitted for review.
6. Review request is saved to the database.
7. Provider connector can send campaign payloads after Meta or Google provider setup.
8. User tracks review status from Launch Requests.

## Implemented Features

- Email magic-link login
- Google and Facebook Supabase OAuth entry points
- Phone OTP send and verify UI
- Razorpay deposit flow
- Payment signature verification route
- Database wallet credit flow
- Authenticated wallet read route
- Cloud wallet sync in wallet UI
- Cloud wallet funding gate in campaign form
- AI campaign builder
- Campaign review request route
- Review manager page at `/admin/reviews`
- Review approve, reject, pause and provider send controls
- Launch requests cloud read from `launch_requests`
- Provider connection page
- Provider connection record model
- Meta and Google connector skeletons
- FAQ, Privacy, Terms, Settings
- FAQ discovery content for SEO, GEO and AEO basics
- Security headers middleware
- Global API rate limiting middleware
- GitHub Actions build check
- Project memory in `PROJECT_BRAIN.md`

## External Setup Needed

Some features require external provider setup before live use:

- Supabase Email provider
- Supabase Google provider for Google login
- Supabase Facebook provider for Facebook login
- Supabase Phone provider plus SMS provider for OTP
- Razorpay test or live account for wallet deposits
- Meta developer and ad account approval for Meta campaign delivery
- Google Ads developer token and customer account for Google campaign delivery

## Important Production Notes

- Wallet credits should only be added after payment verification.
- Campaign generation should require verified wallet funding.
- Meta and Google delivery is not fully live until provider API credentials and approvals are configured.
- Do not expose developer setup pages to normal users.
- Update `PROJECT_BRAIN.md` after major changes.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

GitHub Actions also runs install and build on pushes and pull requests to main.

## Pre-Deploy Diagnostics

Before one final redeploy, check:

1. Vercel project is connected to the correct repository and production branch.
2. Vercel build command uses `npm run build`.
3. The latest deployment source commit matches the latest GitHub commit.
4. Supabase URL and anon key are present in the same Vercel project.
5. Payment settings are present in the same Vercel project.
6. Supabase redirect URLs include the live `/session` URL.
7. Base database schema has been run.
8. Login, wallet, campaign, review and provider flows are tested in that order.

If a deployment fails, open Vercel build logs and copy the first red error block. Fix that exact line before changing more UI.

## Next Priorities

- Fix any remaining Vercel build error using exact build logs
- Cleaner backend payment order messages when route patch is allowed
- Privileged admin-all review access after database policy migration
- Real Meta and Google token exchange after provider approval
- Real Meta and Google campaign creation after approval
- Standalone SEO, GEO and AEO landing pages
- E2E smoke tests
