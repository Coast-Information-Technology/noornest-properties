"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminPanel } from "@/components/dashboard/AdminSurface";
import { useUser } from "@/contexts/UserContext";
import { isAdminRole } from "@/lib/auth/roles";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-gray-600">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (!isAdminRole(user.role)) {
    return (
      <AdminPanel className="border-red-200 bg-red-50">
        <CardHeader className="border-b border-red-200 px-5 py-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-1 h-5 w-5 text-red-600" />
            <div>
              <CardTitle className="text-red-900">Admin Access Required</CardTitle>
              <CardDescription className="text-red-700">
                You are signed in as {user.role}, but this section requires an
                admin or super admin account.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 py-5">
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </CardContent>
      </AdminPanel>
    );
  }

  return <>{children}</>;
}
