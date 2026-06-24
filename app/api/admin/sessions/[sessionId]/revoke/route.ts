import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";
import type { AdminActionResponseBody } from "@/types/admin";

type AdminSessionRouteContext = {
  params: Promise<{ sessionId?: string }>;
};

export async function POST(
  request: Request,
  context: AdminSessionRouteContext
) {
  const { sessionId } = await context.params;

  if (!sessionId) {
    return NextResponse.json({ message: "Missing sessionId" }, { status: 400 });
  }

  try {
    const { status, payload } = await proxyRequestJson<AdminActionResponseBody>({
      method: "POST",
      upstreamPath: `/admin/sessions/${encodeURIComponent(sessionId)}/revoke`,
      incomingRequest: request,
    });

    return NextResponse.json(payload, { status });
  } catch (error: unknown) {
    if (error instanceof ApiProxyError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Upstream admin session revoke request failed.",
      },
      { status: 502 }
    );
  }
}
