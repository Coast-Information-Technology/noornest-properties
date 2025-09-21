"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface PropertySearchBoxProps {
  className?: string;
  containerClassName?: string;
  formClassName?: string;
  onSearch?: (searchData: SearchFormData) => void;
  onTabChange?: (tab: "sale" | "rent") => void;
  initialTab?: "sale" | "rent";
}

export interface SearchFormData {
  tab: "sale" | "rent";
  keyword: string;
  location: string;
  bedrooms: string;
  budget: string;
}

export default function PropertySearchBox({
  className = "",
  containerClassName = "",
  formClassName = "",
  onSearch,
  onTabChange,
  initialTab = "sale",
}: PropertySearchBoxProps) {
  const [tab, setTab] = useState<"sale" | "rent">(initialTab);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<SearchFormData>({
    tab: initialTab,
    keyword: "",
    location: "All Cities",
    bedrooms: "Any Bedrooms",
    budget: "Max. Price (£)",
  });

  const handleTabChange = (newTab: "sale" | "rent") => {
    setTab(newTab);
    setFormData((prev) => ({ ...prev, tab: newTab }));
    onTabChange?.(newTab);
  };

  const handleInputChange = (field: keyof SearchFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(formData);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div
      className={`relative -mt-8 md:-mt-20 z-[10] w-full px-3 sm:px-4 md:px-6 lg:px-8 ${className}`}
    >
      <div
        className={`rounded-lg shadow-lg w-full max-w-5xl mx-auto ${containerClassName}`}
      >
        {/* Tabs */}
        <div className="flex w-fit justify-center gap-2 sm:gap-3 mx-auto">
          <button
            onClick={() => handleTabChange("sale")}
            className={`flex-1 px-4 sm:px-6 md:px-8 rounded-t-[8px] sm:rounded-t-[10px] text-center font-medium text-xs sm:text-sm md:text-base ${
              tab === "sale"
                ? "border-b-2 bg-white border-primary text-primary"
                : "text-gray-500 bg-black/70"
            } focus:outline-none`}
            aria-pressed={tab === "sale"}
          >
            <span className="hidden sm:inline">For Sale</span>
            <span className="sm:hidden">Sale</span>
          </button>
          <button
            onClick={() => handleTabChange("rent")}
            className={`flex-1 px-4 sm:px-6 md:px-8 rounded-t-[8px] sm:rounded-t-[10px] text-center font-medium text-xs sm:text-sm md:text-base ${
              tab === "rent"
                ? "border-b-2 bg-white border-primary text-primary"
                : "text-gray-500 bg-black/70"
            } focus:outline-none`}
            aria-pressed={tab === "rent"}
          >
            <span className="hidden sm:inline">For Rent</span>
            <span className="sm:hidden">Rent</span>
          </button>
        </div>

        {/* Form */}
        <div className="p-3 sm:p-4 md:p-6 bg-white rounded-[8px] sm:rounded-[10px] w-full">
          {/* Desktop Layout - All fields in one row */}
          <form
            className="hidden lg:flex flex-row items-end justify-center gap-3 sm:gap-4"
            role="search"
            aria-label="Property search"
            onSubmit={handleSubmit}
          >
            {/* Search Keyword */}
            <div className="flex flex-col gap-1 sm:gap-2 w-auto">
              <label
                aria-description="search keyword"
                htmlFor="keyword"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Search Keyword
              </label>
              <input
                id="keyword"
                type="text"
                placeholder="Search Keyword"
                value={formData.keyword}
                onChange={(e) => handleInputChange("keyword", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1 sm:gap-2 w-auto min-w-[160px] xl:min-w-[180px]">
              <label
                aria-description="location"
                htmlFor="location-desktop"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <select
                id="location-desktop"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="All Cities">All Cities</option>
                <option value="London">London</option>
                <option value="Manchester">Manchester</option>
                <option value="Birmingham">Birmingham</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="flex flex-col gap-1 sm:gap-2 w-auto min-w-[140px] xl:min-w-[160px]">
              <label
                aria-description="bedrooms"
                htmlFor="bedrooms-desktop"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Bedrooms
              </label>
              <select
                id="bedrooms-desktop"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="Any Bedrooms">Any Bedrooms</option>
                <option value="1 Bedroom">1 Bedroom</option>
                <option value="2 Bedrooms">2 Bedrooms</option>
                <option value="3+ Bedrooms">3+ Bedrooms</option>
              </select>
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-1 sm:gap-2 w-auto min-w-[140px] xl:min-w-[160px]">
              <label
                aria-description="budget"
                htmlFor="budget-desktop"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Budget
              </label>
              <select
                id="budget-desktop"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="Max. Price (£)">Max. Price (£)</option>
                <option value="£500 – £1,000">£500 – £1,000</option>
                <option value="£1,000 – £5,000">£1,000 – £5,000</option>
                <option value="£5,000+">£5,000+</option>
              </select>
            </div>

            {/* Filter Button */}
            <div>
              <Button
                variant="ghost"
                type="button"
                className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm"
              >
                <SlidersHorizontal
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  aria-hidden="true"
                />
              </Button>
            </div>

            {/* Search Button */}
            <div>
              <Button
                type="submit"
                className="w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium"
              >
                <Search className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                <span className="ml-1">Search</span>
              </Button>
            </div>
          </form>

          {/* Mobile/Tablet Layout - Toggleable */}
          <form
            className="flex lg:hidden flex-col items-end justify-center gap-3 sm:gap-4"
            role="search"
            aria-label="Property search"
            onSubmit={handleSubmit}
          >
            {/* Search Keyword */}
            <div className="flex flex-col gap-1 sm:gap-2 w-full">
              <label
                aria-description="search keyword"
                htmlFor="keyword-mobile"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Search Keyword
              </label>
              <input
                id="keyword-mobile"
                type="text"
                placeholder="Search Keyword"
                value={formData.keyword}
                onChange={(e) => handleInputChange("keyword", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Search Button and Toggle */}
            <div className="flex w-full gap-3 sm:gap-4">
              <div className="flex-1">
                <Button
                  type="submit"
                  className="w-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium"
                >
                  <Search
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    aria-hidden="true"
                  />
                  <span className="ml-1">Search</span>
                </Button>
              </div>

              {/* Toggle Button for Filters */}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={toggleFormVisibility}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border-gray-300"
                >
                  <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Filters
                  {isFormVisible ? (
                    <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Additional Filters - Toggleable on Mobile/Tablet */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isFormVisible
                ? "max-h-96 opacity-100 mt-4"
                : "max-h-0 opacity-0 mt-0 overflow-hidden"
            }`}
          >
            <form
              className={`flex flex-col items-end justify-center gap-3 sm:gap-4 mt-4 ${formClassName}`}
              role="search"
              aria-label="Advanced property search"
            >
              {/* Location */}
              <div className="flex flex-col gap-1 sm:gap-2 w-full">
                <label
                  aria-description="location"
                  htmlFor="location-mobile"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <select
                  id="location-mobile"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="All Cities">All Cities</option>
                  <option value="London">London</option>
                  <option value="Manchester">Manchester</option>
                  <option value="Birmingham">Birmingham</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="flex flex-col gap-1 sm:gap-2 w-full">
                <label
                  aria-description="bedrooms"
                  htmlFor="bedrooms-mobile"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Bedrooms
                </label>
                <select
                  id="bedrooms-mobile"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    handleInputChange("bedrooms", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="Any Bedrooms">Any Bedrooms</option>
                  <option value="1 Bedroom">1 Bedroom</option>
                  <option value="2 Bedrooms">2 Bedrooms</option>
                  <option value="3+ Bedrooms">3+ Bedrooms</option>
                </select>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1 sm:gap-2 w-full">
                <label
                  aria-description="budget"
                  htmlFor="budget-mobile"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Budget
                </label>
                <select
                  id="budget-mobile"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="Max. Price (£)">Max. Price (£)</option>
                  <option value="£500 – £1,000">£500 – £1,000</option>
                  <option value="£1,000 – £5,000">£1,000 – £5,000</option>
                  <option value="£5,000+">£5,000+</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
