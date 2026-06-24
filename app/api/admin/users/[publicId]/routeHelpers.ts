import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";

export type AdminUserRouteContext = {
  params: Promise<{ publicId?: string }>;
};

type ProxyAdminUserRequestOptions = {
  request: Request;
  context: AdminUserRouteContext;
  method: "GET" | "POST" | "PATCH";
  suffix?: string;
  body?: unknown;
  fallbackMessage: string;
};

export async function proxyAdminUserRequest<T>({
  request,
  context,
  method,
  suffix = "",
  body,
  fallbackMessage,
}: ProxyAdminUserRequestOptions) {
  const { publicId } = await context.params;

  if (!publicId) {
    return NextResponse.json({ message: "Missing publicId" }, { status: 400 });
  }

  try {
    const { status, payload } = await proxyRequestJson<T>({
      method,
      upstreamPath: `/admin/users/${encodeURIComponent(publicId)}${suffix}`,
      incomingRequest: request,
      body,
    });

    return NextResponse.json(payload, { status });
  } catch (error: unknown) {
    if (error instanceof ApiProxyError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : fallbackMessage,
      },
      { status: 502 }
    );
  }
}
