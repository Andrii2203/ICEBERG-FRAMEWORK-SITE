import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["en", "ua", "pl", "de", "es", "fr", "it", "pt"];
const defaultLocale = "en";

export default function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if the pathname is missing a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = defaultLocale; // In a real app, logic for locale detection from headers would go here

        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, api, assets, and root static files)
        "/((?!api|_next/static|_next/image|favicon.ico|icons|images|manifest.json|manifest.webmanifest|manifest.ts|sw.js|robots.txt|sitemap.xml).*)",
    ],
};
