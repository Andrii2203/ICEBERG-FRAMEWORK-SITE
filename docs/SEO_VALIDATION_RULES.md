# SEO VALIDATION RULES
Hard rules for the Validation Engine (CARD 5).

## 1. PURPOSE
Defines the "failure" criteria for automated SEO audits.

## 2. CRITICAL FAILURES (BLOCKERS)
- Missing `canonical` tag.
- Relative URL in `canonical` or `hreflang`.
- Missing `x-default` in hreflang cluster.
- Title length > 60 characters.
- Description length > 155 characters.
- Duplicate H1 tag.

## 3. MAJOR FAILURES (REQUIRED FIX)
- Word count < 300.
- Missing OpenGraph image.
- Image missing `alt` text.
- Invalid JSON-LD schema.

## 4. MINOR FAILURES (OPTIMIZATION)
- Duplicate H2 tags.
- Keywords missing (optional).
- Lastmod not updated.

---

## STOP‑CHECK
- [x] Critical failures defined
- [x] Word count threshold established
- [x] Metadata length rules enforced
