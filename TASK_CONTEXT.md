# TASK_CONTEXT — BE-003: Authentication & Role-Based Access Control

## Ticket Scope

Implement JWT-based authentication with role-based access control (RBAC) for the Django REST API backend. Backend-only — no frontend changes.

**Roles:** `Super Admin`, `HR Manager`, `Employee`

**Endpoints:**
- `POST /api/v1/auth/login/` — credential validation, returns JWT + user summary
- `GET /api/v1/auth/profile/` — authenticated user profile

## Key Implementation Decisions

- **Login field:** `email` (unique). The login payload also accepts `username` as an alias for `email` for API flexibility; both map to the same field.
- **User model:** Custom `accounts.User` extending `AbstractBaseUser` with `email`, hashed `password`, `role`, `is_active`, timestamps. `AUTH_USER_MODEL = "accounts.User"`.
- **JWT library:** `djangorestframework-simplejwt` with `JWT_SECRET` from environment (via `python-decouple`). Token lifetime: 24 hours. Claims include `user_id`, `email`, and `role`.
- **Password hashing:** Django's default PBKDF2 via `set_password()` / `check_password()` (bcrypt-compatible stack default).
- **Authentication:** DRF `JWTAuthentication` as default; Bearer token in `Authorization` header.
- **Authorization:** `require_roles(*roles)` factory in `apps.accounts.permissions` returns a DRF `BasePermission` for route-level RBAC. Returns 403 when role is insufficient.
- **Default permissions:** `IsAuthenticated` globally in DRF settings; public views (login) use `AllowAny`.
- **API prefix:** `/api/v1/auth/` per existing versioning convention (not bare `/auth/`).

## Files Changed

| File | Purpose |
|------|---------|
| `backend/apps/accounts/models.py` | Custom User model, Role enum, UserManager |
| `backend/apps/accounts/serializers.py` | Login and profile serializers |
| `backend/apps/accounts/views.py` | `LoginView`, `ProfileView` |
| `backend/apps/accounts/urls.py` | Auth route registration |
| `backend/apps/accounts/permissions.py` | `require_roles()` RBAC permission factory |
| `backend/apps/accounts/authentication.py` | JWT token builder with id/email/role claims |
| `backend/apps/accounts/admin.py` | Django admin for User |
| `backend/apps/accounts/migrations/0001_initial.py` | Initial User model migration |
| `backend/apps/accounts/tests/test_auth.py` | Auth, profile, middleware, and RBAC tests |
| `backend/config/settings.py` | `AUTH_USER_MODEL`, JWT config, default auth/permissions |
| `backend/config/api/v1/urls.py` | Include `auth/` routes |
| `requirements.txt` | Added `djangorestframework-simplejwt` |
| `.env.example` | Added `JWT_SECRET` placeholder |

## Protected Endpoints

No pre-existing `/api/v1/` business endpoints existed before this ticket. The following are now available:

| Endpoint | Auth | Roles |
|----------|------|-------|
| `POST /api/v1/auth/login/` | Public (`AllowAny`) | — |
| `GET /api/v1/auth/profile/` | JWT required | Any authenticated role |

**Future endpoints** registered under `/api/v1/` will require JWT by default (`IsAuthenticated`). Apply `require_roles(...)` on views that need role restrictions.

## Verification

```bash
cd backend
python manage.py migrate
python manage.py test
```

Example usage:

```bash
# Login
curl -X POST http://127.0.0.1:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "your-password"}'

# Profile
curl http://127.0.0.1:8000/api/v1/auth/profile/ \
  -H "Authorization: Bearer <token>"
```

Create a user via Django admin or shell:

```bash
python manage.py createsuperuser
```

## Open Questions / Follow-ups

- User registration and password reset are out of scope for BE-003.
- Token refresh/blacklist not implemented; clients re-login after 24h expiry.
- Frontend (separate branch) must store token and send `Authorization: Bearer` header.

## Prior Context (BE-001)

See git history on `sunset/task/1-7b21017f` for Django project initialization: `config` project package, `backend/apps/` layout, PostgreSQL, `/api/v1/` versioning, `drf-spectacular` docs.
