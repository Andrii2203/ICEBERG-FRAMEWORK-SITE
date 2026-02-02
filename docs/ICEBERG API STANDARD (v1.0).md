📘 ICEBERG API STANDARD (Enterprise Edition, v1.0)
The Official API Architecture Specification for Iceberg Framework
Table of Contents
Purpose

Scope

Architectural Principles

Technology Stack

API Layer Responsibilities

Non‑Responsibilities

Directory Structure

Naming Conventions

Endpoint Design Rules

HTTP Methods & Semantics

Request Format Standard

Response Format Standard

Error Model

Error Codes Registry

Validation Rules

Security Requirements

Authentication & Authorization (Future)

38. Rate Limiting (Implemented)

Logging & Observability

AI Integration Protocol

Groq Vision Integration

Claude Integration

Stripe Integration Boundary

Supabase Integration Boundary

Orchestration Rules

Audit Pipeline Specification

API Contracts

Versioning Strategy

Deployment Rules

Prohibitions (Non‑Negotiable)

Glossary

Change Log

1. Purpose
The purpose of this document is to define the canonical, enterprise‑grade API standard for all Iceberg Framework products.
This standard ensures:

determinism

reproducibility

security

clarity

AI‑safe backend generation

long‑term maintainability

2. Scope
This standard applies to:

Next.js  App Router API routes

Vercel serverless functions

Stripe webhooks

Groq Vision & Groq Text integration

Claude integration

Supabase (optional)

3. Architectural Principles
Deterministic execution

Separation of concerns

Single responsibility per endpoint

No business logic in frontend

No AI prompts inside route handlers

Strict JSON contracts

Zero ambiguity

Zero improvisation

Zero hidden state

Zero side effects without explicit design

4. Technology Stack
Next.js  App Router

TypeScript

Vercel serverless runtime

Stripe Webhooks

Groq Vision API

Groq Text API

Claude API

Supabase (optional)

5. API Layer Responsibilities
The API layer is responsible for:

HTTP interface

Request validation

Response formatting

Orchestration of external services

Error handling

Logging

Security enforcement

6. Non‑Responsibilities
The API layer must NOT:

contain UI logic

contain business logic unrelated to API orchestration

store images

store personal data

generate AI prompts

generate ZIP files inside AI endpoints

perform free audit using Claude

perform full audit using Groq

7. Directory Structure
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
8. Naming Conventions
Folders: kebab-case

Files: route.ts only

Functions: camelCase

Types: PascalCase

Constants: UPPER_SNAKE_CASE

9. Endpoint Design Rules
Each endpoint must:

expose exactly one HTTP method

return JSON only

validate input before processing

never expose internal errors

never leak secrets

never call AI directly inside route (use service modules)

10. HTTP Methods & Semantics
POST — create, process, analyze

GET — fetch metadata (not used in MVP)

DELETE — forbidden

PUT/PATCH — forbidden

11. Request Format Standard
All requests must:

use Content-Type: application/json

contain base64 images as strings

contain no user identity fields

contain no audit type fields

12. Response Format Standard
Every response must include:
{
  "status": "success" | "error" | "free-audit",
  "reason": "string (optional)",
  "message": "string (optional)",
  "data": "object (optional)"
}
ZIP responses must include:
{
  "status": "success",
  "mode": "full-audit",
  "zip": "<base64>"
}
13. Error Model
Errors must follow:
{
  "status": "error",
  "reason": "machine-readable-code",
  "message": "Human readable explanation."
}

14. Error Codes Registry
invalid-payload

missing-image

non-ui-image

ai-provider-error

stripe-verification-failed

internal-error

15. Validation Rules (Implemented)
- **Base64 Validity:** Must be a valid data URI string.
- **Size Limit:** Payload must not exceed 5,000,000 characters (~4MB image).
- **MIME Whitelist:** `data:image/png;base64,`, `data:image/jpeg;base64,`, `data:image/webp;base64,`.
- **Strict Schema:** No extra fields allowed in the request body.

16. Security Requirements
no logging of base64

no logging of Stripe payloads

no logging of AI responses

no secrets in responses

Stripe signature must be verified

17. Authentication & Authorization (Future)
Reserved for future enterprise version.

18. Rate Limiting (Implemented)
Rate Limiting is enforced at the Edge level using Upstash/Redis.
- **Rule:** Max 5 audits per hour for non-authenticated IPs.
- **Scope:** /api/detect-ui and /api/analyze-ui.

19. Logging & Observability
Log only:

endpoint name

execution time

outcome

error reason

20. AI Integration Protocol
AI must be called via:

/lib/groq/**

/lib/claude/**

Never inline.

21. Groq Vision Integration
Used only for UI detection.

22. Claude Integration
Used only for full audit.

23. Stripe Integration Boundary
Stripe webhook triggers internal job, not direct audit.

24. Supabase Integration Boundary
Optional for storing audit history.

25. Orchestration Rules
/api/audit is the only entry point.

26. Audit Pipeline Specification
/api/audit
    ↓
/api/detect-ui
    ↓
non-ui → error
chaos → free audit (Groq)
ui → /api/analyze-ui → ZIP

27. API Contracts
All contracts must be documented in /docs/contracts/**.

28. Versioning Strategy
Semantic versioning:

v1.0 — MVP

v1.1 — Stripe integration

v2.0 — Auth, rate limiting

29. Deployment Rules
Vercel only

No edge runtime for Stripe

No experimental flags

30. Prohibitions (Non‑Negotiable)
API must NOT:

accept multipart/form-data

accept user_id

accept audit_type

call Claude for free audit

call Groq for full audit

generate ZIP inside /api/analyze-ui

return HTML

return binary streams

change response shape

31. Glossary
UI Detection

Free Audit

Full Audit

Orchestrator

AI Provider

ZIP Payload

32. Change Log
v1.0 — Initial enterprise edition.