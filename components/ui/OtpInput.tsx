"use client";

import { useEffect, useRef, useState } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function OtpInput({ value, onChange, error }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize OTP array from value
    const digits = value.split("").slice(0, 6);
    const newOtp = [...digits, ...Array(6 - digits.length).fill("")];
    setOtp(newOtp);
  }, [value]);

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = inputValue.slice(-1); // Take only the last character
    setOtp(newOtp);

    // Combine all digits into a single string
    const combinedValue = newOtp.join("");
    onChange(combinedValue);

    // Auto-focus next input
    if (inputValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (pasteData) {
      const newOtp = pasteData.split("").concat(Array(6 - pasteData.length).fill(""));
      setOtp(newOtp);
      onChange(newOtp.join(""));

      // Focus the next empty input or the last input
      const nextIndex = Math.min(pasteData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        OTP Code
      </label>
      <div className="flex gap-2 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              error
                ? "border-red-300 focus:border-red-500"
                : digit
                ? "border-primary bg-primary/5"
                : "border-gray-300 focus:border-primary"
            }`}
            maxLength={1}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </div>
  );
}
