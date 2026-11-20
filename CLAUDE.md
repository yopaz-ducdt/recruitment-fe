# CLAUDE.md - Rules for Claude Code in recruitment-fe

Refer to `AGENTS.md` for complete guidelines.

## Language Standards
- **English Only**: All code, comments, documentation, and Git commits MUST be in English.
- Use Conventional Commits format in English (e.g., `feat(auth): add candidate registration`).

## Tech Stack
- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router v7 (`react-router-dom`)
- TanStack React Query v5
- Axios

## Build & Test Commands
- Run dev server: `npm run dev`
- Build project: `npm run build`
- Run linter: `npm run lint`

## Architecture & Conventions
- Maintain strict folder structure in `src/` as outlined in `AGENTS.md`.
- All HTTP calls must use `src/services/apiClient.ts` with auto token refresh on 401.
- Strict typing, absolutely no `any`.
- Keep API contracts in sync with `../docs/api_specifications.md`.
- Run `npm run lint && npm run build` before finishing any task.
