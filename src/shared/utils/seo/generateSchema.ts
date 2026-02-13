import { Organization, WebSite, Product, FAQPage, WithContext, BreadcrumbList } from "schema-dts";

const baseUrl = "https://iceberg-framework-site.vercel.app";

/**
 * Generator for deterministic JSON-LD schema objects.
 * Strictly follows CARD 5 and SEO Technical Standard.
 */
export const generateSchema = {
    organization: (lang: string): WithContext<Organization> => ({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Iceberg Framework",
        "url": `${baseUrl}/${lang}`,
        "logo": `${baseUrl}/icons/icon-512x512.png`,
        "description": "Determinism for AI‑Driven Development",
        "sameAs": [
            "https://github.com/Andrii2203/ICEBERG-FRAMEWORK",
            "https://www.linkedin.com/in/andrii-shavel-976485187/"
        ]
    }),

    website: (lang: string): WithContext<WebSite> => ({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Iceberg Framework",
        "url": `${baseUrl}/${lang}`
    }),

    product: (lang: string, id: 'solo' | 'agency'): WithContext<Product> => {
        const products = {
            solo: {
                name: "Iceberg OS Solo Pack",
                description: "Starter pack for individual AI execution. 600+ senior rules.",
                price: "129",
                currency: "USD"
            },
            agency: {
                name: "Iceberg OS Agency License",
                description: "Team-tier offering for up to 50 developers.",
                price: "2999",
                currency: "EUR"
            }
        };

        const item = products[id];

        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": item.name,
            "description": item.description,
            "brand": {
                "@type": "Brand",
                "name": "Iceberg Framework"
            },
            "offers": {
                "@type": "Offer",
                "url": `${baseUrl}/${lang}/${id}-pack`,
                "price": item.price,
                "priceCurrency": item.currency,
                "availability": "https://schema.org/InStock"
            }
        };
    },

    faq: (lang: string, items: { q: string, a: string }[]): WithContext<FAQPage> => ({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    }),

    breadcrumbs: (lang: string, steps: { name: string, url: string }[]): WithContext<BreadcrumbList> => ({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": steps.map((step, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": step.name,
            "item": `${baseUrl}/${lang}${step.url}`
        }))
    })
};
