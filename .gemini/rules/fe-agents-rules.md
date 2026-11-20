---
description: Rules and guidelines for Antigravity agents working on recruitment-fe
globs: ["src/**/*", "package.json", "vite.config.ts"]
---

# Antigravity Rules for recruitment-fe

When editing or creating files in `recruitment-fe`, follow `AGENTS.md` strictly:

1. **Language Standards**: All code, identifiers, comments, documentation, and Git commits MUST be in **English**.
2. **Git Commits**: Use Conventional Commits in English (`feat:`, `fix:`, `refactor:`, `ui:`, `chore:`).
3. **Tech Stack**: React 19, TypeScript, Vite 8, Tailwind CSS v4, React Router v7, TanStack Query v5, Axios.
4. **Design Tokens**: Follow Stitch `Intelligent Precision Talent Architecture` (Primary `#1D4ED8`, AI Secondary `#0D9488`, Cyan `#06B6D4`, Surface `#FAF8FF`). Font: `Inter` (`line-height >= 1.4`). Apply `tabular-nums` for numeric metrics.
5. **Backend Contract**: Align 100% with `../docs/api_specifications.md` and `docs/FRONTEND_DEVELOPMENT_GUIDE.md`. Never hallucinate API parameters or endpoints.
6. **API Client**: Centralize in `src/services/apiClient.ts` with Bearer auth and 401 refresh token retry.
7. **Quality**: Strict TypeScript (no `any`), handle loading/error states cleanly, verify with `npm run lint` and `npm run build`.
