## ❄ Official Website
The official Iceberg Framework landing website (multilingual, PWA, Next.js):

- Repo: https://github.com/Andrii2203/ICEBERG-FRAMEWORK-SITE
- Live: https://iceberg-framework-site.vercel.app/en


## 🌐 Overview
This repository contains the official landing website for the **Iceberg Framework** — a deterministic system of standards, protocols, and execution maps designed to control AI‑assisted development.

The website is built using **Next.js App Router**, follows strict architectural rules, and implements the Iceberg principles of determinism, structure, and reproducibility.

---

## ❄ About Iceberg Framework
Iceberg Framework is a deterministic system for AI‑assisted software development.  
It defines how AI should plan, execute, document, and collaborate with humans using:

- Standards  
- Protocols  
- Execution Maps  
- Governance Rules  

The landing website you are viewing is the official presentation layer of the framework.

## 🚀 Features
- **Multilingual support (8 languages)**  
- **Parallax Iceberg Hero** (deterministic, seed‑based animation)  
- **WCAG 2.2 AA accessibility**  
- **SEO‑optimized** (metadata, OpenGraph, JSON‑LD)  
- **PWA support** (manifest, service worker, offline rules)  
- **Strict Iceberg Architecture**  
  - Domain Layer  
  - Shared UI Layer  
  - Feature Layer  
  - Marketing Route Group  
- **Fully static content model** (JSON/TS dictionaries)

---

## 🧊 Tech Stack
- **Next.js 14 (App Router)**  
- **TypeScript (strict mode)**  
- **ESLint + Iceberg Coding Rules**  
- **i18n middleware**  
- **CSS Modules / Tailwind (if used)**  
- **PWA manifest + SW**  

---

## 📁 Project Structure (Iceberg Architecture)

src/
  app/
    [lang]/
      (marketing)/
        page.tsx
        philosophy/
        methodology/
        standards/
        protocols/
        enterprise/
  domain/
    i18n/
    framework/
  shared/
    ui/
  features/
    hero/
    navigation/
    footer/
    standards-list/
  infrastructure/
    pwa/


---

## 📄 Content Model
All content is stored in language‑specific dictionaries:

src/i18n/{lang}/dictionary.ts

Each page uses a deterministic content model defined in:

docs/CONTENT_MODEL.md

---

## 🛠 Development

### Install dependencies

npm install

### Run dev server

npm run dev

### Build for production

npm run build

### Start production server

npm run start

### Lint (Iceberg STOP‑CHECK)

npm run lint

---

## 🌍 Deployment
The website can be deployed to:

- GitHub Pages  
- Vercel  
- Cloudflare Pages  
- Netlify  

The build is fully static and PWA‑ready.

The project supports static export (`next export`) and can be deployed to any static hosting provider.


---

## 📦 Release Status
**Current version:** `v0.3`  
- Architecture compliant  
- ESLint clean  
- PWA enabled  
- Multilingual content complete  
- Parallax Hero implemented  
- All core pages implemented  

**Next planned version:** `v0.4`  
- Enterprise section expansion  
- Interactive diagrams  
- Extended documentation  
- Improved Lighthouse performance  

---

## 🔗 Useful Links
- **Live Website:** https://iceberg-framework-site.vercel.app/en
- **Iceberg Framework:** https://github.com/Andrii2203/ICEBERG-FRAMEWORK  
- **Author (Andrii):**  
  - GitHub: https://github.com/Andrii2203/  
  - LinkedIn: https://www.linkedin.com/in/andrii-shavel-976485187/

---

## 📜 License
This repository contains only the landing website.  
The Iceberg Framework itself uses a **dual‑license model** (MIT + Commercial).

---

## 🧊 Iceberg Principle
> “UI is the visible tip.  
> Standards, protocols, and deterministic execution — the submerged mass.”

