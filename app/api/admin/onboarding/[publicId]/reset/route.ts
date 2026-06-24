import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";
import type { AdminActionResponseBody } from "@/types/admin";

type AdminOnboardingRouteContext = {
  params: Promise<{ publicId?: string }>;
};

export async function POST(
  request: Request,
  context: AdminOnboardingRouteContext
) {
  const { publicId } = await context.params;

  if (!publicId) {
    return NextResponse.json({ message: "Missing publicId" }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));

  try {
    const { status, payload } = await proxyRequestJson<AdminActionResponseBody>({
      method: "POST",
      upstreamPath: `/admin/onboarding/${encodeURIComponent(publicId)}/reset`,
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
            : "Upstream admin onboarding reset request failed.",
      },
      { status: 502 }
    );
  }
}
