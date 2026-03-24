"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../App-layout";
import StepIndicator from "@/components/auth/StepIndicator";
import OtpInput from "@/components/ui/OtpInput";
import { useRegisterFlowStore } from "@/store/registerFlowStore";

const otpSchema = z.object({
  code: z
    .string()
    .length(6, "OTP code must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP code must contain only digits"),
});

type OtpValues = z.infer<typeof otpSchema>;

export default function EmailVerificationPage() {
  const router = useRouter();
  const { email, emailVerified, markEmailVerified } = useRegisterFlowStore();
  const [verificationError, setVerificationError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: { code: "" },
  });

  const isValid = otpValue.length === 6 && /^\d{6}$/.test(otpValue);

  useEffect(() => {
    if (!email) {
      router.replace("/register/create-account");
    }
  }, [email, router]);

  useEffect(() => {
    if (emailVerified) {
      router.replace("/register/accept-policies");
    }
  }, [emailVerified, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError("");
    setIsVerifying(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (otpValue === "123456") {
      markEmailVerified();
      router.push("/register/accept-policies");
    } else {
      setVerificationError("Incorrect OTP code. Use 123456 for the mock.");
    }

    setIsVerifying(false);
  };

  return (
    <AuthLayout>
      <div className="space-y-5">
        <StepIndicator currentStep={3} />
        <h1 className="text-2xl font-bold text-gray-900">Email Verification</h1>
        <p className="text-sm text-gray-600">
          We have sent a 6-digit code to <strong>{email || "your email"}</strong>.
          Use <code className="rounded bg-gray-100 px-1 py-0.5">123456</code> for demo.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <OtpInput
            value={otpValue}
            onChange={setOtpValue}
            error={errors.code?.message || verificationError}
          />

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => router.push("/register/create-account")}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid || isVerifying}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isVerifying ? "Verifying..." : "Verify & Next"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
