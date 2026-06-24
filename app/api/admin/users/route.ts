import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";
import type { AdminUsersResponseBody } from "@/types/admin";

export async function GET(request: Request) {
  try {
    const { search } = new URL(request.url);

    const { status, payload } = await proxyRequestJson<AdminUsersResponseBody>({
      method: "GET",
      upstreamPath: `/admin/users${search}`,
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
            : "Upstream admin users request failed.",
      },
      { status: 502 }
    );
  }
}
