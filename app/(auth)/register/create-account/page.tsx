"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../App-layout";
import StepIndicator from "@/components/auth/StepIndicator";
import { useRegisterFlowStore } from "@/store/registerFlowStore";
import { registerUser } from "@/lib/apiServices/authServices";

const createAccountSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
});

type CreateAccountValues = z.infer<typeof createAccountSchema>;

export default function CreateAccountPage() {
  const router = useRouter();
  const { role, email, setEmail, setUserPublicId } = useRegisterFlowStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateAccountValues>({
    resolver: zodResolver(createAccountSchema),
    mode: "onChange",
    defaultValues: {
      email: email || "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    if (!role) {
      router.replace("/register/role-selection");
    }
  }, [role, router]);

  const onSubmit = async (data: CreateAccountValues) => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await registerUser({
        email: data.email,
        role: role || "property_owner",
        password: data.password,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
      });

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Registration failed. Please try again."
        );
      }

      const userPublicId =
        response?.data?.data?.userPublicId || "";
      if (!userPublicId) {
        throw new Error("Registration succeeded but no user ID was returned.");
      }

      setEmail(data.email);
      setUserPublicId(userPublicId);
      router.push("/register/email-verification");
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-5">
        <StepIndicator currentStep={2} />
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-sm text-gray-600">
          Enter your name, email, and password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                {...register("firstName")}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                {...register("lastName")}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
              placeholder="name@domain.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
              placeholder="At least 8 characters"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => router.push("/register/role-selection")}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
