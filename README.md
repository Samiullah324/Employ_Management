# Employ Management

Employee Attendance & Payroll Management System — frontend application.

## Tech Stack

- React 19 + Vite
- React Router DOM
- Axios
- ESLint + Prettier

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

| Variable            | Description          | Default                     |
| ------------------- | -------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |

## Project Structure

```
src/
  components/   # Shared UI components
  pages/        # Route-level pages
  routes/       # Application routing
  services/     # API layer (Axios)
  store/        # Application state
  utils/        # Shared utilities and constants
```

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run test` — run unit and smoke tests
- `npm run format` — format code with Prettier
- `npm run preview` — preview production build
