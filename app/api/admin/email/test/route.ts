import { proxyAdminJsonRequest } from "../../routeHelpers";
import type { AdminActionResponseBody } from "@/types/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return proxyAdminJsonRequest<AdminActionResponseBody>({
    request,
    method: "POST",
    upstreamPath: "/admin/email/test",
    body,
    fallbackMessage: "Upstream admin email test request failed.",
  });
}
