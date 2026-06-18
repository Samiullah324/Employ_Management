# Employee Management System — Backend

REST API backend for the Employee Management System, built with Django 4.2 and Django REST Framework.

## Prerequisites

- Python 3.10+
- PostgreSQL 12+

## Setup

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
