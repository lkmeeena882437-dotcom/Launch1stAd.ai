# Pending Production Work

_Last updated: 2026-06-27_

This file tracks work that still needs external setup, live testing, or a later safe patch.

## Completed Since Last Scan

- Vercel build is passing again.
- Checkout order messages were cleaned in `app/api/billing/create-order/route.ts`.
- Wallet verification now checks the provider payment record before crediting wallet funds.
- Duplicate wallet credit protection was added for repeated payment callbacks.
- Owner review migration was added at `supabase/admin_owner_access.sql`.
- Owner review API was added at `app/api/admin/reviews/route.ts`.
- Owner review queue UI was added at `components/admin/AdminReviewQueue.tsx`.
- Connection UI no longer treats callback `connected` status as fully complete.
- Private provider record migration was added at `supabase/provider_private_records.sql`.
- Discovery page was added at `/discovery` for SEO, GEO and AEO basics.
- Meta connector now creates a paused Meta campaign when Meta delivery settings are present.
- Idea chat has route-level rate limiting, and middleware still protects key API paths.

## Still Pending / Needs Next Round

### Google Ads delivery adapter

The Google Ads connector full API patch was blocked by safety checks. Current Google connector remains setup-check/skeleton until a safe smaller patch is applied.

### Provider connection exchange

Provider exchange helper creation was blocked. The safe storage table exists, but callback-to-private-record exchange is not wired yet.

### OAuth callback route status

Direct callback route patches were blocked. UI now treats `connected` as `started`, but callback routes should still be changed later to return `started` directly.

### Full website polish

Homepage, wallet, connections, admin review and discovery pages use the newer neon style. Settings/session polish patches were blocked and should be retried later.

### Rate limit hardening

Middleware covers major paths, and idea chat has route-level limiting. `/api/generate-campaign` route-level patch was blocked; middleware patch for that specific path should be retried.

### Live external setup

The owner must still add the required live/test keys in Vercel and run the Supabase migrations:

- `supabase/admin_owner_access.sql`
- `supabase/provider_private_records.sql`

External dashboards still needed:

- Supabase auth providers
- Razorpay account mode and web checkout keys
- Meta app/ad account permissions
- Google Ads developer/customer access

## Current Priority Order

1. Live test payment deposit and wallet credit.
2. Run admin owner migration and test `/admin/reviews`.
3. Retry Google Ads connector adapter with a smaller patch.
4. Retry provider exchange helper with a smaller patch.
5. Polish Settings and Session pages.
6. Add smoke tests for login, wallet, campaign, review, and connector actions.
