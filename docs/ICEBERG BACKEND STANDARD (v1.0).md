ICEBERG BACKEND STANDARD (Enterprise Edition, v1.0)
Backend architecture rules for all Iceberg products (with Audit MVP as first implementation)

1. Purpose
ICEBERG BACKEND STANDARD defines how backend logic MUST be structured, written, and orchestrated in all Iceberg products.

It is the contract for:

how code is organized

how modules talk to each other

how AI, Stripe, Supabase, and API layers are wired

what is allowed and what is strictly forbidden

API Standard описує “що ми показуємо назовні”.
Backend Standard описує “як це влаштовано всередині”.

2. Scope
This standard applies to:

Next.js  App Router projects deployed on Vercel

All /src/app/api/**/route.ts handlers

All backend modules under /src/core, /src/modules, /src/services, /src/lib

All integration layers (Groq, Claude, Stripe, Supabase)

It is framework‑level:
Audit MVP — лише перша реалізація, але правила універсальні.

3. Backend architecture principles
Separation of concerns

API routes = thin controllers

Services = business logic

Integrations = external calls

Core = shared primitives

No implicit magic

All flows are explicit, documented, and deterministic.

No cross‑layer leaks

API does not know implementation details of services.

Services do not know HTTP details.

AI‑safe design

Backend must be генерований ШІ без хаосу, якщо він читає стандарти.

Zero hidden state

No global mutable state.

No “side effects by surprise”.

4. Directory structure
Canonical structure:

src/
  app/
    api/
      audit/
        route.ts
      detect-ui/
        route.ts
      analyze-ui/
        route.ts
      stripe/
        webhook/
          route.ts
  core/
    errors/
    logging/
    validation/
    config/
  modules/
    audit/
      services/
      mappers/
      types/
    payments/
      services/
      types/
    ai/
      groq/
      claude/
  lib/
    zip/
    base64/
    http/
  utils/
Rules:

core/ — shared, framework‑level primitives (errors, logging, config, validation).

modules/ — product/business modules (audit, payments, ai, etc.).

lib/ — low‑level helpers (zip, base64, http clients).

utils/ — generic utilities (pure functions, no side effects).

5. Layer responsibilities
5.1. API layer (src/app/api/**/route.ts)
Parse HTTP request

Validate input

Call appropriate service(s)

Map service result → HTTP response

Map service errors → HTTP error response

MUST NOT:

contain business logic

call AI directly

call Stripe directly

manipulate ZIP directly

5.2. Service layer (src/modules/**/services)
Implements business logic

Orchestrates integrations (via adapters)

Contains use‑cases like runAudit, createPayment, handleStripeEvent

MUST:

be framework‑agnostic (no NextRequest, NextResponse)

accept plain data objects

return plain data or typed errors

5.3. Integration layer (src/modules/ai, src/modules/payments, src/modules/storage)
Wraps external APIs (Groq, Claude, Stripe, Supabase)

Provides typed functions like callGroqVision, callClaudeAudit, createStripeCheckoutSession

MUST:

hide provider‑specific details

expose stable, typed interfaces

5.4. Core layer (src/core)
Error types & factories

Validation primitives

Logging

Configuration loading

Shared types

6. Naming conventions
Modules: audit, payments, ai, storage

Services: AuditService, PaymentService, AIService

Functions: runAudit, detectUI, generateAuditFiles

Types: AuditResult, UIType, FreeAuditResponse

Files: audit.service.ts, stripe.service.ts, groq.client.ts, claude.client.ts

7. Audit module structure (concrete example)
src/modules/audit/
  services/
    audit.service.ts
  mappers/
    audit-mapper.ts
  types/
    audit.types.ts
7.1. audit.service.ts
Exposes high‑level use‑cases:

runAudit(imageBase64: string): Promise<FullAuditResult | FreeAuditResult | NonUIError>

runFreeAudit(imageBase64: string): Promise<FreeAuditResult>

runFullAudit(imageBase64: string): Promise<FullAuditResult>

Internally:

calls AIService.detectUI

branches logic

calls AIService.runFreeAudit or AIService.runFullAudit

calls ZipService.createAuditZip

8. AI module structure
src/modules/ai/
  groq/
    vision.client.ts
    text.client.ts
  claude/
    audit.client.ts
  types/
    ai.types.ts

8.1. vision.client.ts
detectUI(imageBase64: string): Promise<{ type: "ui" | "non-ui" | "chaos"; confidence: number }>

8.2. audit.client.ts (Claude)
generateFullAudit(imageBase64: string): Promise<AuditFiles>

Where AuditFiles is defined in Audit File Standard.

9. Payments module structure
src/modules/payments/
  services/
    stripe.service.ts
  types/
    payments.types.ts
handleStripeWebhook(payload, signature): Promise<StripeEventResult>

createAuditCheckoutSession(...) (if needed later)

Backend Standard тільки визначає, що платежі — окремий модуль, не змішаний з audit.

10. ZIP & base64 utilities
src/lib/zip/
  create-audit-zip.ts

src/lib/base64/
  decode.ts
  encode.ts
createAuditZip(files: AuditFiles): Promise<string /* base64 zip */>

API/Services не працюють напряму з JSZip чи іншими бібліотеками — тільки через ці утиліти.

11. Error handling standard
11.1. Core error type
// src/core/errors/IcebergError.ts
export class IcebergError extends Error {
  code: string;
  details?: unknown;
}

11.2. Common error factories
// src/core/errors/factories.ts
export function NonUIImageError(): IcebergError { ... }
export function AIProviderError(details): IcebergError { ... }
export function InvalidPayloadError(details): IcebergError { ... }

11.3. Mapping to HTTP
API routes map IcebergError.code → HTTP status + JSON error body
(конкретна мапа — в API Standard).

12. Validation standard
Валідація не живе в API‑роутах напряму.

Використовується або:

zod/valibot схеми в src/core/validation, або

власні guard‑функції.

API route:

парсить JSON

передає в validateAuditRequest(payload)

у випадку помилки — кидає InvalidPayloadError.

13. Logging standard
Логер живе в src/core/logging.

Логуються тільки:

ім’я use‑case (runAudit)

час виконання

результат (success, error, free-audit)

код помилки (якщо є)

Не логуються:

base64 зображення

повні AI відповіді

Stripe payload

14. Environment & config
Усі змінні середовища описані в одному місці:
src/core/config/env.ts
env.ts:

читає process.env

валідуює

експортує config об’єкт

Модулі не читають process.env напряму — тільки через config.

15. Dependency rules
app/api → може викликати тільки modules/** і core/**.

modules/** → може викликати core/** і lib/**.

core/** → не може залежати від modules/** або app/**.

lib/** → не може залежати від modules/** або app/**.

Це забезпечує чисту архітектуру.

16. Stripe integration boundary
Stripe логіка живе тільки в modules/payments.

/api/stripe/webhook викликає PaymentService.handleStripeWebhook.

PaymentService у свою чергу:

валідує підпис

визначає тип події

тригерить внутрішній use‑case (наприклад, runAuditAfterPayment)

Audit module не знає про Stripe напряму.

17. AI integration boundary
Groq & Claude — тільки через modules/ai.

Audit module не знає деталей API Groq/Claude.

Якщо завтра зміниться провайдер — змінюється тільки modules/ai.

18. Backend lifecycle for /api/audit
API route:

читає JSON

валідуює payload

викликає AuditService.runAudit(imageBase64)

AuditService.runAudit:

викликає AIService.detectUI

гілкує логіку: non-ui, chaos, ui

для ui викликає AIService.runFullAudit

викликає ZipService.createAuditZip

повертає результат

API route:

мапить результат → HTTP JSON

19. Testing standard (short)
Кожен service має unit‑тести.

AI інтеграції можуть бути мокані.

API routes тестуються як інтеграційні.

(Повний Testing Standard — окремий документ, не тут.)

20. Security rules
Ніяких секретів у коді.

Ніяких console.log з чутливими даними.

Ніяких прямих викликів Stripe/Groq/Claude з фронтенду.

Ніяких тимчасових debug‑ендпоінтів.

21. Prohibitions (non‑negotiable)
Backend code MUST NOT:

містити AI‑промпти в route.ts

викликати Claude напряму з API route

викликати Groq напряму з API route

змішувати Stripe логіку з Audit логікою

зберігати base64 зображення в логах або БД

змінювати структуру Audit файлів (це в Audit File Standard)

обходити core/errors, core/logging, core/config

22. Mental model
Ти можеш тримати бекенд в голові так:
API route
  ↓
Service (use-case)
  ↓
AI / Stripe / Storage adapters
  ↓
Core (errors, logging, config)
А для Audit:
/api/audit
  ↓
AuditService.runAudit
  ↓
AIService.detectUI (Groq)
  ↓
  non-ui  → error
  chaos   → AIService.runFreeAudit (Groq)
  ui      → AIService.runFullAudit (Claude) → ZipService.createAuditZip
