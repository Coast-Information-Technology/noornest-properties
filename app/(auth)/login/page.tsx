"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "../App-layout";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // Get the user role from the dummy credentials or context
        // Since login updates the context asynchronously, we might not have the updated user immediately here
        // For this implementation with dummy data, we can infer the role from the email for immediate redirection
        // In a real app, the login response would return the user/role

        let targetPath = "/dashboard";
        if (email.includes("guest")) {
          targetPath = "/";
        }

        toast.success("Login successful!", {
          description: email.includes("guest")
            ? "Welcome back! Redirecting to home..."
            : "Redirecting to your dashboard...",
        });

        // Redirect based on role
        setTimeout(() => {
          router.push(targetPath);
        }, 500);
      } else {
        toast.error("Login failed", {
          description: result.message || "Invalid credentials",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (role: string) => {
    const credentials = {
      super_admin: { email: "superadmin@noornest.com", password: "super123" },
      admin: { email: "admin@noornest.com", password: "admin123" },
      agent: { email: "agent@noornest.com", password: "agent123" },
      investor: { email: "investor@noornest.com", password: "investor123" },
      client: { email: "client@noornest.com", password: "client123" },
      guest: { email: "guest@noornest.com", password: "guest123" },
    };

    const creds = credentials[role as keyof typeof credentials];
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
    }
  };

  return (
    <AuthLayout>
      <h1 className="sr-only">Login to Noornest</h1>
      <p className="text-sm text-gray-600 mb-6">
        Sign in to explore verified properties, manage bookings, and access
        exclusive investment plans.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email Address"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:ring-primary focus:border-primary"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 bg-primary focus:ring-primary focus:border-primary"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-primary hover:underline font-bold"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-background text-lg font-medium py-3 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Demo Credentials Section - Development Only */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 border-t pt-6">
          <button
            type="button"
            onClick={() => setShowCredentials(!showCredentials)}
            className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium mb-3"
          >
            {showCredentials ? "Hide" : "Show"} Demo Credentials
          </button>

          {showCredentials && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 mb-3">
                Click any role below to auto-fill credentials:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => quickLogin("agent")}
                  className="px-3 py-2 text-xs bg-green-50 text-green-700 rounded-md hover:bg-green-100 border border-green-200"
                >
                  Agent
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin("investor")}
                  className="px-3 py-2 text-xs bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100 border border-yellow-200"
                >
                  Investor
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin("client")}
                  className="px-3 py-2 text-xs bg-pink-50 text-pink-700 rounded-md hover:bg-pink-100 border border-pink-200"
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin("guest")}
                  className="px-3 py-2 text-xs bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 border border-gray-200"
                >
                  Guest
                </button>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs space-y-1">
                <p className="font-semibold text-gray-700">All passwords: [role]123</p>
                <p className="text-gray-600">Example: admin123, agent123, etc.</p>
              </div>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500">
        Secure login—your data is protected with bank-level encryption.
      </p>
    </AuthLayout>
  );
}
