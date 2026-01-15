"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Building2,
  Users,
  PoundSterling,
  TrendingUp,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with actual API calls
const mockReports = [
  {
    id: 1,
    title: "Monthly Sales Report - January 2024",
    type: "sales",
    period: "2024-01",
    generatedDate: "2024-02-01",
    status: "completed",
    propertiesSold: 12,
    totalRevenue: 5400000,
    averagePrice: 450000,
    topPerformingProperty: "Modern 3BR Apartment",
  },
  {
    id: 2,
    title: "Client Activity Report - Q4 2023",
    type: "activity",
    period: "2023-Q4",
    generatedDate: "2024-01-05",
    status: "completed",
    newClients: 45,
    totalInteractions: 234,
    conversionRate: 3.2,
    topClient: "Alice Smith",
  },
  {
    id: 3,
    title: "Property Performance Report - December 2023",
    type: "performance",
    period: "2023-12",
    generatedDate: "2024-01-02",
    status: "completed",
    totalViews: 12450,
    totalLeads: 342,
    averageViewsPerProperty: 415,
    topProperty: "Luxury Villa with Pool",
  },
  {
    id: 4,
    title: "Revenue Report - 2023 Annual",
    type: "revenue",
    period: "2023",
    generatedDate: "2024-01-15",
    status: "completed",
    totalRevenue: 12500000,
    transactions: 28,
    averageTransaction: 446429,
    growthRate: 15.2,
  },
  {
    id: 5,
    title: "Monthly Sales Report - February 2024",
    type: "sales",
    period: "2024-02",
    generatedDate: "2024-03-01",
    status: "generating",
    propertiesSold: null,
    totalRevenue: null,
    averagePrice: null,
    topPerformingProperty: null,
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

export default function ReportsPage() {
  const [reportType, setReportType] = useState("all");
  const [period, setPeriod] = useState("all");

  const filteredReports = mockReports.filter((report) => {
    const matchesType = reportType === "all" || report.type === reportType;
    const matchesPeriod = period === "all" || report.period.includes(period);
    return matchesType && matchesPeriod;
  });

  const handleGenerateReport = () => {
    // TODO: Implement report generation
    // Removed console.log for production
  };

  const handleDownloadReport = (reportId: number) => {
    // TODO: Implement report download
    // Removed console.log for production
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">
            Generate and download detailed reports about your business performance
          </p>
        </div>
        <Button onClick={handleGenerateReport}>
          <FileText className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Report Types</SelectItem>
                <SelectItem value="sales">Sales Reports</SelectItem>
                <SelectItem value="activity">Activity Reports</SelectItem>
                <SelectItem value="performance">Performance Reports</SelectItem>
                <SelectItem value="revenue">Revenue Reports</SelectItem>
              </SelectContent>
            </Select>

            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="Q1">Q1</SelectItem>
                <SelectItem value="Q2">Q2</SelectItem>
                <SelectItem value="Q3">Q3</SelectItem>
                <SelectItem value="Q4">Q4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{report.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{report.type}</Badge>
                    <Badge
                      variant={
                        report.status === "completed" ? "default" : "secondary"
                      }
                    >
                      {report.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Period: {report.period}
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Generated: {formatDate(report.generatedDate)}
                </div>
              </div>

              {report.status === "completed" && (
                <div className="pt-4 border-t space-y-2">
                  {report.type === "sales" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Properties Sold:</span>
                        <span className="font-semibold">
                          {report.propertiesSold}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Revenue:</span>
                        <span className="font-semibold">
                          {formatPrice(report.totalRevenue!)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Average Price:</span>
                        <span className="font-semibold">
                          {formatPrice(report.averagePrice!)}
                        </span>
                      </div>
                    </>
                  )}

                  {report.type === "activity" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">New Clients:</span>
                        <span className="font-semibold">{report.newClients}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Interactions:</span>
                        <span className="font-semibold">
                          {report.totalInteractions}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Conversion Rate:</span>
                        <span className="font-semibold">
                          {report.conversionRate}%
                        </span>
                      </div>
                    </>
                  )}

                  {report.type === "performance" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Views:</span>
                        <span className="font-semibold">
                          {report.totalViews?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Leads:</span>
                        <span className="font-semibold">{report.totalLeads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg Views/Property:</span>
                        <span className="font-semibold">
                          {report.averageViewsPerProperty}
                        </span>
                      </div>
                    </>
                  )}

                  {report.type === "revenue" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Revenue:</span>
                        <span className="font-semibold">
                          {formatPrice(report.totalRevenue!)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Transactions:</span>
                        <span className="font-semibold">{report.transactions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Growth Rate:</span>
                        <span className="font-semibold text-green-600">
                          {report.growthRate}%
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="pt-4 border-t">
                {report.status === "completed" ? (
                  <Button
                    className="w-full"
                    onClick={() => handleDownloadReport(report.id)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Generating...
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports found
            </h3>
            <p className="text-gray-500 mb-4">
              No reports match your filter criteria.
            </p>
            <Button onClick={handleGenerateReport}>
              Generate New Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

