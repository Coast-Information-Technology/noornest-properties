import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";

export async function GET(request: Request) {
  try {
    const { status, payload } = await proxyRequestJson({
      method: "GET",
      upstreamPath: "/users/me",
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
            : "Upstream user profile request failed.",
      },
      { status: 502 }
    );
  }
}
