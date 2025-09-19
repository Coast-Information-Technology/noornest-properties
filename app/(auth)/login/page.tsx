import AuthLayout from "../App-layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <h1 className="sr-only">Login to Noornest</h1>
      <p className="text-sm text-gray-600 mb-6">
        Sign in to explore verified properties, manage bookings, and access
        exclusive investment plans.
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
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your Password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 bg-primary focus:ring-primary focus:border-primary"
            />
            Remember me
          </label>
          <a href="/forgot-password" className="text-primary hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-background text-lg font-medium py-3 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-500">
        Secure login—your data is protected with bank-level encryption.
      </p>
    </AuthLayout>
  );
}
