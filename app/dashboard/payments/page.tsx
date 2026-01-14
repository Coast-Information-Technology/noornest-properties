"use client";

import { useState } from "react";
import {
  PoundSterling,
  CreditCard,
  Calendar,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Download,
  Receipt,
  Building2,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Mock data - replace with actual API calls
const mockPayments = [
  {
    id: 1,
    transactionId: "TXN-2024-001",
    property: {
      id: 1,
      title: "Modern 3BR Apartment in Downtown",
      address: "123 Main Street, Downtown",
    },
    amount: 5000,
    type: "deposit",
    method: "credit_card",
    status: "completed",
    date: "2024-01-15",
    description: "Property deposit payment",
    receipt: "/receipts/txn-2024-001.pdf",
  },
  {
    id: 2,
    transactionId: "TXN-2024-002",
    property: {
      id: 2,
      title: "Luxury Villa with Pool",
      address: "456 Oak Avenue, Suburbs",
    },
    amount: 10000,
    type: "deposit",
    method: "bank_transfer",
    status: "pending",
    date: "2024-01-18",
    description: "Property deposit payment",
    receipt: null,
  },
  {
    id: 3,
    transactionId: "TXN-2024-003",
    property: {
      id: 3,
      title: "Cozy 2BR Condo",
      address: "789 Pine Street, Midtown",
    },
    amount: 2500,
    type: "installment",
    method: "credit_card",
    status: "completed",
    date: "2024-01-10",
    description: "Monthly installment payment",
    receipt: "/receipts/txn-2024-003.pdf",
  },
  {
    id: 4,
    transactionId: "TXN-2024-004",
    property: {
      id: 1,
      title: "Modern 3BR Apartment in Downtown",
      address: "123 Main Street, Downtown",
    },
    amount: 500,
    type: "fee",
    method: "credit_card",
    status: "completed",
    date: "2024-01-05",
    description: "BMV Analysis fee",
    receipt: "/receipts/txn-2024-004.pdf",
  },
  {
    id: 5,
    transactionId: "TXN-2024-005",
    property: {
      id: 4,
      title: "Penthouse with City Views",
      address: "321 Skyline Drive, Uptown",
    },
    amount: 15000,
    type: "deposit",
    method: "bank_transfer",
    status: "failed",
    date: "2024-01-12",
    description: "Property deposit payment",
    receipt: null,
  },
  {
    id: 6,
    transactionId: "TXN-2024-006",
    property: {
      id: 2,
      title: "Luxury Villa with Pool",
      address: "456 Oak Avenue, Suburbs",
    },
    amount: 10000,
    type: "installment",
    method: "credit_card",
    status: "refunded",
    date: "2024-01-08",
    description: "Refund for cancelled booking",
    receipt: "/receipts/txn-2024-006.pdf",
  },
  {
    id: 7,
    transactionId: "TXN-2024-007",
    property: {
      id: 3,
      title: "Cozy 2BR Condo",
      address: "789 Pine Street, Midtown",
    },
    amount: 300,
    type: "fee",
    method: "credit_card",
    status: "completed",
    date: "2024-01-03",
    description: "Property viewing fee",
    receipt: "/receipts/txn-2024-007.pdf",
  },
  {
    id: 8,
    transactionId: "TXN-2024-008",
    property: {
      id: 1,
      title: "Modern 3BR Apartment in Downtown",
      address: "123 Main Street, Downtown",
    },
    amount: 2500,
    type: "installment",
    method: "bank_transfer",
    status: "pending",
    date: "2024-01-20",
    description: "Monthly installment payment",
    receipt: null,
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    variant: "default" as const,
    icon: CheckCircle,
    color: "text-green-600",
  },
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    icon: Clock,
    color: "text-primary",
  },
  failed: {
    label: "Failed",
    variant: "destructive" as const,
    icon: XCircle,
    color: "text-red-600",
  },
  refunded: {
    label: "Refunded",
    variant: "outline" as const,
    icon: AlertCircle,
    color: "text-orange-600",
  },
};

const typeConfig = {
  deposit: "Deposit",
  installment: "Installment",
  fee: "Fee",
};

const methodConfig = {
  credit_card: "Credit Card",
  bank_transfer: "Bank Transfer",
  debit_card: "Debit Card",
};

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesType = typeFilter === "all" || payment.type === typeFilter;
    const matchesMethod =
      methodFilter === "all" || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesType && matchesMethod;
  });

  const allPayments = filteredPayments;
  const deposits = filteredPayments.filter((p) => p.type === "deposit");
  const installments = filteredPayments.filter((p) => p.type === "installment");
  const fees = filteredPayments.filter((p) => p.type === "fee");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusConfig = (status: keyof typeof statusConfig) => {
    return statusConfig[status];
  };

  // Calculate summary stats
  const totalPaid = mockPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = mockPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const refundedAmount = mockPayments
    .filter((p) => p.status === "refunded")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalTransactions = mockPayments.length;

  const PaymentCard = ({ payment }: { payment: (typeof mockPayments)[0] }) => {
    const paymentStatusConfig = getStatusConfig(
      payment.status as keyof typeof statusConfig
    );
    const StatusIcon = paymentStatusConfig.icon;

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {payment.property.title}
                    </h3>
                    <Badge variant={paymentStatusConfig.variant}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {paymentStatusConfig.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {payment.property.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatAmount(payment.amount)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(payment.date)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                  <p className="text-sm font-medium text-gray-900">
                    {payment.transactionId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {typeConfig[payment.type as keyof typeof typeConfig]}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                  <p className="text-sm font-medium text-gray-900">
                    {
                      methodConfig[
                        payment.method as keyof typeof methodConfig
                      ]
                    }
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {payment.description}
                  </p>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-4">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {payment.receipt && (
                  <DropdownMenuItem>
                    <Receipt className="w-4 h-4 mr-2" />
                    View Receipt
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </DropdownMenuItem>
                {payment.status === "pending" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Cancel Payment
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Payments</h1>
        <p className="text-gray-500 mt-2">
          View and manage all your payment transactions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <PoundSterling className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(totalPaid)}</div>
            <p className="text-xs text-muted-foreground">
              {mockPayments.filter((p) => p.status === "completed").length}{" "}
              completed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatAmount(pendingAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockPayments.filter((p) => p.status === "pending").length}{" "}
              pending payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunded</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatAmount(refundedAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockPayments.filter((p) => p.status === "refunded").length}{" "}
              refunded transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Search and filter your payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by property, transaction ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="installment">Installment</SelectItem>
                <SelectItem value="fee">Fee</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="debit_card">Debit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({allPayments.length})</TabsTrigger>
              <TabsTrigger value="deposits">
                Deposits ({deposits.length})
              </TabsTrigger>
              <TabsTrigger value="installments">
                Installments ({installments.length})
              </TabsTrigger>
              <TabsTrigger value="fees">Fees ({fees.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {allPayments.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No payments found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {searchTerm
                        ? "No payments match your search criteria."
                        : "You haven't made any payments yet."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {allPayments.map((payment) => (
                    <PaymentCard key={payment.id} payment={payment} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="deposits" className="mt-6">
              {deposits.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No deposits found
                    </h3>
                    <p className="text-gray-500">
                      You haven't made any deposit payments yet.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {deposits.map((payment) => (
                    <PaymentCard key={payment.id} payment={payment} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="installments" className="mt-6">
              {installments.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No installments found
                    </h3>
                    <p className="text-gray-500">
                      You haven't made any installment payments yet.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {installments.map((payment) => (
                    <PaymentCard key={payment.id} payment={payment} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="fees" className="mt-6">
              {fees.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No fees found
                    </h3>
                    <p className="text-gray-500">
                      You haven't paid any fees yet.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {fees.map((payment) => (
                    <PaymentCard key={payment.id} payment={payment} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
