# Project Structure & Ownership

This document maps **Noornest** frontend layout: what exists today, what to add for a clean auth/API integration, and **who owns what**.

## Current layout (high level)

```
app/                    # Next.js App Router — routes & layouts
components/             # Shared UI, layout, dashboard
contexts/               # React context (e.g. UserContext)
hooks/                  # Shared hooks (e.g. useApi)
lib/                    # HTTP clients, cookies, apiServices
store/                  # Client stores (e.g. register wizard)
types/                  # TypeScript types
utils/                  # Helpers
```

## Existing files — roles & refactor notes

### App & routes

| Path | Role today | Notes |
|------|------------|--------|
| `app/layout.tsx` | Root layout, wraps `UserProvider` | Keep single auth provider at root |
| `app/(auth)/**` | Login, register steps, forgot/verify/new password | Pages stay thin; logic moves to hooks/services |
| `app/dashboard/**` | Role dashboards, settings | Uses `useUser`; mock data until APIs wired |
| `app/dashboard/layout.tsx` | Shell + logout | Remove duplicate `UserProvider`; centralize guest guard |

### State & context

| Path | Role today | Notes |
|------|------------|--------|
| `contexts/UserContext.tsx` | User state, dummy login, `localStorage` `currentUser` | Replace with session-backed provider + real auth |
| `store/registerFlowStore.ts` | Zustand persist for register wizard | **Keep** — UI flow state only |

### HTTP & API

| Path | Role today | Notes |
|------|------------|--------|
| `lib/apiFetch.ts` | `fetch` wrapper, `ApiResponse`, helpers | Evolve into **primary** HTTP layer |
| `lib/api.ts` | Axios instance, `localStorage` token, 401 redirect | **Merge or remove** — avoid two token mechanisms |
| `lib/api/dashboard.ts` | Dashboard endpoints via axios `api` | Repoint after client unification |
| `lib/cookies.ts` | Token/user cookie helpers | Keep as low-level; auth reads/writes via session module |
| `lib/apiServices/authServices.ts` | Auth-related API functions | Thin transport; orchestration moves to `lib/auth/*` |
| `lib/apiServices/bookingService.ts`, `paymentService.ts` | Domain APIs | Stay; import unified client |

### Types

| Path | Role today | Notes |
|------|------------|--------|
| `types/index.ts` | `User`, `UserRole`, domain types | Align `UserRole` with dashboard/constants/backend |

### Documentation

| Path | Role |
|------|------|
| `docs/API_INTEGRATION_GUIDE.md` | Dashboard integration patterns |
| `DUMMY_CREDENTIALS.md` | Dev-only; remove or archive when dummy auth is removed |

---

## Target additions (`lib/auth/`)

Recommended modules for **session + auth orchestration** (names may vary):

```
lib/auth/
  session.ts              # Single place: get/set/clear session (tokens + user cache)
  token-storage.ts        # Wraps lib/cookies.ts for testability
  auth-client.ts          # Login, logout, refresh, register, forgot/reset, me — uses apiFetch
  auth-errors.ts          # Normalize API errors for UI
  mappers/
    user-mapper.ts        # API DTO → domain User
  post-login-redirect.ts  # role + flags → path (no email-string hacks)
  guards.ts               # e.g. canAccessDashboard(role)
```

Optional:

```
middleware.ts             # Project root — route protection when cookie/session strategy is fixed
features/auth/hooks/      # useLogin, useVerifyEmail, useRequireSession — thin UI orchestration
```

---

## Ownership matrix

| Concern | Owner |
|---------|--------|
| HTTP transport (headers, base URL, JSON) | `lib/apiFetch.ts` (or single merged client) |
| Cookie string read/write | `lib/cookies.ts` |
| Where tokens and cached user live | `lib/auth/session.ts` |
| Login/logout/refresh/register/forgot/reset | `lib/auth/auth-client.ts` |
| DTO → `User` | `lib/auth/mappers/user-mapper.ts` |
| Post-login URL | `lib/auth/post-login-redirect.ts` |
| Role/route rules | `lib/auth/guards.ts` |
| React: `user`, loading, actions | `contexts/UserContext.tsx` or `AuthProvider.tsx` |
| Register wizard steps | `store/registerFlowStore.ts` |
| Pages | `app/**` — presentation + bind hooks |

---

## What to centralize

- **Tokens:** All access/refresh reads and writes go through `session.ts` (backed by `token-storage` / `cookies`), not ad hoc `localStorage` keys in pages.
- **User profile after load:** Prefer `GET /me` (or equivalent) once tokens exist; avoid trusting only a JSON blob in storage.

---

## What to remove or isolate

- Dummy credential tables and fake delays in `contexts/UserContext.tsx`.
- Dev-only quick-login UI on `app/(auth)/login/page.tsx` (or gate explicitly).
- Mock delay on `app/(auth)/forgot-password/page.tsx` when API is wired.
- Nested `UserProvider` in `app/dashboard/layout.tsx`.

---

## Refactor order (safe sequence)

1. Align `types/index.ts` (`UserRole` with dashboard/admin roles).
2. Add `lib/auth/session.ts` + `token-storage.ts`; no UI change.
3. Unify HTTP client (`apiFetch` vs axios) for authenticated calls.
4. Refactor context: remove dummies; delegate to `auth-client` + `session`.
5. Fix dashboard layout: single provider; extract guest guard.
6. Add hooks under `features/auth/hooks` as needed.
7. Add `middleware.ts` when session cookies are defined.
8. Wire Swagger endpoints; add `user-mapper.ts`.

See [Business logic architecture](./business-logic-architecture.md) for flow-level detail and sequencing.
