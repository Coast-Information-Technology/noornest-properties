import {
  getTokenFromCookies,
  saveTokenToCookies,
  getCookie,
  setCookie,
  deleteTokenFromCookies,
  deleteRefreshTokenFromCookies,
} from "@/lib/cookies";

import { safeConsole } from "@/lib/console";
import { getDeviceInfo } from "@/utils/getDeviceInfo";
/**
 * Base URL for API requests. For Next.js API routes, we use relative URLs
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Empty string for relative URLs to Next.js API routes

/**
 * Generic API response type
 */
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

/**
 * API error type
 */
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  detail?: string;
}

/**
 * User registration data type
 */
export interface UserRegistrationData {
  fullName?: string;
  email: string;
  password: string;
  role: string;
}

/**
 * User update data type
 */
export interface UserUpdateData {
  email?: string;
  password?: string;
  role?: string;
  // Add other fields as needed
}

/**
 * Login user
 */
export interface UserLoginData {
  email: string;
  password: string;
}

/**
 * Helper to create headers for API requests
 */
const createHeaders = (
  token?: string,
  extraHeaders: Record<string, string> = {}
): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...extraHeaders,
  };
  return headers;
};

/**
 * Generic API request function
 */
export const apiRequest = async <T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: Record<string, any>,
  token?: string,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  const requestHeaders = createHeaders(token, headers);
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    body: method !== "GET" && body ? JSON.stringify(body) : undefined,
  };
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const responseText = await response.text();
    const data = isJson && responseText ? JSON.parse(responseText) : {};

    if (!response.ok) {
      // Throw the entire backend error object if available
      throw data;
    }

    return { data, status: response.status, message: data.message };
  } catch (error: any) {
    // If error is already an object from backend, just throw it
    if (error && typeof error === "object") {
      throw error;
    }
    // Otherwise, throw a generic error
    throw {
      message: error.message || "Network error occurred",
      status: error.status || 0,
    };
  }
};

// Convenience helpers
export const getApiRequest = async <T = any>(
  endpoint: string,
  token?: string,
  params?: Record<string, string | number | boolean>
): Promise<ApiResponse<T>> => {
  let url = endpoint;
  if (params) {
    const search = new URLSearchParams(params as any).toString();
    url += (endpoint.includes("?") ? "&" : "?") + search;
  }
  return apiRequest<T>(url, "GET", undefined, token);
};

export const postApiRequest = async <T = any>(
  endpoint: string,
  bodyOrToken: Record<string, any> | string,
  headersOrBody?: Record<string, any> | Record<string, string>
): Promise<ApiResponse<T>> => {
  // Check if the second parameter is a token string
  if (typeof bodyOrToken === "string") {
    // Pattern: postApiRequest(endpoint, token, body)
    const token = bodyOrToken;
    const body = (headersOrBody as Record<string, any>) || {};
    return apiRequest<T>(endpoint, "POST", body, token);
  } else {
    // Pattern: postApiRequest(endpoint, body, headers)
    const body = bodyOrToken;
    const headers = (headersOrBody as Record<string, string>) || {};
    return apiRequest<T>(endpoint, "POST", body, undefined, headers);
  }
};

export const updateApiRequest = async <T = any>(
  endpoint: string,
  token: string,
  data: any
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, "PUT", data, token);
};

export const deleteApiRequest = async <T = any>(
  endpoint: string,
  token: string
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, "DELETE", undefined, token);
};

export const putApiRequest = async <T = any>(
  endpoint: string,
  data: any,
  token: string
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, "PUT", data, token);
};

export const patchApiRequest = async <T = any>(
  endpoint: string,
  token: string,
  data: any
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, "PATCH", data, token);
};

