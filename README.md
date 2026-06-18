# Employee Management System — Backend

REST API backend for the Employee Management System, built with Django 4.2 and Django REST Framework.

## Prerequisites

- Python 3.10+
- PostgreSQL 12+
- Docker and Docker Compose (optional, for containerized setup)

## Quick Start with Docker

Run the complete backend stack (Django + PostgreSQL) with a single command:

```bash
cp .env.example .env
# Edit .env and set SECRET_KEY and DB_PASSWORD
docker compose up --build
```

The API will be available at `http://127.0.0.1:8000/`.

| Service | Port | Description |
|---------|------|-------------|
| `web` | 8000 | Django development server |
| `db` | 5432 | PostgreSQL database |

Docker Compose automatically:

- Waits for PostgreSQL to become healthy before starting Django
- Runs database migrations on startup
- Collects static files into a named volume
- Mounts `./backend` for live code changes during development

To stop the stack:

```bash
docker compose down
```

To remove persisted database data:

```bash
docker compose down -v
```

## Local Setup (without Docker)

### 1. Clone the repository

```bash
git clone https://github.com/Samiullah324/Employ_Management.git
cd Employ_Management
```

### 2. Create and activate a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set your values for `SECRET_KEY`, database credentials, and other settings.

### 5. Create the PostgreSQL database

```bash
createdb employ_management
```

Or via `psql`:

```sql
CREATE DATABASE employ_management;
```

### 6. Run migrations

```bash
cd backend
python manage.py migrate
```

### 7. Create a superuser (optional)

```bash
python manage.py createsuperuser
```

### 8. Run the development server

```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

## API Documentation

| Endpoint | Description |
|----------|-------------|
| `/api/schema/` | OpenAPI schema |
| `/api/docs/` | Swagger UI |
| `/api/redoc/` | ReDoc documentation |
| `/api/v1/` | API v1 endpoints (to be added) |
| `/admin/` | Django admin |

## Project Structure

```
Employ_Management/
├── backend/
│   ├── manage.py
│   ├── config/              # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │   └── api/
│   │       └── v1/          # API v1 URL routing
│   └── apps/                # Future Django apps
├── docker/
│   └── entrypoint.sh        # Container startup script
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env.example
└── README.md
```

## Environment Variables

See `.env.example` for all required variables:

- `SECRET_KEY` — Django secret key
- `DEBUG` — Debug mode (`True`/`False`)
- `ALLOWED_HOSTS` — Comma-separated allowed hosts
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` — PostgreSQL connection
- `CORS_ALLOWED_ORIGINS` — Comma-separated frontend origins
