# TASK_CONTEXT — FE-001: Initialize React Application

## Ticket Scope

Set up the initial React frontend for the Employee Attendance & Payroll Management System with Vite, scalable folder structure, routing, API service layer, environment variables, and ESLint/Prettier.

## Key Implementation Decisions

- **Vite + React** chosen over CRA for performance and modern tooling.
- **App at repository root** — the repo currently contains only documentation; the frontend lives at the root to keep `npm run dev` simple until a backend package is added.
- **React Router DOM** with nested routes under a shared `Layout` component.
- **Axios** configured in `src/services/api.js` with `VITE_API_BASE_URL` from environment variables.
- **Error sanitization** — Axios interceptors reject with `sanitizeAxiosError()` to redact tokens, passwords, cookies, and other sensitive fields before errors propagate.
- **Store** uses a lightweight React Context provider (`AppStoreProvider`) as a placeholder for future state management (no Redux/Zustand yet — not required by ticket).
- **Placeholder pages**: Dashboard, Employees, Attendance, Payroll, and Not Found.
- **ESLint flat config** uses a direct array export (no `defineConfig` / `globalIgnores` from `eslint/config`); configs are spread at the top level per ESLint 10 flat config rules.
- **Vitest** added for smoke tests (`App.test.jsx`) and API error sanitization coverage (`sanitizeError.test.js`).

## Files Changed / Added

| Path                              | Purpose                                                                |
| --------------------------------- | ---------------------------------------------------------------------- |
| `package.json`                    | Project metadata (`employ-management-frontend`), scripts, dependencies |
| `vite.config.js`                  | Vite + Vitest configuration                                            |
| `eslint.config.js`                | ESLint 10 flat config with Prettier integration                        |
| `.prettierrc`, `.prettierignore`  | Prettier configuration                                                 |
| `.env.example`                    | Documented environment variable template                               |
| `.gitignore`                      | Ignore `.env` and build artifacts                                      |
| `index.html`                      | App entry HTML                                                         |
| `src/App.jsx`                     | Root app with router and store provider                                |
| `src/App.test.jsx`                | App render smoke test                                                  |
| `src/main.jsx`                    | React DOM entry                                                        |
| `src/components/Layout.jsx`       | Shared layout and navigation                                           |
| `src/pages/*`                     | Placeholder route pages                                                |
| `src/routes/AppRoutes.jsx`        | Route definitions                                                      |
| `src/services/api.js`             | Axios instance with sanitized error interceptors                       |
| `src/store/context.js`            | Store context and initial state                                        |
| `src/store/AppStoreProvider.jsx`  | Context provider component                                             |
| `src/store/useAppStore.js`        | Store hook                                                             |
| `src/store/index.js`              | Store module exports                                                   |
| `src/utils/constants.js`          | App constants and env-backed API URL                                   |
| `src/utils/sanitizeError.js`      | Axios error sanitization utility                                       |
| `src/utils/sanitizeError.test.js` | Sanitization unit test                                                 |
| `src/test/setup.js`               | Vitest + Testing Library setup                                         |
| `README.md`                       | Project setup documentation                                            |

## Verification

- `npm run dev` — development server starts
- `npm run build` — production build succeeds
- `npm run lint` — ESLint passes (flat config without invalid `eslint/config` imports)
- `npm run test` — Vitest smoke and sanitization tests pass
- `npm run format:check` — Prettier check passes

## Review Follow-up (PR #1)

- Fixed `eslint.config.js` to use valid ESLint 10 flat config array export.
- Confirmed all `src/` application files are tracked in git (included in commit `d0eb4a5` and subsequent fixes).
- Added Axios error sanitization to avoid leaking sensitive headers or payload fields.
- Added Vitest smoke test for app render and unit test for error sanitization.
- Renamed npm package to `employ-management-frontend`.

## Open Questions / Follow-ups

- Backend API package and shared types are not in scope for FE-001.
- Authentication flow and protected routes will be added in a future task.
- Consider adopting a dedicated state library (e.g. Zustand) when global state grows.

## Assumptions

- Default API base URL `http://localhost:3000/api` is a reasonable local backend default.
- Sanitized error objects replace raw Axios errors on rejection; callers receive redacted metadata only.
