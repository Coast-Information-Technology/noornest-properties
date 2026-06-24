export type AdminUserStatus = "active" | "inactive" | "suspended" | "pending" | string;

export interface AdminUser {
  id?: string;
  publicId?: string;
  userPublicId?: string;
  email?: string;
  firstName?: string;
  first_name?: string;
  lastName?: string;
  last_name?: string;
  name?: string;
  role?: string;
  status?: AdminUserStatus;
  isActive?: boolean;
  isSuspended?: boolean;
  mustChangePassword?: boolean;
  emailVerified?: boolean;
  isEmailVerified?: boolean;
  email_verified?: boolean;
  is_email_verified?: boolean;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  lastLoginAt?: string;
  last_login_at?: string;
}

export interface AdminUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface AdminUsersResponseBody {
  success?: boolean;
  message?: string;
  data?: AdminUser[] | {
    users?: AdminUser[];
    items?: AdminUser[];
    results?: AdminUser[];
    data?: AdminUser[];
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
  users?: AdminUser[];
  items?: AdminUser[];
  results?: AdminUser[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    requestId?: string;
    timestamp?: string;
    path?: string;
    statusCode?: number;
  };
  error?: string | null;
}

export interface NormalizedAdminUsers {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type AdminAssignableRole =
  | "property_owner"
  | "property_sourcer"
  | "agent"
  | "investor"
  | "service_provider"
  | "admin"
  | "customer_care_rep";

export interface AdminUserDetailResponseBody {
  success?: boolean;
  message?: string;
  data?:
    | AdminUser
    | {
        user?: AdminUser;
        adminUser?: AdminUser;
        profile?: AdminUser;
        data?: AdminUser;
      };
  user?: AdminUser;
  adminUser?: AdminUser;
  profile?: AdminUser;
  error?: string | null;
}

export interface SetAdminUserStatusRequest {
  isActive?: boolean;
  isSuspended?: boolean;
  mustChangePassword?: boolean;
}

export interface SetAdminUserRoleRequest {
  role: AdminAssignableRole | string;
}

export interface AdminActionResponseBody {
  success?: boolean;
  message?: string;
  data?: unknown;
  error?: string | null;
}

export type AdminStaffRole = "admin" | "customer_care_rep" | "super_admin";

export interface CreateAdminStaffRequest {
  email: string;
  role: AdminStaffRole;
  phoneNumber?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
}

export interface AdminStaffUser {
  publicId?: string;
  email?: string;
  role?: AdminStaffRole | string;
  mustChangePassword?: boolean;
}

export interface AdminStaffResponseBody {
  success?: boolean;
  message?: string;
  data?: AdminStaffUser;
  error?: string | null;
}

export interface UpdateOwnAdminProfileRequest {
  firstName?: string;
  lastName?: string;
  gender?: string;
}

export type AdminEmailTestScenario =
  | "delivered"
  | "bounced"
  | "complained"
  | "suppressed";

export interface AdminEmailTestRequest {
  scenario?: AdminEmailTestScenario;
  label?: string;
  to?: string;
  subject?: string;
}

export type AdminOnboardingTrack =
  | "buyer_investor"
  | "property_sourcer"
  | "agent_vendor"
  | "service_provider";

export type AdminOnboardingStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "abandoned"
  | string;

export interface AdminOnboardingStepProgress {
  step?: number;
  title?: string;
  isComplete?: boolean;
  missing?: unknown[];
}

export interface AdminOnboardingProgress {
  track?: AdminOnboardingTrack | string;
  status?: AdminOnboardingStatus;
  currentStep?: number;
  completedAt?: string | null;
  steps?: AdminOnboardingStepProgress[];
}

export interface AdminOnboardingResponseBody {
  success?: boolean;
  message?: string;
  data?: AdminOnboardingProgress;
  track?: AdminOnboardingTrack | string;
  status?: AdminOnboardingStatus;
  currentStep?: number;
  completedAt?: string | null;
  steps?: AdminOnboardingStepProgress[];
  error?: string | null;
}

export interface AdminResetOnboardingRequest {
  track?: AdminOnboardingTrack;
  hard?: boolean;
}

export interface AdminUserSession {
  id?: string;
  sessionId?: string;
  session_id?: string;
  publicId?: string;
  userPublicId?: string;
  deviceName?: string;
  device_name?: string;
  deviceInfo?: string;
  device_info?: string;
  userAgent?: string;
  user_agent?: string;
  ipAddress?: string;
  ip_address?: string;
  isActive?: boolean;
  isRevoked?: boolean;
  revokedAt?: string | null;
  revoked_at?: string | null;
  expiresAt?: string;
  expires_at?: string;
  lastUsedAt?: string;
  last_used_at?: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
}

export interface AdminUserSessionsResponseBody {
  success?: boolean;
  message?: string;
  data?:
    | AdminUserSession[]
    | {
        sessions?: AdminUserSession[];
        items?: AdminUserSession[];
        results?: AdminUserSession[];
        data?: AdminUserSession[];
        total?: number;
      };
  sessions?: AdminUserSession[];
  items?: AdminUserSession[];
  results?: AdminUserSession[];
  total?: number;
  error?: string | null;
}

export interface NormalizedAdminUserSessions {
  sessions: AdminUserSession[];
  total: number;
}

export interface AdminAuditLogsQuery {
  page?: number;
  limit?: number;
  search?: string;
  action?: string;
  actorPublicId?: string;
  targetPublicId?: string;
}

export interface AdminAuditLog {
  id?: string;
  publicId?: string;
  action?: string;
  event?: string;
  description?: string;
  actorPublicId?: string;
  actor_public_id?: string;
  actorEmail?: string;
  actor_email?: string;
  targetPublicId?: string;
  target_public_id?: string;
  targetEmail?: string;
  target_email?: string;
  method?: string;
  route?: string;
  path?: string;
  statusCode?: number;
  status_code?: number;
  ipAddress?: string | null;
  ip_address?: string | null;
  userAgent?: string;
  user_agent?: string;
  metadata?: unknown;
  details?: unknown;
  createdAt?: string;
  created_at?: string;
}

export interface AdminAuditLogsResponseBody {
  success?: boolean;
  message?: string;
  data?:
    | AdminAuditLog[]
    | {
        logs?: AdminAuditLog[];
        auditLogs?: AdminAuditLog[];
        items?: AdminAuditLog[];
        results?: AdminAuditLog[];
        data?: AdminAuditLog[];
        total?: number;
        page?: number;
        limit?: number;
        totalPages?: number;
      };
  logs?: AdminAuditLog[];
  auditLogs?: AdminAuditLog[];
  items?: AdminAuditLog[];
  results?: AdminAuditLog[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    requestId?: string;
    timestamp?: string;
    path?: string;
    statusCode?: number;
  };
  error?: string | null;
}

export interface NormalizedAdminAuditLogs {
  logs: AdminAuditLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
