import AuthLayout from "../App-layout";

export default function RegisterPage() {
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
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your Password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-background text-lg font-medium py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Register
        </button>
      </form>
    </AuthLayout>
  );
}
