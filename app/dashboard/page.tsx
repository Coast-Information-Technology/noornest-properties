"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Building2,
  Calendar,
  FileText,
  RefreshCw,
  Search,
  Settings,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  AdminPageHeader,
  AdminPageShell,
  AdminPanel,
  adminErrorMessageClass,
} from "@/components/dashboard/AdminSurface";
import { useUser } from "@/contexts/UserContext";
import {
  getAdminErrorMessage,
  getAdminUsers,
} from "@/lib/apiServices/adminService";
import { isAdminRole } from "@/lib/auth/roles";
import type { NormalizedAdminUsers } from "@/types/admin";

const formatRoleLabel = (role?: string): string =>
  role ? role.replace(/_/g, " ") : "user";

function DashboardAction({
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
      className="group rounded-lg border border-border bg-background p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-muted"
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

function EmptyDataPanel({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: React.ReactNode;
}) {
  return (
    <AdminPanel className="bg-background">
      <CardContent className="p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[460px]">
            {actions}
          </div>
        </div>
      </CardContent>
    </AdminPanel>
  );
}

function RoleDashboard({ role }: { role: string }) {
  const roleLabel = formatRoleLabel(role);

  const actionsByRole: Record<string, React.ReactNode> = {
    agent: (
      <>
        <DashboardAction
          href="/dashboard/listings"
          title="Listings"
          description="Manage property listings when listing APIs are connected."
          icon={Building2}
        />
        <DashboardAction
          href="/dashboard/bookings"
          title="Bookings"
          description="Review scheduled viewings and booking activity."
          icon={Calendar}
        />
      </>
    ),
    property_sourcer: (
      <>
        <DashboardAction
          href="/dashboard/listings"
          title="Listings"
          description="Manage sourced property listings when APIs are connected."
          icon={Building2}
        />
        <DashboardAction
          href="/tools/bmv-analyzer"
          title="BMV Analyzer"
          description="Open the analysis tool for property opportunity checks."
          icon={Search}
        />
      </>
    ),
    investor: (
      <>
        <DashboardAction
          href="/dashboard/opportunities"
          title="Opportunities"
          description="Review investment opportunities when data is available."
          icon={Activity}
        />
        <DashboardAction
          href="/dashboard/portfolio"
          title="Portfolio"
          description="View portfolio records after the portfolio API is connected."
          icon={FileText}
        />
      </>
    ),
    property_owner: (
      <>
        <DashboardAction
          href="/dashboard/listings"
          title="Properties"
          description="Manage owned property records when backend data is available."
          icon={Building2}
        />
        <DashboardAction
          href="/dashboard/bookings"
          title="Bookings"
          description="Track real booking requests after integration."
          icon={Calendar}
        />
      </>
    ),
    service_provider: (
      <>
        <DashboardAction
          href="/dashboard/profile"
          title="Profile"
          description="Keep your service provider profile ready for backend sync."
          icon={Users}
        />
        <DashboardAction
          href="/dashboard/settings"
          title="Settings"
          description="Manage account and security settings."
          icon={Wrench}
        />
      </>
    ),
    guest: (
      <>
        <DashboardAction
          href="/properties"
          title="Browse Properties"
          description="Explore public property inventory."
          icon={Search}
        />
        <DashboardAction
          href="/register"
          title="Create Account"
          description="Register to unlock account-specific workflows."
          icon={Users}
        />
      </>
    ),
  };

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Dashboard"
        title={`${roleLabel} Dashboard`}
        description="This page does not display fabricated dashboard metrics. Live role-specific metrics will appear here after their backend contracts are connected."
        badge={
          <Badge className="border border-border bg-muted text-foreground capitalize">
            {roleLabel}
          </Badge>
        }
      />

      <EmptyDataPanel
        title="No live dashboard metrics are connected for this role yet."
        description="The dashboard data layer intentionally fails fast instead of returning placeholder data. This keeps the production UI honest until real role-specific data is available."
        actions={actionsByRole[role] || actionsByRole.guest}
      />
    </AdminPageShell>
  );
}

function ManagementStat({
  label,
  value,
  helper,
  icon: Icon,
  featured = false,
}: {
  label: string;
  value: React.ReactNode;
  helper: string;
  icon: LucideIcon;
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "rounded-lg border border-secondary bg-secondary p-5 text-secondary-foreground shadow-[0_14px_38px_rgba(37,31,18,0.14)]"
          : "rounded-lg border border-border bg-background p-5 shadow-[0_14px_38px_rgba(37,31,18,0.06)]"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={
              featured
                ? "text-sm font-medium text-secondary-foreground/70"
                : "text-sm font-medium text-muted-foreground"
            }
          >
            {label}
          </p>
          <div className="mt-4 text-2xl font-semibold tracking-normal">
            {value}
          </div>
          <p
            className={
              featured
                ? "mt-2 text-sm text-primary"
                : "mt-2 text-sm text-muted-foreground"
            }
          >
            {helper}
          </p>
        </div>
        <span
          className={
            featured
              ? "flex h-10 w-10 items-center justify-center rounded-lg bg-background text-secondary"
              : "flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary"
          }
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

function ManagementModule({
  href,
  title,
  description,
  status,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  status: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-border bg-background p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-muted"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <Badge variant="outline" className="rounded-md border-border bg-muted">
          {status}
        </Badge>
      </div>
      <h3 className="mt-5 font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}

function AdminOperationsDashboard({
  role,
}: {
  role: "admin" | "super_admin";
}) {
  const [usersData, setUsersData] = useState<NormalizedAdminUsers | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadAdminDashboard = async () => {
    setIsFetching(true);
    setErrorMessage("");

    try {
      const users = await getAdminUsers({ page: 1, limit: 5 });
      setUsersData(users);
    } catch (error: unknown) {
      setErrorMessage(
        getAdminErrorMessage(error, "Unable to load admin dashboard data.")
      );
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    void loadAdminDashboard();
  }, []);

  return (
    <AdminPageShell className="space-y-4">
      <section className="overflow-hidden rounded-lg border border-border bg-muted shadow-[0_18px_50px_rgba(37,31,18,0.08)]">
        <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-secondary px-4 py-1.5 text-secondary-foreground">
                Dashboard
              </Badge>
              <Button asChild variant="outline" size="sm" className="rounded-full border-border bg-background">
                <Link href="/dashboard/listings">Listings</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full border-border bg-background">
                <Link href="/dashboard/bookings">Appointments</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full border-border bg-background">
                <Link href="/dashboard/reports">Reports</Link>
              </Button>
            </div>

            <div className="mt-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-normal text-primary">
                Property operations
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Property Management Dashboard
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                Manage property inventory, listings, appointments, customers,
                and reports from one admin workspace. Property metrics will
                appear after the live property management APIs are connected.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/dashboard/listings">
                  <Building2 className="h-4 w-4" />
                  Open listings
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isFetching}
                onClick={() => void loadAdminDashboard()}
                className="border-border bg-background"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          <div className="relative min-h-[220px] overflow-hidden rounded-lg border border-border bg-background lg:w-[440px]">
            <Image
              src="/properties/property-hero-small.png"
              alt="Property management preview"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 440px, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-border bg-background/90 p-4 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Noornest Properties
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Admin property operations
                  </p>
                </div>
                <Badge className="bg-primary text-primary-foreground">
                  {role}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {errorMessage ? (
        <div className={adminErrorMessageClass}>{errorMessage}</div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ManagementStat
          label="Property Inventory"
          value="Not connected"
          helper="Awaiting property management API"
          icon={Building2}
          featured
        />
        <ManagementStat
          label="Appointments"
          value="Not connected"
          helper="Awaiting booking/appointment API"
          icon={Calendar}
        />
        <ManagementStat
          label="Admin Users"
          value={usersData ? usersData.total.toLocaleString() : "Not loaded"}
          helper="Live admin user data"
          icon={Users}
        />
        <ManagementStat
          label="Reports"
          value="Prepared"
          helper="Report API not connected yet"
          icon={FileText}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminPanel className="bg-background">
          <CardContent className="p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Property Management Modules
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  These are the operational areas this dashboard should manage.
                  Empty states remain until the matching APIs are connected.
                </p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <ManagementModule
                href="/dashboard/listings"
                title="Listings"
                description="Create and manage property listing workflows."
                status="Pending API"
                icon={Building2}
              />
              <ManagementModule
                href="/dashboard/bookings"
                title="Appointments"
                description="Manage viewings and customer booking activity."
                status="Pending API"
                icon={Calendar}
              />
              <ManagementModule
                href="/dashboard/admin/users"
                title="Users"
                description="Review real user accounts, roles, and status."
                status="Connected"
                icon={Users}
              />
              <ManagementModule
                href="/dashboard/reports"
                title="Reports"
                description="Prepare reporting workflows for connected data."
                status="Prepared"
                icon={FileText}
              />
            </div>
          </CardContent>
        </AdminPanel>

        <AdminPanel className="bg-background">
          <CardContent className="p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Inventory Workspace
              </h2>
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div className="rounded-lg border border-border bg-muted p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-semibold text-foreground">
                Property data is not connected yet.
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                When the property/listing API is available, this space should
                show inventory, status, costs, agent ownership, views, and
                property actions. No placeholder property rows are rendered.
              </p>
              <Button asChild variant="outline" className="mt-5 border-border bg-background">
                <Link href="/dashboard/listings">Open listings module</Link>
              </Button>
            </div>
          </CardContent>
        </AdminPanel>
      </div>
    </AdminPageShell>
  );
}

export default function Dashboard() {
  const { user, isLoading } = useUser();

  const role = useMemo(() => user?.role || "guest", [user?.role]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Please log in to view your dashboard.
      </div>
    );
  }

  if (isAdminRole(role)) {
    return (
      <AdminOperationsDashboard
        role={role === "super_admin" ? "super_admin" : "admin"}
      />
    );
  }

  return <RoleDashboard role={role} />;
}
