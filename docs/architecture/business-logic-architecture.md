# Business Logic Architecture

This document defines **frontend business rules** for authentication and session handling in **Noornest**. It is **contract-agnostic**: exact payloads and status codes must be aligned with your backend Swagger/OpenAPI when you wire endpoints.

For folder and file ownership, see [Project structure](./project-structure.md).

---

## Layering

| Layer | Responsibility | Must not |
|-------|----------------|----------|
| **Pages** (`app/(auth)/*`, `app/dashboard/*`) | Render UI, bind forms, call hooks | Read cookies/tokens directly; encode redirect matrices inline |
| **Hooks** (`features/auth/hooks` or colocated) | Compose async calls, toasts, navigation | Duplicate HTTP details |
| **Auth client** (`lib/auth/auth-client.ts`) | Orchestrate flows, call HTTP, update session | Render or import UI |
| **Session** (`lib/auth/session.ts`) | Persist and clear tokens + user cache | Know about React |
| **HTTP** (`lib/apiFetch.ts` or unified client) | Request/response | Business rules |
| **Guards** (`lib/auth/guards.ts`) | Pure functions: allowed routes by role | Side effects |

---

## Session model (conceptual)

After integration, the client should treat session as:

- **Authenticated:** valid access token (and refresh token if used), plus **user** from API (`/me` or login response), not only cached JSON.
- **Anonymous:** no valid tokens.
- **Loading:** hydration in progress (read storage → validate → optional refresh).

Rules:

- **Logout** clears tokens and cached user everywhere the app stores them.
- **Refresh** updates tokens atomically; concurrent 401s should use a **single refresh** (queue), not parallel refresh storms.
- **401 from API:** attempt refresh once; if refresh fails, clear session and treat as anonymous (redirect policy below).

---

## Auth flows (business logic)

Each flow: **trigger**, **validation (client)**, **API dependency (name only)**, **success**, **failure**, **redirect**, **session update**, **edge cases**.

### Register

| Aspect | Detail |
|--------|--------|
| **Trigger** | User completes create-account step and server accepts registration (or final wizard submit). |
| **Validation** | Email format, password policy, required fields, role allowed, policies accepted if required. |
| **API** | `POST` register (exact path per backend). |
| **Success** | Show confirmation / “check email”; advance or reset wizard per product rules. |
| **Failure** | Show field or global error; do not claim success. |
| **Redirect** | Often stay on success screen or login; if API logs user in, use post-login redirect. |
| **Session** | Usually **no** full session until email verified (depends on API). |
| **Edge cases** | Duplicate email, rate limits, abandoned wizard (Zustand can resume). |

### Login

| Aspect | Detail |
|--------|--------|
| **Trigger** | Submit on login form. |
| **Validation** | Email + password required; optional “remember me” if API supports longer refresh. |
| **API** | `POST` login. |
| **Success** | Store tokens per session strategy; load or merge user; redirect via `post-login-redirect`. |
| **Failure** | Stay on page; show safe message (avoid user enumeration if API is opaque). |
| **Redirect** | By **role** and **flags** (e.g. onboarding, email verified)—not by substring on email. |
| **Session** | Write access (+ refresh if any); then optional `GET` me. |
| **Edge cases** | Unverified email → redirect or banner per API; account locked. |

### Verify email

| Aspect | Detail |
|--------|--------|
| **Trigger** | User lands on verify route with token in query (and optional email for resend). |
| **Validation** | Token present; optional role param for analytics only. |
| **API** | `POST` verify-email with token. |
| **Success** | Message + redirect to login or auto-login if API returns tokens. |
| **Failure** | Expired/invalid token message; offer resend. |
| **Redirect** | Login or dashboard if session established. |
| **Session** | Update only if API returns session. |
| **Edge cases** | Double-click link; already verified. |

### Resend verification

| Aspect | Detail |
|--------|--------|
| **Trigger** | Button on verify or login banner. |
| **Validation** | Email present; optional client-side cooldown timer. |
| **API** | `POST` resend-verification. |
| **Success** | Generic confirmation. |
| **Failure** | Rate limit message; retry later. |
| **Session** | None. |
| **Edge cases** | Missing email in URL → prompt or return to register. |

### Forgot password

| Aspect | Detail |
|--------|--------|
| **Trigger** | Submit email on forgot-password page. |
| **Validation** | Email format. |
| **API** | `POST` forgot-password. |
| **Success** | Same UX whether or not email exists (if API is privacy-preserving). |
| **Failure** | Network or server error. |
| **Redirect** | Optional: stay on confirmation view. |
| **Session** | None. |

### Reset password

| Aspect | Detail |
|--------|--------|
| **Trigger** | Submit new password on reset page. |
| **Validation** | Policy + confirm match; reset token from URL or step state. |
| **API** | `POST` reset-password. |
| **Success** | Redirect to login + success toast. |
| **Failure** | Invalid/expired token; allow new forgot-password flow. |
| **Redirect** | Login. |
| **Session** | Clear stale client session if any. |

### Refresh token

| Aspect | Detail |
|--------|--------|
| **Trigger** | Automatic: e.g. 401 with refresh token present; not user-facing. |
| **Validation** | Refresh token available and not already refreshing (queue). |
| **API** | `POST` refresh-token. |
| **Success** | Replace tokens; retry original request. |
| **Failure** | Clear session; redirect to login on protected routes. |
| **Session** | Replace access (and refresh if rotated). |
| **Edge cases** | Tab sync optional via `storage` events. |

### Logout

| Aspect | Detail |
|--------|--------|
| **Trigger** | User clicks logout. |
| **Validation** | None. |
| **API** | `POST` logout if backend revokes refresh/session. |
| **Success** | Clear client session always. |
| **Failure** | Still clear client session (best effort). |
| **Redirect** | Login or home. |
| **Session** | Clear all local auth state. |

### Logout all devices

| Aspect | Detail |
|--------|--------|
| **Trigger** | Settings action with confirmation. |
| **API** | Backend endpoint per contract (e.g. revoke all sessions). |
| **Success** | Clear local session; message. |
| **Failure** | Toast error; session unchanged or cleared per policy. |
| **Redirect** | Login if current session invalidated. |

### Change password

| Aspect | Detail |
|--------|--------|
| **Trigger** | Authenticated user submits settings form. |
| **Validation** | Old + new + confirm; policy. |
| **API** | `POST` change-password **with auth**. |
| **Success** | Toast; re-login if API invalidates tokens. |
| **Failure** | Wrong old password, etc. |
| **Session** | Replace tokens if API rotates. |

### Current user on app load

| Aspect | Detail |
|--------|--------|
| **Trigger** | App shell mounts (`AuthProvider`). |
| **Validation** | N/A. |
| **API** | If access token: `GET` me or validate token; if 401: refresh then me or clear. |
| **Success** | Set user + authenticated state. |
| **Failure** | Anonymous state. |
| **Redirect** | If on protected route and anonymous → login (client or middleware). |
| **Session** | Reconcile storage with API result; drop orphan `currentUser` without token. |

---

## Route protection (target)

1. **Public:** marketing pages, auth pages (with optional redirect if already logged in).
2. **Authenticated:** `/dashboard/*` and similar — require session.
3. **Role-based:** dashboard home may switch by role; **admin** routes may require `admin` / `super_admin` (exact matrix from product + API).

Implementation stages:

1. **Client:** `guards.ts` + hook or layout wrapper loading session then redirect.
2. **Middleware:** optional once cookies/session strategy is fixed for edge checks.

Guest policy example (current product behavior): **guest** users should not stay on full dashboard — redirect to home or signup; encode in `guards.ts` + one hook, not `setTimeout` in layout.

---

## Implementation order (business-logic view)

1. Session module + token centralization (no new UX).
2. Auth client + context refactor (remove dummy auth).
3. Hooks per flow; pages slim down.
4. Refresh queue + unified HTTP errors.
5. Middleware (optional).
6. Swagger alignment: mappers and endpoint wiring.

---

## Risks to avoid

- Two token locations (`localStorage` vs cookies) without a single session API.
- Nested providers duplicating context (`app/layout.tsx` vs `app/dashboard/layout.tsx`).
- Redirect rules copy-pasted across login, OAuth callbacks, and dashboard.
- Trusting `localStorage` user JSON without validating tokens against the API.
