# TASK_CONTEXT — Task #9: Review and Fix Frontend and Backend Implementation Issues

## Ticket Scope

Comprehensive review of the Employee Management System frontend (React + Vite + MUI) and backend (Django + DRF), identifying implementation gaps or inconsistencies and applying minimal fixes so existing functionality works correctly.

## Key Implementation Decisions

- **API contract alignment:** Frontend default API base URL updated from `http://localhost:3000/api` to `http://localhost:8000/api/v1` to match the Django backend route prefix (`/api/v1/`).
- **CORS defaults:** Backend `CORS_ALLOWED_ORIGINS` now includes Vite's default dev ports (`5173`) in addition to `3000`, since the frontend runs on Vite, not port 3000.
- **Single source of truth:** `src/services/api.js` now imports `API_BASE_URL` from `src/utils/constants.js` instead of duplicating the fallback.
- **Page styling:** `App.css` (`.page` card styles used by all page components) is imported in `App.jsx`; it existed but was never loaded.
- **Auth UX:** `LoginPage` redirects already-authenticated users to the dashboard (or their original destination) instead of showing the sign-in form again.
- **Store reset behavior:** `AppStoreProvider.resetStore()` now restores the provider's `initialState` prop instead of always resetting to the module default.
- **README repair:** Fixed corrupted markdown where frontend structure was merged into the backend environment-variables section; documented full-stack setup.
- **Assumption:** Demo login (no real auth API) is intentional until a future auth ticket; fixes focus on configuration, routing, and styling correctness.

## Files Changed

| File                                  | Why                                                            |
| ------------------------------------- | -------------------------------------------------------------- |
| `.env.example`                        | Correct `VITE_API_BASE_URL` and CORS origins for Vite + Django |
| `backend/config/settings.py`          | Add Vite dev-server origins to default CORS list               |
| `backend/config/tests/test_config.py` | Assert CORS includes Vite ports                                |
| `src/utils/constants.js`              | Fix default API base URL                                       |
| `src/utils/constants.test.js`         | Test default API base URL                                      |
| `src/services/api.js`                 | Use shared `API_BASE_URL` constant                             |
| `src/utils/sanitizeError.test.js`     | Update test fixture URL                                        |
| `src/App.jsx`                         | Import `App.css` for page card styles                          |
| `src/pages/LoginPage.jsx`             | Redirect authenticated users away from `/login`                |
| `src/pages/LoginPage.test.jsx`        | Cover login redirect behavior                                  |
| `src/store/AppStoreProvider.jsx`      | Fix `resetStore` to honor `initialState` prop                  |
| `src/store/AppStoreProvider.test.jsx` | Cover reset behavior with custom initial state                 |
| `README.md`                           | Repair corrupted docs; document full-stack project             |
| `TASK_CONTEXT.md`                     | This file — task #9 scope and decisions                        |

## Issues Found and Fixed

### Backend

- CORS defaults only allowed port 3000; Vite serves on 5173 by default, blocking cross-origin API calls in development.

### Frontend

- `App.css` not imported — page components rendered without intended card styling.
- `LoginPage` allowed authenticated users to remain on `/login`.
- `AppStoreProvider.resetStore()` ignored custom `initialState` passed to the provider.
- Axios client duplicated API URL logic separately from `constants.js`.

### Full-Stack Contract

- Frontend API default (`localhost:3000/api`) did not match backend (`localhost:8000/api/v1/`).
- `.env.example` documented the wrong API URL and CORS origins.

## Verification

- `npm run test` — frontend unit/smoke tests (including new tests)
- `npm run build` — production build
- `npm run lint` — ESLint
- `cd backend && python3 manage.py test config.tests` — Django config smoke tests
- `cd backend && python3 manage.py check` — Django system checks

## Open Questions / Follow-ups

- Replace demo login with real authentication API integration (future ticket).
- Add sign-out in `TopNavbar` when auth API is available.
- Add global catch-all route for unauthenticated 404s if public unknown URLs should not redirect to login.

## Branch Base

Built on `main` (merged PRs for BE-001 backend init and FE-002 MUI layout).
