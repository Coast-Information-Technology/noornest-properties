import { useState } from "react";
import Link from "next/link";
import AuthLayout from "../App-layout";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AuthLayout>
      <h1 className="sr-only">Register to Noornest</h1>
      <p className="text-sm text-gray-600 mb-6">
        Create an account to start saving properties, tracking bookings, and
        accessing investment opportunities.
      </p>

      <form className="space-y-4">
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
            placeholder="Enter your Email Address"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            placeholder="Enter your Username"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
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

        <button
          type="submit"
          className="w-full bg-primary text-background text-lg font-medium py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          Register
        </button>
      </form>
    </AuthLayout>
  );
}
