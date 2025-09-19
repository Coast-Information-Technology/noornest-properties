"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Video,
  MessageCircle,
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
import { Checkbox } from "@/components/ui/checkbox";
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
const mockBookings = [
  {
    id: 1,
    property: {
      id: 1,
      title: "Modern 3BR Apartment in Downtown",
      address: "123 Main Street, Downtown",
      image: "/properties/property-1.jpg",
      price: 450000,
    },
    agent: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@noornest.com",
      avatar: "/avatars/sarah-johnson.jpg",
    },
    date: "2024-01-15",
    time: "14:00",
    duration: 60,
    status: "confirmed",
    type: "in-person",
    notes: "Please bring ID and arrive 5 minutes early.",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
  },
  {
    id: 2,
    property: {
      id: 2,
      title: "Luxury Villa with Pool",
      address: "456 Oak Avenue, Suburbs",
      image: "/properties/property-2.jpg",
      price: 850000,
    },
    agent: {
      name: "Mike Chen",
      phone: "+1 (555) 987-6543",
      email: "mike@noornest.com",
      avatar: "/avatars/mike-chen.jpg",
    },
    date: "2024-01-18",
    time: "10:00",
    duration: 90,
    status: "pending",
    type: "virtual",
    notes: "Virtual tour via Zoom. Link will be sent 15 minutes before.",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
  },
  {
    id: 3,
    property: {
      id: 3,
      title: "Cozy 2BR Condo",
      address: "789 Pine Street, Midtown",
      image: "/properties/property-3.jpg",
      price: 320000,
    },
    agent: {
      name: "Emily Davis",
      phone: "+1 (555) 456-7890",
      email: "emily@noornest.com",
      avatar: "/avatars/emily-davis.jpg",
    },
    date: "2024-01-20",
    time: "16:30",
    duration: 45,
    status: "completed",
    type: "in-person",
    notes: "Great property, considering making an offer.",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-20",
  },
  {
    id: 4,
    property: {
      id: 4,
      title: "Penthouse with City Views",
      address: "321 Skyline Drive, Uptown",
      image: "/properties/property-4.jpg",
      price: 1200000,
    },
    agent: {
      name: "David Wilson",
      phone: "+1 (555) 321-0987",
      email: "david@noornest.com",
      avatar: "/avatars/david-wilson.jpg",
    },
    date: "2024-01-22",
    time: "11:00",
    duration: 120,
    status: "cancelled",
    type: "in-person",
    notes: "Cancelled due to scheduling conflict.",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-21",
  },
];

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    variant: "default" as const,
    icon: CheckCircle,
    color: "text-green-600",
  },
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    icon: AlertCircle,
    color: "text-primary",
  },
  completed: {
    label: "Completed",
    variant: "outline" as const,
    icon: CheckCircle,
    color: "text-blue-600",
  },
  cancelled: {
    label: "Cancelled",
    variant: "destructive" as const,
    icon: XCircle,
    color: "text-red-600",
  },
};

export default function BookingsPage() {
  const [selectedBookings, setSelectedBookings] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleSelectBooking = (bookingId: number) => {
    setSelectedBookings((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map((b) => b.id));
    }
  };

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesType = typeFilter === "all" || booking.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const upcomingBookings = filteredBookings.filter(
    (booking) => booking.status === "confirmed" || booking.status === "pending"
  );

  const pastBookings = filteredBookings.filter(
    (booking) =>
      booking.status === "completed" || booking.status === "cancelled"
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusConfig = (status: keyof typeof statusConfig) => {
    return statusConfig[status];
  };

  const BookingCard = ({ booking }: { booking: (typeof mockBookings)[0] }) => {
    const bookingStatusConfig = getStatusConfig(
      booking.status as keyof typeof statusConfig
    );
    const StatusIcon = bookingStatusConfig.icon;

    return (
      <Card className="group hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* Property Image */}
            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            {/* Booking Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {booking.property.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {booking.property.address}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatTime(booking.time)}</span>
                    </div>
                    <div className="flex items-center">
                      <span>{booking.duration} min</span>
                    </div>
                    <div className="flex items-center">
                      {booking.type === "virtual" ? (
                        <Video className="w-4 h-4 mr-1" />
                      ) : (
                        <MapPin className="w-4 h-4 mr-1" />
                      )}
                      <span className="capitalize">{booking.type}</span>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {booking.agent.name}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <a
                          href={`tel:${booking.agent.phone}`}
                          className="flex items-center hover:text-blue-600"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          {booking.agent.phone}
                        </a>
                        <a
                          href={`mailto:${booking.agent.email}`}
                          className="flex items-center hover:text-blue-600"
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {booking.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <strong>Notes:</strong> {booking.notes}
                    </p>
                  )}
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col items-end space-y-2">
                  <Badge
                    variant={bookingStatusConfig.variant}
                    className="flex items-center"
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {bookingStatusConfig.label}
                  </Badge>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(booking.property.price)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created {formatDate(booking.createdAt)}
                    </p>
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
                      <DropdownMenuItem asChild>
                        <Link href={`/properties/${booking.property.id}`}>
                          <MapPin className="w-4 h-4 mr-2" />
                          View Property
                        </Link>
                      </DropdownMenuItem>
                      {booking.status === "pending" && (
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Reschedule
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message Agent
                      </DropdownMenuItem>
                      {(booking.status === "pending" ||
                        booking.status === "confirmed") && (
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel Booking
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600">
            Manage your property viewing appointments
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/bookings/new">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Viewing
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No upcoming bookings
                </h3>
                <p className="text-gray-500 mb-4">
                  You don't have any upcoming property viewings scheduled.
                </p>
                <Button asChild>
                  <Link href="/dashboard/bookings/new">Schedule a Viewing</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedBookings.includes(booking.id)}
                    onCheckedChange={() => handleSelectBooking(booking.id)}
                  />
                  <div className="flex-1">
                    <BookingCard booking={booking} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No past bookings
                </h3>
                <p className="text-gray-500">
                  Your completed and cancelled bookings will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div key={booking.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedBookings.includes(booking.id)}
                    onCheckedChange={() => handleSelectBooking(booking.id)}
                  />
                  <div className="flex-1">
                    <BookingCard booking={booking} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
