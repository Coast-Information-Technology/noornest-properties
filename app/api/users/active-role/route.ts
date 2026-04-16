import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";

export async function GET(request: Request) {
  try {
    const { status, payload } = await proxyRequestJson({
      method: "GET",
      upstreamPath: "/users/active-role",
      incomingRequest: request,
    });

    return NextResponse.json(payload, { status });
  } catch (error: any) {
    if (error instanceof ApiProxyError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { message: error?.message || "Upstream active-role request failed." },
      { status: 502 }
    );
  }
}

