import type { AdminActionResponseBody } from "@/types/admin";
import {
  type AdminUserRouteContext,
  proxyAdminUserRequest,
} from "../routeHelpers";

export async function POST(request: Request, context: AdminUserRouteContext) {
  return proxyAdminUserRequest<AdminActionResponseBody>({
    request,
    context,
    method: "POST",
    suffix: "/force-password-reset",
    fallbackMessage: "Upstream admin user force password reset request failed.",
  });
}
