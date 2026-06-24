import { getBackendBaseUrl } from "@/lib/config/backendBaseUrl";

/**
 * Generic API response type
 */
export type ApiResponseErrors = string[] | Record<string, string[]>;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  status: number;
  message?: string;
  errors?: ApiResponseErrors;
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

export class ApiRequestError extends Error implements ApiError {
  status: number;
  errors?: Record<string, string[]>;
  detail?: string;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.payload = payload;

    if (isRecord(payload)) {
      if (isRecordOfStringArrays(payload.errors)) {
        this.errors = payload.errors;
      }
      if (typeof payload.detail === "string") {
        this.detail = payload.detail;
      }
    }
  }
}

/**
 * User registration data type
 */
export interface UserRegistrationData {
  email: string;
  role: string;
  password: string;
  firstName: string;
  lastName: string;
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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isRecordOfStringArrays = (
  value: unknown
): value is Record<string, string[]> => {
  if (!isRecord(value)) return false;
  return Object.values(value).every(
    (item) =>
      Array.isArray(item) &&
      item.every((entry) => typeof entry === "string")
  );
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get("content-type") || "";
  const responseText = await response.text();

  if (!responseText) return {};
  if (!contentType.includes("application/json")) {
    return { message: responseText };
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return { message: responseText };
  }
};

const getPayloadMessage = (payload: unknown): string | undefined => {
  if (!isRecord(payload)) return undefined;
  if (typeof payload.message === "string") return payload.message;
  if (typeof payload.detail === "string") return payload.detail;
  if (typeof payload.error === "string") return payload.error;
  return undefined;
};

const getPayloadErrors = (payload: unknown): ApiResponseErrors | undefined => {
  if (!isRecord(payload)) return undefined;
  if (Array.isArray(payload.errors)) {
    return payload.errors.filter((entry): entry is string => typeof entry === "string");
  }
  if (isRecordOfStringArrays(payload.errors)) return payload.errors;
  return undefined;
};

const toQueryString = (
  params: Record<string, string | number | boolean>
): string => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    search.append(key, String(value));
  });
  return search.toString();
};

/**
 * Generic API request function
 */
export const apiRequest = async <T = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: unknown,
  token?: string,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  const requestHeaders = createHeaders(token, headers);
  let requestUrl = endpoint;
  if (!endpoint.startsWith("/api/")) {
    // Resolve env on-demand (avoid module-load-time `""`/`undefined` baking).
    const baseUrl = getBackendBaseUrl();
    requestUrl = `${baseUrl}${endpoint}`;
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    body: method !== "GET" && body ? JSON.stringify(body) : undefined,
  };
  try {
    const response = await fetch(requestUrl, requestOptions);
    const data = await parseResponseBody(response);

    if (!response.ok) {
      // Ensure callers (like refresh-token retry logic) can reliably inspect
      // HTTP status from the thrown error.
      throw new ApiRequestError(
        getPayloadMessage(data) || "Request failed",
        response.status,
        data
      );
    }

    return {
      success:
        isRecord(data) && typeof data.success === "boolean"
          ? data.success
          : response.ok,
      data: data as T,
      status: response.status,
      message: getPayloadMessage(data),
      errors: getPayloadErrors(data),
    };
  } catch (error: unknown) {
    if (error instanceof ApiRequestError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new ApiRequestError(error.message, 0);
    }
    throw new ApiRequestError("Network error occurred", 0, error);
  }
};

// Convenience helpers
export const getApiRequest = async <T = unknown>(
  endpoint: string,
  token?: string,
  params?: Record<string, string | number | boolean>
): Promise<ApiResponse<T>> => {
  let url = endpoint;
  if (params) {
    const search = toQueryString(params);
    url += (endpoint.includes("?") ? "&" : "?") + search;
  }
  return apiRequest<T>(url, "GET", undefined, token);
};

export const postApiRequest = async <T = unknown>(
  endpoint: string,
  bodyOrToken: unknown | string,
  headersOrBody?: unknown | Record<string, string>
): Promise<ApiResponse<T>> => {
  // Check if the second parameter is a token string
  if (typeof bodyOrToken === "string") {
    // Pattern: postApiRequest(endpoint, token, body)
    const token = bodyOrToken;
    const body = headersOrBody || {};
    return apiRequest<T>(endpoint, "POST", body, token);
  } else {
    // Pattern: postApiRequest(endpoint, body, headers)
    const body = bodyOrToken;
    const headers = (headersOrBody as Record<string, string>) || {};
    return apiRequest<T>(endpoint, "POST", body, undefined, headers);
  }
};

export const updateApiRequest = async <T = unknown>(
  endpoint: string,
  token: string,
  data: unknown
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, "PUT", data, token);
};

export const deleteApiRequest = async <T = unknown>(
  endpoint: string,
  token: string
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, "DELETE", undefined, token);
};

export const putApiRequest = async <T = unknown>(
  endpoint: string,
  data: unknown,
  token: string
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, "PUT", data, token);
};

export const patchApiRequest = async <T = unknown>(
  endpoint: string,
  token: string,
  data: unknown
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, "PATCH", data, token);
};

