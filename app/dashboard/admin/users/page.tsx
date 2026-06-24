"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, RefreshCw, Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AdminPageHeader,
  AdminPageShell,
  AdminPanel,
  adminErrorMessageClass,
} from "@/components/dashboard/AdminSurface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
import {
  getAdminErrorMessage,
  getAdminUsers,
} from "@/lib/apiServices/adminService";
import {
  formatAdminDate,
  getAdminUserDisplayId,
  getAdminUserEmailVerified,
  getAdminUserName,
  getAdminUserPublicId,
  getAdminUserStatus,
} from "@/lib/adminUsers";
import { isAdminRole } from "@/lib/auth/roles";
import type { NormalizedAdminUsers } from "@/types/admin";

const tableHeadClass =
  "h-11 bg-muted px-4 text-xs font-semibold uppercase tracking-normal text-muted-foreground";

const roleFilterOptions = [
  { value: "all", label: "All roles" },
  { value: "super_admin", label: "Super admin" },
  { value: "admin", label: "Admin" },
  { value: "customer_care_rep", label: "Customer care" },
  { value: "property_owner", label: "Property owner" },
  { value: "property_sourcer", label: "Property sourcer" },
  { value: "agent", label: "Agent" },
  { value: "investor", label: "Investor" },
  { value: "service_provider", label: "Service provider" },
] as const;

const statusFilterOptions = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
  { value: "pending", label: "Pending" },
] as const;

const getInitials = (name: string, email?: string): string => {
  const source = name !== "Unnamed user" ? name : email || name;
  const parts = source
    .replace(/@.*/, "")
    .split(/[\s._-]+/)
    .filter(Boolean);

  return (
    parts
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "U"
  );
};

const formatRoleLabel = (role?: string): string =>
  role ? role.replace(/_/g, " ") : "unknown";

const getPercent = (value: number, total: number): number =>
  total > 0 ? Math.round((value / total) * 100) : 0;

const getStatusPillClass = (status: string): string => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "active") {
    return "border-primary/30 bg-primary text-primary-foreground";
  }

  if (normalizedStatus === "suspended") {
    return "border-destructive/20 bg-destructive/10 text-destructive";
  }

  if (normalizedStatus === "inactive") {
    return "border-border bg-muted text-muted-foreground";
  }

  if (normalizedStatus === "pending") {
    return "border-primary/25 bg-primary/10 text-primary-700";
  }

  return "border-border bg-background text-muted-foreground";
};

const getStatusDotClass = (status: string): string => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "active") return "bg-secondary";
  if (normalizedStatus === "suspended") return "bg-destructive";
  if (normalizedStatus === "inactive") return "bg-muted-foreground";
  if (normalizedStatus === "pending") return "bg-primary";
  return "bg-muted-foreground";
};

const getEmailVerifiedPillClass = (emailVerified: boolean | undefined): string => {
  if (emailVerified === true) {
    return "border-primary/30 bg-primary/10 text-foreground";
  }

  if (emailVerified === false) {
    return "border-destructive/20 bg-destructive/10 text-destructive";
  }

  return "border-border bg-muted text-muted-foreground";
};

const getEmailVerifiedLabel = (emailVerified: boolean | undefined): string => {
  if (emailVerified === true) return "Verified";
  if (emailVerified === false) return "Unverified";
  return "Unknown";
};

export default function AdminUsersPage() {
  const { user, isLoading } = useUser();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPublicId, setSelectedPublicId] = useState("");
  const [usersData, setUsersData] = useState<NormalizedAdminUsers>({
    users: [],
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canViewAdminUsers = useMemo(
    () => isAdminRole(user?.role),
    [user?.role]
  );

  const loadUsers = useCallback(
    async (page = 1) => {
      setIsFetching(true);
      setErrorMessage("");

      try {
        const data = await getAdminUsers({
          page,
          limit: usersData.limit,
          search: search.trim() || undefined,
          role: roleFilter === "all" ? undefined : roleFilter,
          status: statusFilter === "all" ? undefined : statusFilter,
        });
        setUsersData(data);
      } catch (error: unknown) {
        setUsersData((current) => ({ ...current, users: [], total: 0 }));
        setErrorMessage(
          getAdminErrorMessage(error, "Unable to load admin users.")
        );
      } finally {
        setIsFetching(false);
      }
    },
    [roleFilter, search, statusFilter, usersData.limit]
  );

  useEffect(() => {
    if (isLoading || !canViewAdminUsers) return;

    const timeout = window.setTimeout(() => {
      void loadUsers(1);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [canViewAdminUsers, isLoading, loadUsers]);

  const selectedUser = useMemo(
    () =>
      usersData.users.find(
        (adminUser) => getAdminUserPublicId(adminUser) === selectedPublicId
      ),
    [selectedPublicId, usersData.users]
  );

  useEffect(() => {
    if (!selectedPublicId) return;
    if (selectedUser) return;
    setSelectedPublicId("");
  }, [selectedPublicId, selectedUser]);

  const userStats = useMemo(() => {
    const loaded = usersData.users.length;
    const active = usersData.users.filter(
      (adminUser) => getAdminUserStatus(adminUser) === "active"
    ).length;
    const adminAccounts = usersData.users.filter((adminUser) =>
      ["admin", "super_admin"].includes(adminUser.role || "")
    ).length;
    const verified = usersData.users.filter(
      (adminUser) => getAdminUserEmailVerified(adminUser) === true
    ).length;

    return {
      loaded,
      active,
      activePercent: getPercent(active, loaded),
      adminAccounts,
      adminPercent: getPercent(adminAccounts, loaded),
      verified,
      verifiedPercent: getPercent(verified, loaded),
    };
  }, [usersData.users]);

  const hasActiveFilters =
    search.trim() !== "" || roleFilter !== "all" || statusFilter !== "all";

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Loading admin users...
      </div>
    );
  }

  if (!canViewAdminUsers) return null;

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Access control"
        title="Admin Users"
        description="Review platform accounts, roles, email verification, and access status returned by the backend."
        badge={
          <Badge className="border border-border bg-muted text-foreground">
            {usersData.total} total
          </Badge>
        }
      />

      <AdminPanel className="overflow-hidden bg-background">
        <CardHeader className="border-b border-border bg-muted px-5 py-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                    <Users className="h-4 w-4" />
                  </span>
                  User Directory
                </CardTitle>
                <CardDescription>
                  Filter, select, and open admin-visible user records.
                </CardDescription>
              </div>

              {selectedUser ? (
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm">
                  <span className="text-muted-foreground">Selected</span>
                  <span className="font-semibold text-foreground">
                    {getAdminUserName(selectedUser)}
                  </span>
                  <Button
                    asChild
                    size="sm"
                    className="h-8 rounded-md bg-secondary px-3 text-secondary-foreground hover:bg-secondary/90"
                  >
                    <Link
                      href={`/dashboard/admin/users/${encodeURIComponent(selectedPublicId)}`}
                    >
                      <Eye className="h-4 w-4" />
                      Open
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                    Active loaded
                  </p>
                  <span className="text-sm font-semibold text-foreground">
                    {userStats.active}/{userStats.loaded}
                  </span>
                </div>
                <Progress
                  value={userStats.activePercent}
                  className="mt-3 h-2 bg-muted"
                />
              </div>
              <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                    Admin accounts
                  </p>
                  <span className="text-sm font-semibold text-foreground">
                    {userStats.adminAccounts}
                  </span>
                </div>
                <Progress
                  value={userStats.adminPercent}
                  className="mt-3 h-2 bg-muted"
                />
              </div>
              <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                    Verified email
                  </p>
                  <span className="text-sm font-semibold text-foreground">
                    {userStats.verified}/{userStats.loaded}
                  </span>
                </div>
                <Progress
                  value={userStats.verifiedPercent}
                  className="mt-3 h-2 bg-muted"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <Select
                value={roleFilter}
                onValueChange={(value) => {
                  setSelectedPublicId("");
                  setRoleFilter(value);
                }}
              >
                <SelectTrigger className="h-9 w-full rounded-lg border-border bg-background shadow-sm lg:w-[190px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {roleFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setSelectedPublicId("");
                  setStatusFilter(value);
                }}
              >
                <SelectTrigger className="h-9 w-full rounded-lg border-border bg-background shadow-sm lg:w-[170px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative min-w-[220px] flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => {
                    setSelectedPublicId("");
                    setSearch(event.target.value);
                  }}
                  placeholder="Search users"
                  className="h-9 rounded-lg border-border bg-background pl-9 shadow-sm"
                />
              </div>

              {hasActiveFilters ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-lg border-border bg-background"
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("all");
                    setStatusFilter("all");
                    setSelectedPublicId("");
                  }}
                >
                  Clear
                </Button>
              ) : null}

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isFetching}
                onClick={() => void loadUsers(usersData.page)}
                className="h-9 rounded-lg border-border bg-background"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-5 py-5">
          {errorMessage ? (
            <div className={adminErrorMessageClass}>{errorMessage}</div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-border bg-background shadow-[0_14px_38px_rgba(37,31,18,0.06)]">
              <Table className="min-w-[1040px]">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className={cn(tableHeadClass, "w-12")}>
                      <span className="sr-only">Select row</span>
                    </TableHead>
                    <TableHead className={tableHeadClass}>Name</TableHead>
                    <TableHead className={tableHeadClass}>Role</TableHead>
                    <TableHead className={tableHeadClass}>Status</TableHead>
                    <TableHead className={tableHeadClass}>Email</TableHead>
                    <TableHead className={tableHeadClass}>Start date</TableHead>
                    <TableHead className={tableHeadClass}>Public ID</TableHead>
                    <TableHead className={cn(tableHeadClass, "text-right")}>
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isFetching ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        Loading users...
                      </TableCell>
                    </TableRow>
                  ) : usersData.users.length ? (
                    usersData.users.map((adminUser) => {
                      const status = getAdminUserStatus(adminUser);
                      const emailVerified = getAdminUserEmailVerified(adminUser);
                      const publicId = getAdminUserPublicId(adminUser);
                      const displayId = getAdminUserDisplayId(adminUser);
                      const name = getAdminUserName(adminUser);
                      const isSelected = publicId === selectedPublicId;

                      return (
                        <TableRow
                          key={displayId}
                          data-state={isSelected ? "selected" : undefined}
                          className={cn(
                            "border-border transition-colors hover:bg-muted/70",
                            isSelected && "bg-primary/25 hover:bg-primary/30"
                          )}
                        >
                          <TableCell className="px-4">
                            <Checkbox
                              checked={isSelected}
                              disabled={!publicId}
                              aria-label={`Select ${name}`}
                              onCheckedChange={(checked) =>
                                setSelectedPublicId(
                                  checked === true ? publicId : ""
                                )
                              }
                            />
                          </TableCell>
                          <TableCell className="min-w-[250px] px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold text-secondary-foreground shadow-sm">
                                {getInitials(name, adminUser.email)}
                              </span>
                              <div className="min-w-0">
                                <div className="truncate font-semibold text-foreground">
                                  {name}
                                </div>
                                <div className="truncate text-xs text-muted-foreground">
                                  {adminUser.email || "No email"}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-4">
                            <Badge
                              variant="outline"
                              className="rounded-md border-border bg-background px-2.5 py-1 text-xs font-semibold capitalize text-foreground"
                            >
                              {formatRoleLabel(adminUser.role)}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-4">
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-md px-2.5 py-1 text-xs font-semibold capitalize",
                                getStatusPillClass(status)
                              )}
                            >
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full",
                                  getStatusDotClass(status)
                                )}
                              />
                              {status}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-4">
                            <span
                              className={cn(
                                "inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold",
                                getEmailVerifiedPillClass(emailVerified)
                              )}
                            >
                              {getEmailVerifiedLabel(emailVerified)}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 text-foreground">
                            {formatAdminDate(adminUser.createdAt || adminUser.created_at)}
                          </TableCell>
                          <TableCell className="px-4">
                            <div className="max-w-[190px] truncate font-mono text-[11px] text-muted-foreground">
                              {displayId}
                            </div>
                          </TableCell>
                          <TableCell className="px-4 text-right">
                            {publicId ? (
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="rounded-md border-border bg-background px-3"
                              >
                                <Link
                                  href={`/dashboard/admin/users/${encodeURIComponent(publicId)}`}
                                >
                                  <Eye className="h-4 w-4" />
                                  View
                                </Link>
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-md px-3"
                                disabled
                              >
                                View
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
            <span>
              Page {usersData.page} of {usersData.totalPages}
            </span>
            <span>{usersData.users.length} loaded on this page</span>
          </div>
        </CardContent>
      </AdminPanel>
    </AdminPageShell>
  );
}
