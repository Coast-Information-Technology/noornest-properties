/* ===================================================================================
=============================USER AUTHENTICATION====================================== 
====================================================================================== */

import { getDeviceInfo } from "@/utils/getDeviceInfo";
import { apiRequest, ApiResponse, getApiRequest, postApiRequest, updateApiRequest, UserLoginData, UserRegistrationData, UserUpdateData } from "../apiFetch";
import { deleteRefreshTokenFromCookies, deleteTokenFromCookies, getCookie, saveTokenToCookies, setCookie } from "../cookies";
import safeConsole from "../console";

/**
 * Register a new user
 */
export const registerUser = async (
  formData: UserRegistrationData
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/register", formData);
};

/**
 * Verify email with token
 */
export const verifyEmail = async (token: string): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/verify-email", { token });
};

/**
 * Login user
 */
export const loginUser = async (
  formData: UserLoginData
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/login", formData);
};

/**
 * Update user profile
 */
export const updateUser = async (
  userId: string,
  formData: UserUpdateData,
  token: string
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
  searchQuery = ""
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
  email: string
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/forgot-password", { email });
};

/**
 * Reset password with new password
 */
export const resetPassword = async (
  password: string
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/reset-password", { password });
};

/**
 * Get single user-me
 */
export const getUserMe = async (token: string): Promise<ApiResponse<any>> => {
  return getApiRequest("/api/users/me", token);
};

/**
 * Logout user (with metadata)
 */
export const logoutUser = async (): Promise<ApiResponse<any>> => {
  // Use the correct cookie keys that match how tokens are saved
  const accessToken = getCookie("token");
  const refreshToken = getCookie("refreshToken");

  const requestBody = {
    reason: "user_initiated",
    deviceInfo: getDeviceInfo(),
    location: "New York, NY, USA", // Replace with real location if you implement IP-based lookup
    accessToken,
    refreshToken,
  };

  try {
    if (!accessToken) {
      throw new Error("No access token found for logout");
    }

    const response = await postApiRequest(
      "/api/auth/logout",
      accessToken,
      requestBody
    );
    return response;
  } catch (error) {
    safeConsole.error("Logout API error:", error);
    // Don't re-throw the error, just return a failed response
    return {
      data: { success: false, message: "Logout failed" },
      status: 500,
      message: error instanceof Error ? error.message : "Unknown logout error",
    };
  } finally {
    // Always clear cookies on logout attempt
    deleteTokenFromCookies();
    deleteRefreshTokenFromCookies();
  }
};

/**
 * Change user password
 */
export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/users/change-password", {
    oldPassword,
    newPassword,
  });
};

/**
 * Update onboardingStatus
 */
export const updateOnboardingStatus = async (
  userId: string,
  status: string,
  token: string
) => {
  const response = await apiRequest(
    `/api/onboarding/${userId}/status`,
    "PATCH",
    { status: "completed" },
    token || ""
  );
  return response.data;
};

/**
 * Resend verification email
 */
export const resendVerificationEmail = async (
  email: string
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/resend-verification", { email });
};

/**
 * Check if JWT token is valid (for silent re-auth)
 */
export const checkTokenValidity = async (
  token: string
): Promise<ApiResponse<any>> => {
  return getApiRequest("/api/auth/check-token", token);
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<ApiResponse<any>> => {
  return postApiRequest("/api/auth/refresh-token", { refreshToken });
};

/**
 * Enhanced API request with automatic token refresh
 */
export const apiRequestWithRefresh = async <T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: any,
  token?: string,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  try {
    // First attempt with current token
    const response = await apiRequest<T>(
      endpoint,
      method,
      body,
      token,
      headers
    );
    return response;
  } catch (error: any) {
    // If token is expired (401), try to refresh
    if (error.status === 401 && token) {
      try {
        const refreshToken = getCookie("refreshToken");
        if (refreshToken) {
          const refreshResponse = await refreshAccessToken(refreshToken);

          if (refreshResponse.data && refreshResponse.data.data) {
            const newAccessToken = refreshResponse.data.data.access_token;
            const newRefreshToken = refreshResponse.data.data.refresh_token;

            // Save new tokens
            saveTokenToCookies(newAccessToken);
            if (newRefreshToken) {
              setCookie("refreshToken", newRefreshToken, {
                maxAge: 7 * 24 * 60 * 60, // 7 days
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
              });
            }

            // Retry the original request with new token
            return await apiRequest<T>(
              endpoint,
              method,
              body,
              newAccessToken,
              headers
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
  token?: string
): Promise<ApiResponse<T>> => {
  return apiRequestWithRefresh<T>(endpoint, "GET", undefined, token);
};

/**
 * Enhanced POST request with automatic token refresh
 */
export const postApiRequestWithRefresh = async <T = any>(
  endpoint: string,
  body: any,
  token?: string
): Promise<ApiResponse<T>> => {
  return apiRequestWithRefresh<T>(endpoint, "POST", body, token);
};

/**
 * Get user's current active role
 */
export const getActiveRole = async (
  token?: string
): Promise<ApiResponse<any>> => {
  const response = await getApiRequestWithRefresh(
    "/api/users/active-role",
    token
  );
  return response;
};

/**
 * Switch user role between individual and team tech professional
 */
export const switchUserRole = async (
  token?: string
): Promise<ApiResponse<any>> => {
  const response = await postApiRequestWithRefresh(
    "/api/users/switch-role",
    {},
    token
  );
  return response;
};
