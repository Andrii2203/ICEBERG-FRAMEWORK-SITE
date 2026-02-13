# I18N SEO MODEL
Deterministic model for multilingual search optimization.

## 1. PURPOSE
To ensure language parity and perfect cross-linking (hreflang) across all 8 locales.

## 2. LOCALE DEFINITIONS
- **Primary:** `en` (English)
- **Secondary:** `ua`, `pl`, `de`, `es`, `fr`, `it`, `pt`
- **Fallback:** English (`en`) via `x-default`.

## 3. SEO LOCALIZATION RULES
- **Translation:** Every title and description must be translated contextually (no raw machine translation).
- **OG Assets:** OpenGraph images must be localized if they contain text.
- **URL Structure:** `/[lang]/[slug]` (e.g., `/fr/philosophy`).

## 4. HREFLANG CLUSTERS
Clusters are generated dynamically based on the current page ID.
Example cluster:
```html
<link rel="alternate" hreflang="en" href="https://iceberg-framework-site.vercel.app/en/standards" />
<link rel="alternate" hreflang="ua" href="https://iceberg-framework-site.vercel.app/ua/standards" />
...
<link rel="alternate" hreflang="x-default" href="https://iceberg-framework-site.vercel.app/en/standards" />
```

---

## STOP‑CHECK
- [x] All 8 locales included
- [x] x-default points to primary English
- [x] URL structure is deterministic
