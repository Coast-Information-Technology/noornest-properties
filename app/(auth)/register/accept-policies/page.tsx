"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../App-layout";
import StepIndicator from "@/components/auth/StepIndicator";
import { useRegisterFlowStore } from "@/store/registerFlowStore";

const policySchema = z.object({
  accepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the policies to continue." }),
  }),
});

type PolicyValues = z.infer<typeof policySchema>;

export default function AcceptPoliciesPage() {
  const router = useRouter();
  const { emailVerified, acceptedPolicies, setAcceptedPolicies } = useRegisterFlowStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PolicyValues>({
    resolver: zodResolver(policySchema),
    mode: "onChange",
    defaultValues: { accepted: acceptedPolicies },
  });

  useEffect(() => {
    if (!emailVerified) {
      router.replace("/register/email-verification");
    }
  }, [emailVerified, router]);

  const onSubmit = (data: PolicyValues) => {
    setAcceptedPolicies(data.accepted);
    router.push("/register/done");
  };

  return (
    <AuthLayout>
      <div className="space-y-5">
        <StepIndicator currentStep={4} />
        <h1 className="text-2xl font-bold text-gray-900">Accept Policies</h1>
        <p className="text-sm text-gray-600">Accept our policies to finish onboarding.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register("accepted")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              I agree to the <a href="/terms-of-service" className="text-primary underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a>.
            </span>
          </label>

          {errors.accepted && <p className="text-sm text-red-600">{errors.accepted.message}</p>}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => router.push("/register/email-verification")}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-60"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
