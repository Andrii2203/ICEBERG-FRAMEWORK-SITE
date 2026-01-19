import { Organization, WebSite, WithContext } from "schema-dts";


export const getJsonLd = (lang: string): WithContext<Organization | WebSite>[] => [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Iceberg Framework",
        "url": `https://iceberg-framework-site.vercel.app/${lang}`,
        "logo": "https://iceberg-framework-site.vercel.app/icons/icon-512x512.png",
        "description": "Determinism for AI‑Driven Development",
        "sameAs": [
            "https://github.com/Andrii2203/ICEBERG-FRAMEWORK",
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Iceberg Framework",
        "url": `https://iceberg-framework-site.vercel.app/${lang}`,
    }
];
