# SEO AUTOMATION ENGINE
Technical specification for the automated SEO generation system.

## 1. PURPOSE
To eliminate manual SEO entry and prevent indexing errors via deterministic code.

## 2. ENGINE LOGIC
- **Base URL:** Defined in `config/env` and `metadataBase`.
- **Slug Resolution:** Mapping between internal page IDs and public URL slugs.
- **Alternate Generation:** Circular loop over all languages in `dictionaries.ts`.

## 3. METADATA SCHEMA
Every page returns:
- `title`: Translated, < 60 chars.
- `description`: Translated, < 155 chars.
- `alternates`:
  - `canonical`: Absolute self-link.
  - `languages`: Full cluster + x-default.
- `openGraph`: Unique images and localized text.

## 4. IMPLEMENTATION RULES
- No hardcoded strings in `generateMetadata`.
- All text must come from `i18n/dictionaries`.
- Use the `generatePageMetadata` utility for consistency.

---

## STOP‑CHECK
- [x] Engine logic is deterministic
- [x] No hardcoding allowed
- [x] Cluster logic validated
