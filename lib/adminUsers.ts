import type {
  AdminAuditLog,
  AdminUser,
  AdminUserSession,
  SetAdminUserStatusRequest,
} from "@/types/admin";

export type AdminUserStatusChoice = "active" | "inactive" | "suspended";

export const getAdminUserPublicId = (user: AdminUser): string =>
  user.publicId || user.userPublicId || user.id || "";

export const getAdminUserDisplayId = (user: AdminUser): string =>
  getAdminUserPublicId(user) || user.email || "unknown";

export const getAdminUserName = (user: AdminUser): string => {
  const firstName = user.firstName || user.first_name || "";
  const lastName = user.lastName || user.last_name || "";
  return user.name || `${firstName} ${lastName}`.trim() || "Unnamed user";
};

export const getAdminUserEmailVerified = (
  user: AdminUser
): boolean | undefined =>
  user.emailVerified ??
  user.isEmailVerified ??
  user.email_verified ??
  user.is_email_verified;

export const getAdminUserStatus = (user: AdminUser): string => {
  if (user.isSuspended === true) return "suspended";
  if (typeof user.status === "string") return user.status;
  if (typeof user.isActive === "boolean") {
    return user.isActive ? "active" : "inactive";
  }
  return "unknown";
};

export const isAdminUserStatusChoice = (
  status: string
): status is AdminUserStatusChoice =>
  status === "active" || status === "inactive" || status === "suspended";

export const toAdminUserStatusPayload = (
  status: AdminUserStatusChoice
): SetAdminUserStatusRequest => {
  if (status === "suspended") {
    return { isActive: false, isSuspended: true };
  }

  return {
    isActive: status === "active",
    isSuspended: false,
  };
};

export const formatAdminDate = (value?: string): string => {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const formatAdminDateTime = (value?: string | null): string => {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const getAdminSessionId = (session: AdminUserSession): string =>
  session.sessionId || session.session_id || session.publicId || session.id || "";

export const getAdminSessionDisplayId = (session: AdminUserSession): string =>
  getAdminSessionId(session) || "unknown";

export const getAdminAuditLogId = (log: AdminAuditLog): string =>
  log.publicId || log.id || `${log.createdAt || log.created_at || ""}-${log.action || log.event || ""}`;
