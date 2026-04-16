"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../App-layout";
import StepIndicator from "@/components/auth/StepIndicator";
import { useRegisterFlowStore } from "@/store/registerFlowStore";

type RoleValues = {
  role:
    | "property_owner"
    | "property_sourcer"
    | "agent"
    | "investor"
    | "service_provider";
};

const roleSchema = z.object({
  role: z.enum([
    "property_owner",
    "property_sourcer",
    "agent",
    "investor",
    "service_provider",
  ]),
});

export default function RoleSelectionPage() {
  const router = useRouter();
  const { role, setRole, resetRegisterFlow } = useRegisterFlowStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RoleValues>({
    resolver: zodResolver(roleSchema),
    mode: "onChange",
    defaultValues: { role: (role as RoleValues["role"]) || "property_owner" },
  });

  useEffect(() => {
    // Reset persisted state on new register flow landing to avoid skipping OTP from stale state
    resetRegisterFlow();
  }, [resetRegisterFlow]);

  const onSubmit = (data: RoleValues) => {
    resetRegisterFlow();
    setRole(data.role);
    router.push("/register/create-account");
  };

  return (
    <AuthLayout>
      <div className="space-y-5">
        <StepIndicator currentStep={1} />
        <h1 className="text-2xl font-bold text-gray-900">Role Selection</h1>
        <p className="text-sm text-gray-600">
          Pick your role to continue the registration process.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">I am a</legend>
            <div className="mt-3 space-y-2">
              {[
                { value: "property_owner", text: "Property Owner" },
                { value: "property_sourcer", text: "Property Sourcer" },
                { value: "agent", text: "Agent" },
                { value: "investor", text: "Investor" },
                { value: "service_provider", text: "Service Provider" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center cursor-pointer rounded-md border p-3 text-sm transition hover:border-primary"
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register("role")}
                    className="mr-3 h-4 w-4 text-primary accent-primary"
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </div>
            {errors.role && (
              <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>
            )}
          </fieldset>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
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
