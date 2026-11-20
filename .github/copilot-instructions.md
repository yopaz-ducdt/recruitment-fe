# GitHub Copilot Instructions for recruitment-fe

Please refer to and follow the comprehensive project rules in `AGENTS.md`.

## Key Directives:
- **Language**: English is mandatory for all code, comments, documentation, and Git commit messages.
- **Pull Request Policy**: Never commit directly to `main`. Create feature branches (`feat/*`, `fix/*`) and submit PRs.
- **Git Commits**: Conventional Commits in English (e.g., `feat(auth): add login view`).
- **Framework**: React 19 + TypeScript + Vite 8 + Tailwind CSS v4.
- **Data & State**: TanStack Query v5 + Axios via `src/services/apiClient.ts`.
- **Contracts**: Follow Backend DTOs from `../docs/api_specifications.md` exactly without inventing fields.
- **Design System**: Stitch `Intelligent Precision Talent Architecture` (Font Inter, Royal Tech Blue `#1D4ED8`, AI Teal `#0D9488`).
- **Strict Typing**: No `any` types. Ensure `npm run lint` and `npm run build` pass without errors.
