import { proxyAdminJsonRequest } from "../routeHelpers";
import type { AdminStaffResponseBody } from "@/types/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return proxyAdminJsonRequest<AdminStaffResponseBody>({
    request,
    method: "POST",
    upstreamPath: "/admin/staff",
    body,
    fallbackMessage: "Upstream admin staff request failed.",
  });
}
