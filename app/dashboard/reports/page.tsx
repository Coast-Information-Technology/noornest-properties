"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  Building2,
  Download,
  FileText,
  PoundSterling,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "@/components/dashboard/AdminSurface";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ReportCategory = "all" | "sales" | "activity" | "performance" | "revenue";

interface ReportModule {
  id: string;
  title: string;
  category: Exclude<ReportCategory, "all">;
  description: string;
  icon: LucideIcon;
  endpoint: string;
  tone: "primary" | "secondary" | "accent" | "muted";
}

const reportModules: ReportModule[] = [
  {
    id: "sales",
    title: "Sales Report",
    category: "sales",
    description:
      "Property sale volume, transaction totals, and average sale price once sales reporting is connected.",
    icon: PoundSterling,
    endpoint: "Report generation API required",
    tone: "primary",
  },
  {
    id: "activity",
    title: "Client Activity Report",
    category: "activity",
    description:
      "Client engagement, interactions, and conversion activity once activity reporting is connected.",
    icon: Users,
    endpoint: "Report generation API required",
    tone: "accent",
  },
  {
    id: "performance",
    title: "Property Performance Report",
    category: "performance",
    description:
      "Listing views, leads, bookings, and performance trends once listing analytics are connected.",
    icon: Building2,
    endpoint: "Report generation API required",
    tone: "muted",
  },
  {
    id: "revenue",
    title: "Revenue Report",
    category: "revenue",
    description:
      "Revenue, transaction value, and growth reporting once financial reporting endpoints are available.",
    icon: BarChart3,
    endpoint: "Report generation API required",
    tone: "secondary",
  },
];

const toneClasses: Record<ReportModule["tone"], string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  muted: "bg-muted text-foreground",
};

const iconToneClasses: Record<ReportModule["tone"], string> = {
  primary: "border-primary-foreground/20 bg-background text-primary",
  secondary: "border-secondary-foreground/20 bg-secondary-foreground text-secondary",
  accent: "border-accent-foreground/10 bg-background text-primary",
  muted: "border-border bg-background text-primary",
};

function ReportModuleCard({ module }: { module: ReportModule }) {
  const Icon = module.icon;

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-background shadow-[0_14px_38px_rgba(37,31,18,0.06)]">
      <div className={cn("flex h-32 items-center justify-center", toneClasses[module.tone])}>
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-lg border shadow-sm",
            iconToneClasses[module.tone]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="-mt-3 rounded-t-lg bg-background p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {module.title}
            </h2>
            <Badge
              variant="outline"
              className="mt-2 rounded-md border-border bg-muted text-muted-foreground capitalize"
            >
              {module.category}
            </Badge>
          </div>
          <Badge className="rounded-md border border-border bg-muted text-foreground">
            Pending API
          </Badge>
        </div>
        <p className="min-h-[96px] text-sm leading-6 text-muted-foreground">
          {module.description}
        </p>
        <div className="mt-4 rounded-lg border border-border bg-muted p-3">
          <div className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">
            Data source
          </div>
          <div className="mt-1 text-sm font-medium text-foreground">
            {module.endpoint}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button disabled className="w-full">
            <FileText className="h-4 w-4" />
            Generate
          </Button>
          <Button disabled variant="outline" className="w-full border-border">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function ReportsPage() {
  const [reportCategory, setReportCategory] = useState<ReportCategory>("all");

  const filteredModules = useMemo(() => {
    if (reportCategory === "all") return reportModules;
    return reportModules.filter((module) => module.category === reportCategory);
  }, [reportCategory]);

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Reports"
        title="Reports"
        description="Report UI is prepared without fabricated report history. Generated reports will appear only after the real report generation and download endpoints are connected."
        badge={
          <Badge className="border border-border bg-muted text-foreground">
            No mock reports
          </Badge>
        }
      />

      <AdminPanel className="bg-background">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Report Modules
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                These cards describe the report categories this page is ready to
                support. Actions stay disabled until real report APIs exist.
              </p>
            </div>
            <Select
              value={reportCategory}
              onValueChange={(value) => setReportCategory(value as ReportCategory)}
            >
              <SelectTrigger className="h-10 w-full rounded-lg border-border bg-muted shadow-none lg:w-[220px]">
                <SelectValue placeholder="Report category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All report modules</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="activity">Client activity</SelectItem>
                <SelectItem value="performance">Property performance</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </AdminPanel>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredModules.map((module) => (
          <ReportModuleCard key={module.id} module={module} />
        ))}
      </div>

      <AdminPanel className="bg-background">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Generated Reports
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                No generated reports are shown because this project does not yet
                have a connected reports API or persisted report history.
              </p>
            </div>
            <Button disabled variant="outline" className="border-border">
              <Download className="h-4 w-4" />
              Download unavailable
            </Button>
          </div>
        </CardContent>
      </AdminPanel>
    </AdminPageShell>
  );
}
