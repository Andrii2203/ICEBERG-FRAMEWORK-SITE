# THE ICEBERG CORRIDOR: OPERATIONAL STANDARDS

**Status:** MANDATORY  
**Purpose:** Ensure all future development follows "Senior-Grade" patterns automatically.

## 1. THE i18n SENTINEL (Multi-Language)
- Every user-facing string MUST be placed in `src/infrastructure/i18n/dictionaries`.
- Never use hardcoded strings in `.tsx` components.
- When creating a new feature, update ALL primary dictionaries (`en`, `ua`, `pl`, `de`, `es`, `fr`, `it`, `pt`).

## 2. THE THEME CONTINUITY (Light/Dark)
- Components must support both Light and Dark modes.
- Use CSS variables (`var(--...)`) or Tailwind-compatible classes that respect the `dark:` prefix.
- Verify that icons (Lucide/SVG) and backgrounds have sufficient contrast in both modes.

## 3. THE TELEGRAM SENTINEL (Security Logging)
- All critical system events must be reported to Telegram via `TelegramService`:
    - Rate limit breaches (`RATE_LIMIT_EXCEEDED`).
    - Security bypasses or service failures.
    - Stripe Webhook failures or successful payments.
    - AI Service critical errors.

## 4. THE PRIVACY SHIELD (Statelessness)
- **Zero-Storage Principle**: Never store user-uploaded images on the server or database.
- **State Purge Protocol**: Every feature must implement a cleanup mechanism upon success (e.g., `sessionStorage.removeItem`, resetting React states).
- Process data in-memory only.
- AI APIs must be configured to NOT store data for training.

## 5. THE COMPENSATOR RULE (Layout Stability)
- Dashboards and main UI containers must have stabilized geometry.
- Use `min-h-[value]` or `flex-1` / `h-full` on parent-child relationships to prevent layout jumping during state transitions (loading/success/error).

## 6. THE PROTOCOL LOCK (API Communication)
- Every `route.ts` must have an explicit comment at the top specifying the expected payload type: `// EXPECTS: JSON` or `// EXPECTS: FORMDATA`.
- This prevents cross-layer communication failures during refactoring.

## 7. THE ATOMIC ACTION RULE (UI Consistency)
- Buttons must follow a strict hierarchy to avoid redundancy:
    - **Primary**: Focused action (e.g., "Analyze", "Download"). Use solid brand colors.
    - **Secondary**: Information/Discovery (e.g., "Learn More"). Use outlines/ghost styles.
    - **Reset/Destructive**: State reset (e.g., "Replace Input"). Use subtle styles, positioned away from primary actions.

## 8. THE DOCUMENTATION-FIRST RULE
- Before writing code for a new feature, update:
    1. `ARCHITECTURE.md` (Design changes).
    2. `task.md` (Implementation phases).
    3. `ICEBERG_TASK_DRAFT.md` (Operational log).

## 9. THE EDGE-SAFETY RULE
- Middleware and Edge functions must avoid Node.js-only APIs.
- Use explicit configuration objects (e.g., `src/config/env.ts`) instead of direct `process.env` access or `.fromEnv()` helpers that might trigger Node.js compatibility warnings.

## 10. THE CLEAN-EXIT RULE
- Professional projects must purge "Debug Debris" (extraneous `console.log` statements used for AI tracing) once a feature is stabilized and verified.

## 11. THE COMMERCIAL INTEGRITY RULE
- Product pages (`/solo-pack`, `/enterprise`) must maintain a "Premium" aesthetic (Gradients, Glassmorphism, subtle animations).
- Pricing must be pulled from environment variables (`STRIPE_PRICE_ID_*`) to ensure staging/production parity.

## 12. THE ASSET VAULT RULE (R2 Security)
- All commercial assets (YAML/ZIP) must be stored in private R2 buckets.
- Never expose direct R2 links. ALWAYS use the `/api/download` proxy with 10-minute presigned URL TTL (Time To Live).

---
*Following this corridor ensures the Iceberg OS remains a high-performance, secure, and globally-ready framework.*
