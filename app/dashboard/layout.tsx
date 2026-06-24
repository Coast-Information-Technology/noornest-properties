"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  Search,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

interface ClientDashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayoutContent({ children }: ClientDashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, isLoading, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const redirectToastShown = useRef(false);

  // Mock notifications - replace with actual data
  const notifications = 3;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully", {
      description: "You have been logged out of your account",
    });
    router.push("/login");
  };

  useEffect(() => {
    if (isLoading || redirectToastShown.current) return;

    if (!user) {
      redirectToastShown.current = true;
      toast.error("Please log in", {
        description: "You need to sign in before accessing the dashboard.",
      });
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${next}`);
      return;
    }

    if (user.role === "guest") {
      redirectToastShown.current = true;
      toast.error("Access Denied", {
        description: "Guest users do not have access to the dashboard.",
      });
      router.replace("/");
    }
  }, [isLoading, pathname, router, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f5f1]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-[#6b6253]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role === "guest") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#ecebe7] text-[#11130f]">
      {/* Sidebar */}
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={user.role}
      />

      {/* Main Content Area */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? "md:ml-28" : "md:ml-72"
        }`}>
        {/* Top Navigation Bar */}
        <header className="sticky top-3 z-30 mx-3 mt-3 rounded-lg border border-[#e7dfd0]/90 bg-white/90 shadow-[0_12px_35px_rgba(37,31,18,0.07)] backdrop-blur-xl">
          <div className="flex min-h-[4.5rem] flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            {/* Mobile menu button and Desktop sidebar toggle */}
            <div className="flex w-full items-center gap-3 sm:max-w-2xl">
              <Button
                variant="outline"
                size="icon"
                className="border-[#d8cfbc] bg-white text-[#11130f] hover:bg-[#f5efe0] md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open navigation"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hidden border-[#d8cfbc] bg-white text-[#11130f] hover:bg-[#f5efe0] md:inline-flex"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label="Toggle navigation"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative hidden flex-1 md:block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#817765]" />
                <input
                  type="search"
                  placeholder="Search dashboard"
                  className="h-11 w-full rounded-lg border border-[#e7dfd0] bg-[#f8f6f1] pl-11 pr-4 text-sm text-[#11130f] outline-none transition placeholder:text-[#9a907d] focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Right side - Search, Notifications, User Menu */}
            <div className="ml-auto flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="hidden border-[#d8cfbc] bg-white text-[#11130f] hover:bg-[#f5efe0] sm:inline-flex"
                aria-label="Messages"
              >
                <Mail className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <Button
                variant="outline"
                size="icon"
                className="relative border-[#d8cfbc] bg-white text-[#11130f] hover:bg-[#f5efe0]"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-11 cursor-pointer items-center gap-3 rounded-lg border border-[#d8cfbc] bg-white px-1.5 pr-3 shadow-sm transition hover:shadow-md">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-[#f5efe0] text-sm font-semibold text-[#11130f]">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden min-w-0 text-left md:block">
                      <span className="block max-w-36 truncate text-sm font-semibold leading-4 text-[#11130f]">
                        {user.name}
                      </span>
                      <span className="block max-w-36 truncate text-xs leading-4 text-[#756d5f]">
                        {user.email}
                      </span>
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 rounded-lg border-[#e7dfd0] shadow-[0_20px_60px_rgba(37,31,18,0.14)]"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-3 pb-4 pt-4 sm:px-4">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default function ClientDashboardLayout({
  children,
}: ClientDashboardLayoutProps) {
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}
