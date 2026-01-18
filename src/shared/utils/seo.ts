import { Organization, WebSite, WithContext, SearchAction } from "schema-dts";

type SearchActionWithQueryInput = SearchAction & {
    "query-input"?: string;
};

export const getJsonLd = (lang: string): WithContext<Organization | WebSite>[] => [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Iceberg Framework",
        "url": `https://iceberg-framework.com/${lang}`,
        "logo": "https://iceberg-framework.com/icons/icon-512x512.png",
        "description": "Determinism for AI‑Driven Development",
        "sameAs": [
            "https://github.com/iceberg-framework",
            "https://twitter.com/iceberg_fw"
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Iceberg Framework",
        "url": `https://iceberg-framework.com/${lang}`,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `https://iceberg-framework.com/${lang}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        } as SearchActionWithQueryInput
    }
];
