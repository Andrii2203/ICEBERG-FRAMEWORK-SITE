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

### Philosophy Page
- **URL:** /philosophy
- **Files:**  
  - src/app/philosophy/page.tsx
- **Short Description:** Explains the core philosophy (Determinism, Structure Over Creativity) and the market problem Iceberg solves.

### Methodology Page
- **URL:** /methodology
- **Files:**  
  - src/app/methodology/page.tsx
- **Short Description:** Detailed breakdown of the three layers: Iceberg Method, Framework Standards, and Enterprise Engines.

### Standards Overview
- **URL:** /standards
- **Files:**  
  - src/app/standards/page.tsx
- **Short Description:** Overview of all open-source standards (MIT) with links to their definitions.

### Protocols Overview
- **URL:** /protocols
- **Files:**  
  - src/app/protocols/page.tsx
- **Short Description:** Overview of core protocols (Planning, Migration, AI Execution).

### Enterprise Page
- **URL:** /enterprise
- **Files:**  
  - src/app/enterprise/page.tsx
- **Short Description:** Information about proprietary commercial modules (AI Executor, Memory Engine, etc.).

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
  /enterprise
  /audit
```

---

## STOP‑CHECK
- [x] All pages included
- [x] All URLs verified
- [x] Terminology consistent
