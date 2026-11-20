# AGENTS.md - Multi-Agent Synchronization Guidelines (`recruitment-fe`)

> **Objective**: This is the mandatory specification for all AI Coding Agents (OpenAI Codex, Antigravity, Cursor, Claude Code, GitHub Copilot, Windsurf, etc.) and human contributors working on `recruitment-fe`. All agents and developers must strictly adhere to these rules to maintain architectural consistency, design token compliance, type safety, and seamless backend integration. Tool-specific instruction files (`CODEX.md`, `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`) directly inherit from this document.

---

## 1. Language & Communication Standards

- **Primary Language**: **English** is strictly required across the entire codebase.
- **Code & Comments**: All identifiers (variables, functions, classes, interfaces, types, constants), inline comments, and JSDoc annotations must be written in clear English.
- **Git Commits**: All commit messages must be in English following the **Conventional Commits** specification (e.g., `feat(auth): implement login page with token refresh`, `fix(layout): resolve mobile sidebar overlay issue`).
- **Documentation**: All Markdown documentation, PR descriptions, and architectural notes within this repository must be in English.
- **UI Copy & Localization**: Application text should default to English (or reference i18n localization keys if multilingual support is enabled).

---

## 2. Tech Stack & Version Constraints

All generated or modified code must comply with the stack defined in `package.json`:
- **Framework**: React 19 (`^19.3.x`) + TypeScript (`~6.0.x`) + Vite 8 (`^8.3.x`).
- **Styling**: Tailwind CSS v4 (`^4.3.x`) powered by `@tailwindcss/vite`.
  > **Note**: Do NOT create or use legacy Tailwind v3 files like `tailwind.config.js`. Use CSS theme variables (`@theme`) directly in `src/index.css`.
- **Routing**: `react-router-dom` v7 (`^7.18.x`).
- **Server State & Caching**: `@tanstack/react-query` v5 (`^5.108.x`).
- **HTTP Client**: `axios` (`^1.21.x`).
- **API Mocking (Tests & Previews)**: `msw` v3 (`^3.0.x`).
- **Linting & Formatting**: ESLint 10 + `typescript-eslint` 8 (Flat Config in `eslint.config.js`).

---

## 3. Directory Structure Standards (`src/`)

Agents must strictly respect the established directory layout:

```text
src/
├── assets/             # Static graphics, SVG icons, brand logos
├── components/         # Reusable React components
│   ├── ui/             # Atomic primitives: Button, Input, Modal, Badge, Table, Card, Select, Toast...
│   └── common/         # Composite layout elements: Navbar, Sidebar, Footer, ProtectedRoute, LoadingSpinner...
├── layouts/            # 4 Core layout wrappers:
│   ├── AuthLayout.tsx          # Authentication screens (Login, Register, Forgot Password)
│   ├── CandidateLayout.tsx     # Candidate workspace (Job search, Applications, Resumes, Profile)
│   ├── RecruiterLayout.tsx     # Recruiter workspace (Dashboard, Job management, Applicant pipeline)
│   └── AdminLayout.tsx         # Admin dashboard (Company verification, Job approval, User management)
├── pages/              # Domain-specific page views:
│   ├── auth/           # Login, RegisterCandidate, RegisterRecruiter, ForgotPassword, ResetPassword, VerifyEmail
│   ├── candidate/      # JobList, JobDetail, ApplyJob, MyResumes, AIAnalysis, MatchReport, SavedJobs...
│   ├── recruiter/      # Dashboard, JobManage, CreateJob, Applicants, ScheduleInterview, CompanyProfile...
│   └── admin/          # Dashboard, CompanyApproval, JobApproval, UserManage...
├── services/           # Backend API integration layer:
│   ├── apiClient.ts    # Central Axios instance: baseURL '/api', auto-Bearer auth & 401 refresh interceptors
│   ├── authApi.ts      # Authentication & account endpoints
│   ├── companyApi.ts   # Company profile & verification endpoints
│   ├── jobApi.ts       # Job posting, search & filtering endpoints
│   ├── resumeApi.ts    # Resume management & AI parsing endpoints
│   └── applicationApi.ts # Job applications & interview scheduling endpoints
├── hooks/              # Custom reusable hooks: useAuth, useDebounce, useJobFilters, useToast...
├── types/              # TypeScript definitions: DTOs, domain models, API response envelopes, error structures
├── context/            # Global React contexts (e.g., AuthContext for session & profile)
├── router/             # Route declarations (`index.tsx`) and route guards (`ProtectedRoute`, `RoleRoute`)
├── index.css           # Global stylesheet with Tailwind CSS v4 & font configuration
└── main.tsx            # Application entry point
```

### 3.1. Import Path Convention
- Use the `@/` alias for imports that cross directories under `src/` (for example, `@/components/ui/Button` or `@/services/authApi`).
- Keep relative imports for files in the same directory or a nearby sibling module (for example, `./LoadingSpinner`).
- The alias is rooted at `recruitment-fe/src` and must stay synchronized between `tsconfig.app.json` and `vite.config.ts`.
- Do not add `baseUrl` just to configure this alias; TypeScript `paths` can be used without it.

---

## 4. UI/UX Design System Tokens (Stitch)

The UI adheres to the **Intelligent Precision Talent Architecture** design system (see [UI/UX design system](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/ui_ux_design_system.md)):

### 4.1. Typography
- **Primary Font**: `Inter` (ensure `line-height >= 1.4` for optimal text rendering).
- **Tabular Figures**: Always apply Tailwind class `tabular-nums` for numeric figures (salaries, percentages, applicant counts, AI matching scores) to prevent layout shifts.

### 4.2. Color Tokens
- Define shared colors and typography with Tailwind CSS v4 `@theme` variables in `src/index.css`; do not create a legacy `tailwind.config.js`.
- Use semantic utilities such as `bg-primary`, `text-on-surface`, `border-outline-variant`, `bg-success/10`, and `text-error-foreground` instead of repeating raw hex values or unrelated palette colors in components.
- **Primary (Royal Tech Blue)**: `#1D4ED8` — Primary actions, active navigation states, verified badges.
- **Secondary / AI Core (Deep Teal)**: `#0D9488` — AI parsing highlights, skill fit indicators, radar charts.
- **Tertiary (Cyan Accent)**: `#06B6D4` — AI action gradients, status progress bars.
- **Surface**: `#FAF8FF` — Page canvas background.
- **Surface Container Lowest**: `#FFFFFF` — Cards, modals, dropdown containers.
- **Status Colors**:
  - `success`: `#10B981` (High match score $\ge 85\%$, verified state).
  - `warning`: `#F59E0B` (Pending approvals, action required).
  - `error`: `#EF4444` / `#BA1A1A` (Form validation errors, rejected status, closed jobs).

### 4.3. Tailwind CSS v4 Utilities
- Use v4 utility names, including `bg-linear-to-r` / `bg-linear-to-tr` for gradients, `shadow-xs` for the small shadow scale, `backdrop-blur-xs`, and `outline-hidden`.
- Prefer the explicit radius scale (`rounded-sm`, `rounded-md`, `rounded-lg`, etc.) over the legacy bare `rounded` utility.
- Use opacity modifiers such as `bg-primary/10`; do not use removed `*-opacity-*` utilities.

### 4.4. Corner Radii
- `rounded-lg` (8px): Action buttons, inputs, dropdown menus.
- `rounded-2xl` (16px): Job listing cards, sticky filter panels, dialog frames.
- `rounded-3xl` (24px): Hero containers, summary metric dashboards.
- `rounded-full`: AI Match badges (`⚡ 94% Match`), verified chips, avatars.

---

## 5. Backend Contract & API Integration

> **CRITICAL RULE**: Never hallucinate API endpoints or request/response fields. All payloads and DTOs must match [API specifications](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/api_specifications.md) and `docs/FRONTEND_DEVELOPMENT_GUIDE.md` with 100% precision.

1. **Centralized HTTP Client**:
   - All network calls must pass through `src/services/apiClient.ts`.
   - Never use raw `fetch()` directly inside React components or hooks.
   - Vite proxy forwards `/api` requests to `http://localhost:8080`.
2. **Authentication & Automatic 401 Token Refresh**:
   - Access token is attached via `Authorization: Bearer <accessToken>`.
   - On `401 Unauthorized` responses:
     - The interceptor calls `POST /api/auth/refresh` using the stored `refreshToken`.
     - Upon receiving new tokens, the original request is replayed.
     - If the refresh request fails, purge local session state and redirect to `/login`.
3. **Registration Form Scope (Phase 1)**:
   - Registration payload is strictly restricted to: `{ email, password, role }` where role is `'CANDIDATE'` or `'RECRUITER'`.
   - Do NOT add full name, phone number, or company details to the Phase 1 registration form; these belong to post-login profile onboarding (Phases 2 & 3).
4. **TanStack React Query v5 Patterns**:
   - Always use object syntax: `useQuery({ queryKey, queryFn })`.
   - Use Query Key Factories for maintainable cache management:
     ```typescript
     export const jobKeys = {
       all: ['jobs'] as const,
       lists: () => [...jobKeys.all, 'list'] as const,
       list: (filters: JobFilterParams) => [...jobKeys.lists(), filters] as const,
       details: () => [...jobKeys.all, 'detail'] as const,
       detail: (id: string) => [...jobKeys.details(), id] as const,
     };
     ```
   - Legacy v4 callback props (`onSuccess`, `onError` in `useQuery`) are deprecated and forbidden.

---

## 6. TypeScript & Code Quality Guidelines

1. **Strict Type Safety**:
   - `any` is strictly prohibited. Use `unknown`, generics, or define concrete interfaces in `src/types/`.
   - Handle nullable or optional fields defensively.
2. **Component Architecture**:
   - Use typed functional components (`React.FC<Props>` or explicit function parameters with interfaces).
   - Enforce Single Responsibility Principle: decompose components exceeding 200 lines.
   - Separate container/page logic from presentational atomic UI components.
3. **UX & State Feedback**:
   - Every asynchronous operation must provide visual feedback: loading skeletons/spinners, empty states, and descriptive error messages.
4. **Memory Safety**:
   - Always provide cleanup functions in `useEffect` (timers, event listeners, AbortControllers).

---

## 7. Self-Verification Checklist (Mandatory for Agents)

Before finishing any task, the agent MUST run:
1. `npm run lint` — Confirm zero ESLint errors or warnings.
2. `npm run build` — Confirm TypeScript check (`tsc -b`) and Vite production bundle succeed without errors.

If errors occur during build or linting, the agent must fix them autonomously prior to completing the task.

---

## 8. Git Workflow, Branching Strategy & Commit Guidelines

### 8.1. Branching & Pull Request (PR) Policy
- **No Direct Commits to `main`**: All ongoing and future feature development, bug fixes, and refactoring MUST NOT be committed directly to the `main` branch.
- **Branch Naming Conventions**:
  - `feat/<feature-name>`: New feature implementations (e.g., `feat/candidate-cv-upload`)
  - `fix/<bug-name>`: Bug fixes (e.g., `fix/token-refresh-interceptor`)
  - `refactor/<module-name>`: Code refactoring without behavior change
  - `chore/<task-name>`: Tooling, dependency, or configuration updates
- **Pull Request Workflow**:
  - Branch off the latest `main`.
  - Ensure `npm run lint` and `npm run build` pass with zero errors.
  - Push the branch to remote and submit a **Pull Request (PR)** with a clear title and description in English.
  - Await code review and approval before merging into `main`.

### 8.2. Commit Message Standards
Commit messages must be concise, written in English, and adhere to Conventional Commits:

```text
<type>(<scope>): <short summary in English>

[optional body in English]
```

- **Types**:
  - `feat`: A new feature (e.g., `feat(auth): implement candidate registration view`)
  - `fix`: A bug fix (e.g., `fix(api): correct token refresh interceptor retry logic`)
  - `ui`: Styling or design token refinement (e.g., `ui(job): apply Stitch tokens to job cards`)
  - `refactor`: Code reorganization without functional changes (e.g., `refactor(services): modularize API services`)
  - `chore`: Build tooling, dependency, or config updates (e.g., `chore(deps): update vite plugins`)
  - `test`: Adding or modifying tests (e.g., `test(auth): add MSW handler for registration`)
