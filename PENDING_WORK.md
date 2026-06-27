# Pending Production Work

_Last updated: 2026-06-27_

This file tracks important work that was not completed yet, especially items blocked by tool safety filters or requiring external provider approval. Do not delete this file until all items are complete.

## Blocked By Tool Safety Filters

### Payment backend message cleanup

File: `app/api/billing/create-order/route.ts`

Current issue:
- The route still returns older checkout copy when payment setup is missing.
- The route still returns a generic order failure message when the provider order call fails.

Needed outcome:
- Missing setup should say that secure checkout is not active yet.
- Provider order failure should return the gateway detail when available.
- Response should keep `ok`, `checkoutReady`, `status`, `message`, `amountUsd`, `amountInr`, `order`, and `keyId` fields.

### Payment verification route hardening

File: `app/api/billing/verify-payment/route.ts`

Current issue:
- Global middleware rate limiting covers this route.
- Route-level limiter patch was blocked.

Needed outcome:
- Keep signature verification.
- Keep signed-in user requirement.
- Keep wallet credit only after verification.
- Add clear failure messages for setup, auth, signature and wallet update states.

### Privileged admin review access

Current issue:
- Review manager works with user-scoped review records.
- Admin-all-users database migration and privileged server route were blocked.

Needed outcome:
- Add a safe database policy or server-backed admin flow so the owner can review all submitted campaigns.
- Keep normal users limited to their own records.

### Standalone SEO / GEO / AEO route

Current issue:
- New standalone content page creation was blocked.
- FAQ page now contains SEO, GEO and AEO basics as a fallback.

Needed outcome:
- Add standalone route when allowed.
- Add structured FAQ content after build stability is confirmed.

### Provider token exchange and storage

Current issue:
- OAuth start/callback routes exist as skeletons.
- Connection model can store provider, labels and status references.
- Real provider token exchange and server-side persistence are not complete.

Needed outcome:
- Complete approved provider token exchange.
- Store only required account references safely.
- Refresh provider access when required by Meta or Google.

## External Requirements

- Vercel build logs are required to fix the current deployment blocker.
- Supabase auth providers must be enabled for social and phone sign-in.
- Razorpay account must be active in the matching test/live mode.
- Meta and Google provider accounts must be approved before real ad delivery.

## Current Priority Order

1. Fix Vercel build error using the exact build log.
2. Clean payment backend messages.
3. Add privileged owner review flow.
4. Finish provider token exchange after approvals.
5. Add standalone discovery pages and tests.
