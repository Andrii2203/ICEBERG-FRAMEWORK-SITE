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

        const nextUrl = request.nextUrl.clone();
        nextUrl.pathname = `/${locale}${pathname}`;
        return NextResponse.redirect(nextUrl);
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, api, assets, and root static files)
        "/((?!api|_next/static|_next/image|favicon.ico|assets|icons|images|manifest.json|manifest.webmanifest|manifest.ts|sw.js|robots.txt|sitemap.xml).*)",
    ],
};








