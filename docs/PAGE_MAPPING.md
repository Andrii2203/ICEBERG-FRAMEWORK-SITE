# PAGE MAPPING
Complete mapping of all pages for the Iceberg Framework Landing Website.

## 1. OVERVIEW
The website is a multi-page Next.js application designed to explain the Iceberg Framework. It follows the Iceberg Architecture Standard (App Router).

## 2. PAGE LIST

### Home Page
- **URL:** /
- **Files:**  
  - src/app/page.tsx
  - src/features/hero/ui/IcebergHero.tsx
- **Short Description:** Primary entry point featuring the parallax iceberg symbol and high-level value proposition.
- **SEO Slug:** `home`

### Philosophy Page
- **URL:** /philosophy
- **Files:**  
  - src/app/philosophy/page.tsx
- **Short Description:** Explains the core philosophy (Determinism, Structure Over Creativity) and the market problem Iceberg solves.
- **SEO Slug:** `philosophy`

### Methodology Page
- **URL:** /methodology
- **Files:**  
  - src/app/methodology/page.tsx
- **Short Description:** Detailed breakdown of the three layers: Iceberg Method, Framework Standards, and Enterprise Engines.
- **SEO Slug:** `methodology`

### Standards Overview
- **URL:** /standards
- **Files:**  
  - src/app/standards/page.tsx
- **Short Description:** Overview of all open-source standards (MIT) with links to their definitions.
- **SEO Slug:** `standards`

### Protocols Overview
- **URL:** /protocols
- **Files:**  
  - src/app/protocols/page.tsx
- **Short Description:** Overview of core protocols (Planning, Migration, AI Execution).
- **SEO Slug:** `protocols`

### Solo Pack Page
- **URL**: `/solo-pack`
- **Files**: `src/app/[lang]/(marketing)/solo-pack/page.tsx`
- **Short Description**: Starter pack landing for individuals. 600+ Senior-grade rules.

### Enterprise Page
- **URL**: `/enterprise`
- **Files**: `src/app/[lang]/(marketing)/enterprise/page.tsx`
- **Short Description**: Dual-tier (Agency/Enterprise) portal with team-scaling pitch.

### Success & Download Page
- **URL**: `/success`
- **Files**: `src/app/[lang]/(marketing)/success/page.tsx`
- **Short Description**: Secure download portal using Stripe session validation and R2 signed URLs.

### Audit Page
- **URL:** /audit
- **Files:**  
  - src/app/audit/page.tsx
  - src/features/audit/ui/AuditClient.tsx
- **Short Description:** UI/UX audit tool with automated analysis using Groq and Claude.

## 3. ROUTE TREE

```
/
  /philosophy
  /methodology
  /standards
  /protocols
  /solo-pack
  /enterprise
  /audit
  /success
```

---

## STOP‑CHECK
- [x] All pages included
- [x] All URLs verified
- [x] Terminology consistent
