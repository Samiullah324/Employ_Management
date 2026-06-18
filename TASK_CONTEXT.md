# TASK_CONTEXT — BE-002: Dockerize Backend Application

## Ticket Scope

Containerize the Django backend and PostgreSQL database so the full backend stack starts with a single `docker compose up` command.

## Key Implementation Decisions

- **Base image:** `python:3.12-slim` with `libpq-dev` and `gcc` for `psycopg2-binary` build compatibility
- **Database:** `postgres:16-alpine` with a named volume (`postgres_data`) for persistence
- **Startup flow:** `docker/entrypoint.sh` waits for PostgreSQL, runs migrations, collects static files, then starts `runserver` on `0.0.0.0:8000`
- **Environment:** `docker-compose.yml` loads `.env` and overrides `DB_HOST=db` for in-network database access
- **Volumes:** PostgreSQL data, static files, media files, and a bind mount on `./backend` for development
- **Health checks:** `pg_isready` for PostgreSQL; HTTP `GET /api/schema/` for Django
- **Dependency on BE-001:** This branch includes the Django project from BE-001 (`sunset/task/1-7b21017f`) because the backend must exist before it can be dockerized

## Files Changed

| File | Purpose |
|------|---------|
| `Dockerfile` | Python image, dependencies, backend code, entrypoint |
| `docker-compose.yml` | `db` and `web` services, volumes, health checks, port mappings |
| `docker/entrypoint.sh` | Wait for DB, migrate, collectstatic, start server |
| `.dockerignore` | Exclude venv, `.env`, caches, and build artifacts from image context |
| `.env.example` | Document `DB_HOST` override and `web` in `ALLOWED_HOSTS` for Docker |
| `README.md` | Docker quick-start, service table, and updated project structure |
| `backend/config/tests/test_docker.py` | Smoke tests for Docker files and compose configuration |

## Verification

- `python manage.py test config.tests` — all smoke tests (config + docker)
- `docker compose config` — validates compose file syntax
- `docker compose up --build` — starts PostgreSQL and Django; migrations run automatically
- `curl http://127.0.0.1:8000/api/schema/` — confirms API is reachable after startup

## Open Questions / Follow-ups

- Production deployment would replace `runserver` with Gunicorn/uWSGI (out of scope for BE-002)
- BE-001 must merge to `main` before or with this PR so the backend code is available on the base branch
- Frontend Docker setup is handled in a separate ticket
