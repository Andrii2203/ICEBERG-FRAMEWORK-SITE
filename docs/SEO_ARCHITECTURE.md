# SEO ARCHITECTURE
Deterministic architecture for the Iceberg SEO Machine.

## 1. PURPOSE
This document defines the structural and logical organization of SEO automation in the project.

## 2. CORE COMPONENTS
- **Metadata Engine (`src/shared/utils/seo`)**: Pure logic to generate tags.
- **I18N Adapter (`src/infrastructure/i18n`)**: Fetches localized SEO content.
- **Dynamic Sitemap (`src/app/sitemap.ts`)**: Automated XML generator.
- **Robots Governance (`src/app/robots.ts`)**: Indexation control.

## 3. DATA FLOW
1. **Resolution phase:** `generateMetadata` receives `params.lang`.
2. **Fetch phase:** SEO-specific dictionary shards are loaded.
3. **Generation phase:** Metadata Engine produces absolute URLs and hreflang clusters.
4. **Validation phase:** Built-in checks ensure no duplicate or relative URLs.

## 4. CANONICAL POLICY
- Root `/` redirects to `/en`.
- `/en` is the primary locale.
- All pages use **Self-Canonical** (pointing to themselves in the current locale).
- No cross-locale canonicals allowed.

## 5. HREFLANG POLICY
- Every page must contain links to all 8 supported languages.
- **x-default** must point to the English version.
- Clusters must be identical across all localized versions of the same page.

---

## STOP‑CHECK
- [x] Architecture follows CARD 5
- [x] Absolute URLs enforced
- [x] Self-canonical rule documented
