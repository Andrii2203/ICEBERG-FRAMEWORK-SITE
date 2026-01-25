---
description: how to add a new page to the Iceberg landing site
---

# Add New Page Workflow

Any AI agent or developer adding a new page MUST follow these steps to ensure deterministic compliance with the Iceberg Framework.

## 1. Documentation First
Before writing code, create a documentation file in `/docs` (e.g., `/docs/NEW_FEATURE.md`) describing:
- Target slug
- Content structure
- Metadata requirements

## 2. i18n Content
Add the new page content to ALL supported language files in `src/infrastructure/i18n/dictionaries/`:
- `en.json`, `ua.json`, `pl.json`, `de.json`, `es.json`, `fr.json`, `it.json`, `pt.json`.

## 3. Route Creation
Create the directory structure under `src/app/[lang]/(marketing)/[slug]/`.

## 4. Metadata Implementation
Implement `generateMetadata` in the new `page.tsx` using the shared SEO utility:

```tsx
import { generatePageMetadata } from "@/shared/utils/seo/generatePageMetadata";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return generatePageMetadata(lang, "your-slug", dict.yourModule.title, dict.yourModule.description);
}
```

## 5. Sitemap Registry
Add the new slug (starting with `/`) to the `pages` array in `src/app/sitemap.ts`.

## 6. Verification
- Run `npm run build`.
- Inspect rendered HTML for:
    - Absolute canonical URL.
    - Correct hreflang for 8 languages + x-default.
