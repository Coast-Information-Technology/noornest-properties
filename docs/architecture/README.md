# Noornest — Architecture Documentation

This folder describes **target structure**, **ownership**, and **business-logic boundaries** for the Noornest Properties frontend (Next.js). It complements implementation guides elsewhere in `docs/`.

## Contents

| Document | Purpose |
|----------|---------|
| [File structure](./file-structure.md) | Repository tree (current + planned `lib/auth`) |
| [Project structure](./project-structure.md) | Folders, files, ownership, refactor notes tied to this repo |
| [Business logic architecture](./business-logic-architecture.md) | Auth flows, session rules, route protection, sequencing |

## Related

- [API integration guide](../API_INTEGRATION_GUIDE.md) — dashboard page patterns and `useApi`
- [Scroll animations](../SCROLL_ANIMATIONS.md) — UI animation setup

## Principles

1. **UI** handles presentation and form binding; **services** handle HTTP and orchestration; **context** holds session state and delegates to services.
2. **One** HTTP client and **one** session/token strategy for authenticated use (avoid split between `localStorage` and cookies for the same concern).
3. **Business rules** (who may access what, post-login redirects) live in small, testable modules—not scattered across pages.

## Stack (reference)

- **Framework:** Next.js (App Router)
- **State:** React context for auth session; Zustand for multi-step registration wizard UI state
- **HTTP:** `fetch`-based helpers in `lib/apiFetch.ts` today; axios in `lib/api.ts` for some dashboard paths — consolidation is planned (see project structure doc)
