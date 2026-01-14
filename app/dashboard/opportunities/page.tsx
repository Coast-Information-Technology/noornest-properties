"use client";

import { useState } from "react";
import {
  TrendingUp,
  MapPin,
  PoundSterling,
  Calculator,
  Search,
  Filter,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

// Mock data - replace with actual API calls
const mockOpportunities = [
  {
    id: 1,
    property: "High-Yield Apartment Complex",
    location: "London, UK",
    price: 500000,
    investmentRequired: 150000,
    estimatedROI: 12.0,
    riskLevel: "Medium",
    bmvScore: 85,
    expectedMonthlyReturn: 1500,
    propertyType: "Apartment",
    units: 12,
    occupancyRate: 95,
    description:
      "Well-maintained apartment complex in prime London location with high occupancy rate.",
    postedDate: "2024-01-20",
  },
  {
    id: 2,
    property: "Commercial Retail Unit",
    location: "Manchester, UK",
    price: 350000,
    investmentRequired: 100000,
    estimatedROI: 9.5,
    riskLevel: "Low",
    bmvScore: 78,
    expectedMonthlyReturn: 792,
    propertyType: "Commercial",
    units: 1,
    occupancyRate: 100,
    description:
      "Prime commercial unit in busy shopping district with long-term tenant.",
    postedDate: "2024-01-18",
  },
  {
    id: 3,
    property: "Residential Development",
    location: "Birmingham, UK",
    price: 1200000,
    investmentRequired: 300000,
    estimatedROI: 11.0,
    riskLevel: "Medium",
    bmvScore: 82,
    expectedMonthlyReturn: 2750,
    propertyType: "Residential",
    units: 24,
    occupancyRate: 88,
    description:
      "New residential development with modern amenities and strong rental demand.",
    postedDate: "2024-01-15",
  },
  {
    id: 4,
    property: "Luxury Penthouse",
    location: "Edinburgh, UK",
    price: 800000,
    investmentRequired: 200000,
    estimatedROI: 10.0,
    riskLevel: "Low",
    bmvScore: 90,
    expectedMonthlyReturn: 1667,
    propertyType: "Penthouse",
    units: 1,
    occupancyRate: 100,
    description:
      "Exclusive penthouse in prestigious building with premium rental income.",
    postedDate: "2024-01-12",
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [roiFilter, setRoiFilter] = useState("all");

  const filteredOpportunities = mockOpportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk =
      riskFilter === "all" || opportunity.riskLevel.toLowerCase() === riskFilter;
    const matchesROI =
      roiFilter === "all" ||
      (roiFilter === "high" && opportunity.estimatedROI >= 10) ||
      (roiFilter === "medium" &&
        opportunity.estimatedROI >= 8 &&
        opportunity.estimatedROI < 10) ||
      (roiFilter === "low" && opportunity.estimatedROI < 8);
    return matchesSearch && matchesRisk && matchesROI;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Investment Opportunities
          </h1>
          <p className="text-gray-600">
            Discover high-potential properties for your investment portfolio
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roiFilter} onValueChange={setRoiFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="ROI" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ROI</SelectItem>
                <SelectItem value="high">High ROI (10%+)</SelectItem>
                <SelectItem value="medium">Medium ROI (8-10%)</SelectItem>
                <SelectItem value="low">Low ROI (&lt;8%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      {filteredOpportunities.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No opportunities found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "No opportunities match your search criteria."
                : "Check back later for new investment opportunities."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{opportunity.property}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          opportunity.riskLevel === "Low"
                            ? "default"
                            : opportunity.riskLevel === "Medium"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {opportunity.riskLevel} Risk
                      </Badge>
                      <Badge variant="outline">BMV: {opportunity.bmvScore}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{opportunity.description}</p>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <div className="text-xs text-gray-500">Property Price</div>
                    <div className="text-lg font-semibold">
                      {formatPrice(opportunity.price)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Investment Required</div>
                    <div className="text-lg font-semibold">
                      {formatPrice(opportunity.investmentRequired)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Estimated ROI</div>
                    <div className="text-lg font-semibold text-green-600">
                      {opportunity.estimatedROI}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Monthly Return</div>
                    <div className="text-lg font-semibold">
                      {formatPrice(opportunity.expectedMonthlyReturn)}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Units</div>
                      <div className="font-semibold">{opportunity.units}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Occupancy</div>
                      <div className="font-semibold">
                        {opportunity.occupancyRate}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Type</div>
                      <div className="font-semibold">{opportunity.propertyType}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-500 mb-1">Posted</div>
                  <div className="text-sm">{formatDate(opportunity.postedDate)}</div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button className="flex-1" size="sm">
                    <Calculator className="w-4 h-4 mr-2" />
                    Analyze
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

