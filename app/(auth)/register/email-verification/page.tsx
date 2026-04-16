"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../App-layout";
import StepIndicator from "@/components/auth/StepIndicator";
import OtpInput from "@/components/ui/OtpInput";
import { useRegisterFlowStore } from "@/store/registerFlowStore";
import { resendVerificationEmail, verifyEmail } from "@/lib/apiServices/authServices";

export default function EmailVerificationPage() {
  const router = useRouter();
  const { email, emailVerified, markEmailVerified } = useRegisterFlowStore();
  const [verificationError, setVerificationError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpValue, setOtpValue] = useState("");

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
    setResendMessage("");
    setIsVerifying(true);

    try {
      await verifyEmail(otpValue);
      markEmailVerified();
      router.push("/register/accept-policies");
    } catch (error: any) {
      setVerificationError(error?.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setVerificationError("");
    setResendMessage("");
    setIsResending(true);

    try {
      const response = await resendVerificationEmail(email);
      setResendMessage(response?.message || "Verification email sent. Please check your inbox.");
    } catch (error: any) {
      setVerificationError(error?.message || "Could not resend verification email.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-5">
        <StepIndicator currentStep={3} />
        <h1 className="text-2xl font-bold text-gray-900">Email Verification</h1>
        <p className="text-sm text-gray-600">
          We have sent a 6-digit code to <strong>{email || "your email"}</strong>.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <OtpInput
            value={otpValue}
            onChange={setOtpValue}
            error={verificationError}
          />

          {resendMessage && <p className="text-sm text-green-600">{resendMessage}</p>}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {isResending ? "Sending..." : "Resend Code"}
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
