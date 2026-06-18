# TASK_CONTEXT — FE-001: Initialize React Application

## Ticket Scope

Set up the initial React frontend for the Employee Attendance & Payroll Management System with Vite, scalable folder structure, routing, API service layer, environment variables, and ESLint/Prettier.

## Key Implementation Decisions

- **Vite + React** chosen over CRA for performance and modern tooling.
- **App at repository root** — the repo currently contains only documentation; the frontend lives at the root to keep `npm run dev` simple until a backend package is added.
- **React Router DOM** with nested routes under a shared `Layout` component.
- **Axios** configured in `src/services/api.js` with `VITE_API_BASE_URL` from environment variables.
- **Store** uses a lightweight React Context provider (`AppStoreProvider`) as a placeholder for future state management (no Redux/Zustand yet — not required by ticket).
- **Placeholder pages**: Dashboard, Employees, Attendance, Payroll, and Not Found.
- **ESLint flat config** extended with `eslint-plugin-prettier` and `eslint-config-prettier`; Prettier config in `.prettierrc`.

## Files Changed / Added

| Path                             | Purpose                                           |
| -------------------------------- | ------------------------------------------------- |
| `package.json`                   | Vite React app, dependencies, lint/format scripts |
| `vite.config.js`                 | Vite configuration                                |
| `eslint.config.js`               | ESLint + Prettier integration                     |
| `.prettierrc`, `.prettierignore` | Prettier configuration                            |
| `.env.example`                   | Documented environment variable template          |
| `.gitignore`                     | Ignore `.env` and build artifacts                 |
| `index.html`                     | App entry HTML                                    |
| `src/App.jsx`                    | Root app with router and store provider           |
| `src/main.jsx`                   | React DOM entry (Vite default)                    |
| `src/components/Layout.jsx`      | Shared layout and navigation                      |
| `src/pages/*`                    | Placeholder route pages                           |
| `src/routes/AppRoutes.jsx`       | Route definitions                                 |
| `src/services/api.js`            | Axios instance and interceptors                   |
| `src/store/context.js`           | Store context and initial state                   |
| `src/store/AppStoreProvider.jsx` | Context provider component                        |
| `src/store/useAppStore.js`       | Store hook                                        |
| `src/store/index.js`             | Store module exports                              |
| `src/utils/constants.js`         | App constants and env-backed API URL              |
| `README.md`                      | Project setup documentation                       |

## Verification

- `npm run dev` — development server starts
- `npm run build` — production build succeeds
- `npm run lint` — ESLint passes
- `npm run format:check` — Prettier check passes

## Open Questions / Follow-ups

- Backend API package and shared types are not in scope for FE-001.
- Authentication flow and protected routes will be added in a future task.
- Consider adopting a dedicated state library (e.g. Zustand) when global state grows.

## Assumptions

- Default API base URL `http://localhost:3000/api` is a reasonable local backend default.
- No test framework exists in the repo; tests were not added per project guardrails.
