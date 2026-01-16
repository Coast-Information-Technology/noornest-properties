"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const InvestorOnboardingPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    investmentGoal: "yield",
    capitalSize: "",
    geographicFocus: "",
    riskAppetite: "balanced",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Investment profile ready!", {
      description: "Accessing exclusive deals. Redirecting to dashboard...",
    });
    setTimeout(() => router.push("/dashboard"), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Investor Insights</h1>
        <p className="text-gray-600 mt-2">
          Help us tailor our exclusive investment opportunities to your goals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Investment Goal
          </label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary bg-white"
            value={formData.investmentGoal}
            onChange={(e) => setFormData({ ...formData, investmentGoal: e.target.value })}
          >
            <option value="yield">Rental Yield (Passive Income)</option>
            <option value="equity">Equity Growth (Capital Appreciation)</option>
            <option value="bmv">BMV Deals (Flip & Profit)</option>
            <option value="diversification">Portfolio Diversification</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Capital (£)
          </label>
          <input
            type="text"
            required
            placeholder="e.g. £100,000+"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary"
            value={formData.capitalSize}
            onChange={(e) => setFormData({ ...formData, capitalSize: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Geographic Focus
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Midlands, North West UK"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary"
            value={formData.geographicFocus}
            onChange={(e) => setFormData({ ...formData, geographicFocus: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Risk Appetite
          </label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary bg-white"
            value={formData.riskAppetite}
            onChange={(e) => setFormData({ ...formData, riskAppetite: e.target.value })}
          >
            <option value="conservative">Conservative (Low Risk)</option>
            <option value="balanced">Balanced (Moderate Risk)</option>
            <option value="aggressive">Aggressive (High Return focus)</option>
          </select>
        </div>

        <Button type="submit" className="w-full py-6 text-lg">
          Access Exclusive Nests
        </Button>
      </form>
    </div>
  );
};

export default InvestorOnboardingPage;