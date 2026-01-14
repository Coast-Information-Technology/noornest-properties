# Dummy Login Credentials

This document contains the dummy login credentials for testing different user roles in the Noornest Properties application.

## Available User Roles

### 1. Super Admin
- **Email:** `superadmin@noornest.com`
- **Password:** `super123`
- **Dashboard:** Full system control and management
- **Features:**
  - Manage all users
  - Manage all properties
  - View system analytics
  - Full administrative access

### 2. Admin
- **Email:** `admin@noornest.com`
- **Password:** `admin123`
- **Dashboard:** Property and user management
- **Features:**
  - Manage properties
  - Manage users
  - Manage blog content
  - Administrative tasks

### 3. Agent
- **Email:** `agent@noornest.com`
- **Password:** `agent123`
- **Dashboard:** Agent-specific property management
- **Features:**
  - Manage listings
  - View bookings
  - Manage clients
  - View analytics

### 4. Investor
- **Email:** `investor@noornest.com`
- **Password:** `investor123`
- **Dashboard:** Investment tracking and opportunities
- **Features:**
  - View portfolio
  - Track investments
  - View BMV analyses
  - Monitor returns

### 5. Client
- **Email:** `client@noornest.com`
- **Password:** `client123`
- **Dashboard:** Property search and bookings
- **Features:**
  - Search properties
  - Save properties
  - Book viewings
  - BMV analysis

### 6. Guest
- **Email:** `guest@noornest.com`
- **Password:** `guest123`
- **Dashboard:** Limited access view
- **Features:**
  - Browse properties (limited)
  - View blog
  - Basic BMV analyzer access

## Quick Login

The login page includes a "Show Demo Credentials" button that displays all available roles with quick-fill buttons. Simply:

1. Navigate to `/login`
2. Click "Show Demo Credentials"
3. Click any role button to auto-fill the credentials
4. Click "Login"

## Password Pattern

All passwords follow the pattern: `[role]123`
- Example: `admin123`, `agent123`, `investor123`, etc.

## Implementation Details

- Credentials are stored in `contexts/UserContext.tsx`
- User sessions are persisted in `localStorage`
- Role-based routing is handled in `app/dashboard/page.tsx`
- Each role has a unique dashboard view with role-specific features

## Security Note

⚠️ **Important:** These are dummy credentials for development and testing purposes only. In production, implement proper authentication with secure password hashing, JWT tokens, and proper session management.
