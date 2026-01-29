# Styling Rules

Official styling standards for the Iceberg Framework Landing Website. All UI styling must follow these rules.

## 1. Scope

- **Component styles:** SCSS modules (`.module.scss`) colocated with the component.
- **Global styles:** `src/app/globals.css` only (base reset, CSS variables, body, rare global utilities).
- **No Tailwind:** No Tailwind CSS or utility classes in JSX. Styling is SCSS + CSS variables.

## 2. File conventions

- One `.module.scss` file per component or page, in the same directory as the `.tsx` file.
- File name: `ComponentName.module.scss` or `page.module.scss` for route pages.
- Import in TSX: `import styles from './ComponentName.module.scss';`

## 3. CSS variables (design tokens)

- **Source of truth:** `src/app/globals.css`.
- **Tokens:** Use the existing variables; do not introduce new ad‑hoc hex/RGB values for brand colors.

| Variable   | Purpose        | Light example | Dark (`.dark`) |
|-----------|----------------|----------------|----------------|
| `--bg`    | Background     | `#F8FAFC`      | `#020617`      |
| `--text`  | Text           | `#020617`      | `#F8FAFC`      |
| `--surface` | Cards, panels | `#CBD5E1`    | `#0A1A2F`      |
| `--border`  | Borders       | `#475569`      | `#1E3A5F`      |
| `--accent`  | Links, focus  | `#38BDF8`      | same           |

**Page-section variables (marketing pages):** In `:root`, globals.css also defines `--page-main-padding`, `--page-main-padding-sm`, `--page-main-max-width`, `--page-header-margin-bottom`, `--page-header-margin-bottom-md`, `--page-title-size`, `--page-title-size-sm`, `--page-title-size-md`, `--page-title-weight`, `--page-title-letter-spacing`, `--page-title-margin-bottom`, `--page-subtitle-size`, `--page-subtitle-size-sm`, `--page-description-size`, `--page-description-size-sm`, `--page-description-size-md`, `--page-description-line-height`, `--page-description-margin-bottom`, `--page-description-margin-bottom-sm`. Use `var(--page-...)` in page `.module.scss` for consistent titles, descriptions, and container spacing. No SCSS import needed; globals.css is loaded once in the root layout.

- In SCSS: `color: var(--text);`, `background-color: var(--bg);`, etc.
- For opacity: use `color-mix(in srgb, var(--text) 70%, transparent)` (or similar) instead of raw `opacity` when you need translucent colors.

## 4. Dark mode

- Theme is toggled via class `.dark` on `<html>` (see layout and ThemeSync).
- In SCSS modules, target dark mode with `:global(.dark)` when a rule must change for dark theme, e.g.:

```scss
.card {
  background-color: var(--surface);

  :global(.dark) & {
    border-color: var(--border);
  }
}
```

- Prefer using the same CSS variables for light and dark (they are redefined in `.dark` in globals.css) so most rules need no dark-specific overrides.

## 5. Class names and usage in TSX

- **Semantic names:** Use meaningful class names (e.g. `.navLink`, `.hero`, `.card`) rather than utility-style names (e.g. `.flex`, `.textXl`).
- **JSX:** Use the imported `styles` object: `className={styles.root}`, `className={styles.header}`, etc.
- **Conditional classes:** Use the `cn()` helper: `className={cn(styles.base, isActive && styles.active)}`. Do not put Tailwind or raw utility strings in `cn()`.
- **No Tailwind in JSX:** No `className="flex gap-4"` or similar. All visual styling comes from the component’s `.module.scss`.

## 6. Inline styles

- **Avoid.** Put layout and appearance in the SCSS module.
- **Exception:** Truly dynamic values (e.g. position from JS: `left`, `top`) may stay as `style={{ }}` when they cannot be expressed in CSS alone.

## 7. Responsive breakpoints

Use the shared breakpoint mixins instead of hardcoded `@media (min-width: …)`:

- **`src/styles/_breakpoints.scss`** — Defines `$bp-xs` (480px), `$bp-sm` (640px), `$bp-md` (768px), `$bp-lg` (1024px) and mixins: `@include from-xs`, `@include from-sm` (tablet), `@include from-md`, `@include from-lg` (screen). Aliases: `tablet` = from-sm, `screen` = from-lg.

**Usage:** At the top of a module: `@use "../../../styles/breakpoints" as *;` (path relative to the file). Then use `@include from-sm { … }` instead of `@media (min-width: 640px) { … }`.

- **&lt; 480px / 640px:** Mobile (base styles: reduced padding, single column, smaller font sizes).
- **640px (from-sm / tablet):** Increase padding, font sizes, some layout.
- **768px (from-md):** Multi-column grids, row layouts.
- **1024px (from-lg / screen):** Desktop; full nav, side-by-side sections.

Prefer **mobile-first**: base styles for small screens, then `@include from-sm` / `from-md` / `from-lg` to add or override. Use **shorthand `padding`** (e.g. `padding: 8rem 1rem 3rem`) instead of separate `padding-top` / `padding-bottom` / `padding-left` / `padding-right` when values are consistent.

**Responsive typography:** Use explicit font sizes per breakpoint (e.g. `font-size: 2rem; @include from-sm { font-size: 2.5rem; } @include from-md { font-size: 3rem; }`) so it’s obvious which size applies when. Avoid `clamp()` for key headings if you want clarity; use media/mixins instead.

## 8. SCSS structure

- Prefer flat, readable selectors and a small number of classes per component.
- Use the same directory for TSX and its `.module.scss`; no shared SCSS partials unless multiple components reuse the same tokens/mixins (then consider `src/styles/` or similar and document in this file).

## 9. References

- **Changes over time:** `docs/CHANGELOG.md` (styling migration and Tailwind removal).
