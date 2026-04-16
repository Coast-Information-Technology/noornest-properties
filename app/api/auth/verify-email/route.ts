import { NextResponse } from "next/server";

const BACKEND_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "";

export async function POST(request: Request) {
  if (!BACKEND_BASE_URL) {
    return NextResponse.json(
      { message: "Missing API base URL configuration." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const upstreamResponse = await fetch(`${BACKEND_BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const contentType = upstreamResponse.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await upstreamResponse.json()
      : { message: await upstreamResponse.text() };

    return NextResponse.json(payload, { status: upstreamResponse.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Upstream verification request failed." },
      { status: 502 }
    );
  }
}
