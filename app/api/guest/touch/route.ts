import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";
import type { TouchGuestResponseBody } from "@/types/guest";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const { status, payload } = await proxyRequestJson<TouchGuestResponseBody>({
      method: "POST",
      upstreamPath: "/guest/touch",
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
            : "Upstream guest touch request failed.",
      },
      { status: 502 }
    );
  }
}
