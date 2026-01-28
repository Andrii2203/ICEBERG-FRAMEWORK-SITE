# ARCHITECTURE DEFINITION
Official architecture for the Iceberg Framework Landing Website.

## 1. FOLDER STRUCTURE
Following the **Iceberg Architecture Standard (App Router)**:

```
src/
  app/                     # Routing, Layouts, Metadata, Server Components
    [lang]/                # i18n dynamic route segment
      (marketing)/         # Route group for landing pages
        philosophy/        # /philosophy page
        methodology/       # /methodology page
        standards/         # /standards page
        protocols/         # /protocols page
        enterprise/        # /enterprise page
      page.tsx             # Home Page
      layout.tsx           # Multi-language layout
  features/                # Domain-specific UI and logic
    hero/                  # Parallax Iceberg Hero feature
    navigation/            # i18n Navbar and Mobile Menu
    standards-list/        # Standards visualization
    footer/                # Global footer
  domain/                  # Framework-agnostic logic
    i18n/                  # Language models and types
    framework/             # Principle definitions and models
  shared/                  # Reusable UI, hooks, utils
    ui/                    # Atomic components (Buttons, Cards, Typography)
    hooks/                 # Shared client-side hooks
    utils/                 # Pure functions (formatting, slugs)
    config/                # Global framework configuration
  infrastructure/          # External integrations
    i18n/                  # Dictionary fetchers and adapters
    pwa/                   # Service worker registration and PWA logic
```

## 2. LAYER RESPONSIBILITIES

### **App Layer**
- Composition of pages using feature components.
- Metadata and SEO generation (Server-side).
- i18n route handling and locale detection.

### **Feature Layer**
- Self-contained modules like `hero` and `navigation`.
- Only imports from `domain`, `infrastructure`, and `shared`.

### **Domain Layer**
- Pure TypeScript models of Iceberg principles.
- No React dependencies.

### **Shared Layer**
- Stable UI primitives.
- Foundation for the entire project.

### **Infrastructure Layer**
- Managing the Service Worker for PWA.
- Dictionary loading for 8 languages.

## 3. DATA FLOW
1. **Request:** Next.js middleware detects locale.
2. **Server:** `app/[lang]/layout.tsx` fetches the dictionary.
3. **Server:** Metadata is generated for the specific language.
4. **Render:** Components receive content from the dictionary via props or context.
5. **PWA:** Service worker caches static assets and documentation pages for offline access.

## 4. COMPONENT SYSTEM
- **Atomic UI:** Small, reusable components in `shared/ui`.
- **Feature Blocks:** Logical sections in `features/`.
- **Page Layouts:** Structural wrappers in `app/`.

## 5. AUDIT PIPELINE
The `/audit` feature uses an orchestrator pattern to manage the UI analysis workflow:

```mermaid
graph TD
    User[/audit/] --> |Upload Screenshot| Orchestrator[/api/audit/]
    Orchestrator --> |Groq Vision| Detection[UI Detection]
    Detection --> |Non-UI| Error[Return Error]
    Detection --> |Chaos| FreeAudit[Groq Text: Free Audit]
    Detection --> |UI| StripeCheck{Paid Audit?}
    StripeCheck --> |Yes| Stripe[Stripe Checkout]
    Stripe --> |Success| Claude[Claude 3.5: Full Audit]
    Claude --> |Generate 6 Files| Zip[Zip Service]
    Zip --> |Return ZIP| User
    StripeCheck --> |No| Error2[Paid Only for Full Audit]
```

---

## STOP‑CHECK
- [x] Folder structure validated (Iceberg Compliant)
- [x] No conflicts with Repo B
- [x] Terminology consistent
