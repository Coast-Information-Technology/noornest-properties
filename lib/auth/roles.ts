import type { UserRole } from "@/types";

export const isAdminRole = (role?: UserRole | string | null): boolean =>
  role === "admin" || role === "super_admin";
