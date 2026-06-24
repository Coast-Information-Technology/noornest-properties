"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, ClipboardList, RefreshCw, Search } from "lucide-react";
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
  getAdminAuditLogs,
} from "@/lib/apiServices/adminService";
import { formatAdminDateTime, getAdminAuditLogId } from "@/lib/adminUsers";
import { isAdminRole } from "@/lib/auth/roles";
import type { AdminAuditLog, NormalizedAdminAuditLogs } from "@/types/admin";

const tableHeadClass =
  "h-11 bg-muted px-4 text-xs font-semibold uppercase tracking-normal text-muted-foreground";

const statusFilterOptions = [
  { value: "all", label: "All results" },
  { value: "success", label: "Success" },
  { value: "redirect", label: "Redirect" },
  { value: "failed", label: "Failed" },
  { value: "unknown", label: "Unknown" },
] as const;

const getLogAction = (log: AdminAuditLog): string =>
  log.action || log.event || "Unknown action";

const getLogActor = (log: AdminAuditLog): string =>
  log.actorEmail ||
  log.actor_email ||
  log.actorPublicId ||
  log.actor_public_id ||
  "Unknown actor";

const getLogTarget = (log: AdminAuditLog): string =>
  log.targetEmail ||
  log.target_email ||
  log.targetPublicId ||
  log.target_public_id ||
  "Not available";

const getLogRoute = (log: AdminAuditLog): string =>
  log.route || log.path || "Not available";

const getLogStatusCode = (log: AdminAuditLog): number | undefined =>
  log.statusCode ?? log.status_code;

const getPercent = (value: number, total: number): number =>
  total > 0 ? Math.round((value / total) * 100) : 0;

const getStatusCategory = (
  statusCode: number | undefined
): (typeof statusFilterOptions)[number]["value"] => {
  if (statusCode === undefined) return "unknown";
  if (statusCode >= 400) return "failed";
  if (statusCode >= 300) return "redirect";
  return "success";
};

const getStatusPillClass = (statusCode: number | undefined): string => {
  const statusCategory = getStatusCategory(statusCode);

  if (statusCategory === "failed") {
    return "border-destructive/20 bg-destructive/10 text-destructive";
  }

  if (statusCategory === "redirect") {
    return "border-primary/25 bg-primary/10 text-primary-700";
  }

  if (statusCategory === "success") {
    return "border-primary/30 bg-primary text-primary-foreground";
  }

  return "border-border bg-muted text-muted-foreground";
};

const getStatusDotClass = (statusCode: number | undefined): string => {
  const statusCategory = getStatusCategory(statusCode);

  if (statusCategory === "failed") return "bg-destructive";
  if (statusCategory === "redirect") return "bg-primary";
  if (statusCategory === "success") return "bg-secondary";
  return "bg-muted-foreground";
};

const getStatusLabel = (statusCode: number | undefined): string =>
  statusCode === undefined ? "N/A" : String(statusCode);

export default function AdminAuditLogsPage() {
  const { user, isLoading } = useUser();
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLogId, setSelectedLogId] = useState("");
  const [logsData, setLogsData] = useState<NormalizedAdminAuditLogs>({
    logs: [],
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canViewAuditLogs = useMemo(
    () => isAdminRole(user?.role),
    [user?.role]
  );

  const loadAuditLogs = useCallback(async () => {
    setIsFetching(true);
    setErrorMessage("");

    try {
      const data = await getAdminAuditLogs({
        page: 1,
        limit: logsData.limit,
        search: search.trim() || undefined,
        action: actionFilter === "all" ? undefined : actionFilter,
      });
      setLogsData(data);
    } catch (error: unknown) {
      setLogsData((current) => ({ ...current, logs: [], total: 0 }));
      setErrorMessage(
        getAdminErrorMessage(error, "Unable to load audit logs.")
      );
    } finally {
      setIsFetching(false);
    }
  }, [actionFilter, logsData.limit, search]);

  useEffect(() => {
    if (isLoading || !canViewAuditLogs) return;

    const timeout = window.setTimeout(() => {
      void loadAuditLogs();
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [canViewAuditLogs, isLoading, loadAuditLogs]);

  const actionOptions = useMemo(() => {
    const actions = Array.from(new Set(logsData.logs.map(getLogAction)))
      .filter((action) => action !== "Unknown action")
      .sort((a, b) => a.localeCompare(b));

    if (actionFilter !== "all" && !actions.includes(actionFilter)) {
      actions.unshift(actionFilter);
    }

    return actions;
  }, [actionFilter, logsData.logs]);

  const visibleLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return logsData.logs.filter((log) => {
      const statusCode = getLogStatusCode(log);
      const matchesStatus =
        statusFilter === "all" ||
        getStatusCategory(statusCode) === statusFilter;
      const action = getLogAction(log);
      const matchesAction =
        actionFilter === "all" || action === actionFilter;

      if (!matchesStatus || !matchesAction) return false;
      if (!query) return true;

      return [
        action,
        getLogActor(log),
        getLogTarget(log),
        getLogRoute(log),
        log.ipAddress || log.ip_address || "",
      ].some((value) => value.toLowerCase().includes(query));
    });
  }, [actionFilter, logsData.logs, search, statusFilter]);

  const selectedLog = useMemo(
    () => visibleLogs.find((log) => getAdminAuditLogId(log) === selectedLogId),
    [selectedLogId, visibleLogs]
  );

  useEffect(() => {
    if (!selectedLogId) return;
    if (selectedLog) return;
    setSelectedLogId("");
  }, [selectedLog, selectedLogId]);

  const auditStats = useMemo(() => {
    const total = visibleLogs.length;
    const success = visibleLogs.filter(
      (log) => getStatusCategory(getLogStatusCode(log)) === "success"
    ).length;
    const failed = visibleLogs.filter(
      (log) => getStatusCategory(getLogStatusCode(log)) === "failed"
    ).length;
    const authEvents = visibleLogs.filter((log) =>
      getLogAction(log).startsWith("auth.")
    ).length;

    return {
      total,
      success,
      successPercent: getPercent(success, total),
      failed,
      failedPercent: getPercent(failed, total),
      authEvents,
      authPercent: getPercent(authEvents, total),
    };
  }, [visibleLogs]);

  const hasActiveFilters =
    search.trim() !== "" || actionFilter !== "all" || statusFilter !== "all";

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Loading audit logs...
      </div>
    );
  }

  if (!canViewAuditLogs) return null;

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Security events"
        title="Audit Logs"
        description="Review admin and security events returned by the backend, including auth activity, routes, status codes, and timestamps."
        badge={
          <Badge className="border border-border bg-muted text-foreground">
            {logsData.total} total
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
                    <ClipboardList className="h-4 w-4" />
                  </span>
                  Event Ledger
                </CardTitle>
                <CardDescription>
                  Search, filter, and inspect admin-visible backend events.
                </CardDescription>
              </div>

              {selectedLog ? (
                <div className="max-w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm lg:max-w-[520px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-muted-foreground">Selected</span>
                    <span className="font-semibold text-foreground">
                      {getLogAction(selectedLog)}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-xs text-muted-foreground">
                    {getLogRoute(selectedLog)} ·{" "}
                    {formatAdminDateTime(
                      selectedLog.createdAt || selectedLog.created_at
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                    Successful events
                  </p>
                  <span className="text-sm font-semibold text-foreground">
                    {auditStats.success}/{auditStats.total}
                  </span>
                </div>
                <Progress
                  value={auditStats.successPercent}
                  className="mt-3 h-2 bg-muted"
                />
              </div>
              <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                    Failed events
                  </p>
                  <span className="text-sm font-semibold text-foreground">
                    {auditStats.failed}
                  </span>
                </div>
                <Progress
                  value={auditStats.failedPercent}
                  className="mt-3 h-2 bg-muted"
                />
              </div>
              <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
                    Auth events
                  </p>
                  <span className="text-sm font-semibold text-foreground">
                    {auditStats.authEvents}
                  </span>
                </div>
                <Progress
                  value={auditStats.authPercent}
                  className="mt-3 h-2 bg-muted"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <Select
                value={actionFilter}
                onValueChange={(value) => {
                  setSelectedLogId("");
                  setActionFilter(value);
                }}
              >
                <SelectTrigger className="h-9 w-full rounded-lg border-border bg-background shadow-sm lg:w-[220px]">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All actions</SelectItem>
                  {actionOptions.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setSelectedLogId("");
                  setStatusFilter(value);
                }}
              >
                <SelectTrigger className="h-9 w-full rounded-lg border-border bg-background shadow-sm lg:w-[170px]">
                  <SelectValue placeholder="Result" />
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
                    setSelectedLogId("");
                    setSearch(event.target.value);
                  }}
                  placeholder="Search events"
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
                    setActionFilter("all");
                    setStatusFilter("all");
                    setSelectedLogId("");
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
                onClick={() => void loadAuditLogs()}
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
              <Table className="min-w-[1120px]">
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className={cn(tableHeadClass, "w-12")}>
                      <span className="sr-only">Select row</span>
                    </TableHead>
                    <TableHead className={cn(tableHeadClass, "w-14")}>
                      Type
                    </TableHead>
                    <TableHead className={tableHeadClass}>Action</TableHead>
                    <TableHead className={tableHeadClass}>Actor</TableHead>
                    <TableHead className={tableHeadClass}>Target</TableHead>
                    <TableHead className={tableHeadClass}>Route</TableHead>
                    <TableHead className={tableHeadClass}>Status</TableHead>
                    <TableHead className={tableHeadClass}>IP Address</TableHead>
                    <TableHead className={tableHeadClass}>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isFetching ? (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        Loading audit logs...
                      </TableCell>
                    </TableRow>
                  ) : visibleLogs.length ? (
                    visibleLogs.map((log) => {
                      const logId = getAdminAuditLogId(log);
                      const statusCode = getLogStatusCode(log);
                      const statusCategory = getStatusCategory(statusCode);
                      const action = getLogAction(log);
                      const route = getLogRoute(log);
                      const isSelected = logId === selectedLogId;
                      const isFailedEvent = statusCategory === "failed";

                      return (
                        <TableRow
                          key={logId}
                          data-state={isSelected ? "selected" : undefined}
                          className={cn(
                            "border-border transition-colors hover:bg-muted/70",
                            isSelected && "bg-primary/25 hover:bg-primary/30",
                            !isSelected && isFailedEvent && "bg-destructive/5"
                          )}
                        >
                          <TableCell className="px-4">
                            <Checkbox
                              checked={isSelected}
                              aria-label={`Select ${action}`}
                              onCheckedChange={(checked) =>
                                setSelectedLogId(checked === true ? logId : "")
                              }
                            />
                          </TableCell>
                          <TableCell className="px-4">
                            <span
                              className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-lg border",
                                isFailedEvent
                                  ? "border-destructive/20 bg-destructive/10 text-destructive"
                                  : "border-primary/20 bg-primary/10 text-primary"
                              )}
                            >
                              <Activity className="h-4 w-4" />
                            </span>
                          </TableCell>
                          <TableCell className="min-w-[240px] px-4 py-3">
                            <div className="font-semibold text-foreground">
                              {action}
                            </div>
                            {log.description ? (
                              <div className="max-w-[280px] truncate text-xs text-muted-foreground">
                                {log.description}
                              </div>
                            ) : null}
                          </TableCell>
                          <TableCell className="max-w-[220px] truncate px-4 text-foreground">
                            {getLogActor(log)}
                          </TableCell>
                          <TableCell className="max-w-[220px] truncate px-4 text-foreground">
                            {getLogTarget(log)}
                          </TableCell>
                          <TableCell className="px-4">
                            <div className="flex max-w-[300px] items-center gap-2">
                              {log.method ? (
                                <span className="rounded-md border border-border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-foreground">
                                  {log.method}
                                </span>
                              ) : null}
                              <span className="truncate rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                                {route}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-4">
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-md px-2.5 py-1 text-xs font-semibold",
                                getStatusPillClass(statusCode)
                              )}
                            >
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full",
                                  getStatusDotClass(statusCode)
                                )}
                              />
                              {getStatusLabel(statusCode)}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-4 font-mono text-xs text-muted-foreground">
                            {log.ipAddress || log.ip_address || "Not available"}
                          </TableCell>
                          <TableCell className="px-4 text-foreground">
                            {formatAdminDateTime(log.createdAt || log.created_at)}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        No audit logs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
            <span>
              Page {logsData.page} of {logsData.totalPages}
            </span>
            <span>{visibleLogs.length} visible on this page</span>
          </div>
        </CardContent>
      </AdminPanel>
    </AdminPageShell>
  );
}
