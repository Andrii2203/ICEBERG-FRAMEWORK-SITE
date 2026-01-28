# DEEP ANALYSIS
Technical and business analysis for the Iceberg Framework Landing Website pages.

## HOME PAGE

### 1. Business Logic
- Multi-layered hero section to visualize the "Iceberg" concept (tip vs submerged mass).
- High-conversion call-to-action (CTA) for Exploring Standards.
- SEO-optimal semantic structure.

### 2. Minimal Required Functionality
- Parallax effect on scroll for the iceberg symbol.
- Responsive layout (Mobile-first).
- Multilingual content support.
- Fully accessible (WCAG 2.2 AA).

### 3. Data
- Static content for 8 languages (JSON/TS files).
- SEO metadata per language.

### 4. Logic Split
- **Server:** Page composition, initial i18n detection, SEO metadata generation.
- **Client:** Parallax scrolling logic, language switching, interactive animations.

### 5. Component Structure
- `IcebergHero`: Complex parallax component.
- `ValueProposition`: Simple text sections.
- `PrinciplesGrid`: 3x2 grid of Iceberg principles.

### 6. Reusability
- Shared `SectionWrapper` for consistent padding/gradients.
- Shared `Typography` components.

### 7. Legacy Antipatterns
- N/A (New project).

### 8. Rewrite Strategy
- Implement `IcebergHero` using CSS-grid and subtle JS-driven parallax for performance.
- Use Next.js `middleware` for language detection.

---

## METHODOLOGY PAGE

### 1. Business Logic
- Explain the tiered structure of the framework.
- Distinguish between MIT and Commercial licenses clearly.

### 2. Minimal Required Functionality
- Tiered card system or interactive diagram.
- Direct links to documentation categories.

### 3. Logic Split
- **Server:** All content is static, minimal client interaction needed.

---

## AUDIT PAGE

### 1. Business Logic
- Multi-step UI audit process (Upload -> Detection -> Result).
- Dynamic feedback based on image classification (UI, Non-UI, Chaos).
- Monetization boundary for full reports (Stripe).

### 2. Minimal Required Functionality
- Drag-and-drop file upload.
- Real-time classification via `/api/detect-ui`.
- Deterministic branching:
    - Non-UI: Error message + "Try again".
    - Chaos: Free "Chaos Audit" CTA.
    - UI: Premium "Full Audit" CTA + Stripe Checkout.

### 3. Logic Split
- **Server:** Page composition, dictionary injection, SEO metadata.
- **Client:** State management for steps, file handling, API orchestration, and UI updates.

### 4. Component Structure
- `AuditClient`: Main orchestrator for client logic.
- `UploadZone`: Reusable file upload handler.
- `DetectionStatus`: Visual feedback for analysis phase.
- `AuditResultCard`: Dynamic display of analysis outcome.

### 5. Reusability
- `UploadZone` can be reused in future specialized audits.
- Shared `CleanPageLayout` for consistent page structure.

### 6. Legacy Antipatterns
- Mixed concerns in a single file (Server + Client + API).
- Inline prompts/logic (to be moved to services).

---

## STOP‑CHECK
- [x] All mandatory categories filled for Home and Methodology
- [x] No assumptions
- [x] Terminology consistent
