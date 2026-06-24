"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  ClipboardList,
  RefreshCw,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AdminMetricCard,
  AdminPageHeader,
  AdminPageShell,
  AdminPanel,
  adminErrorMessageClass,
} from "@/components/dashboard/AdminSurface";
import { useUser } from "@/contexts/UserContext";
import {
  getAdminAuditLogs,
  getAdminErrorMessage,
  getAdminUsers,
} from "@/lib/apiServices/adminService";
import {
  getAdminUserEmailVerified,
  getAdminUserStatus,
} from "@/lib/adminUsers";
import { isAdminRole } from "@/lib/auth/roles";
import { cn } from "@/lib/utils";
import type { AdminAuditLog, NormalizedAdminAuditLogs, NormalizedAdminUsers } from "@/types/admin";

const formatRoleLabel = (role?: string): string =>
  role ? role.replace(/_/g, " ") : "user";

const getPercent = (value: number, total: number): number =>
  total > 0 ? Math.round((value / total) * 100) : 0;

const getLogStatusCode = (log: AdminAuditLog): number | undefined =>
  log.statusCode ?? log.status_code;

const getLogResult = (statusCode: number | undefined): string => {
  if (statusCode === undefined) return "Unknown";
  if (statusCode >= 400) return "Failed";
  if (statusCode >= 300) return "Redirect";
  return "Success";
};

function AnalyticsAction({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-border bg-background p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-muted"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}

function EmptyAnalytics({ role }: { role?: string }) {
  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Analytics"
        title="Analytics"
        description="This page no longer renders fabricated charts. Role-specific analytics will appear after the real analytics backend contract is connected."
        badge={
          <Badge className="border border-border bg-muted text-foreground capitalize">
            {formatRoleLabel(role)}
          </Badge>
        }
      />

      <AdminPanel className="bg-background">
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                No live analytics data is connected for this role yet.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The dashboard analytics service is intentionally not mocked.
                Once the real analytics endpoint is available, this page can
                render KPI cards and charts from that payload.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[460px]">
              <AnalyticsAction
                href="/dashboard"
                title="Dashboard"
                description="Return to the role dashboard."
                icon={Activity}
              />
              <AnalyticsAction
                href="/dashboard/reports"
                title="Reports"
                description="Review report modules prepared for backend integration."
                icon={ClipboardList}
              />
            </div>
          </div>
        </CardContent>
      </AdminPanel>
    </AdminPageShell>
  );
}

function AnalysisPanel({
  title,
  description,
  children,
  icon: Icon,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  icon: LucideIcon;
}) {
  return (
    <AdminPanel className="bg-background">
      <CardContent className="p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
        </div>
        {children}
      </CardContent>
    </AdminPanel>
  );
}

function DistributionRow({
  label,
  value,
  total,
  tone = "primary",
}: {
  label: string;
  value: number;
  total: number;
  tone?: "primary" | "secondary" | "destructive";
}) {
  const percent = getPercent(value, total);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">
          {value} / {total}
        </span>
      </div>
      <Progress
        value={percent}
        className={cn(
          "h-2 bg-muted",
          tone === "secondary" && "[&_[data-slot=progress-indicator]]:bg-secondary",
          tone === "destructive" && "[&_[data-slot=progress-indicator]]:bg-destructive"
        )}
      />
    </div>
  );
}

function AdminAnalytics() {
  const [usersData, setUsersData] = useState<NormalizedAdminUsers | null>(null);
  const [auditLogsData, setAuditLogsData] =
    useState<NormalizedAdminAuditLogs | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadAnalytics = async () => {
    setIsFetching(true);
    setErrorMessage("");

    try {
      const [users, auditLogs] = await Promise.all([
        getAdminUsers({ page: 1, limit: 50 }),
        getAdminAuditLogs({ page: 1, limit: 50 }),
      ]);
      setUsersData(users);
      setAuditLogsData(auditLogs);
    } catch (error: unknown) {
      setErrorMessage(
        getAdminErrorMessage(error, "Unable to load admin analytics data.")
      );
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    void loadAnalytics();
  }, []);

  const users = useMemo(() => usersData?.users ?? [], [usersData?.users]);
  const logs = useMemo(
    () => auditLogsData?.logs ?? [],
    [auditLogsData?.logs]
  );

  const stats = useMemo(() => {
    const activeUsers = users.filter(
      (adminUser) => getAdminUserStatus(adminUser) === "active"
    ).length;
    const verifiedUsers = users.filter(
      (adminUser) => getAdminUserEmailVerified(adminUser) === true
    ).length;
    const adminUsers = users.filter((adminUser) =>
      ["admin", "super_admin"].includes(adminUser.role || "")
    ).length;
    const failedLogs = logs.filter(
      (log) => (getLogStatusCode(log) ?? 0) >= 400
    ).length;
    const successfulLogs = logs.filter(
      (log) => getLogResult(getLogStatusCode(log)) === "Success"
    ).length;
    const unknownLogs = logs.filter(
      (log) => getLogResult(getLogStatusCode(log)) === "Unknown"
    ).length;

    return {
      activeUsers,
      verifiedUsers,
      adminUsers,
      failedLogs,
      successfulLogs,
      unknownLogs,
    };
  }, [logs, users]);

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Real data only"
        title="Analytics"
        description="Admin analytics are derived only from the currently integrated Users and Audit Logs endpoints."
        badge={
          <Badge className="border border-border bg-muted text-foreground">
            Live admin endpoints
          </Badge>
        }
        actions={
          <Button
            type="button"
            variant="outline"
            disabled={isFetching}
            onClick={() => void loadAnalytics()}
            className="border-border bg-background"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        }
      />

      {errorMessage ? (
        <div className={adminErrorMessageClass}>{errorMessage}</div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard
          label="Total Users"
          value={usersData ? usersData.total.toLocaleString() : "Not loaded"}
          helper="Backend total"
          icon={Users}
          featured
        />
        <AdminMetricCard
          label="Active Loaded Users"
          value={usersData ? stats.activeUsers.toLocaleString() : "Not loaded"}
          helper="From loaded user rows"
          icon={Users}
          tone="gold"
        />
        <AdminMetricCard
          label="Audit Events"
          value={auditLogsData ? auditLogsData.total.toLocaleString() : "Not loaded"}
          helper="Backend total"
          icon={ClipboardList}
          tone="slate"
        />
        <AdminMetricCard
          label="Failed Loaded Events"
          value={auditLogsData ? stats.failedLogs.toLocaleString() : "Not loaded"}
          helper="From loaded audit rows"
          icon={ShieldCheck}
          tone="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <AnalysisPanel
          title="User Access Breakdown"
          description="Distribution from the loaded users returned by the admin users endpoint."
          icon={Users}
        >
          {users.length ? (
            <div className="space-y-5">
              <DistributionRow
                label="Active users"
                value={stats.activeUsers}
                total={users.length}
                tone="primary"
              />
              <DistributionRow
                label="Verified email"
                value={stats.verifiedUsers}
                total={users.length}
                tone="secondary"
              />
              <DistributionRow
                label="Admin roles"
                value={stats.adminUsers}
                total={users.length}
                tone="primary"
              />
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-muted p-5 text-sm text-muted-foreground">
              No user rows were returned.
            </div>
          )}
        </AnalysisPanel>

        <AnalysisPanel
          title="Audit Result Breakdown"
          description="Distribution from the loaded events returned by the admin audit endpoint."
          icon={ClipboardList}
        >
          {logs.length ? (
            <div className="space-y-5">
              <DistributionRow
                label="Successful events"
                value={stats.successfulLogs}
                total={logs.length}
                tone="primary"
              />
              <DistributionRow
                label="Failed events"
                value={stats.failedLogs}
                total={logs.length}
                tone="destructive"
              />
              <DistributionRow
                label="Unknown status"
                value={stats.unknownLogs}
                total={logs.length}
                tone="secondary"
              />
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-muted p-5 text-sm text-muted-foreground">
              No audit rows were returned.
            </div>
          )}
        </AnalysisPanel>
      </div>
    </AdminPageShell>
  );
}

export default function AnalyticsPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Loading analytics...
      </div>
    );
  }

  if (!user) {
    return <EmptyAnalytics />;
  }

  if (isAdminRole(user.role)) {
    return <AdminAnalytics />;
  }

  return <EmptyAnalytics role={user.role} />;
}
