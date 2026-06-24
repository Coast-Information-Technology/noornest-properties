"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Heart,
  Calendar,
  PoundSterling,
  Calculator,
  X,
  Building2,
  Users,
  FileText,
  BarChart3,
  Briefcase,
  TrendingUp,
  ClipboardList,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserRole } from "@/types";

interface SidebarProps {
  mobileMenuOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  userRole: UserRole;
}

// Role-based navigation items
const getNavigationByRole = (role: UserRole) => {
  const baseNav = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
  ];

  switch (role) {
    case "property_owner":
      return [
        ...baseNav,
        { name: "Saved Properties", href: "/dashboard/saved", icon: Heart },
        { name: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
        { name: "My Payments", href: "/dashboard/payments", icon: PoundSterling },
        { name: "BMV Analysis", href: "/dashboard/bmv", icon: Calculator },
      ];

    case "property_sourcer":
    case "agent":
      return [
        ...baseNav,
        { name: "My Listings", href: "/dashboard/listings", icon: Building2 },
        { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
        { name: "Clients", href: "/dashboard/clients", icon: Users },
        { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        { name: "Reports", href: "/dashboard/reports", icon: FileText },
      ];

    case "service_provider":
      return [
        ...baseNav,
        { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
        { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      ];

    case "investor":
      return [
        ...baseNav,
        { name: "Investment Portfolio", href: "/dashboard/portfolio", icon: Briefcase },
        { name: "BMV Analysis", href: "/dashboard/bmv", icon: Calculator },
        { name: "Investment Opportunities", href: "/dashboard/opportunities", icon: TrendingUp },
        { name: "Returns & Payouts", href: "/dashboard/payouts", icon: PoundSterling },
        { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      ];

    case "guest":
      return []; // Guests should not be in dashboard, but fail-safe to empty nav

    case "admin":
    case "super_admin":
      return [
        ...baseNav,
        { name: "Users", href: "/dashboard/admin/users", icon: Users },
        { name: "Audit Logs", href: "/dashboard/admin/audit-logs", icon: ClipboardList },
        { name: "Admin Tools", href: "/dashboard/admin/tools", icon: Settings },
        { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        { name: "Reports", href: "/dashboard/reports", icon: FileText },
      ];

    default:
      return baseNav;
  }
};

export function Sidebar({
  mobileMenuOpen,
  onClose,
  collapsed,
  userRole,
}: SidebarProps) {
  const pathname = usePathname();
  const navigation = getNavigationByRole(userRole);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 border-r border-[#e7dfd0] bg-[#fbfaf7] shadow-[10px_0_30px_rgba(37,31,18,0.08)] transform transition-all duration-300 ease-in-out md:bottom-4 md:left-4 md:top-4 md:rounded-lg md:border ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${collapsed ? "w-20" : "w-64"
        }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={`flex h-[4.75rem] items-center justify-between border-b border-[#e7dfd0] ${collapsed ? "px-4" : "px-6"
          }`}>
          {!collapsed ? (
            <Link href="/" className="flex items-center">
              <Image
                src="/noornest-logo.png"
                alt="Noornest Properties logo"
                width={100}
                height={100}
                className="h-auto w-[112px]"
              />
            </Link>
          ) : (
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e7dfd0] bg-white shadow-sm"
            >
              <Image
                src="/noornest-logo.png"
                alt="Noornest Properties logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </Link>
          )}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-[#d8cfbc] bg-white text-[#11130f] hover:bg-[#f5efe0] md:hidden"
              onClick={onClose}
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {!collapsed ? (
            <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a907d]">
              Workspace
            </div>
          ) : null}
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group relative flex items-center ${collapsed ? "justify-center px-2" : "gap-3 px-3"
                      } min-h-11 rounded-lg text-sm font-medium transition-all ${isActive
                        ? "bg-[#11130f] text-white shadow-[0_12px_28px_rgba(17,19,15,0.14)]"
                        : "text-[#645d50] hover:bg-white hover:text-[#11130f] hover:shadow-sm"
                      }`}
                    onClick={onClose}
                    title={collapsed ? item.name : undefined}
                  >
                    <item.icon
                      className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-primary" : "text-[#817765] group-hover:text-primary"}`}
                    />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                    {collapsed && (
                      <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-[#11130f] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

