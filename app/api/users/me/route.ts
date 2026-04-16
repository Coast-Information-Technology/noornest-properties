import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/config/backendBaseUrl";

export async function GET(request: Request) {
  let backendBaseUrl: string;
  try {
    backendBaseUrl = getBackendBaseUrl();
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Missing API base URL configuration." },
      { status: 500 }
    );
  }

  try {
    const authorization = request.headers.get("authorization") || "";
    const upstreamResponse = await fetch(`${backendBaseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...(authorization ? { Authorization: authorization } : {}),
      },
      cache: "no-store",
    });

    const contentType = upstreamResponse.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await upstreamResponse.json()
      : { message: await upstreamResponse.text() };

    return NextResponse.json(payload, { status: upstreamResponse.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Upstream user profile request failed." },
      { status: 502 }
    );
  }
}
