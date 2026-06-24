import type { AdminActionResponseBody } from "@/types/admin";
import {
  type AdminUserRouteContext,
  proxyAdminUserRequest,
} from "../routeHelpers";

export async function PATCH(request: Request, context: AdminUserRouteContext) {
  const body = await request.json().catch(() => ({}));

  return proxyAdminUserRequest<AdminActionResponseBody>({
    request,
    context,
    method: "PATCH",
    suffix: "/role",
    body,
    fallbackMessage: "Upstream admin user role request failed.",
  });
}
