# SEO QA PROTOCOL
Step-by-step verification protocol for SEO compliance.

## 1. PURPOSE
To ensure 100% adherence to SEO Technical Standard v0.2 before any release.

## 2. PRE-DEPLOYMENT QA
1. **Metadata check:** Verify title/description exist and are localized.
2. **Canonical check:** Ensure no relative URLs in `canonical` tags.
3. **Hreflang check:** Verify all 8 locales are present and x-default exists.
4. **Sitemap check:** Verify page is included in sitemap and has correct lastmod.
5. **Schema check:** Pass JSON-LD through Rich Results Test.

## 3. POST-DEPLOYMENT QA
1. **Indexability check:** Verify `robots` tag is `index, follow`.
2. **Speed check:** Lighthouse mobile score > 90.
3. **Crawlability check:** Verify no internal 404s to key pages.

---

## STOP‑CHECK
- [x] Pre-deploy steps defined
- [x] Schema validation mandatory
- [x] Manual check required for content depth
