"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../App-layout";
import StepIndicator from "@/components/auth/StepIndicator";
import { useRegisterFlowStore } from "@/store/registerFlowStore";
import { resendVerificationEmail, verifyEmail } from "@/lib/apiServices/authServices";

export default function EmailVerificationPage() {
  const router = useRouter();
  const { email, userPublicId, emailVerified, markEmailVerified } = useRegisterFlowStore();
  const [verificationError, setVerificationError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [tokenValue, setTokenValue] = useState("");

  const tokenTrimmed = tokenValue.trim();
  const isValid = tokenTrimmed.length > 0;

  useEffect(() => {
    if (!email) {
      router.replace("/register/create-account");
    }
  }, [email, router]);

  useEffect(() => {
    if (emailVerified) {
      router.replace("/login");
    }
  }, [emailVerified, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError("");
    setResendMessage("");
    setIsVerifying(true);

    try {
      if (!userPublicId) {
        throw new Error(
          "Cannot verify email because the registration user ID is missing."
        );
      }

      if (!tokenTrimmed) {
        throw new Error("Please enter the verification token.");
      }

      await verifyEmail(userPublicId, tokenTrimmed);
      markEmailVerified();
      router.push("/login");
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
          Paste the verification token sent to <strong>{email || "your email"}</strong>.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="verificationToken"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Token
            </label>
            <input
              id="verificationToken"
              type="text"
              value={tokenValue}
              onChange={(e) => setTokenValue(e.target.value)}
              placeholder="Enter the opaque token from the email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
              autoComplete="one-time-code"
              disabled={isVerifying}
            />
            {verificationError && (
              <p className="mt-1 text-sm text-red-600">{verificationError}</p>
            )}
          </div>

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
