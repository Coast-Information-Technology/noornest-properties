"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building2,
  MoreVertical,
  Plus,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Mock data - replace with actual API calls
const mockClients = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "+44 7123 456789",
    status: "active",
    propertiesViewed: 5,
    bookingsCount: 3,
    lastContact: "2024-01-15",
    preferredLocation: "London",
    budget: { min: 300000, max: 500000 },
    propertyType: "Apartment",
    notes: "Interested in 2-3 bedroom apartments in central London",
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+44 7987 654321",
    status: "active",
    propertiesViewed: 8,
    bookingsCount: 5,
    lastContact: "2024-01-18",
    preferredLocation: "Manchester",
    budget: { min: 200000, max: 400000 },
    propertyType: "House",
    notes: "Looking for family home with garden",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "+44 7555 112233",
    status: "new",
    propertiesViewed: 2,
    bookingsCount: 1,
    lastContact: "2024-01-20",
    preferredLocation: "Birmingham",
    budget: { min: 150000, max: 300000 },
    propertyType: "Condo",
    notes: "First-time buyer, needs guidance",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    phone: "+44 7444 556677",
    status: "inactive",
    propertiesViewed: 12,
    bookingsCount: 8,
    lastContact: "2023-12-10",
    preferredLocation: "Edinburgh",
    budget: { min: 400000, max: 700000 },
    propertyType: "Penthouse",
    notes: "High-value client, luxury properties only",
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
    month: "short",
    day: "numeric",
  });
};

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && client.status === "active") ||
      (activeTab === "new" && client.status === "new") ||
      (activeTab === "inactive" && client.status === "inactive");
    return matchesSearch && matchesStatus && matchesTab;
  });

  const activeClients = mockClients.filter((c) => c.status === "active");
  const newClients = mockClients.filter((c) => c.status === "new");
  const inactiveClients = mockClients.filter((c) => c.status === "inactive");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">
            Manage your client relationships and track their property interests
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeClients.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              New Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {newClients.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockClients.reduce((sum, c) => sum + c.bookingsCount, 0)}
            </div>
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
                  placeholder="Search clients..."
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All ({mockClients.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeClients.length})
          </TabsTrigger>
          <TabsTrigger value="new">New ({newClients.length})</TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive ({inactiveClients.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredClients.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No clients found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No clients match your search criteria."
                    : "Start adding clients to see them here."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <Card key={client.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                          <Badge
                            variant={
                              client.status === "active"
                                ? "default"
                                : client.status === "new"
                                ? "secondary"
                                : "outline"
                            }
                            className="mt-1"
                          >
                            {client.status}
                          </Badge>
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
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="w-4 h-4 mr-2" />
                            Call Client
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Meeting
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <a
                          href={`mailto:${client.email}`}
                          className="hover:text-blue-600"
                        >
                          {client.email}
                        </a>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <a
                          href={`tel:${client.phone}`}
                          className="hover:text-blue-600"
                        >
                          {client.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {client.preferredLocation}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div>
                        <div className="text-xs text-gray-500">Properties Viewed</div>
                        <div className="text-lg font-semibold">
                          {client.propertiesViewed}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Bookings</div>
                        <div className="text-lg font-semibold">
                          {client.bookingsCount}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="text-xs text-gray-500 mb-1">Budget</div>
                      <div className="text-sm font-medium">
                        {formatPrice(client.budget.min)} -{" "}
                        {formatPrice(client.budget.max)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Looking for: {client.propertyType}
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="text-xs text-gray-500 mb-1">Last Contact</div>
                      <div className="text-sm">{formatDate(client.lastContact)}</div>
                    </div>

                    {client.notes && (
                      <div className="pt-2 border-t">
                        <div className="text-xs text-gray-500 mb-1">Notes</div>
                        <div className="text-sm text-gray-700">{client.notes}</div>
                      </div>
                    )}

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm">
                        <Building2 className="w-4 h-4 mr-2" />
                        Properties
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

