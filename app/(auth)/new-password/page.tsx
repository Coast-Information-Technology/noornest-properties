"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "../App-layout";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";

export default function NewPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    capital: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordCriteria({
        length: value.length >= 8,
        capital: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else {
      const { length, capital, lowercase, number, specialChar } = passwordCriteria;
      if (!length || !capital || !lowercase || !number || !specialChar) {
        newErrors.password = "Password does not meet all security requirements.";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      toast.success("Password updated!", {
        description: "Your new password is now active.",
      });
    } catch (error) {
      toast.error("Failed to reset password", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout showTabs={false}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Password Reset Successfully!
          </h2>
          <p className="text-gray-600 mb-8">
            Your password has been updated. You can now log in with your new credentials.
          </p>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary mb-1 text-sm">Security Note:</h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Your new password is now active</li>
                  <li>• All other devices will be logged out</li>
                </ul>
              </div>
            </div>
          </div>

          <Button asChild className="w-full py-6 text-lg">
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout showTabs={false}>
      <div className="mb-6">
        <Link
          href="/forgot-password"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Reset
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Password</h1>
        <p className="text-sm text-gray-600 mt-2">
          Your new password must be different from previous passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter New Password"
              className={`w-full rounded-md border ${errors.password ? "border-red-500" : "border-gray-300"
                } px-3 py-2 text-sm focus:ring-primary focus:border-primary pr-10`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Password Criteria */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <p className="text-xs font-semibold text-gray-700 mb-1">Password must include:</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "length", label: "8+ characters" },
              { key: "capital", label: "Uppercase" },
              { key: "lowercase", label: "Lowercase" },
              { key: "number", label: "Number" },
              { key: "specialChar", label: "Special character" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <CheckCircle
                  size={14}
                  className={
                    passwordCriteria[key as keyof typeof passwordCriteria]
                      ? "text-green-500"
                      : "text-gray-300"
                  }
                />
                <span
                  className={`text-[10px] ${passwordCriteria[key as keyof typeof passwordCriteria]
                      ? "text-green-700"
                      : "text-gray-500"
                    }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              className={`w-full rounded-md border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } px-3 py-2 text-sm focus:ring-primary focus:border-primary pr-10`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-6 text-lg"
        >
          {isLoading ? "Updating..." : "Create New Password"}
        </Button>
      </form>

      <p className="mt-8 text-xs text-center text-gray-500">
        Your data is protected with bank-level encryption.
      </p>
    </AuthLayout>
  );
}
