"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MailCheck,
  MailX,
  Monitor,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Trash2,
  UserCog,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AdminPageHeader,
  AdminPageShell,
  AdminPanel,
  adminErrorMessageClass,
  adminFieldShellClass,
  adminSuccessMessageClass,
  adminTableShellClass,
} from "@/components/dashboard/AdminSurface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  forceAdminUserPasswordReset,
  getAdminErrorMessage,
  getAdminUser,
  getAdminUserSessions,
  revokeAdminSession,
  revokeAdminUserSessions,
  unverifyAdminUserEmail,
  updateAdminUserRole,
  updateAdminUserStatus,
  verifyAdminUserEmail,
} from "@/lib/apiServices/adminService";
import {
  type AdminUserStatusChoice,
  formatAdminDate,
  formatAdminDateTime,
  getAdminUserDisplayId,
  getAdminUserEmailVerified,
  getAdminUserName,
  getAdminUserStatus,
  getAdminSessionDisplayId,
  getAdminSessionId,
  isAdminUserStatusChoice,
  toAdminUserStatusPayload,
} from "@/lib/adminUsers";
import { isAdminRole } from "@/lib/auth/roles";
import { useUser } from "@/contexts/UserContext";
import type {
  AdminAssignableRole,
  AdminUser,
  NormalizedAdminUserSessions,
} from "@/types/admin";

const STATUS_OPTIONS: { value: AdminUserStatusChoice; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const ROLE_OPTIONS: { value: AdminAssignableRole; label: string }[] = [
  { value: "property_owner", label: "Property owner" },
  { value: "property_sourcer", label: "Property sourcer" },
  { value: "agent", label: "Agent" },
  { value: "investor", label: "Investor" },
  { value: "service_provider", label: "Service provider" },
  { value: "admin", label: "Admin" },
  { value: "customer_care_rep", label: "Customer care rep" },
];

type PendingAction = {
  title: string;
  description: string;
  confirmLabel: string;
  successMessage: string;
  variant?: "default" | "destructive";
  run: () => Promise<unknown>;
  afterSuccess?: () => Promise<void>;
};

const Field = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className={adminFieldShellClass}>
    <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
      {label}
    </dt>
    <dd className="mt-2 break-words text-sm font-medium text-[#11130f]">
      {value}
    </dd>
  </div>
);

export default function AdminUserDetailPage() {
  const params = useParams<{ publicId: string }>();
  const publicId = params.publicId || "";
  const { user, isLoading } = useUser();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [selectedStatus, setSelectedStatus] =
    useState<AdminUserStatusChoice>("active");
  const [selectedRole, setSelectedRole] = useState<string>("customer_care_rep");
  const [isFetching, setIsFetching] = useState(true);
  const [sessionsData, setSessionsData] =
    useState<NormalizedAdminUserSessions>({
      sessions: [],
      total: 0,
    });
  const [isSessionsFetching, setIsSessionsFetching] = useState(false);
  const [sessionsError, setSessionsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null
  );

  const canManageAdminUsers = useMemo(
    () => isAdminRole(user?.role),
    [user?.role]
  );

  const loadUser = useCallback(async () => {
    if (!publicId) return;

    setIsFetching(true);
    setErrorMessage("");

    try {
      const data = await getAdminUser(publicId);
      setAdminUser(data);
    } catch (error: unknown) {
      setAdminUser(null);
      setErrorMessage(
        getAdminErrorMessage(error, "Unable to load admin user.")
      );
    } finally {
      setIsFetching(false);
    }
  }, [publicId]);

  const loadUserSessions = useCallback(async () => {
    if (!publicId) return;

    setIsSessionsFetching(true);
    setSessionsError("");

    try {
      const data = await getAdminUserSessions(publicId);
      setSessionsData(data);
    } catch (error: unknown) {
      setSessionsData({ sessions: [], total: 0 });
      setSessionsError(
        getAdminErrorMessage(error, "Unable to load user sessions.")
      );
    } finally {
      setIsSessionsFetching(false);
    }
  }, [publicId]);

  useEffect(() => {
    if (isLoading || !canManageAdminUsers) return;
    void loadUser();
    void loadUserSessions();
  }, [canManageAdminUsers, isLoading, loadUser, loadUserSessions]);

  useEffect(() => {
    if (!adminUser) return;

    const currentStatus = getAdminUserStatus(adminUser);
    setSelectedStatus(
      isAdminUserStatusChoice(currentStatus) ? currentStatus : "active"
    );

    if (adminUser.role) {
      setSelectedRole(adminUser.role);
    }
  }, [adminUser]);

  const roleOptions = useMemo(() => {
    if (ROLE_OPTIONS.some((option) => option.value === selectedRole)) {
      return ROLE_OPTIONS;
    }

    return [
      {
        value: selectedRole,
        label: `${selectedRole.replaceAll("_", " ")} (current)`,
      },
      ...ROLE_OPTIONS,
    ];
  }, [selectedRole]);

  const emailVerified = adminUser
    ? getAdminUserEmailVerified(adminUser)
    : undefined;
  const currentStatus = adminUser ? getAdminUserStatus(adminUser) : "unknown";
  const statusChanged = currentStatus !== selectedStatus;
  const roleChanged = Boolean(adminUser?.role) && adminUser?.role !== selectedRole;
  const displayName = adminUser ? getAdminUserName(adminUser) : "Selected user";

  const openConfirm = (action: PendingAction) => {
    setActionError("");
    setActionMessage("");
    setPendingAction(action);
  };

  const runPendingAction = async () => {
    if (!pendingAction) return;

    const action = pendingAction;
    setIsSubmitting(true);
    setActionError("");

    try {
      await action.run();
      setActionMessage(action.successMessage);
      setPendingAction(null);
      if (action.afterSuccess) {
        await action.afterSuccess();
      } else {
        await loadUser();
      }
    } catch (error: unknown) {
      setActionError(
        getAdminErrorMessage(error, "Unable to complete admin action.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500">
        Loading admin user...
      </div>
    );
  }

  if (!canManageAdminUsers) return null;

  if (errorMessage || !adminUser) {
    return (
      <div className="space-y-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/admin/users">
            <ArrowLeft className="h-4 w-4" />
            Back to users
          </Link>
        </Button>
        <AdminPanel className="border-red-200 bg-red-50">
          <CardHeader className="border-b border-red-200 px-5 py-5">
            <CardTitle className="text-red-900">Unable to Load User</CardTitle>
            <CardDescription className="text-red-700">
              {errorMessage || "The selected admin user could not be loaded."}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 py-5">
            <Button variant="outline" onClick={() => void loadUser()}>
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </CardContent>
        </AdminPanel>
      </div>
    );
  }

  return (
    <AdminPageShell>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/admin/users">
              <ArrowLeft className="h-4 w-4" />
              Back to users
            </Link>
          </Button>
        </div>
      </div>

      <AdminPageHeader
        eyebrow="User detail"
        title={displayName}
        description="Review user profile details, manage account access, adjust role and status, and inspect active sessions."
        badge={
          <div className="flex flex-wrap gap-2">
            <Badge className="border border-[#e7dfd0] bg-[#f5efe0] text-[#11130f]">
              {currentStatus}
            </Badge>
            <Badge className="border border-[#e7dfd0] bg-[#f5efe0] text-[#11130f]">
              {adminUser.role || "unknown role"}
            </Badge>
          </div>
        }
      />

      {actionMessage ? (
        <div className={adminSuccessMessageClass}>
          {actionMessage}
        </div>
      ) : null}

      {actionError ? (
        <div className={adminErrorMessageClass}>
          {actionError}
        </div>
      ) : null}

      <AdminPanel>
        <CardHeader className="border-b border-[#e7dfd0] px-5 py-5">
          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            User Details
          </CardTitle>
          <CardDescription>
            Data returned by the admin user detail endpoint.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 py-5">
          <dl className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Field label="Email" value={adminUser.email || "Not available"} />
            <Field label="Public ID" value={getAdminUserDisplayId(adminUser)} />
            <Field label="Role" value={adminUser.role || "Unknown"} />
            <Field label="Status" value={currentStatus} />
            <Field
              label="Email verified"
              value={
                emailVerified === undefined ? "Unknown" : emailVerified ? "Yes" : "No"
              }
            />
            <Field
              label="Must change password"
              value={
                adminUser.mustChangePassword === undefined
                  ? "Unknown"
                  : adminUser.mustChangePassword
                    ? "Yes"
                    : "No"
              }
            />
            <Field
              label="Created"
              value={formatAdminDate(adminUser.createdAt || adminUser.created_at)}
            />
            <Field
              label="Updated"
              value={formatAdminDate(adminUser.updatedAt || adminUser.updated_at)}
            />
            <Field
              label="Last login"
              value={formatAdminDate(adminUser.lastLoginAt || adminUser.last_login_at)}
            />
          </dl>
        </CardContent>
      </AdminPanel>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminPanel>
          <CardHeader className="border-b border-[#e7dfd0] px-5 py-5">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Access Status
            </CardTitle>
            <CardDescription>
              Update active or suspended access flags for this account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-5 py-5">
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(value as AdminUserStatusChoice)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              disabled={!statusChanged || isSubmitting}
              onClick={() =>
                openConfirm({
                  title: "Update user status?",
                  description: `Set ${displayName} to ${selectedStatus}.`,
                  confirmLabel: "Update status",
                  successMessage: "User status updated.",
                  run: () =>
                    updateAdminUserStatus(
                      publicId,
                      toAdminUserStatusPayload(selectedStatus)
                    ),
                })
              }
            >
              Update Status
            </Button>
          </CardContent>
        </AdminPanel>

        <AdminPanel>
          <CardHeader className="border-b border-[#e7dfd0] px-5 py-5">
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Role
            </CardTitle>
            <CardDescription>
              Assign one of the roles supported by the admin API.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-5 py-5">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              disabled={!roleChanged || isSubmitting}
              onClick={() =>
                openConfirm({
                  title: "Update user role?",
                  description: `Change ${displayName} from ${adminUser.role} to ${selectedRole}.`,
                  confirmLabel: "Update role",
                  successMessage: "User role updated.",
                  run: () =>
                    updateAdminUserRole(publicId, {
                      role: selectedRole,
                    }),
                })
              }
            >
              Update Role
            </Button>
          </CardContent>
        </AdminPanel>

        <AdminPanel>
          <CardHeader className="border-b border-[#e7dfd0] px-5 py-5">
            <CardTitle className="flex items-center gap-2">
              {emailVerified ? (
                <MailCheck className="h-5 w-5" />
              ) : (
                <MailX className="h-5 w-5" />
              )}
              Email Verification
            </CardTitle>
            <CardDescription>
              Mark the account email as verified or unverified.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-5 py-5 sm:flex-row">
            <Button
              disabled={emailVerified === true || isSubmitting}
              onClick={() =>
                openConfirm({
                  title: "Verify email?",
                  description: `Mark ${adminUser.email || displayName} as verified.`,
                  confirmLabel: "Verify email",
                  successMessage: "Email marked as verified.",
                  run: () => verifyAdminUserEmail(publicId),
                })
              }
            >
              <MailCheck className="h-4 w-4" />
              Verify Email
            </Button>
            <Button
              variant="outline"
              disabled={emailVerified === false || isSubmitting}
              onClick={() =>
                openConfirm({
                  title: "Unverify email?",
                  description: `Mark ${adminUser.email || displayName} as unverified.`,
                  confirmLabel: "Unverify email",
                  successMessage: "Email marked as unverified.",
                  run: () => unverifyAdminUserEmail(publicId),
                })
              }
            >
              <MailX className="h-4 w-4" />
              Unverify Email
            </Button>
          </CardContent>
        </AdminPanel>

        <AdminPanel>
          <CardHeader className="border-b border-[#e7dfd0] px-5 py-5">
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Password Security
            </CardTitle>
            <CardDescription>
              Require this account to reset or change its password.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 py-5">
            <Button
              variant="destructive"
              disabled={isSubmitting}
              onClick={() =>
                openConfirm({
                  title: "Force password reset?",
                  description: `${displayName} will be required to reset or change their password.`,
                  confirmLabel: "Force reset",
                  successMessage: "Password reset requirement applied.",
                  variant: "destructive",
                  run: () => forceAdminUserPasswordReset(publicId),
                })
              }
            >
              <RotateCcw className="h-4 w-4" />
              Force Password Reset
            </Button>
          </CardContent>
        </AdminPanel>
      </div>

      <AdminPanel>
        <CardHeader className="border-b border-[#e7dfd0] px-5 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Sessions
              </CardTitle>
              <CardDescription>
                Review active login sessions and revoke access when needed.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isSessionsFetching}
                onClick={() => void loadUserSessions()}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={!sessionsData.sessions.length || isSubmitting}
                onClick={() =>
                  openConfirm({
                    title: "Revoke all sessions?",
                    description: `${displayName} will be signed out from active sessions managed by the backend.`,
                    confirmLabel: "Revoke all",
                    successMessage: "User sessions revoked.",
                    variant: "destructive",
                    run: () => revokeAdminUserSessions(publicId),
                    afterSuccess: loadUserSessions,
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
                Revoke All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 py-5">
          {sessionsError ? (
            <div className={adminErrorMessageClass}>
              {sessionsError}
            </div>
          ) : (
            <div className={adminTableShellClass}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Session ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isSessionsFetching ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center text-sm text-gray-500"
                      >
                        Loading sessions...
                      </TableCell>
                    </TableRow>
                  ) : sessionsData.sessions.length ? (
                    sessionsData.sessions.map((session) => {
                      const sessionId = getAdminSessionId(session);
                      const sessionDisplayId = getAdminSessionDisplayId(session);
                      const revoked = Boolean(
                        session.isRevoked ||
                          session.revokedAt ||
                          session.revoked_at
                      );
                      const active = session.isActive !== false && !revoked;
                      const device =
                        session.deviceName ||
                        session.device_name ||
                        session.deviceInfo ||
                        session.device_info ||
                        session.userAgent ||
                        session.user_agent ||
                        "Unknown device";

                      return (
                        <TableRow key={sessionDisplayId}>
                          <TableCell>
                            <div className="max-w-[260px] truncate font-medium text-gray-900">
                              {device}
                            </div>
                          </TableCell>
                          <TableCell>
                            {session.ipAddress ||
                              session.ip_address ||
                              "Not available"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={active ? "default" : "secondary"}>
                              {revoked ? "revoked" : active ? "active" : "inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {formatAdminDateTime(
                              session.lastUsedAt || session.last_used_at
                            )}
                          </TableCell>
                          <TableCell>
                            {formatAdminDateTime(
                              session.expiresAt || session.expires_at
                            )}
                          </TableCell>
                          <TableCell className="max-w-[220px] truncate text-xs text-gray-500">
                            {sessionDisplayId}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={!sessionId || revoked || isSubmitting}
                              onClick={() =>
                                openConfirm({
                                  title: "Revoke session?",
                                  description: `Revoke session ${sessionDisplayId}.`,
                                  confirmLabel: "Revoke session",
                                  successMessage: "Session revoked.",
                                  variant: "destructive",
                                  run: () => revokeAdminSession(sessionId),
                                  afterSuccess: loadUserSessions,
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                              Revoke
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center text-sm text-gray-500"
                      >
                        No sessions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </AdminPanel>

      <Dialog
        open={Boolean(pendingAction)}
        onOpenChange={(open) => {
          if (!open && !isSubmitting) {
            setPendingAction(null);
          }
        }}
      >
        <DialogContent className="rounded-lg border-[#e7dfd0]">
          <DialogHeader>
            <DialogTitle>{pendingAction?.title}</DialogTitle>
            <DialogDescription>{pendingAction?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setPendingAction(null)}
            >
              Cancel
            </Button>
            <Button
              variant={pendingAction?.variant ?? "default"}
              disabled={isSubmitting}
              onClick={() => void runPendingAction()}
            >
              {isSubmitting ? "Working..." : pendingAction?.confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageShell>
  );
}
