import { NextResponse, type NextRequest } from "next/server";

type Bucket = { count: number; resetAt: number };
type Rule = { prefix: string; limit: number; windowMs: number };

const buckets = new Map<string, Bucket>();
const rules: Rule[] = [
  { prefix: "/api/idea-chat", limit: 12, windowMs: 60_000 },
  { prefix: "/api/billing/create-order", limit: 8, windowMs: 60_000 },
  { prefix: "/api/billing/verify-payment", limit: 12, windowMs: 60_000 },
  { prefix: "/api/campaigns/submit-review", limit: 10, windowMs: 60_000 },
  { prefix: "/api/reviews/status", limit: 20, windowMs: 60_000 },
  { prefix: "/api/admin", limit: 30, windowMs: 60_000 }
];

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function activeRule(pathname: string) {
  return rules.find((rule) => pathname.startsWith(rule.prefix));
}

function rateLimit(request: NextRequest, rule: Rule) {
  const now = Date.now();
  const key = `${rule.prefix}:${clientIp(request)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + rule.windowMs });
    return null;
  }

  if (current.count >= rule.limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return NextResponse.json(
      { ok: false, status: "rate_limited", message: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  current.count += 1;
  buckets.set(key, current);
  return null;
}

export function middleware(request: NextRequest) {
  const rule = activeRule(request.nextUrl.pathname);
  const blocked = rule ? rateLimit(request, rule) : null;
  const response = blocked || NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
}

export const config = {
  matcher: "/:path*"
};
