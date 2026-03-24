"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../App-layout";
import StepIndicator from "@/components/auth/StepIndicator";
import { useRegisterFlowStore } from "@/store/registerFlowStore";

type CreateAccountValues = {
  email: string;
  password: string;
};

const createAccountSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export default function CreateAccountPage() {
  const router = useRouter();
  const { role, email, setEmail } = useRegisterFlowStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateAccountValues>({
    resolver: zodResolver(createAccountSchema),
    mode: "onChange",
    defaultValues: { email: email || "", password: "" },
  });

  useEffect(() => {
    if (!role) {
      router.replace("/register/role-selection");
    }
  }, [role, router]);

  const onSubmit = (data: CreateAccountValues) => {
    setEmail(data.email);
    router.push("/register/email-verification");
  };

  return (
    <AuthLayout>
      <div className="space-y-5">
        <StepIndicator currentStep={2} />
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-sm text-gray-600">Enter your email and password.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
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
              {...register("password")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
              placeholder="At least 8 characters"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

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
              disabled={!isValid}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
