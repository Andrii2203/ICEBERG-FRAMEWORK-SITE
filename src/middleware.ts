import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TelegramService } from "@/infrastructure/notifications/telegram.service";
import { NextFetchEvent } from "next/server";
import { config as icebergConfig } from "@/config/env";

const locales = ["en", "ua", "pl", "de", "es", "fr", "it", "pt"];
const defaultLocale = "en";

// Initialize Upstash Rate Limiter (Edge Compatible) - handled inside middleware for resilience
let ratelimit: Ratelimit | null = null;

try {
    if (icebergConfig.upstash.redisRestUrl && icebergConfig.upstash.redisRestToken) {
        ratelimit = new Ratelimit({
            redis: new Redis({
                url: icebergConfig.upstash.redisRestUrl,
                token: icebergConfig.upstash.redisRestToken,
            }),
            limiter: Ratelimit.slidingWindow(5, "1 h"),
            analytics: true,
            prefix: "@upstash/ratelimit",
        });
    }
} catch (error) {
    console.error("[Middleware] Failed to initialize Ratelimit:", error);
}

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
    const pathname = request.nextUrl.pathname;

    // --- SECURITY LAYER: Rate Limiting ---
    // Protected API routes
    if (pathname.startsWith("/api/analyze-ui") || pathname.startsWith("/api/detect-ui")) {
        // If ratelimit is not initialized (missing keys), fallback to bypass
        if (!ratelimit) {
            console.warn("[Middleware] Ratelimit not initialized. Bypassing protection.");

            // Notify user about security bypass
            event.waitUntil(
                TelegramService.sendSecurityAlert({
                    ip: "INTERNAL",
                    path: pathname,
                    reason: "SECURITY_BYPASS_CONFIG_MISSING"
                })
            );

            return NextResponse.next();
        }

        try {
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
        } catch (error) {
            console.error("[Middleware] Rate limiting failed, bypassing to avoid 500:", error);

            // Notify user about security service failure
            event.waitUntil(
                TelegramService.sendSecurityAlert({
                    ip: "SYSTEM",
                    path: pathname,
                    reason: "SECURITY_SERVICE_FAILURE"
                })
            );

            // In case of any error with Upstash, we allow the request to proceed 
            // to avoid breaking the core functionality for users.
            return NextResponse.next();
        }

        // Return next to continue to the API route handler
        return NextResponse.next();
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








