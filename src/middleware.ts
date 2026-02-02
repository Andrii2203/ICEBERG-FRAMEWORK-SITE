import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TelegramService } from "@/infrastructure/notifications/telegram.service";
import { NextFetchEvent } from "next/server";

const locales = ["en", "ua", "pl", "de", "es", "fr", "it", "pt"];
const defaultLocale = "en";

// 1. Initialize Upstash Rate Limiter (Edge Compatible)
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 requests per hour
    analytics: true,
    prefix: "@upstash/ratelimit",
});

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
    const pathname = request.nextUrl.pathname;

    // --- SECURITY LAYER: Rate Limiting ---
    // Protected API routes
    if (pathname.startsWith("/api/analyze-ui") || pathname.startsWith("/api/detect-ui")) {
        const forwarded = request.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";
        const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_api_${ip}`);

        if (!success) {
            // Trigger non-blocking Telegram Alert
            const resetDate = new Date(reset).toLocaleTimeString();
            event.waitUntil(
                TelegramService.sendSecurityAlert({
                    ip,
                    path: pathname,
                    reason: "RATE_LIMIT_EXCEEDED",
                    resetIn: resetDate
                })
            );

            return NextResponse.json(
                {
                    status: "error",
                    reason: "too-many-requests",
                    message: "Rate limit exceeded. Try again in an hour."
                },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": reset.toString(),
                    }
                }
            );
        }
    }

    // --- i18n LAYER: Locale Redirection ---
    // Check if the pathname is missing a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Skip redirection for API routes and assets
    const isApiOrAsset = pathname.startsWith("/api/") ||
        pathname.includes(".") ||
        pathname.startsWith("/_next");

    if (pathnameIsMissingLocale && !isApiOrAsset) {
        const locale = defaultLocale;
        const nextUrl = request.nextUrl.clone();
        nextUrl.pathname = `/${locale}${pathname}`;
        return NextResponse.redirect(nextUrl, 308);
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - assets (internal assets)
         * - sw.js (service worker)
         * - robots.txt, sitemap.xml
         */
        "/((?!_next/static|_next/image|favicon.ico|assets|icons|images|manifest|sw.js|robots.txt|sitemap.xml).*)",
    ],
};








