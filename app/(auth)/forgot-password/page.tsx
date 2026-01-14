import { SquareCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ForgotPasswordPage = () => {
    return(
        <main className="flex min-h-screen flex-col md:flex-row bg-white">
      {/* Left Section (Hero + Benefits) */}
      <section
        aria-label="Property showcase"
        className="relative hidden md:flex md:w-1/2 bg-gray-900 text-white items-center justify-center m-6 rounded-[16px]"
      >
        <div className="absolute inset-0 rounded-[16px]">
          <Image
            src="/login-image.png"
            alt="Modern brick house with warm lights"
            width={300}
            height={300}
            className="h-full w-full object-cover rounded-[16px]"
          />
        </div>
        <div
          className="absolute inset-0 bg-black/40 rounded-[16px]"
          aria-hidden="true"
        ></div>

        <div className="absolute bottom-12 p-6 max-w-2xl">
          <div className="mt-6 border-primary bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/20 rounded-lg p-4 md:px-8 md:py-6  lg:px-12 lg:py-8">
            <h2 className="text-xl font-bold">Benefits</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2 text-yellow-400">
                  <SquareCheck className="bg-primary" size={20} />
                </span>
                Save &amp; track properties and bookings
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-400">
                  <SquareCheck className="bg-primary" size={20} />
                </span>
                Access Equity / Yield / Secure / Opportunity Nests
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-400">
                  <SquareCheck className="bg-primary" size={20} />
                </span>
                Get tailored updates and expert support
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section>
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
          <Link
            href="/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot Password?
          </Link>
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
      </section>
      </main>
    )
}

export default ForgotPasswordPage;