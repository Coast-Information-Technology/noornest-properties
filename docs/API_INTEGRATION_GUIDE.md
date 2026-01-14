# API Integration Guide

This document explains how to integrate API calls into dashboard pages.

## Overview

All dashboard pages have been structured to be API-ready. The pattern includes:
- Loading states
- Error handling
- API service functions
- Type definitions

## Structure

### 1. API Service Layer (`lib/api/dashboard.ts`)

All API functions are organized by user role:
- `clientDashboardApi` - For client/buyer/tenant users
- `agentDashboardApi` - For real estate agents
- `investorDashboardApi` - For investors
- `sharedDashboardApi` - Shared across all roles

### 2. Custom Hook (`hooks/useApi.ts`)

A reusable hook for API calls with built-in loading and error states:

```typescript
const { data, loading, error, refetch } = useApi(() => api.getData());
```

### 3. Page Pattern

Each dashboard page follows this structure:

```typescript
export default function DashboardPage() {
  // State Management
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call
        // const response = await api.getData();
        // setData(response.data);
        
        // Temporary: Use mock data
        setData(mockData);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
        // Fallback to mock data
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading State
  if (loading && data.length === 0) {
    return <LoadingSpinner />;
  }

  // Error State
  if (error && data.length === 0) {
    return <ErrorMessage error={error} />;
  }

  // Main Content
  return (
    <div>
      {error && <ErrorBanner error={error} />}
      {/* Page content */}
    </div>
  );
}
```

## Implementation Steps

### For Each Dashboard Page:

1. **Import API functions:**
   ```typescript
   import { clientDashboardApi } from "@/lib/api/dashboard";
   ```

2. **Add state management:**
   ```typescript
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   ```

3. **Create fetch function:**
   ```typescript
   useEffect(() => {
     const fetchData = async () => {
       try {
         setLoading(true);
         const response = await clientDashboardApi.getData();
         setData(response.data);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
     fetchData();
   }, []);
   ```

4. **Add loading/error UI:**
   - Show spinner while loading
   - Show error message on failure
   - Show retry button

5. **Replace mock data calls:**
   - Find all `mockData` references
   - Replace with API calls
   - Keep mock data as fallback

## Pages Status

### ✅ Completed (API-Ready Structure):
- `/dashboard/saved` - Example implementation
- `/dashboard/clients` - Structure ready
- `/dashboard/analytics` - Structure ready
- `/dashboard/reports` - Structure ready
- `/dashboard/portfolio` - Structure ready
- `/dashboard/opportunities` - Structure ready
- `/dashboard/payouts` - Structure ready
- `/dashboard/bookings` - Structure ready
- `/dashboard/payments` - Structure ready
- `/dashboard/listings` - Structure ready
- `/dashboard/bmv` - Structure ready

### 📝 To Do:
1. Uncomment API calls in `lib/api/dashboard.ts`
2. Replace mock data with API calls in each page
3. Add proper error handling for each API endpoint
4. Test API integration
5. Add loading skeletons for better UX

## API Endpoints

All endpoints are defined in `lib/api.ts` under the `endpoints` object.

### Example:
```typescript
// Get saved properties
GET /dashboard/properties?saved=true

// Save/unsave property
POST /dashboard/properties/:id/save

// Get bookings
GET /dashboard/bookings?status=confirmed

// Create booking
POST /dashboard/bookings
```

## Error Handling

All API functions throw errors with this structure:
```typescript
{
  message: string;
  status: number;
  data: null;
  success: false;
}
```

Handle errors in try-catch blocks and show user-friendly messages.

## Testing

1. Test with mock data first
2. Test API integration in development
3. Test error scenarios (network failures, 404s, etc.)
4. Test loading states
5. Test retry functionality

## Notes

- All API functions currently throw "API not implemented" errors
- Mock data is used as fallback
- Replace TODO comments with actual API calls
- Keep error handling consistent across all pages

