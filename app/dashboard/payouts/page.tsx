"use client";

import { useState } from "react";
import {
  PoundSterling,
  Calendar,
  Download,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - replace with actual API calls
const mockPayouts = [
  {
    id: 1,
    property: "High-Yield Apartment Complex",
    amount: 1250,
    date: "2024-01-01",
    status: "completed",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-2024-001",
    period: "December 2023",
  },
  {
    id: 2,
    property: "Commercial Retail Unit",
    amount: 1500,
    date: "2024-01-01",
    status: "completed",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-2024-002",
    period: "December 2023",
  },
  {
    id: 3,
    property: "Residential Complex",
    amount: 2000,
    date: "2024-01-01",
    status: "completed",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-2024-003",
    period: "December 2023",
  },
  {
    id: 4,
    property: "Luxury Penthouse",
    amount: 1667,
    date: "2024-01-01",
    status: "completed",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-2024-004",
    period: "December 2023",
  },
  {
    id: 5,
    property: "High-Yield Apartment Complex",
    amount: 1250,
    date: "2024-02-01",
    status: "pending",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-2024-005",
    period: "January 2024",
  },
  {
    id: 6,
    property: "Commercial Retail Unit",
    amount: 1500,
    date: "2024-02-01",
    status: "pending",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-2024-006",
    period: "January 2024",
  },
  {
    id: 7,
    property: "Residential Complex",
    amount: 2000,
    date: "2024-02-01",
    status: "failed",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-2024-007",
    period: "January 2024",
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function PayoutsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredPayouts = mockPayouts.filter((payout) => {
    const matchesSearch =
      payout.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payout.status === statusFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "completed" && payout.status === "completed") ||
      (activeTab === "pending" && payout.status === "pending") ||
      (activeTab === "failed" && payout.status === "failed");
    return matchesSearch && matchesStatus && matchesTab;
  });

  const completedPayouts = mockPayouts.filter((p) => p.status === "completed");
  const pendingPayouts = mockPayouts.filter((p) => p.status === "pending");
  const failedPayouts = mockPayouts.filter((p) => p.status === "failed");

  const totalCompleted = completedPayouts.reduce(
    (sum, p) => sum + p.amount,
    0
  );
  const totalPending = pendingPayouts.reduce((sum, p) => sum + p.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "pending":
        return Clock;
      case "failed":
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Returns & Payouts</h1>
          <p className="text-gray-600">
            Track your investment returns and payout history
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(totalCompleted)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {completedPayouts.length} transactions
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending Payouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(totalPending)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {pendingPayouts.length} transactions
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(
                mockPayouts
                  .filter((p) => p.date.startsWith("2024-02"))
                  .reduce((sum, p) => sum + p.amount, 0)
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">February 2024</div>
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
                  placeholder="Search payouts..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payouts Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({mockPayouts.length})</TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedPayouts.length})
          </TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingPayouts.length})</TabsTrigger>
          <TabsTrigger value="failed">Failed ({failedPayouts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredPayouts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <PoundSterling className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No payouts found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No payouts match your search criteria."
                    : "Your payout history will appear here."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPayouts.map((payout) => {
                const StatusIcon = getStatusIcon(payout.status);
                return (
                  <Card key={payout.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <PoundSterling className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{payout.property}</h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(payout.date)}
                              </div>
                              <div>Period: {payout.period}</div>
                              <div>ID: {payout.transactionId}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              {formatPrice(payout.amount)}
                            </div>
                            <Badge
                              variant={getStatusVariant(payout.status) as any}
                              className="mt-2 flex items-center"
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {payout.status}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

