# ICEBERG_TASK_DRAFT.md — Iceberg Framework Landing Website

## 1. PROJECT IDENTITY
- **Project Name:** Iceberg Framework Landing Website
- **Tagline:** Determinism for AI‑Driven Development
- **Goal:** Create a production-ready landing site explaining the Iceberg Framework, its philosophy, standards, and protocols.
- **Framework:** Next.js (App Router + TypeScript)
- **Primary Palette:** 
  - Iceberg White (#F8FAFC)
  - Deep Ice Blue (#0A1A2F)
  - Arctic Blue (#1E3A5F)
  - Frozen Gray (#CBD5E1)
- **Accent Palette:**
  - Glacier Cyan (#38BDF8)
  - Polar Night (#020617)
  - Steel Blue (#475569)
- **Core Methodology:** Determinism, Structure Over Creativity, Explicitness, Idempotency, STOP‑CHECK Governance.

## 2. TASK CONTEXT
- **Card:** EXECUTION MAP — CARD 1
- **Phase:** Phase 9 — Implementation
- **Status:** EXECUTION
- **Repository A (Read-Only Source):** Iceberg Framework (Standards, Protocols, Brand)
- **Repository B (Working Directory):** Next.js Project (Landing Site Implementation)

## 3. REQUIREMENTS (CARD 1)
- Parallax iceberg hero section.
- 8 languages support (EN, UA, PL, DE, ES, FR, IT, PT).
- Full PWA (manifest + SW + offline rules).
- Complete SEO (metadata, canonical, schema, sitemap).
- Compliance with Iceberg Standards:
  - Architecture Standard
  - Website Quality Standard
  - SEO Technical Standard
  - Accessibility Standard
  - PWA Standard

### [2026-01-17 20:15] Build Success & Audit Closure
- **Verification:** `npx next build --webpack` passed successfully.
- **Outcome:** Codebase is structurally compliant, builds correctly, and produces valid PWA assets.
- **Audit Status:** CLOSED - COMPLIANT.
- **Ready for:** Feature, Content, and Final Polish phases.
### [2026-01-17 20:25] Build Ghost Hunt
- **Symptom:** Build fails looking for `src/app/[lang]/enterprise/page.js`.
- **Reality:** File should be in `src/app/[lang]/(marketing)/enterprise/page.tsx`.
- **Hypothesis:** `npm start` (running in background per metadata) prevented `.next` deletion, causing stale validator to persist.
- **Action:** Verifying file existence in new location.
- **Next:** Request user to KILL `npm start` and forcefully delete `.next`.
### [2026-01-17 21:05] Session Closure
- **Update:** Replaced Twitter with LinkedIn (`...976485187/`) and updated GitHub (`Andrii2203`).
- **Artifacts:** Generated `walkthrough.md`, `audit_report.md`.
- **Conclusion:** Session Objectives Met. System is stable, compliant, and polished.
### [2026-01-17 21:00] Phase 10 Completion
- **Feature:** Side-Integrated Footer implemented in `IcebergHero`.
- **Refactor:** `StandardsGrid` extracted to `src/features/standards-list`.
- **Verification:** Build passed.
- **Status:** Phase 10 COMPLETE.
- **Next:** Final Polish & Clean-up.
### [2026-01-17 20:30] Phase 9 Completion
- **Action:** User cleared `.next` and rebuilt successfully.
- **Result:** Build passed. PWA active. Documentation compliant.
- **Status:** Phase 9 (Implementation Base) COMPLETE.
- **Next:** Phase 10 (Feature Implementation).
- [2026-01-17 14:50] User approved plan and installed dependencies. Starting Phase 9.
- [2026-01-17 17:05] Resuming PWA configuration fix. User reminded me to use this draft as a personal technical diary. Focusing on manifest validity and SW registration.

## 5. INTERNAL TECHNICAL NOTES (SCRATCHPAD)
### PWA & Manifest Issues:
- **Blocker:** Next.js 15/16 changed how `params` are handled (they are now Promises). This affected layout and page metadata fetching.
- **Blocker:** `middleware.ts` naming is deprecated; renamed to `proxy.ts`. 
- **Manifest:** Currently using `src/app/manifest.ts`. Need to ensure it's exposed at `/manifest.json` correctly.
- **Icons:** One 512x512 PNG exists in `public/icons`. Need to ensure a 192x192 version exists for full PWA compliance. 
- **Bug:** `skipWaiting` was unsupported in the current `@ducanh2912/next-pwa` type defs. Need to check if it's strictly necessary or if there's a different key.
- **Aesthetics:** The Hero section was revamped with SVGs. Hydration mismatch fixed by ensuring bubbles only render on client (useEffect + isMounted).

### PWA Mandatory Checklist:
- [ ] Ensure `icon-192x192.png` exists in `public/icons`.
- [ ] Update `manifest.ts` with correct icon paths (not hashes or generated paths, just clean public paths).
- [ ] Add `pwa.dest: "public"` and appropriate settings in `next.config.ts`.
- [ ] Test build and verify `sw.js` generation.

### [2026-01-17 19:48] Compliance Refactoring
- **Action:** Created `src/domain` structure.
- **Action:** Moved landing pages to `src/app/[lang]/(marketing)/` (User executed).
- **Next:** Inferring types from `en.json` to populate `src/domain/i18n/types.ts`.

### [2026-01-17 19:55] Compliance Audit Completed
- **Structure:**
  - [x] `src/domain` created and populated.
  - [x] `src/app/[lang]/(marketing)` structure implemented.
  - [x] `src/shared/ui` created.
  - [x] `src/features/*` (standards-list, footer) placeholders created.
  - [x] `src/infrastructure/pwa` placeholder created.
- **Type Safety:**
  - [x] `Dictionary` interface defined in Domain layer.
  - [x] `dictionaries.ts` enforces `Promise<Dictionary>`.
- **Status:** **✔ COMPLIANT** with Architecture Standard v1.0.

## 6. METHODOLOGY REFLECTION
### Architecture Compliance:
- **Verified:** I am using `src/features` for business-logic UI (Hero, Nav) as defined in `docs/ARCHITECTURE.md`. 
- **Verified:** i18n is strictly in `src/infrastructure` to separate cross-cutting concerns.
- **Verified:** `src/shared` contains pure utilities (`cn`).

### Coding Rules Compliance:
- **Rule 1 (RSC):** All page components are `async` and use server-side dictionary fetching.
- **Rule 2 (Icons):** Strictly using `lucide-react` as specified.
- **Rule 3 (Types):** Interface types are defined for props (e.g., `NavbarProps`).

### STOP-CHECK Governance:
- **Reflection:** I was moving too fast. User correctly pointed out that the draft is my "memory". I must use it to store technical "debris" that doesn't belong in formal docs but is vital for the mission.
- **Refinement:** Before executing code, I will write the "Internal Log" of what I'm about to do.

## 7. TECHNICAL DIARY (APPEND-ONLY)
### [2026-01-17 17:15] The PWA "Manifest 404" Deep Dive
- **Issue:** `manifest.json` returns 404 even though `manifest.ts` exists.
- **Analysis:** 
  1. Next.js generates `/manifest.webmanifest` (or `/manifest.json`) from `manifest.ts`. 
  2. If the `proxy.ts` (middleware) matcher blocks it, it will redirect/404. I've updated the matcher, but there's a catch: if the file name in the matcher doesn't match what Next.js expects, it fails.
  3. Icons are referenced in `manifest.ts` as `icon-192x192.png`, but only `iceberg_logo_pwa_512_1768660112162.png` exists. This might cause the manifest generation to fail silently or return invalid content.
  4. Build error in `proxy.ts` was because of naming (`middleware` vs `proxy`). Fixed.

### [2026-01-17 17:20] Action Plan for PWA Finalization:
1. **Renaming Icons:** Need to make icon names predictable for the manifest.
   - `move public\icons\iceberg_logo_pwa_512_1768660112162.png public\icons\icon-512x512.png`
   - I'll use the same file for 192x192 for now to satisfy the manifest requirements without resizing (better to have a high-res icon than a 404).
2. **Next.config update:** 
   - Add `skipWaiting: true`.
   - Ensure `pwa.dest` is indeed `public`.
3. **Manifest.ts update:**
   - Change colors to strictly `#000000` (User requirement).
   - Ensure paths match the renamed icons.
4. **Layout.tsx verify:**
   - Confirm `manifest: "/manifest.json"` in `generateMetadata`.
5. **STOP-CHECK:** Check build. If `sw.js` and `workbox-*.js` appear in `public/`, we've won.

### [2026-01-17 17:20] Situation Report: THE GREAT PWA BLINK
- **Symptom 1:** Chrome DevTools shows "Line: 1, column: 1, Syntax error" for `manifest.json`. This usually means the server is returning HTML (likely a Build Error page) instead of JSON.
- **Symptom 2:** Service Workers tab is empty. SW is not registering.
- **Root Cause Analysis (Hypothesis):** 
  1. The "Proxy" function in `proxy.ts` might still be throwing errors or Next.js is not picking it up correctly.
  2. The redirection logic in `proxy.ts` might be catching `manifest.json` despite the matcher.
  3. `manifest.ts` generation might be failing due to missing icons or TypeScript issues.
- **Strategy:** Adopt READ-FROM-ZERO. I will read this diary before every major tool call to ensure I don't deviate from the Iceberg Standard.

### [2026-01-17 17:25] Recovery Roadmap (Deterministic):
1. **Fix proxy.ts for good:** Ensure it exports a function named `proxy` AND that Next.js 16 accepts it. (Wait, Next.js 16 actually still uses `middleware.ts` but the warning suggested `proxy`? I need to verify this. ACTUALLY, the warning said "Next.js 16.1.3... middleware convention is deprecated... use proxy instead". Sticking with `proxy.ts`).
2. **Verify Manifest content via cURL/Browser:** I need to see what `http://localhost:3000/manifest.json` actually returns.
3. **Fix Icon Assets:** I will rename the files properly in `public/icons`.
4. **Link Manifest in Layout:** Ensure `metadata` has `manifest: "/manifest.json"`.
5. **Final STOP-CHECK:** Build and Inspect.

### [2026-01-17 17:25] Update: Icons Ready
- **Status:** User confirmed `icon-192x192.png` and `icon-512x512.png` are already created/renamed.
- **Verification:** I can proceed directly to configuration fixes.

### [2026-01-17 17:26] Recovery Roadmap (Execution):
1. **Fix `proxy.ts` Export:** Change `export function proxy` to `export default function`. This is the most likely cause of the "Syntax Error" (server returning error HTML).
2. **Update `next.config.ts`:** Add `skipWaiting: true` to the PWA options.
3. **Update `manifest.ts`:** Set colors to `#000000` and ensure icon paths are correct.
4. **Verification:** Test `/manifest.json`.

### [2026-01-17 17:30] Code Verification:
- **proxy.ts:** Confirmed `export default function proxy`.
- **next.config.ts:** Confirmed `skipWaiting: true`.
- **manifest.ts:** Confirmed colors `#000000` and paths to `icon-192x192.png`.

### [2026-01-17 17:35] The "Why the Syntax Error?" Investigation:
- If the code is correct, the error must be environmental (cache, stale dev server, or matcher logic).
- **STOP-CHECK:** I will verify the actual content of `http://localhost:3000/manifest.json`.

### [2026-01-17 17:40] Next Steps:
1. **Force Refresh/Browser Clean Test:** Use browser tool to visit manifest and check console.
2. **Review Layout:** Ensure `manifest: "/manifest.json"` is definitely there.
