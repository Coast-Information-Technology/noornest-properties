/* ===================================================================================
=============================USER AUTHENTICATION======================================
====================================================================================== */

import { getDeviceInfo } from "@/utils/getDeviceInfo";
import {
  apiRequest,
  ApiRequestError,
  ApiResponse,
  getApiRequest,
  postApiRequest,
  updateApiRequest,
  UserLoginData,
  UserRegistrationData,
  UserUpdateData,
} from "../apiFetch";
import {
  deleteRefreshTokenFromCookies,
  deleteSessionIdFromCookies,
  deleteTokenFromCookies,
  getRefreshTokenFromCookies,
  getSessionIdFromCookies,
  getTokenFromCookies,
  saveRefreshTokenToCookies,
  saveSessionIdToCookies,
  saveTokenToCookies,
} from "../cookies";
import safeConsole from "../console";
import {
  CurrentUserResponseBody,
  LoginResponseBody,
  LogoutResponseBody,
  RefreshTokenResponseBody,
  RegisterResponseBody,
  VerifyEmailResponseBody,
} from "@/types/auth";

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponseBody {
  success?: boolean;
  message?: string;
}

/**
 * Register a new user
 */
export const registerUser = async (
  formData: UserRegistrationData,
): Promise<ApiResponse<RegisterResponseBody>> => {
  return postApiRequest<RegisterResponseBody>("/api/auth/register", formData);
};

/**
 * Verify email with userPublicId and token
 */
export const verifyEmail = async (
  userPublicId: string,
  token: string,
): Promise<ApiResponse<VerifyEmailResponseBody>> => {
  return postApiRequest<VerifyEmailResponseBody>("/api/auth/verify-email", {
    userPublicId,
    token,
  });
};

/**
 * Login user
 */
export const loginUser = async (
  formData: UserLoginData,
): Promise<ApiResponse<LoginResponseBody>> => {
  return postApiRequest<LoginResponseBody>("/api/auth/login", {
    ...formData,
    deviceName: getDeviceInfo(),
  });
};

/**
 * Update user profile
 */
export const updateUser = async (
  userId: string,
  formData: UserUpdateData,
  token: string,
): Promise<ApiResponse<any>> => {
  return updateApiRequest(`/api/users/${userId}/`, token, formData);
};

/**
 * Get paginated data with search support
 */
export const getAllApiRequestWithPagination = async <T = any>(
  endpoint: string,
  pageSize: number,
  pageNo: number,
  token?: string,
  searchQuery = "",
): Promise<ApiResponse<T>> => {
  const params = new URLSearchParams({
    page_size: String(pageSize),
    page: String(pageNo),
  });
  if (searchQuery) params.append("q", searchQuery);
  const paginatedEndpoint = `${endpoint}?${params.toString()}`;
  return apiRequest<T>(paginatedEndpoint, "GET", undefined, token);
};

/**
 * Forgot password - send reset email
 */
export const forgotPassword = async (
  email: string,
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/forgot-password", { email });
};

/**
 * Reset password with new password
 */
export const resetPassword = async (
  password: string,
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/reset-password", { password });
};

/**
 * Get single user-me
 */
export const getUserMe = async (
  token: string,
): Promise<ApiResponse<CurrentUserResponseBody>> => {
  return apiRequestWithRefresh<CurrentUserResponseBody>(
    "/api/users/me",
    "GET",
    undefined,
    token,
  );
};

/**
 * Logout user (with metadata)
 */
export const logoutUser = async (): Promise<
  ApiResponse<LogoutResponseBody>
> => {
  const accessToken = getTokenFromCookies();
  const refreshToken = getRefreshTokenFromCookies();
  const sessionId = getSessionIdFromCookies() ?? undefined;

  const requestBody = {
    reason: "user_initiated",
    deviceInfo: getDeviceInfo(),
    ...(refreshToken ? { refreshToken } : {}),
    ...(sessionId ? { sessionId } : {}),
  };

  try {
    const response = accessToken
      ? await postApiRequest<LogoutResponseBody>(
          "/api/auth/logout",
          accessToken,
          requestBody,
        )
      : await postApiRequest<LogoutResponseBody>(
          "/api/auth/logout",
          requestBody,
        );
    return response;
  } catch (error: unknown) {
    safeConsole.error("Logout API error:", error);
    return {
      success: false,
      data: { success: false, message: "Logout failed" },
      status: 500,
      message: error instanceof Error ? error.message : "Unknown logout error",
    };
  } finally {
    // Always clear client-side state as a fallback, even if backend logout fails.
    deleteTokenFromCookies();
    deleteRefreshTokenFromCookies();
    deleteSessionIdFromCookies();
  }
};

/**
 * Change user password
 */
export const changePassword = async (
  payload: ChangePasswordRequest,
): Promise<ApiResponse<ChangePasswordResponseBody>> => {
  const token = getTokenFromCookies();
  if (!token) {
    throw new ApiRequestError(
      "You need to be logged in to change your password.",
      401,
    );
  }

  return postApiRequestWithRefresh<ChangePasswordResponseBody>(
    "/api/auth/change-password",
    payload,
    token,
  );
};

/**
 * Update onboardingStatus
 */
export const updateOnboardingStatus = async (
  userId: string,
  status: string,
  token: string,
) => {
  const response = await apiRequest(
    `/api/onboarding/${userId}/status`,
    "PATCH",
    { status: "completed" },
    token || "",
  );
  return response.data;
};

/**
 * Resend verification email
 */
export const resendVerificationEmail = async (
  email: string,
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/resend-verification", { email });
};

/**
 * Check if JWT token is valid (for silent re-auth)
 */
export const checkTokenValidity = async (
  token: string,
): Promise<ApiResponse<any>> => {
  return getApiRequest("/api/auth/check-token", token);
};

/**
 * Refresh access token using refresh token and session ID
 */
export const refreshAccessToken = async (
  refreshToken: string,
  sessionId?: string,
): Promise<ApiResponse<RefreshTokenResponseBody>> => {
  const payload: { refreshToken: string; sessionId?: string } = {
    refreshToken,
  };
  if (sessionId) {
    payload.sessionId = sessionId;
  }

  return postApiRequest<RefreshTokenResponseBody>("/api/auth/refresh", payload);
};

/**
 * Enhanced API request with automatic token refresh
 */
export const apiRequestWithRefresh = async <T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: any,
  token?: string,
  headers: Record<string, string> = {},
): Promise<ApiResponse<T>> => {
  try {
    // First attempt with current token
    const response = await apiRequest<T>(
      endpoint,
      method,
      body,
      token,
      headers,
    );
    return response;
  } catch (error: unknown) {
    // If token is expired (401), try to refresh
    if (error instanceof ApiRequestError && error.status === 401 && token) {
      try {
        const refreshToken = getRefreshTokenFromCookies();
        const sessionId = getSessionIdFromCookies() ?? undefined;
        if (refreshToken) {
          const refreshResponse = await refreshAccessToken(
            refreshToken,
            sessionId,
          );

          if (refreshResponse.data && refreshResponse.data.data) {
            const newAccessToken = refreshResponse.data.data.access_token;
            const newRefreshToken = refreshResponse.data.data.refresh_token;
            const newSessionId =
              refreshResponse.data.data.sessionId ||
              refreshResponse.data.data.session_id;

            // Save new tokens and session ID
            if (newAccessToken) {
              saveTokenToCookies(newAccessToken);
            }
            if (newRefreshToken) {
              saveRefreshTokenToCookies(newRefreshToken);
            }
            if (newSessionId) {
              saveSessionIdToCookies(newSessionId);
            }

            // Retry the original request with new token
            return await apiRequest<T>(
              endpoint,
              method,
              body,
              newAccessToken,
              headers,
            );
          }
        }
      } catch (refreshError) {
        safeConsole.error("Token refresh failed:", refreshError);
        // If refresh fails, clear tokens and throw original error
        throw error;
      }
    }

    // Re-throw the original error if not 401 or refresh failed
    throw error;
  }
};

/**
 * Enhanced GET request with automatic token refresh
 */
export const getApiRequestWithRefresh = async <T = any>(
  endpoint: string,
  token?: string,
): Promise<ApiResponse<T>> => {
  return apiRequestWithRefresh<T>(endpoint, "GET", undefined, token);
};

/**
 * Enhanced POST request with automatic token refresh
 */
export const postApiRequestWithRefresh = async <T = any>(
  endpoint: string,
  body: any,
  token?: string,
): Promise<ApiResponse<T>> => {
  return apiRequestWithRefresh<T>(endpoint, "POST", body, token);
};

/**
 * Get user's current active role
 */
export const getActiveRole = async (
  token?: string,
): Promise<ApiResponse<any>> => {
  const response = await getApiRequestWithRefresh(
    "/api/users/active-role",
    token,
  );
  return response;
};

/**
 * Switch user role between individual and team tech professional
 */
export const switchUserRole = async (
  token?: string,
): Promise<ApiResponse<any>> => {
  const response = await postApiRequestWithRefresh(
    "/api/users/switch-role",
    {},
    token,
  );
  return response;
};
