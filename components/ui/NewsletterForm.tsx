"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export interface NewsletterFormProps {
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => Promise<void> | void;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  showSuccessState?: boolean;
  successDuration?: number;
}

export default function NewsletterForm({
  placeholder = "Enter your email address",
  buttonText = "Subscribe Now",
  onSubmit,
  className = "",
  inputClassName = "",
  buttonClassName = "",
  showSuccessState = true,
  successDuration = 3000,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Default behavior - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
    } finally {
      setIsLoading(false);
    }

    // Reset success state after specified duration
    if (showSuccessState) {
      setTimeout(() => {
        setIsSubscribed(false);
      }, successDuration);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row text-center lg:text-left gap-2.5 sm:gap-0 justify-center ${className}`}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <input
          placeholder={placeholder}
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full sm:w-[16rem] px-4 py-3 bg-white/90 border border-white/30 rounded-l-[10px] sm:rounded-l-[10px] rounded-r-[10px] sm:rounded-r-[0px] text-black placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-primary transition-all duration-300 ${inputClassName}`}
          required
        />
      </motion.div>

      <motion.div
        className="w-full sm:w-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <button
          type="submit"
          disabled={isLoading || !email}
          className={`w-full lg:w-auto px-4 py-3 bg-primary hover:bg-primary/90 text-white border border-primary rounded-r-[10px] sm:rounded-r-[10px] rounded-l-[10px] sm:rounded-l-[0px] font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${buttonClassName}`}
        >
          {isLoading ? (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Subscribing...
            </motion.div>
          ) : isSubscribed && showSuccessState ? (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Check className="w-5 h-5" />
              Subscribed!
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">{buttonText}</div>
          )}
        </button>
      </motion.div>
    </form>
  );
}
