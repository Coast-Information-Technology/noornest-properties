"use client";

import { useState } from "react";
import {
  Briefcase,
  TrendingUp,
  TrendingDown,
  MapPin,
  PoundSterling,
  Calendar,
  Eye,
  MoreVertical,
  Search,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

// Mock data - replace with actual API calls
const mockPortfolio = [
  {
    id: 1,
    property: "High-Yield Apartment Complex",
    location: "London, UK",
    investment: 150000,
    currentValue: 165000,
    roi: 10.0,
    monthlyReturn: 1250,
    totalReturns: 15000,
    purchaseDate: "2023-01-15",
    status: "active",
    propertyType: "Apartment",
    units: 12,
    occupancyRate: 95,
  },
  {
    id: 2,
    property: "Commercial Retail Unit",
    location: "Manchester, UK",
    investment: 200000,
    currentValue: 218000,
    roi: 9.0,
    monthlyReturn: 1500,
    totalReturns: 18000,
    purchaseDate: "2022-11-20",
    status: "active",
    propertyType: "Commercial",
    units: 1,
    occupancyRate: 100,
  },
  {
    id: 3,
    property: "Residential Complex",
    location: "Birmingham, UK",
    investment: 300000,
    currentValue: 324000,
    roi: 8.0,
    monthlyReturn: 2000,
    totalReturns: 24000,
    purchaseDate: "2022-08-10",
    status: "active",
    propertyType: "Residential",
    units: 24,
    occupancyRate: 92,
  },
  {
    id: 4,
    property: "Luxury Penthouse",
    location: "Edinburgh, UK",
    investment: 250000,
    currentValue: 270000,
    roi: 8.0,
    monthlyReturn: 1667,
    totalReturns: 20000,
    purchaseDate: "2023-03-05",
    status: "active",
    propertyType: "Penthouse",
    units: 1,
    occupancyRate: 100,
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

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredPortfolio = mockPortfolio.filter((item) => {
    const matchesSearch =
      item.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesType =
      typeFilter === "all" ||
      item.propertyType.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalInvestment = mockPortfolio.reduce(
    (sum, item) => sum + item.investment,
    0
  );
  const totalCurrentValue = mockPortfolio.reduce(
    (sum, item) => sum + item.currentValue,
    0
  );
  const totalReturns = mockPortfolio.reduce(
    (sum, item) => sum + item.totalReturns,
    0
  );
  const averageROI =
    mockPortfolio.reduce((sum, item) => sum + item.roi, 0) /
    mockPortfolio.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Investment Portfolio
          </h1>
          <p className="text-gray-600">
            Manage and track your property investments
          </p>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Investment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalInvestment)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Current Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(totalCurrentValue)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              +{formatPrice(totalCurrentValue - totalInvestment)} gain
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalReturns)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageROI.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Items */}
      {filteredPortfolio.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No investments found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "No investments match your search criteria."
                : "Start investing in properties to see them here."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPortfolio.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{item.property}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">{item.status}</Badge>
                      <Badge variant="outline">{item.propertyType}</Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        View Performance
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Investment</div>
                    <div className="text-lg font-semibold">
                      {formatPrice(item.investment)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Current Value</div>
                    <div className="text-lg font-semibold text-green-600">
                      {formatPrice(item.currentValue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">ROI</div>
                    <div className="text-lg font-semibold">{item.roi}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Monthly Return</div>
                    <div className="text-lg font-semibold">
                      {formatPrice(item.monthlyReturn)}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Total Returns</div>
                      <div className="font-semibold">
                        {formatPrice(item.totalReturns)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Units</div>
                      <div className="font-semibold">{item.units}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Occupancy</div>
                      <div className="font-semibold">{item.occupancyRate}%</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-500 mb-1">Purchase Date</div>
                  <div className="text-sm">{formatDate(item.purchaseDate)}</div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analytics
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

