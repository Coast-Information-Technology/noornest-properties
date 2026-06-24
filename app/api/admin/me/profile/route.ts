import { proxyAdminJsonRequest } from "../../routeHelpers";
import type { AdminActionResponseBody } from "@/types/admin";

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));

  return proxyAdminJsonRequest<AdminActionResponseBody>({
    request,
    method: "PATCH",
    upstreamPath: "/admin/me/profile",
    body,
    fallbackMessage: "Upstream admin profile request failed.",
  });
}
