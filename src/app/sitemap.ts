import { MetadataRoute } from "next";

const baseUrl = "https://iceberg-framework-site.vercel.app";
const locales = ["en", "ua", "pl", "de", "es", "fr", "it", "pt"];
const pages = [
    "",
    "/philosophy",
    "/methodology",
    "/standards",
    "/protocols",
    "/enterprise",
    "/solo-pack",
    "/audit"
];

/**
 * Deterministic sitemap generator.
 * Strictly follows Iceberg SEO Technical Standard v0.3.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const routes = locales.flatMap((lang) =>
        pages.map((page) => ({
            url: `${baseUrl}/${lang}${page}`,
            lastModified: new Date("2026-02-13"), // Deterministic lastmod
            changeFrequency: "weekly" as const,
            priority: page === "" ? 1 : 0.8,
        }))
    );

    // Root redirect mapping (x-default behavior)
    const rootUrl = {
        url: baseUrl,
        lastModified: new Date("2026-02-13"),
        changeFrequency: "weekly" as const,
        priority: 1,
    };

    return [rootUrl, ...routes];
}
