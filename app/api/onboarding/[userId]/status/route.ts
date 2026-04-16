import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  if (!userId) {
    return NextResponse.json({ message: "Missing userPublicId/userId" }, { status: 400 });
  }

  try {
    const body = await request.json().catch(() => ({}));

    const { status, payload } = await proxyRequestJson({
      method: "PATCH",
      upstreamPath: `/onboarding/${encodeURIComponent(userId)}/status`,
      incomingRequest: request,
      body,
    });

    return NextResponse.json(payload, { status });
  } catch (error: any) {
    if (error instanceof ApiProxyError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { message: error?.message || "Upstream onboarding status update failed." },
      { status: 502 }
    );
  }
}

