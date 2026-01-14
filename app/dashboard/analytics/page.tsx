"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Building2,
  Users,
  Calendar,
  PoundSterling,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";

// Mock data - replace with actual API calls
const mockAgentAnalytics = {
  overview: {
    totalViews: 12450,
    viewsChange: 12.5,
    totalLeads: 342,
    leadsChange: 8.3,
    conversionRate: 2.75,
    conversionChange: -0.5,
    revenue: 125000,
    revenueChange: 15.2,
  },
  propertyPerformance: [
    {
      id: 1,
      title: "Modern 3BR Apartment",
      views: 1245,
      leads: 34,
      bookings: 8,
      conversionRate: 0.64,
    },
    {
      id: 2,
      title: "Luxury Villa with Pool",
      views: 980,
      leads: 28,
      bookings: 6,
      conversionRate: 0.61,
    },
    {
      id: 3,
      title: "Cozy 2BR Condo",
      views: 756,
      leads: 19,
      bookings: 4,
      conversionRate: 0.53,
    },
  ],
  monthlyStats: [
    { month: "Jan", views: 3200, leads: 89, bookings: 12 },
    { month: "Feb", views: 3800, leads: 105, bookings: 15 },
    { month: "Mar", views: 4200, leads: 118, bookings: 18 },
    { month: "Apr", views: 4500, leads: 125, bookings: 20 },
  ],
};

const mockInvestorAnalytics = {
  overview: {
    totalPortfolioValue: 1200000,
    valueChange: 5.2,
    monthlyReturns: 8500,
    returnsChange: 12.3,
    activeInvestments: 7,
    investmentsChange: 2,
    averageROI: 8.5,
    roiChange: 0.8,
  },
  investmentPerformance: [
    {
      id: 1,
      property: "High-Yield Apartment",
      investment: 150000,
      currentValue: 165000,
      roi: 10.0,
      monthlyReturn: 1250,
    },
    {
      id: 2,
      property: "Commercial Unit",
      investment: 200000,
      currentValue: 218000,
      roi: 9.0,
      monthlyReturn: 1500,
    },
    {
      id: 3,
      property: "Residential Complex",
      investment: 300000,
      currentValue: 324000,
      roi: 8.0,
      monthlyReturn: 2000,
    },
  ],
  monthlyReturns: [
    { month: "Jan", returns: 7200, investments: 6 },
    { month: "Feb", returns: 7800, investments: 6 },
    { month: "Mar", returns: 8200, investments: 7 },
    { month: "Apr", returns: 8500, investments: 7 },
  ],
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function AnalyticsPage() {
  const { user } = useUser();
  const [timeRange, setTimeRange] = useState("3months");

  if (!user) {
    return <div>Loading...</div>;
  }

  const isAgent = user.role === "agent";
  const analytics = isAgent ? mockAgentAnalytics : mockInvestorAnalytics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">
            {isAgent
              ? "Track your property listings performance and client engagement"
              : "Monitor your investment portfolio performance and returns"}
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isAgent ? (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.overview.totalViews.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.overview.viewsChange}% from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.overview.totalLeads}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.overview.leadsChange}% from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.overview.conversionRate}%
                </div>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <ArrowDown className="w-3 h-3 mr-1" />
                  {Math.abs(analytics.overview.conversionChange)}% from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <PoundSterling className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPrice(analytics.overview.revenue)}
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.overview.revenueChange}% from last period
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Property Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Property Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.propertyPerformance.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{property.title}</h3>
                      <div className="grid grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                        <div>
                          <span className="text-gray-500">Views:</span>{" "}
                          {property.views.toLocaleString()}
                        </div>
                        <div>
                          <span className="text-gray-500">Leads:</span> {property.leads}
                        </div>
                        <div>
                          <span className="text-gray-500">Bookings:</span>{" "}
                          {property.bookings}
                        </div>
                        <div>
                          <span className="text-gray-500">Conversion:</span>{" "}
                          {property.conversionRate}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Portfolio Value
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPrice(analytics.overview.totalPortfolioValue)}
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.overview.valueChange}% from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Returns</CardTitle>
                <PoundSterling className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPrice(analytics.overview.monthlyReturns)}
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.overview.returnsChange}% from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.overview.activeInvestments}
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +{analytics.overview.investmentsChange} from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.overview.averageROI}%
                </div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +{analytics.overview.roiChange}% from last period
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.investmentPerformance.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{investment.property}</h3>
                      <div className="grid grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                        <div>
                          <span className="text-gray-500">Investment:</span>{" "}
                          {formatPrice(investment.investment)}
                        </div>
                        <div>
                          <span className="text-gray-500">Current Value:</span>{" "}
                          {formatPrice(investment.currentValue)}
                        </div>
                        <div>
                          <span className="text-gray-500">ROI:</span>{" "}
                          {investment.roi}%
                        </div>
                        <div>
                          <span className="text-gray-500">Monthly Return:</span>{" "}
                          {formatPrice(investment.monthlyReturn)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

