# File structure

Overview of the **Noornest Properties** repository layout. For **ownership** and refactor notes, see [project-structure.md](./project-structure.md).

```
noornest-properties/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── App-layout.tsx
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── new-password/page.tsx
│   │   ├── verify-email/page.tsx
│   │   └── register/
│   │       ├── page.tsx
│   │       ├── role-selection/page.tsx
│   │       ├── create-account/page.tsx
│   │       ├── email-verification/page.tsx
│   │       ├── accept-policies/page.tsx
│   │       └── done/page.tsx
│   ├── dashboard/                # Authenticated app area
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── listings/...
│   │   ├── profile/page.tsx
│   │   ├── settings/page.tsx
│   │   └── ...                   # bookings, bmv, opportunities, payouts, portfolio, etc.
│   ├── about/
│   ├── blog/
│   ├── booking/
│   ├── contact/
│   ├── faqs/
│   ├── investment-plans/
│   ├── onboarding/
│   ├── properties/
│   ├── services/                 # property-solutions, advisory-and-enhancements
│   ├── globals.css
│   ├── layout.tsx                # Root layout (providers)
│   ├── page.tsx                  # Home
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── auth/                     # e.g. StepIndicator
│   ├── blog/
│   ├── dashboard/                # Sidebar, etc.
│   ├── layout/                   # Header, Footer, PageShell, MegaMenu, Newsletter
│   ├── providers/
│   ├── seo/
│   ├── testimonial/
│   └── ui/                       # shadcn-style primitives
│
├── constants/
│   └── index.ts                  # roles, permissions, route helpers
│
├── contexts/
│   └── UserContext.tsx           # Session/user context (to align with lib/auth)
│
├── data/                         # Static copy, testimonials, mock JSON
│
├── docs/
│   ├── architecture/           # Architecture docs
│   │   ├── README.md
│   │   ├── file-structure.md     # This file
│   │   ├── project-structure.md
│   │   └── business-logic-architecture.md
│   ├── API_INTEGRATION_GUIDE.md
│   └── SCROLL_ANIMATIONS.md
│
├── hooks/
│   └── useApi.ts
│
├── lib/
│   ├── api.ts                    # Axios instance (dashboard-related)
│   ├── apiFetch.ts               # fetch-based HTTP helpers
│   ├── api/
│   │   └── dashboard.ts
│   ├── apiServices/
│   │   ├── authServices.ts
│   │   ├── bookingService.ts
│   │   └── paymentService.ts
│   ├── animations.ts
│   ├── colors.ts
│   ├── console.ts
│   ├── cookies.ts
│   ├── mock-data.ts
│   └── utils.ts
│
├── public/                       # Static assets (images, etc.)
│
├── store/
│   └── registerFlowStore.ts      # Register wizard (Zustand)
│
├── types/                        # Shared TS types
│   ├── index.ts
│   ├── booking.ts
│   ├── bookings.ts
│   ├── payment.ts
│   └── editorjs.d.ts
│
├── utils/                        # formatPrice, disableHeaderWithFooter, getDeviceInfo, ...
│
├── DUMMY_CREDENTIALS.md          # Dev-only; remove when dummy auth is gone
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── components.json               # shadcn/ui
```

---

## Planned additions (auth refactor)

Not all exist yet; add when implementing the architecture described in [project-structure.md](./project-structure.md):

```
lib/auth/
├── session.ts
├── token-storage.ts
├── auth-client.ts
├── auth-errors.ts
├── post-login-redirect.ts
├── guards.ts
└── mappers/
    └── user-mapper.ts

features/auth/hooks/              # optional: useLogin, useVerifyEmail, ...
middleware.ts                     # optional: root — route protection
types/auth.ts                     # optional: API DTOs separate from domain User
```

---

## Related docs

| Document | Purpose |
|----------|---------|
| [project-structure.md](./project-structure.md) | Ownership, keep/merge/remove, refactor order |
| [business-logic-architecture.md](./business-logic-architecture.md) | Auth flows and session rules |
| [README.md](./README.md) | Architecture folder index |
