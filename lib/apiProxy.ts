import { getBackendBaseUrl } from "@/lib/config/backendBaseUrl";

export class ApiProxyError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type ProxyOptions = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  upstreamPath: string; // e.g. "/auth/logout"
  incomingRequest: Request;
  body?: unknown; // JSON-serializable
  extraHeaders?: Record<string, string>;
};

async function parseResponseBody(upstreamResponse: Response): Promise<any> {
  const contentType = upstreamResponse.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return upstreamResponse.json();
  const text = await upstreamResponse.text();
  // Keep payload shape consistent with existing proxy routes (message-only for non-JSON).
  return { message: text };
}

/**
 * Proxies the request to the configured backend base URL and returns backend payload.
 *
 * This centralizes:
 * - base URL resolution/validation via `getBackendBaseUrl()`
 * - JSON vs non-JSON payload parsing
 * - consistent error handling
 */
export async function proxyRequestJson<T = any>({
  method,
  upstreamPath,
  incomingRequest,
  body,
  extraHeaders = {},
}: ProxyOptions): Promise<{ status: number; payload: T }> {
  let backendBaseUrl: string;
  try {
    backendBaseUrl = getBackendBaseUrl();
  } catch (error: any) {
    throw new ApiProxyError(error?.message || "Missing API base URL configuration.", 500);
  }

  const authorization = incomingRequest.headers.get("authorization") || "";

  try {
    const upstreamResponse = await fetch(`${backendBaseUrl}${upstreamPath}`, {
      method,
      headers: {
        ...(authorization ? { Authorization: authorization } : {}),
        "Content-Type": "application/json",
        ...extraHeaders,
      },
      body:
        method !== "GET" && body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const payload = (await parseResponseBody(upstreamResponse)) as T;
    return { status: upstreamResponse.status, payload };
  } catch (error: any) {
    throw new ApiProxyError(
      error?.message || "Upstream request failed.",
      502
    );
  }
}

