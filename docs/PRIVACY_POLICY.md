# ICEBERG PRIVACY POLICY: STATELESS UI AUDIT

**Version:** 1.0 (Feb 2026)  
**Status:** ACTIVE  
**Core Principle:** Data Sovereignty & Zero-Storage

## 1. DATA PROCESSING PHILOSOPHY
The Iceberg Framework is built on the principle of **Stateless Processing**. We believe that your intellectual property (UI designs, wireframes, code) belongs to you. Our system acts as a temporary conduit for analysis, not a storage facility.

## 2. HOW WE HANDLE YOUR UI ASSETS
- **In-Memory Only:** When you upload an image for analysis, it is processed entirely in the server's volatile memory (RAM).
- **Zero Perpetual Storage:** We do not use databases, S3 buckets, or local file systems to store your uploaded images or the generated audit reports.
- **Immediate Erasure:** Once the API response is sent back to your browser (or the ZIP file is generated), the source image is wiped from our memory buffers.
- **No Training:** Data processed via our AI API endpoints (Anthropic/Groq) is NOT used to train future models, adhering to Enterprise API safety standards.

## 3. DATA COLLECTED (METADATA)
To ensure system stability and prevent abuse (Rate Limiting), we collect minimal technical metadata:
- **IP Address:** Used for rate-limiting enforcement (Upstash Redis).
- **Request Metadata:** Timestamp and API endpoint accessed.
- **Notification Data:** Security alerts (e.g., rate-limit violations) are sent to our private administrative channel via Telegram.

## 4. SECURITY INFRASTRUCTURE
- **Encryption:** All data is transmitted via industry-standard TLS (HTTPS).
- **Isolation:** Each audit session is isolated. No data leaks between different user sessions.
- **CSP & Headers:** We employ strict Content Security Policies (CSP) to prevent unauthorized resource loading.

## 5. THIRD-PARTY DISCLOSURE
We use the following specialized providers for AI analysis:
- **Anthropic (Claude 3.5/4.5 Sonnet):** For deep UI audits.
- **Groq (Llama 4 Scout):** For UI detection and chaos-checks.
*Note: Both providers are used via Enterprise API contracts which guarantee that submitted data is not stored or used for training.*

## 6. USER DATA RIGHTS
Since we do not store your identity or your files, there is no "account data" to delete. Your designs leave our system as soon as you close your browser tab or the request completes.

---
*For legal inquiries or security reports, please contact the Iceberg Framework maintainers.*
