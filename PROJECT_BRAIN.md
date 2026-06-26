# Launch1stAd.ai Project Brain

_Last updated: 2026-06-26_

This file is the permanent working memory for the Launch1stAd.ai build. Keep it updated after every major change.

## Product Mission

Launch1stAd.ai is an AI advertising workspace for Indian businesses. The product should help a user sign in, connect approved ad accounts, add verified ad funds, create an AI campaign, submit it for review, and track launch status.

## Main User Flow

1. Sign in.
2. Connect business and ad accounts.
3. Add verified wallet funds.
4. Create campaign with AI.
5. Submit campaign for review.
6. Send approved campaign to provider connector.
7. Track review status and performance.

## Quality Rules

- No manual wallet credit for users.
- No live ad delivery promise until provider APIs are connected and approved.
- Keep developer setup pages away from normal users.
- User-facing copy must be simple professional English.
- Money movement must be backed by payment verification.
- Campaign generation must require verified wallet funding.
- Mobile-first UI is mandatory.

## Current Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase Auth and REST database access
- Razorpay Checkout
- Gemini AI with deterministic fallback
- GitHub Actions build workflow

## Completed Work

### Auth

- Email magic-link login exists.
- Login redirect targets `/session`.
- Google login button exists through Supabase OAuth.
- Facebook login button exists through Supabase OAuth.
- Phone OTP send and verify UI exists.

External setup still required: enable providers inside Supabase. Phone OTP needs an SMS provider.

### Wallet and Payments

- Wallet deposit UI exists.
- Razorpay order route exists.
- Razorpay checkout opens from wallet UI.
- Payment verification route checks payment signature.
- Verified payment flow credits Supabase wallet tables.
- Authenticated wallet read route exists at `/api/wallet/me`.
- Wallet page now syncs balance from cloud wallet data.
- Trusted payment method labels are shown in the wallet UI.
- Reserve spend UI was removed from the wallet page.

### Campaign and Review

- Campaign form has funding gate.
- Campaign funding gate now checks cloud wallet status when signed in.
- Campaign generation creates a review request.
- Review requests sync to Supabase.
- Launch requests page can read cloud review records.
- User-side manual activation control was removed.

### Connections

- Public connections page is clean.
- Meta and Google connection cards point to OAuth start routes.
- Meta and Google connector skeleton routes exist.
- Connector shared-secret check exists.

### Settings and Content

- Settings includes profile, provider connections, review requests, FAQ, privacy, and terms.
- FAQ page exists.
- Privacy page exists.
- Terms page exists.

### DevOps and Security

- GitHub Actions build workflow exists.
- Build workflow runs install and build on push or pull request.
- Security headers middleware exists.

## Current Gaps

### P0: Must Fix Before Claiming Production Ready

1. Redeploy latest code and test the live app.
2. Payment order route needs clearer gateway error messages. Tool safety blocked this patch once, so retry carefully later.
3. Payment flow must be live-tested end to end.
4. Email, Google, Facebook, and phone login must be live-tested after Supabase provider setup.
5. Provider OAuth still needs production token exchange and safe storage.
6. Meta and Google connectors are skeletons; real provider campaign creation is not complete.
7. Add server-side campaign submit route so review creation is not only client-side.
8. Add provider/admin status update flow for review requests.

### P1: Production Hardening

- Add API rate limiting.
- Add error logging.
- Add E2E tests for login, wallet, campaign, and review queue.
- Update README to match current app state.
- Keep public setup screens out of user navigation.
- Add SEO, GEO, and AEO content pages and schema.

### P2: Scale Roadmap

- Add background worker for provider launch jobs.
- Add provider status webhooks.
- Add analytics aggregation tables.
- Add admin approval workspace.
- Add monitoring and alerts.
- Add caching only after real usage needs it.

## Live Test Checklist

Run this after every redeploy:

1. Clear browser site data.
2. Open `/login`.
3. Test email sign-in.
4. Test Google sign-in if provider is enabled.
5. Test Facebook sign-in if provider is enabled.
6. Test phone OTP only if SMS provider is enabled.
7. Open `/wallet`.
8. Make a small test deposit.
9. Confirm checkout opens.
10. Confirm payment verification succeeds.
11. Confirm wallet balance updates in Supabase.
12. Confirm wallet transaction is created.
13. Refresh wallet page and confirm balance remains correct.
14. Open `/campaign`.
15. Generate campaign after verified funds.
16. Confirm review request is saved.
17. Open `/launch-requests` and confirm request appears.
18. Test provider send only after provider connector setup.

## Immediate Next Coding Tasks

1. Improve payment order error messages.
2. Add server campaign submit endpoint.
3. Add API rate limiting.
4. Update README.
5. Add first smoke tests.
6. Add admin/provider review status update flow.
7. Add SEO/GEO/AEO pages.
8. Finish provider token exchange after account approvals.
9. Add provider launch worker when real API credentials are ready.
10. Add monitoring and alerts after first live user tests.

## Working Standard

Build like a serious SaaS:

- Mobile-first.
- Fast.
- Secure.
- Honest.
- Professional English.
- Every button must either work or explain the missing setup.
- Every payment path must be verified.
- Every launch status should come from database or provider truth.
- Keep this file updated after every major change.
