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
