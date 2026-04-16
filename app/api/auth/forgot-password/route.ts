import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const { status, payload } = await proxyRequestJson({
      method: "POST",
      upstreamPath: "/auth/forgot-password",
      incomingRequest: request,
      body,
    });

    return NextResponse.json(payload, { status });
  } catch (error: any) {
    if (error instanceof ApiProxyError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { message: error?.message || "Upstream forgot-password request failed." },
      { status: 502 }
    );
  }
}

