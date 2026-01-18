# CODING RULES
Official coding rules for the Iceberg Framework Landing Website.

## 1. PURPOSE
This document ensures code consistency, quality, and maintainability across the project.

## 2. GENERAL RULES
- **TypeScript Only:** No `.js` or `.jsx` files allowed.
- **Strict Types:** No `any`. Use interfaces and types for all data structures.
- **Deterministic Imports:** Use absolute imports (`@/features/...`) instead of relative imports.
- **No Creativity:** Follow existing patterns and standards without improvisation.
- **STOP‑CHECK:** Stop if a requirement is ambiguous.

## 3. COMPONENT RULES
- **Server Components by Default:** Use RSC unless client interactivity is required.
- **Client Components:** Mark with `"use client"` at the very top.
- **Naming:** React components must use `PascalCase`.
- **Size Limit:** Max 200 lines per component. Split if exceeded.
- **Props:** Use explicit prop types/interfaces.

## 4. STATE MANAGEMENT RULES
- **Server State:** Use React Server Components or caching via `fetch`.
- **Client State:** Use `useState` / `useReducer` for local state. Use `Zustand` for minimal global state if needed.
- **No Global Mutable State:** Avoid complex state managers like Redux unless necessary.

## 5. API RULES
- **Server-Side Only:** Perform API calls/fetch on the server.
- **Adapters:** Use adapters to convert raw API data to domain models.
- **No DTOs in UI:** UI components receive only domain models.

---

## STOP‑CHECK
- [x] Coding rules follow Iceberg Standards
- [x] No improvisation
- [x] Terminology consistent
