# CODEX.md - OpenAI Codex CLI Guidelines for `recruitment-fe`

> **Note**: This document provides operational guidelines and constraints for **OpenAI Codex CLI**, Codex agents, and related AI developer tools working on `recruitment-fe`. All developers and agents must adhere strictly to these rules. For full specifications, consult [`AGENTS.md`](file:///home/ducdt/Other/recruitment-fe/AGENTS.md).

---

## 1. Mandatory Language Standards

- **Strict English Only**: All source code, identifiers (functions, variables, components, interfaces), inline comments, JSDoc annotations, Git commit messages, and PR descriptions MUST be written in English.
- **Git Commit Messages**: Use English **Conventional Commits**:
  - `feat(scope): concise description`
  - `fix(scope): concise description`
  - `ui(scope): styling or token updates`
  - `refactor(scope): code reorganization`
  - `chore(scope): build, dependency, or config updates`

---

## 2. Tech Stack & Environment

- **Core**: React 19 (`^19.3.x`), TypeScript (`~6.0.x`), Vite 8 (`^8.3.x`).
- **Styling**: Tailwind CSS v4 (`^4.3.x`) via `@tailwindcss/vite`.
  > **Important**: Do NOT create `tailwind.config.js`. Use CSS theme variables (`@theme`) directly in `src/index.css`.
- **Routing**: `react-router-dom` v7 (`^7.18.x`).
- **Data Fetching & Server State**: `@tanstack/react-query` v5 (`^5.108.x`).
  - Always use v5 object syntax: `useQuery({ queryKey, queryFn })`. Legacy v4 callbacks (`onSuccess`, `onError` in `useQuery`) are deprecated and forbidden.
- **HTTP Client**: `axios` (`^1.21.x`).
- **API Mocking**: `msw` v3 (`^3.0.x`).
- **Linter**: ESLint 10 + Flat Config (`eslint.config.js`).

---

## 3. Directory Layout Conventions (`src/`)

Maintain strict adherence to the project architecture:

```text
src/
├── assets/             # Static graphics, SVG icons, brand assets
├── components/
│   ├── ui/             # Atomic UI primitives (Button, Input, Modal, Badge, Table, Card, Select, Toast)
│   └── common/         # Composite elements (Navbar, Sidebar, Footer, ProtectedRoute, LoadingSpinner)
├── layouts/            # 4 Core layout wrappers:
│   ├── AuthLayout.tsx          # Login, Register, Forgot Password
│   ├── CandidateLayout.tsx     # Candidate workspace (Job search, Resumes, Applications)
│   ├── RecruiterLayout.tsx     # Recruiter workspace (Dashboard, Job posting, Applicant pipeline)
│   └── AdminLayout.tsx         # Admin dashboard (Company verification, Job approval)
├── pages/              # Domain views (auth, candidate, recruiter, admin)
├── services/           # API integration layer:
│   ├── apiClient.ts    # Central Axios instance with Bearer auth & 401 refresh token interceptor
│   └── *Api.ts         # Domain API services (auth, company, job, resume, application)
├── hooks/              # Custom reusable hooks (useAuth, useDebounce, useJobFilters)
├── types/              # TypeScript interfaces, DTOs, API response wrappers
├── context/            # React contexts (AuthContext, ThemeContext)
├── router/             # Route configurations & Route Guards
├── index.css           # Global stylesheet & Tailwind CSS v4 theme tokens
└── main.tsx            # Application entry point
```

---

## 4. UI/UX Design System Tokens (Stitch)

Follow the **Intelligent Precision Talent Architecture** (see `../docs/ui_ux_design_system.md`):

- **Typography**: Font family `Inter` with `line-height >= 1.4`. Apply `tabular-nums` for all numbers, salaries, percentages, and AI matching scores.
- **Color Palette**:
  - Primary (Royal Tech Blue): `#1D4ED8` (`blue-700`) — Primary actions, verified badges.
  - Secondary / AI Core (Deep Teal): `#0D9488` (`teal-600`) — AI parsing highlights, skill fit badges.
  - Tertiary (Cyan Accent): `#06B6D4` (`cyan-500`) — AI action gradients, status progress.
  - Surface Background: `#FAF8FF` — Page canvas.
  - Surface Container Lowest: `#FFFFFF` — Cards, modals.
  - Status: Success `#10B981` ($\ge 85\%$ match), Warning `#F59E0B`, Error `#EF4444`.

---

## 5. API Contracts & Authentication Rules

- **Zero Hallucination Policy**: Strictly align all request/response DTOs with `../docs/api_specifications.md` and `docs/FRONTEND_DEVELOPMENT_GUIDE.md`. Never invent non-existent fields.
- **Centralized Client**: All requests MUST use `src/services/apiClient.ts` (Vite proxies `/api` to `http://localhost:8080`).
- **JWT Handling**:
  - Automatically append `Authorization: Bearer <accessToken>`.
  - Handle `401 Unauthorized` via Axios response interceptor: invoke `POST /api/auth/refresh` using stored `refreshToken`, retry original request. If refresh fails, clear session and redirect to `/login`.
- **Phase 1 Registration Scope**: Registration payload contains only `{ email, password, role }` (`CANDIDATE` or `RECRUITER`). Profile details belong to post-login onboarding.

---

## 6. Code Verification Commands

Before completing any task, Codex must verify:

```bash
# 1. Run ESLint check (must pass with zero errors/warnings)
npm run lint

# 2. Run TypeScript build check
npm run build
```

---

## 7. Cross References

- Full Multi-Agent Guidelines: [`AGENTS.md`](file:///home/ducdt/Other/recruitment-fe/AGENTS.md)
- Claude Code Rules: [`CLAUDE.md`](file:///home/ducdt/Other/recruitment-fe/CLAUDE.md)
- Cursor Rules: [`.cursorrules`](file:///home/ducdt/Other/recruitment-fe/.cursorrules)
- Frontend Development Guide: [`docs/FRONTEND_DEVELOPMENT_GUIDE.md`](file:///home/ducdt/Other/recruitment-fe/docs/FRONTEND_DEVELOPMENT_GUIDE.md)
- Backend API Specifications: [`../docs/api_specifications.md`](file:///home/ducdt/Other/docs/api_specifications.md)
