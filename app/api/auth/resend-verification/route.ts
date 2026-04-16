import { NextResponse } from "next/server";
import { getBackendBaseUrl } from "@/lib/config/backendBaseUrl";

export async function POST(request: Request) {
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
    const body = await request.json();
    const upstreamResponse = await fetch(
      `${backendBaseUrl}/auth/resend-verification`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const contentType = upstreamResponse.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await upstreamResponse.json()
      : { message: await upstreamResponse.text() };

    return NextResponse.json(payload, { status: upstreamResponse.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Upstream resend request failed." },
      { status: 502 }
    );
  }
}
