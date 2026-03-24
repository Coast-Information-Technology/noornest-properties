"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../App-layout";
import StepIndicator from "@/components/auth/StepIndicator";
import { useRegisterFlowStore } from "@/store/registerFlowStore";

export default function RegisterDonePage() {
  const router = useRouter();
  const { role, email, acceptedPolicies, resetRegisterFlow } = useRegisterFlowStore();

  useEffect(() => {
    if (!acceptedPolicies) {
      router.replace("/register/accept-policies");
    }
  }, [acceptedPolicies, router]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      resetRegisterFlow();
      router.replace("/onboarding");
    }, 2200);

    return () => clearTimeout(timeout);
  }, [resetRegisterFlow, router]);

  return (
    <AuthLayout>
      <div className="space-y-5">
        <StepIndicator currentStep={5} />
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <h1 className="text-2xl font-bold text-green-800">Done!</h1>
          <p className="mt-2 text-gray-700">
            Welcome {role ? `${role}` : "user"}! Your email <strong>{email}</strong> is verified and policies accepted.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Redirecting to onboarding page...
          </p>

          <button
            type="button"
            onClick={() => {
              resetRegisterFlow();
              router.push("/onboarding");
            }}
            className="mt-5 rounded-md bg-primary px-4 py-2 font-medium text-background"
          >
            Go to onboarding now
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
