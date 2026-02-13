import type { Metadata } from "next";

const baseUrl = "https://iceberg-framework-site.vercel.app";
const locales = ["en", "ua", "pl", "de", "es", "fr", "it", "pt"];

/**
 * Generates deterministic metadata for all localized routes.
 * Strictly follows Iceberg SEO Technical Standard v0.3 and CARD 5.
 */
export function generatePageMetadata(
    lang: string,
    slug: string,
    title: string,
    description: string,
    image?: string
): Metadata {
    const cleanSlug = slug === "" ? "" : `/${slug}`;
    const url = `${baseUrl}/${lang}${cleanSlug}`;

    // Default OG image if none provided
    const ogImage = image || `${baseUrl}/og-image.png`;

    const languages: Record<string, string> = {};
    locales.forEach((locale) => {
        languages[locale] = `${baseUrl}/${locale}${cleanSlug}`;
    });

    // STS rule: x-default must point to /en version
    languages["x-default"] = `${baseUrl}/en${cleanSlug}`;

    return {
        title: `${title} | Iceberg`,
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
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
            creator: "@IcebergMethod",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}








