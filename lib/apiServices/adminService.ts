import { ApiRequestError } from "@/lib/apiFetch";
import { apiRequestWithRefresh } from "@/lib/apiServices/authServices";
import { getTokenFromCookies } from "@/lib/cookies";
import type {
  AdminActionResponseBody,
  AdminAuditLog,
  AdminAuditLogsQuery,
  AdminAuditLogsResponseBody,
  AdminEmailTestRequest,
  AdminOnboardingProgress,
  AdminOnboardingResponseBody,
  AdminOnboardingTrack,
  AdminResetOnboardingRequest,
  AdminStaffResponseBody,
  AdminUserDetailResponseBody,
  AdminUser,
  AdminUserSession,
  AdminUserSessionsResponseBody,
  AdminUsersQuery,
  AdminUsersResponseBody,
  NormalizedAdminAuditLogs,
  NormalizedAdminUserSessions,
  NormalizedAdminUsers,
  CreateAdminStaffRequest,
  SetAdminUserRoleRequest,
  SetAdminUserStatusRequest,
  UpdateOwnAdminProfileRequest,
} from "@/types/admin";

type QueryParams = Record<string, string | number | boolean | undefined | null>;

const toQueryString = (params: QueryParams = {}): string => {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
};

const getArrayByKeys = <T>(
  payload: unknown,
  keys: string[]
): T[] => {
  if (Array.isArray(payload)) return payload as T[];
  if (!isRecord(payload)) return [];

  for (const key of keys) {
    const value = payload[key];
    if (Array.isArray(value)) return value as T[];
  }

  if (isRecord(payload.data)) {
    return getArrayByKeys<T>(payload.data, keys);
  }

  return [];
};

const getArrayFromEnvelope = (
  payload: AdminUsersResponseBody
): AdminUser[] => {
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.users)) return payload.users;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;

  if (payload.data && !Array.isArray(payload.data)) {
    if (Array.isArray(payload.data.users)) return payload.data.users;
    if (Array.isArray(payload.data.items)) return payload.data.items;
    if (Array.isArray(payload.data.results)) return payload.data.results;
    if (Array.isArray(payload.data.data)) return payload.data.data;
  }

  return [];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isLikelyAdminUser = (value: Record<string, unknown>): boolean =>
  ["id", "publicId", "userPublicId", "email", "role"].some(
    (key) => typeof value[key] === "string" && value[key] !== ""
  );

const getNestedAdminUser = (value: unknown): AdminUser | undefined => {
  if (!isRecord(value)) return undefined;

  const nestedKeys = ["user", "adminUser", "profile", "data"];
  for (const key of nestedKeys) {
    const nestedValue = value[key];
    if (isRecord(nestedValue)) return nestedValue as AdminUser;
  }

  return isLikelyAdminUser(value) ? (value as AdminUser) : undefined;
};

const normalizeAdminUser = (
  payload: AdminUserDetailResponseBody
): AdminUser | undefined => {
  if (payload.data) {
    return getNestedAdminUser(payload.data);
  }

  return (
    getNestedAdminUser(payload.user) ??
    getNestedAdminUser(payload.adminUser) ??
    getNestedAdminUser(payload.profile) ??
    getNestedAdminUser(payload)
  );
};

const normalizeAdminOnboardingProgress = (
  payload: AdminOnboardingResponseBody
): AdminOnboardingProgress => {
  if (payload.data) return payload.data;

  return {
    track: payload.track,
    status: payload.status,
    currentStep: payload.currentStep,
    completedAt: payload.completedAt,
    steps: payload.steps,
  };
};

const requireAdminToken = (): string => {
  const token = getTokenFromCookies();
  if (!token) {
    throw new ApiRequestError(
      "Admin request requires an authenticated session.",
      401
    );
  }
  return token;
};

const adminUserEndpoint = (publicId: string, suffix = ""): string =>
  `/api/admin/users/${encodeURIComponent(publicId)}${suffix}`;

const adminSessionEndpoint = (sessionId: string, suffix = ""): string =>
  `/api/admin/sessions/${encodeURIComponent(sessionId)}${suffix}`;

export const normalizeAdminUsers = (
  payload: AdminUsersResponseBody,
  fallback: Required<Pick<AdminUsersQuery, "page" | "limit">>
): NormalizedAdminUsers => {
  const nested = payload.data && !Array.isArray(payload.data) ? payload.data : undefined;
  const users = getArrayFromEnvelope(payload);
  const total = payload.total ?? nested?.total ?? payload.meta?.total ?? users.length;
  const page = payload.page ?? nested?.page ?? payload.meta?.page ?? fallback.page;
  const limit = payload.limit ?? nested?.limit ?? payload.meta?.limit ?? fallback.limit;
  const totalPages =
    payload.totalPages ??
    nested?.totalPages ??
    payload.meta?.totalPages ??
    Math.max(1, Math.ceil(total / Math.max(1, limit)));

  return {
    users,
    total,
    page,
    limit,
    totalPages,
  };
};

export const getAdminUsers = async (
  params: AdminUsersQuery = {}
): Promise<NormalizedAdminUsers> => {
  const token = requireAdminToken();

  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const response = await apiRequestWithRefresh<AdminUsersResponseBody>(
    `/api/admin/users${toQueryString({ ...params, page, limit })}`,
    "GET",
    undefined,
    token
  );

  return normalizeAdminUsers(response.data, { page, limit });
};

export const normalizeAdminUserSessions = (
  payload: AdminUserSessionsResponseBody
): NormalizedAdminUserSessions => {
  const nested = payload.data && !Array.isArray(payload.data) ? payload.data : undefined;
  const sessions = getArrayByKeys<AdminUserSession>(payload, [
    "sessions",
    "items",
    "results",
    "data",
  ]);
  const total = payload.total ?? nested?.total ?? sessions.length;

  return { sessions, total };
};

export const normalizeAdminAuditLogs = (
  payload: AdminAuditLogsResponseBody,
  fallback: Required<Pick<AdminAuditLogsQuery, "page" | "limit">>
): NormalizedAdminAuditLogs => {
  const nested = payload.data && !Array.isArray(payload.data) ? payload.data : undefined;
  const logs = getArrayByKeys<AdminAuditLog>(payload, [
    "logs",
    "auditLogs",
    "items",
    "results",
    "data",
  ]);
  const total = payload.total ?? nested?.total ?? payload.meta?.total ?? logs.length;
  const page = payload.page ?? nested?.page ?? payload.meta?.page ?? fallback.page;
  const limit = payload.limit ?? nested?.limit ?? payload.meta?.limit ?? fallback.limit;
  const totalPages =
    payload.totalPages ??
    nested?.totalPages ??
    payload.meta?.totalPages ??
    Math.max(1, Math.ceil(total / Math.max(1, limit)));

  return {
    logs,
    total,
    page,
    limit,
    totalPages,
  };
};

export const getAdminUser = async (publicId: string): Promise<AdminUser> => {
  const token = requireAdminToken();
  const response = await apiRequestWithRefresh<AdminUserDetailResponseBody>(
    adminUserEndpoint(publicId),
    "GET",
    undefined,
    token
  );

  const adminUser = normalizeAdminUser(response.data);
  if (!adminUser) {
    throw new ApiRequestError(
      "Admin user response did not include a user.",
      response.status,
      response.data
    );
  }

  return adminUser;
};

export const getAdminUserSessions = async (
  publicId: string
): Promise<NormalizedAdminUserSessions> => {
  const token = requireAdminToken();
  const response = await apiRequestWithRefresh<AdminUserSessionsResponseBody>(
    adminUserEndpoint(publicId, "/sessions"),
    "GET",
    undefined,
    token
  );

  return normalizeAdminUserSessions(response.data);
};

export const getAdminAuditLogs = async (
  params: AdminAuditLogsQuery = {}
): Promise<NormalizedAdminAuditLogs> => {
  const token = requireAdminToken();
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const response = await apiRequestWithRefresh<AdminAuditLogsResponseBody>(
    `/api/admin/audit-logs${toQueryString({ ...params })}`,
    "GET",
    undefined,
    token
  );

  return normalizeAdminAuditLogs(response.data, { page, limit });
};

export const createAdminStaffUser = async (
  payload: CreateAdminStaffRequest
) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminStaffResponseBody>(
    "/api/admin/staff",
    "POST",
    payload,
    token
  );
};

export const updateOwnAdminProfile = async (
  payload: UpdateOwnAdminProfileRequest
) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    "/api/admin/me/profile",
    "PATCH",
    payload,
    token
  );
};

export const sendAdminTestEmail = async (payload: AdminEmailTestRequest) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    "/api/admin/email/test",
    "POST",
    payload,
    token
  );
};

export const getAdminOnboardingProgress = async (
  publicId: string,
  track?: AdminOnboardingTrack
): Promise<AdminOnboardingProgress> => {
  const token = requireAdminToken();
  const response = await apiRequestWithRefresh<AdminOnboardingResponseBody>(
    `/api/admin/onboarding/${encodeURIComponent(publicId)}${toQueryString({
      track,
    })}`,
    "GET",
    undefined,
    token
  );

  return normalizeAdminOnboardingProgress(response.data);
};

export const resetAdminOnboarding = async (
  publicId: string,
  payload: AdminResetOnboardingRequest
) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    `/api/admin/onboarding/${encodeURIComponent(publicId)}/reset`,
    "POST",
    payload,
    token
  );
};

export const updateAdminUserStatus = async (
  publicId: string,
  payload: SetAdminUserStatusRequest
) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    adminUserEndpoint(publicId, "/status"),
    "PATCH",
    payload,
    token
  );
};

export const updateAdminUserRole = async (
  publicId: string,
  payload: SetAdminUserRoleRequest
) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    adminUserEndpoint(publicId, "/role"),
    "PATCH",
    payload,
    token
  );
};

export const verifyAdminUserEmail = async (publicId: string) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    adminUserEndpoint(publicId, "/verify-email"),
    "POST",
    undefined,
    token
  );
};

export const unverifyAdminUserEmail = async (publicId: string) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    adminUserEndpoint(publicId, "/unverify-email"),
    "POST",
    undefined,
    token
  );
};

export const forceAdminUserPasswordReset = async (publicId: string) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    adminUserEndpoint(publicId, "/force-password-reset"),
    "POST",
    undefined,
    token
  );
};

export const revokeAdminUserSessions = async (publicId: string) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    adminUserEndpoint(publicId, "/revoke-sessions"),
    "POST",
    undefined,
    token
  );
};

export const revokeAdminSession = async (sessionId: string) => {
  const token = requireAdminToken();
  return apiRequestWithRefresh<AdminActionResponseBody>(
    adminSessionEndpoint(sessionId, "/revoke"),
    "POST",
    undefined,
    token
  );
};

export const getAdminErrorMessage = (
  error: unknown,
  fallback = "Admin request failed."
): string => {
  const message = error instanceof Error ? error.message : "";

  if (message.toLowerCase().includes("unauthorized")) {
    return "Your admin session could not be verified. Please log out, sign in with an admin account, and try again.";
  }

  if (message.toLowerCase().includes("forbidden")) {
    return "Your account is signed in, but it is not allowed to perform this admin action.";
  }

  return message || fallback;
};
