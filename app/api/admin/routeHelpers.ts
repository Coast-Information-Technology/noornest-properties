import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";

export async function proxyAdminGetRequest<T>({
  request,
  upstreamPath,
  fallbackMessage,
}: {
  request: Request;
  upstreamPath: string;
  fallbackMessage: string;
}) {
  try {
    const { search } = new URL(request.url);

    const { status, payload } = await proxyRequestJson<T>({
      method: "GET",
      upstreamPath: `${upstreamPath}${search}`,
      incomingRequest: request,
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

export async function proxyAdminJsonRequest<T>({
  request,
  method,
  upstreamPath,
  body,
  fallbackMessage,
}: {
  request: Request;
  method: "POST" | "PATCH";
  upstreamPath: string;
  body?: unknown;
  fallbackMessage: string;
}) {
  try {
    const { status, payload } = await proxyRequestJson<T>({
      method,
      upstreamPath,
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
