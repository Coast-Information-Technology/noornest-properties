"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const UserOnboardingPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "apartment",
    budget: "",
    urgency: "looking",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated!", {
      description: "Welcome to Noornest! Redirecting to dashboard...",
    });
    setTimeout(() => router.push("/dashboard"), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Noornest!</h1>
        <p className="text-gray-600 mt-2">
          Tell us what you&apos;re looking for so we can find the perfect property for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Location
          </label>
          <input
            type="text"
            required
            placeholder="e.g. London, Manchester"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary bg-white"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget Range (£)
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 300,000 - 500,000"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            I am currently...
          </label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-primary focus:border-primary bg-white"
            value={formData.urgency}
            onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
          >
            <option value="looking">Just looking</option>
            <option value="serious">Seriously interested</option>
            <option value="ready">Ready to move/buy now</option>
          </select>
        </div>

        <Button type="submit" className="w-full py-6 text-lg">
          Complete Profile
        </Button>
      </form>
    </div>
  );
};

export default UserOnboardingPage;