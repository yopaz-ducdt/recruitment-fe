# CLAUDE.md - Rules for Claude Code in recruitment-fe

Refer to `AGENTS.md` for complete guidelines.

## Language Standards & Git Workflow
- **English Only**: All code, comments, documentation, and Git commits MUST be in English.
- **No Direct Commits to `main`**: Always branch off (`feat/*`, `fix/*`, `chore/*`) and submit a Pull Request (PR).
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
- Use `@/` for cross-directory imports rooted at `src/`, and `./` for same-directory or nearby sibling imports. Keep TypeScript and Vite alias configuration synchronized.
- Follow Tailwind CSS v4 utility conventions and use shared `@theme` color tokens from `src/index.css` instead of repeated raw colors.
- All HTTP calls must use `src/services/apiClient.ts` with auto token refresh on 401.
- Strict typing, absolutely no `any`.
- Keep API contracts in sync with [API specifications](https://github.com/yopaz-ducdt/recruitment-docs/blob/main/docs/api_specifications.md).
- Run `npm run lint && npm run build` before finishing any task.
