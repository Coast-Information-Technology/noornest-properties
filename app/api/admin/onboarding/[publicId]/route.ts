import { NextResponse } from "next/server";
import { ApiProxyError, proxyRequestJson } from "@/lib/apiProxy";
import type { AdminOnboardingResponseBody } from "@/types/admin";

type AdminOnboardingRouteContext = {
  params: Promise<{ publicId?: string }>;
};

export async function GET(
  request: Request,
  context: AdminOnboardingRouteContext
) {
  const { publicId } = await context.params;

  if (!publicId) {
    return NextResponse.json({ message: "Missing publicId" }, { status: 400 });
  }

  try {
    const { search } = new URL(request.url);
    const { status, payload } = await proxyRequestJson<AdminOnboardingResponseBody>({
      method: "GET",
      upstreamPath: `/admin/onboarding/${encodeURIComponent(publicId)}${search}`,
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
            : "Upstream admin onboarding request failed.",
      },
      { status: 502 }
    );
  }
}
