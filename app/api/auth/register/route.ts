import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const { status, payload } = await proxyRequestJson({
      method: "POST",
      upstreamPath: "/auth/register",
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
        message:
          error instanceof Error
            ? error.message
            : "Upstream registration request failed.",
      },
      { status: 502 }
    );
  }
}
