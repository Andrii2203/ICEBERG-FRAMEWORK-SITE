# SEO Architecture & Indexing Strategy

## 1. Problem Statement
The current implementation uses a shared `alternates` configuration in the root `layout.tsx`. Because the layout does not know the specific slug of the child page, it generates incorrect or ambiguous canonical URLs, leading to Google Search Console errors: "Duplicate, Google chose different canonical than user".

## 2. Target Architecture (The Iceberg Fix)

### Core Principles:
- **Explicitness**: Every page must declare its own canonical URL.
- **Idempotency**: The same slug on the same language must always produce the same metadata.
- **Centralization**: Common logic for alternate languages (hreflang) is extracted into a shared utility.

### Components:

#### Shared Utility: `src/shared/utils/seo/generatePageMetadata.ts`
This function is the "Single Source of Truth" for metadata generation.
- **Input**: `lang` (string), `slug` (string), `dict` (Dictionary object).
- **Output**: Next.js `Metadata` object including `title`, `description`, `canonical`, and `hreflang` for all 8 supported languages.
- **X-Default**: Always points to the `/en` version of the page.

#### Metadata Base
`metadataBase` is set to `https://iceberg-framework-site.vercel.app` in `layout.tsx` to ensure all generated URLs are absolute.

#### Page Implementation
Every route in `src/app/[lang]` (e.g., `/standards`, `/philosophy`, etc.) must implement its own `generateMetadata` function and call the shared utility.

## 4. AUDIT PAGE SEO SPECIFICS
- **Slug**: `audit`
- **Supported Languages**: 8 (EN, UA, PL, DE, ES, FR, IT, PT)
- **Canonical**: `https://icebergframework.co/audit` (absolute per language via `generatePageMetadata`)

## 5. SEO Consistency Checklist
1. **Absolute URLs**: No relative paths in canonical/hreflang.
2. **Double Slashes**: baseUrl must NOT end with a slash if paths start with one.
3. **Language Parity**: All 8 languages (`en`, `ua`, `pl`, `de`, `es`, `fr`, `it`, `pt`) must be present in every page's alternates.
4. **Sitemap Synchronization**: The `sitemap.ts` must use the same `pages` list as the metadata logic.
