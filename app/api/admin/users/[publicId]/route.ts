import type { AdminUserDetailResponseBody } from "@/types/admin";
import {
  type AdminUserRouteContext,
  proxyAdminUserRequest,
} from "./routeHelpers";

export async function GET(request: Request, context: AdminUserRouteContext) {
  return proxyAdminUserRequest<AdminUserDetailResponseBody>({
    request,
    context,
    method: "GET",
    fallbackMessage: "Upstream admin user request failed.",
  });
}
