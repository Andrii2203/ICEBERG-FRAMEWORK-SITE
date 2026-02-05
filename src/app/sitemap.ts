import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://iceberg-framework-site.vercel.app";
    const locales = ["en", "ua", "pl", "de", "es", "fr", "it", "pt"];
    const pages = ["", "/philosophy", "/methodology", "/standards", "/protocols", "/enterprise", "/solo-pack", "/audit"];

    const routes = locales.flatMap((lang) =>
        pages.map((page) => ({
            url: `${baseUrl}/${lang}${page}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: page === "" ? 1 : 0.8,
        }))
    );

    return routes;
}








