# Employee Management System

Full-stack Employee Attendance & Payroll Management application with a React + Vite frontend and a Django REST Framework backend.

## Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 12+

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Samiullah324/Employ_Management.git
cd Employ_Management
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set your values for `SECRET_KEY`, database credentials, CORS origins, and the frontend API base URL.

### 3. Backend setup

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
createdb employ_management
cd backend
python manage.py migrate
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`.

### 4. Frontend setup

In a separate terminal from the repository root:

```bash
npm install
npm run dev
```

The frontend will be available at `http://127.0.0.1:5173/` by default.

## API Documentation

| Endpoint       | Description                    |
| -------------- | ------------------------------ |
| `/api/schema/` | OpenAPI schema                 |
| `/api/docs/`   | Swagger UI                     |
| `/api/redoc/`  | ReDoc documentation            |
| `/api/v1/`     | API v1 endpoints (to be added) |
| `/admin/`      | Django admin                   |

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
├── src/
│   ├── components/          # Shared UI components
│   ├── pages/               # Route-level pages
│   ├── routes/              # Application routing
│   ├── services/            # API layer (Axios)
│   ├── store/               # Application state
│   └── utils/               # Shared utilities and constants
├── requirements.txt
├── package.json
├── .env.example
└── README.md
```

## Environment Variables

See `.env.example` for all required variables:

- `SECRET_KEY` — Django secret key
- `DEBUG` — Debug mode (`True`/`False`)
- `ALLOWED_HOSTS` — Comma-separated allowed hosts
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` — PostgreSQL connection
- `CORS_ALLOWED_ORIGINS` — Comma-separated frontend origins (defaults include Vite on port 5173)
- `VITE_API_BASE_URL` — Frontend API base URL (defaults to `http://localhost:8000/api/v1`)

## Scripts

### Frontend

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run test` — run unit and smoke tests
- `npm run format` — format code with Prettier
- `npm run preview` — preview production build

### Backend

From the `backend/` directory:

- `python manage.py runserver` — start development server
- `python manage.py test config.tests` — run configuration smoke tests
- `python manage.py migrate` — apply database migrations
