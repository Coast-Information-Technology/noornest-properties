import type { AdminUserSessionsResponseBody } from "@/types/admin";
import {
  type AdminUserRouteContext,
  proxyAdminUserRequest,
} from "../routeHelpers";

export async function GET(request: Request, context: AdminUserRouteContext) {
  return proxyAdminUserRequest<AdminUserSessionsResponseBody>({
    request,
    context,
    method: "GET",
    suffix: "/sessions",
    fallbackMessage: "Upstream admin user sessions request failed.",
  });
}
