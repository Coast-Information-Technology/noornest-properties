"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AgentOnboardingPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    agencyName: "",
    experience: "1-3",
    specialization: "residential",
    licenseNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Agent profile verified!", {
      description: "Welcome to the team! Redirecting to dashboard...",
    });
    setTimeout(() => router.push("/dashboard"), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agent Registration</h1>
        <p className="text-gray-600 mt-2">
          Verify your professional details to start listing properties.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Agency Name
          </label>
          <input
            type="text"
            required
            placeholder="Enter your agency name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary"
            value={formData.agencyName}
            onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience
          </label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary bg-white"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          >
            <option value="1">Less than 1 year</option>
            <option value="1-3">1 - 3 years</option>
            <option value="3-5">3 - 5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialization
          </label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary bg-white"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="luxury">Luxury Estate</option>
            <option value="investment">Investment Portfolios</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional License Number
          </label>
          <input
            type="text"
            required
            placeholder="e.g. RN-12345678"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary"
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full py-6 text-lg">
          Complete Agent Setup
        </Button>
      </form>
    </div>
  );
};

export default AgentOnboardingPage;