"use client";

import { resetPassword } from "@/lib/apiServices/authServices";
import { CheckCircle, Lock, SquareCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    capital: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const router = useRouter();

  const toggleVisibility = (field: "showPassword" | "showConfirmPassword") => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Live password criteria update
    if (name === "password") {
      setPasswordCriteria({
        length: value.length >= 8,
        capital: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }

    // Live confirm password validation — even after first letter
    if (
      name === "confirmPassword" ||
      (name === "password" && updatedFormData.confirmPassword)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword:
          updatedFormData.confirmPassword &&
            updatedFormData.confirmPassword !== updatedFormData.password
            ? "Passwords do not match."
            : "",
      }));
    }

    // Clear error for current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else {
      const password = formData.password;
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long.";
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password =
          "Password must contain at least one capital letter.";
      } else if (!/[a-z]/.test(password)) {
        newErrors.password =
          "Password must contain at least one lowercase letter.";
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = "Password must contain at least one number.";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        newErrors.password =
          "Password must contain at least one special character (!@#$%^&*(),.?&quot;:{}|&lt;&gt;)";
      }
    }

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        await handleResetPassword();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      const { data, status, message } = await resetPassword(formData.password);
      setIsPasswordReset(true);
    } catch (error: any) {
      setErrors(process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? "Failed to reset password"
        : error.message || "Failed to reset password")
    }
  };

  // Show success screen after password reset
  if (isPasswordReset) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[url('/assets/authImg.jpg')] bg-cover bg-no-repeat bg-center text-gray-900 py-6 px-4 md:px-20">
        <div className="w-full max-w-md bg-white rounded-[10px] shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Password Reset Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your password has been updated. You can now log in with your new
              password.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-[10px] p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-medium text-blue-900 mb-1">
                  Security Note:
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your new password is now active</li>
                  <li>• All other devices will be logged out</li>
                  <li>• Use your new password to log in</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full bg-[#0D1140] text-white py-3 rounded-[10px] font-medium hover:bg-blue-700 text-center"
            >
              Go to Login
            </Link>

            <Link
              href="/"
              className="block w-full text-center text-[#011F72] hover:underline font-medium"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
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
        <h1 className="sr-only">Send Verification Email</h1>
        <p className="text-sm text-gray-600 mb-6">
          Forgot Password? Kindly provide your email to reset your password.
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="Enter your New Password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              placeholder="Confirm your New Password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-background text-lg font-medium py-3 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            Create New Password
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500">
          Your data is protected with bank-level encryption.
        </p>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
