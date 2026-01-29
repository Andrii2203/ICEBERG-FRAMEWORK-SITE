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

## 7. SCSS structure

- Prefer flat, readable selectors and a small number of classes per component.
- Use the same directory for TSX and its `.module.scss`; no shared SCSS partials unless multiple components reuse the same tokens/mixins (then consider `src/styles/` or similar and document in this file).

## 8. References

- **Changes over time:** `docs/CHANGELOG.md` (styling migration and Tailwind removal).
