export * from "./seo/generatePageMetadata";
export * from "./seo/generateSchema";

import { generateSchema } from "./seo/generateSchema";

/**
 * Legacy support for getJsonLd, now powered by the new Schema Generator.
 */
export const getJsonLd = (lang: string) => [
    generateSchema.organization(lang),
    generateSchema.website(lang)
];
