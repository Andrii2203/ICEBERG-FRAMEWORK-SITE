# Changelog

Record of significant changes to the Iceberg Framework Site. See `docs/STYLING_RULES.md` for styling standards.

---

## 2026-01-29 — Styling migration, theme persistence, active nav link

### 1. Styling migration (Tailwind → SCSS modules)

All TSX/JSX components were migrated from Tailwind-in-JSX to component-scoped `.module.scss` files. Styling audit reports 0 Tailwind classes remaining in JSX (one intentional inline style remains in IcebergHero for dynamic bubble positions).

**New files (SCSS modules):**

| File |
|------|
| `src/app/[lang]/(marketing)/audit/page.module.scss` |
| `src/app/[lang]/(marketing)/enterprise/page.module.scss` |
| `src/app/[lang]/(marketing)/methodology/page.module.scss` |
| `src/app/[lang]/(marketing)/philosophy/page.module.scss` |
| `src/app/[lang]/(marketing)/protocols/page.module.scss` |
| `src/app/[lang]/(marketing)/standards/page.module.scss` |
| `src/app/[lang]/layout.module.scss` |
| `src/app/[lang]/page.module.scss` |
| `src/features/audit/ui/AuditClient.module.scss` |
| `src/features/audit/ui/AuditShowcase.module.scss` |
| `src/features/hero/ui/IcebergHero.module.scss` |
| `src/features/navigation/ui/Navbar.module.scss` |
| `src/features/navigation/ui/ThemeToggle.module.scss` |
| `src/features/standards-list/ui/StandardsGrid.module.scss` |
| `src/shared/ui/layout/CleanPageLayout.module.scss` |

**Modified files (Tailwind removed, SCSS module wired):**

- `src/app/[lang]/(marketing)/audit/page.tsx`
- `src/app/[lang]/(marketing)/enterprise/page.tsx`
- `src/app/[lang]/(marketing)/methodology/page.tsx`
- `src/app/[lang]/(marketing)/philosophy/page.tsx`
- `src/app/[lang]/(marketing)/protocols/page.tsx`
- `src/app/[lang]/(marketing)/standards/page.tsx`
- `src/app/[lang]/layout.tsx`
- `src/app/[lang]/page.tsx`
- `src/features/audit/ui/AuditClient.tsx`
- `src/features/audit/ui/AuditShowcase.tsx`
- `src/features/hero/ui/IcebergHero.tsx`
- `src/features/navigation/ui/Navbar.tsx`
- `src/features/navigation/ui/ThemeToggle.tsx`
- `src/features/standards-list/ui/StandardsGrid.tsx`
- `src/shared/ui/layout/CleanPageLayout.tsx`

**Conventions used:** CSS variables from `globals.css` (`--bg`, `--text`, `--surface`, `--border`, `--accent`), `color-mix()` for opacity, `:global(.dark)` where needed, semantic class names (e.g. `.navLink`, `.hero`).

---

### 2. Theme persistence and no-flash on language switch

**Problem:** Theme (dark/light) persisted in `localStorage`, but switching language caused a white flash because the new document painted before client-side theme application.

**Changes:**

- **`src/app/[lang]/layout.tsx`**
  - Theme script is now the **first** child of `<head>` so it runs before any other content.
  - Inline script now sets both `document.documentElement.classList.add('dark')` / `remove('dark')` and `document.documentElement.style.backgroundColor` (`#020617` for dark, `#F8FAFC` for light) so the first paint has the correct background even before CSS loads.
- **`src/features/navigation/ui/ThemeSync.tsx`** (new)
  - Client component that runs `useLayoutEffect` on `pathname` change to re-apply theme from `localStorage` to `document.documentElement` (class + background color) before paint, so client-side navigation (e.g. language switch) does not show a flash.
  - `<ThemeSync />` is rendered in the root layout `<body>`.

**Result:** Theme persists across reloads and language switches; no white flash when changing language in dark mode.

---

### 3. Active link in header

**Change:** The current page is now visually indicated in the header navigation (desktop and mobile).

- **`src/features/navigation/ui/Navbar.tsx`**
  - Desktop and mobile nav links use `pathname === link.href` to add an active class (`navLinkActive` / `mobileNavLinkActive`).
  - `aria-current="page"` is set on the active link for accessibility.
- **`src/features/navigation/ui/Navbar.module.scss`**
  - `.navLinkActive` and `.mobileNavLinkActive`: `color: var(--accent)`, `font-weight: 600`.

---

### 4. Styling audit tooling (removed 2026-01-29)

The styling-audit script and generated docs (`scripts/styling-audit/`, `docs/STYLING_AUDIT.md`, `docs/styling-audit/`) were used for the one-time migration and have been removed. Styling standards are in **`docs/STYLING_RULES.md`**.

**Package:** `sass` remains; `npm run styling-audit` was removed.

---

### 5. Summary of modified vs new (git)

| Type   | Paths |
|--------|--------|
| Modified | `package.json`, `package-lock.json`, 15 TSX files listed in §1 |
| New      | 15 `.module.scss` files, `ThemeSync.tsx` |

---

### 6. Tailwind removal

After migrating all styling to SCSS modules, Tailwind CSS and related packages were removed so the stack no longer depends on Tailwind.

**Packages removed:**

- **`tailwindcss`** (dev) — No Tailwind classes remain in JSX; styles live in `.module.scss` and `globals.css`.
- **`@tailwindcss/postcss`** (dev) — PostCSS config no longer uses Tailwind.
- **`tailwind-merge`** (dependencies) — `cn()` now uses only `clsx` for conditional class names (no utility merging).

**Files changed:**

| File | Change |
|------|--------|
| `package.json` | Removed `tailwindcss`, `@tailwindcss/postcss`, `tailwind-merge` |
| `package-lock.json` | Updated by `npm install` (16 packages removed) |
| `postcss.config.mjs` | `plugins` set to `{}` (Tailwind plugin removed) |
| `src/app/globals.css` | Removed `@import "tailwindcss"` and `@theme inline { … }`; added minimal base (`* { box-sizing: border-box }`) |
| `src/shared/utils/cn.ts` | Removed `tailwind-merge`; `cn(...)` now returns `clsx(...)` only |

**Result:** Styling is fully SCSS-modules + CSS variables; no Tailwind dependency. The `cn()` helper remains in use for conditional class names (e.g. `cn(styles.navLink, isActive && styles.navLinkActive)`).

---

### 7. Cleanup: styling-audit script and generated docs removed

After the migration was complete, the one-time refactor tooling was removed:

- **Deleted:** `scripts/styling-audit/generate-styling-audit.mjs`, `scripts/styling-audit/README.md`
- **Deleted:** `docs/STYLING_AUDIT.md`, `docs/styling-audit/COMPONENT_STYLE_MAP.json`, `docs/styling-audit/STYLING_MIGRATION_PLAN.md`
- **Removed from package.json:** `npm run styling-audit` script

Styling standards are now only in **`docs/STYLING_RULES.md`**. CHANGELOG and STYLING_RULES references were updated accordingly.
