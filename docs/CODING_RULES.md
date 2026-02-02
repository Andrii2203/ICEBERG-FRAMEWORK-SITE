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
- **Theme State:** Use `next-themes` for theme persistence (avoids hydration mismatch).
- **No Global Mutable State:** Avoid complex state managers like Redux unless necessary.

## 5. API RULES
- **Server-Side Only:** Perform API calls/fetch on the server.
- **Adapters:** Use adapters to convert raw API data to domain models.
- **No DTOs in UI:** UI components receive only domain models.

## 6. IMPORT RULES (Iceberg Canonical Paths)
**MANDATORY:** All imports MUST use canonical paths from the 5-layer architecture:

### ✅ Allowed Import Patterns:
```typescript
// Config layer
import { config } from "@/config/env";

// Domain layer (pure business logic, models, errors)
import { IcebergError } from "@/domain/errors/IcebergError";
import type { User } from "@/domain/models/User";

// Features layer (self-contained business features)
import { AIService } from "@/features/ai/services/ai.service";
import { AuditService } from "@/features/audit/services/audit.service";
import { StripeService } from "@/features/payments/services/stripe.service";

// Infrastructure layer (external integrations)
import { TelegramService } from "@/infrastructure/notifications/telegram.service";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";

// Shared layer (reusable utilities and UI primitives)
import { cleanBase64 } from "@/shared/utils/base64/base64.utils";
import { ZipService } from "@/shared/utils/zip/zip.service";
import { Button } from "@/shared/ui/Button";
```

### ❌ FORBIDDEN Import Patterns:
```typescript
// NEVER use these paths - they are legacy and will break compliance
import { config } from "@/core/config/env";        // ❌ NO
import { AIService } from "@/modules/ai/...";      // ❌ NO
import { cleanBase64 } from "@/lib/base64/...";    // ❌ NO
```

## 7. FOLDER PLACEMENT RULES
**When adding new code, follow this decision tree:**

1. **Environment Config?** → `config/`
2. **Pure Business Model/Error?** → `domain/`
3. **Self-Contained Feature Logic?** → `features/[feature-name]/`
4. **External API Integration?** → `infrastructure/`
5. **Reusable Utility/UI?** → `shared/utils/` or `shared/ui/`
6. **Route/Page?** → `app/`

**Examples:**
- Payment processing logic → `features/payments/services/stripe.service.ts`
- Telegram bot integration → `infrastructure/notifications/telegram.service.ts`
- Base64 utility → `shared/utils/base64/base64.utils.ts`
- Error model → `domain/errors/IcebergError.ts`

---

## STOP‑CHECK
- [x] Coding rules follow Iceberg Standards
- [x] No improvisation
- [x] Terminology consistent
