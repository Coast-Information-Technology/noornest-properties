import type { ReactNode } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const adminPanelClass =
  "gap-0 rounded-lg border-[#e7dfd0] bg-white py-0 shadow-[0_14px_40px_rgba(37,31,18,0.07)]";

export const adminTableShellClass =
  "overflow-x-auto rounded-lg border border-[#e7dfd0] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]";

export const adminFieldShellClass =
  "rounded-lg border border-[#e7dfd0] bg-[#fbfaf7] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]";

export const adminSuccessMessageClass =
  "rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800";

export const adminErrorMessageClass =
  "rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800";

export function AdminPageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1500px] space-y-4", className)}>
      {children}
    </div>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  badge,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  badge?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-[#e7dfd0] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(37,31,18,0.07)] sm:px-6">
      <div className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-primary" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-2">
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold leading-tight text-[#11130f] sm:text-4xl">
              {title}
            </h1>
            {badge}
          </div>
          <p className="max-w-3xl text-sm leading-6 text-[#756d5f]">
            {description}
          </p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </section>
  );
}

const metricToneClasses = {
  gold: {
    icon: "border-primary/20 bg-primary/10 text-primary",
    accent: "bg-primary",
  },
  emerald: {
    icon: "border-emerald-200 bg-emerald-50 text-emerald-700",
    accent: "bg-emerald-500",
  },
  blue: {
    icon: "border-sky-200 bg-sky-50 text-sky-700",
    accent: "bg-sky-500",
  },
  slate: {
    icon: "border-stone-200 bg-stone-50 text-stone-700",
    accent: "bg-stone-700",
  },
} as const;

export function AdminMetricCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "gold",
  featured = false,
}: {
  label: string;
  value: ReactNode;
  helper?: ReactNode;
  icon: LucideIcon;
  tone?: keyof typeof metricToneClasses;
  featured?: boolean;
}) {
  const toneClasses = metricToneClasses[tone];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border p-5 shadow-[0_14px_38px_rgba(37,31,18,0.07)]",
        featured
          ? "border-[#11130f] bg-[#11130f] text-white"
          : "border-[#e7dfd0] bg-white text-[#11130f]"
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1",
          featured ? "bg-primary" : toneClasses.accent
        )}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className={cn(
              "text-sm font-medium",
              featured ? "text-white/72" : "text-[#6b6253]"
            )}
          >
            {label}
          </p>
          <div
            className={cn(
              "mt-4 text-4xl font-semibold tracking-normal",
              featured ? "text-white" : "text-[#11130f]"
            )}
          >
            {value}
          </div>
          {helper ? (
            <p
              className={cn(
                "mt-2 text-sm leading-5",
                featured ? "text-primary" : "text-[#756d5f]"
              )}
            >
              {helper}
            </p>
          ) : null}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
            featured
              ? "border-white/15 bg-white text-[#11130f]"
              : toneClasses.icon
          )}
        >
          {featured ? (
            <ArrowUpRight className="h-5 w-5" />
          ) : (
            <Icon className="h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminPanel({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return <Card className={cn(adminPanelClass, className)} {...props} />;
}
