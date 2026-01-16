"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "../App-layout";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      toast.success("Reset link sent!", {
        description: "Please check your email for instructions.",
      });
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout showTabs={false}>
      <div className="mb-6">
        <Link
          href="/login"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Login
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
        <p className="text-sm text-gray-600 mt-2">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary disabled:opacity-50"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 text-lg"
          >
            {isLoading ? "Sending link..." : "Send Reset Link"}
          </Button>
        </form>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
          <p className="text-sm text-green-700">
            A password reset link has been sent to <strong>{email}</strong>.
            Please check your inbox (and spam folder) for further instructions.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsSubmitted(false)}
          >
            Try another email
          </Button>
        </div>
      )}

      <p className="mt-8 text-xs text-center text-gray-500">
        Still having trouble? <Link href="/contact" className="text-primary hover:underline font-bold">Contact Support</Link>
      </p>
    </AuthLayout>
  );
}
