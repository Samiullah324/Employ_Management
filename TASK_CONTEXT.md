# TASK_CONTEXT — BE-001: Initialize Django Backend Project

## Ticket Scope

Initialize the Django REST API backend for the Employee Management System with PostgreSQL, DRF, CORS, environment variables, and API versioning (`/api/v1/`).

## Key Implementation Decisions

- **Project name:** `config` (Django project package at `backend/config/`)
- **Apps location:** Future apps live under `backend/apps/`
- **Settings:** `python-decouple` for all sensitive/config values from `.env`
- **Database:** PostgreSQL only (no SQLite fallback)
- **API versioning:** `backend/config/api/v1/urls.py` included at `/api/v1/` with empty `urlpatterns` for future endpoints
- **API docs:** `drf-spectacular` at `/api/schema/`, `/api/docs/`, `/api/redoc/`
- **CORS:** `django-cors-headers` with origins from `CORS_ALLOWED_ORIGINS` env var

## Files Changed

| File | Purpose |
|------|---------|
| `backend/manage.py` | Django CLI entry point (`config.settings`) |
| `backend/config/settings.py` | DRF, PostgreSQL, CORS, static/media, spectacular |
| `backend/config/urls.py` | Admin, API v1, schema/docs routes |
| `backend/config/api/v1/urls.py` | Empty v1 API namespace |
| `backend/config/wsgi.py`, `asgi.py` | Deployment entry points |
| `backend/apps/__init__.py` | Placeholder for future apps |
| `requirements.txt` | Django, DRF, psycopg2, decouple, cors, spectacular |
| `.env.example` | Environment variable template |
| `.gitignore` | Python/Django ignores (includes `.env`, `venv/`) |
| `README.md` | Setup and project documentation |
| `backend/config/tests/test_config.py` | Smoke tests for URLs, DRF, CORS, PostgreSQL config |

## Verification

- `python manage.py check` — Django system checks
- `python manage.py test config.tests` — 7 smoke tests (URLs, DRF, CORS, PostgreSQL engine)
- `python manage.py runserver` — server starts (requires `.env` and PostgreSQL)
- PostgreSQL connection verified via `migrate` when DB is available

## Open Questions / Follow-ups

- Future tickets will add Django apps under `backend/apps/` and register routes in `config/api/v1/urls.py`
- Authentication/permissions strategy not defined in this ticket
- CI/CD pipeline not part of BE-001
# TASK_CONTEXT — FE-002: UI Framework & Layout Setup

## Ticket Scope

Implement the global UI structure and design system for the Employee Attendance & Payroll Management frontend using a modern UI library: MUI theme, responsive dashboard layout (sidebar + top navbar), reusable layout components, protected route wrapper, and loading spinner.

## Key Implementation Decisions

- **Material UI (MUI)** chosen over Ant Design to pair cleanly with the existing React + Vite stack and Emotion styling.
- **Global theme** in `src/theme/theme.js` with primary (`#2563eb`) and secondary (`#7c3aed`) palette colors plus typography scale (Inter/Roboto stack, heading and body variants).
- **Layout components** under `src/components/layout/`:
  - `AppLayout` — shell with fixed top navbar, sidebar, and main content area via React Router `Outlet`.
  - `SidebarMenu` — permanent drawer on desktop (`md+`), temporary drawer on mobile with hamburger toggle.
  - `TopNavbar` — fixed `AppBar` with mobile menu button and page title.
  - `ProtectedLayout` — auth guard that shows `LoadingSpinner`, redirects to `/login`, or renders `AppLayout`.
- **Protected routing** — dashboard routes wrapped in `ProtectedLayout`; public `/login` route added with a placeholder sign-in action until real auth is implemented.
- **LoadingSpinner** — reusable MUI `CircularProgress` with optional full-screen mode and accessible `role="status"`.
- **Store extension** — added `isAuthLoading` to auth state; `AppStoreProvider` accepts optional `initialState` for tests.
- **Replaced** the FE-001 CSS-based `Layout.jsx` with the new MUI layout system.
- **Assumption**: Real authentication is out of scope; `LoginPage` uses a demo “Continue to dashboard” button to set `isAuthenticated` in the app store.

## Files Changed / Added

| Path | Purpose |
| --- | --- |
| `package.json`, `package-lock.json` | Added `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled` |
| `src/theme/theme.js`, `src/theme/index.js` | Global MUI theme (colors, typography, shape) |
| `src/components/layout/AppLayout.jsx` | Main responsive dashboard layout |
| `src/components/layout/SidebarMenu.jsx` | Reusable sidebar navigation drawer |
| `src/components/layout/TopNavbar.jsx` | Reusable top navigation bar |
| `src/components/layout/ProtectedLayout.jsx` | Auth guard wrapper for protected routes |
| `src/components/layout/navigation.js` | Shared nav item config with icons |
| `src/components/layout/index.js` | Layout module exports |
| `src/components/ui/LoadingSpinner.jsx` | Reusable loading spinner |
| `src/components/ui/index.js` | UI component exports |
| `src/components/index.js` | Updated component barrel exports |
| `src/pages/LoginPage.jsx` | Public login placeholder for protected-route redirect |
| `src/pages/index.js` | Export `LoginPage` |
| `src/routes/AppRoutes.jsx` | Public `/login` + protected nested routes |
| `src/App.jsx` | Wrapped app with MUI `ThemeProvider` and `CssBaseline` |
| `src/store/context.js` | Added `isAuthLoading` to initial auth state |
| `src/store/AppStoreProvider.jsx` | Optional `initialState` prop for testing |
| `src/App.css` | Removed legacy layout styles; kept page card styles |
| `vite.config.js` | Vitest inline deps for MUI ESM compatibility |
| `src/test/matchMedia.js` | `matchMedia` mock helper for responsive layout tests |
| `src/components/layout/*.test.jsx` | Tests for `AppLayout` and `ProtectedLayout` |
| `src/components/ui/LoadingSpinner.test.jsx` | Tests for loading spinner |
| `src/App.test.jsx` | Updated smoke test for unauthenticated login redirect |

## Files Removed

| Path | Reason |
| --- | --- |
| `src/components/Layout.jsx` | Replaced by MUI `AppLayout` / `SidebarMenu` / `TopNavbar` |

## Verification

- `npm run dev` — development server starts
- `npm run build` — production build succeeds
- `npm run lint` — ESLint passes
- `npm run test` — Vitest layout, spinner, and app tests pass (9 tests)
- `npm run format:check` — Prettier check passes

## Open Questions / Follow-ups

- Replace `LoginPage` demo sign-in with real authentication API integration.
- Add user profile / sign-out actions to `TopNavbar` when auth is available.
- Consider dynamic page titles in `TopNavbar` based on the active route.

## Branch Base

Built on top of **FE-001** (`origin/sunset/task/4-7b21017f`) which provides the React + Vite foundation, routing, and API layer.
