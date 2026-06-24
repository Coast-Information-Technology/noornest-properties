import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";
import type { AdminAuditLogsResponseBody } from "@/types/admin";

export async function GET(request: Request) {
  try {
    const { search } = new URL(request.url);

    const { status, payload } = await proxyRequestJson<AdminAuditLogsResponseBody>({
      method: "GET",
      upstreamPath: `/admin/audit-logs${search}`,
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
            : "Upstream admin audit logs request failed.",
      },
      { status: 502 }
    );
  }
}
