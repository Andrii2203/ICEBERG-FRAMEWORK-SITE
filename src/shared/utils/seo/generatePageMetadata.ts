import type { Metadata } from "next";

const baseUrl = "https://iceberg-framework-site.vercel.app";
const locales = ["en", "ua", "pl", "de", "es", "fr", "it", "pt"];

/**
 * Generates deterministic metadata for all localized routes.
 * Strictly follows Iceberg SEO Technical Standard v0.1.
 */
export function generatePageMetadata(
    lang: string,
    slug: string,
    title: string,
    description: string
): Metadata {
    const cleanSlug = slug === "" ? "" : `/${slug}`;
    const url = `${baseUrl}/${lang}${cleanSlug}`;

    const languages: Record<string, string> = {};
    locales.forEach((locale) => {
        languages[locale] = `${baseUrl}/${locale}${cleanSlug}`;
    });

    // STS rule: x-default must point to /en version
    languages["x-default"] = `${baseUrl}/en${cleanSlug}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "Iceberg Framework",
            locale: lang,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}








