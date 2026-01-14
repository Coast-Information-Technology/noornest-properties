"use client";

import {
  Heart,
  Calendar,
  Search,
  TrendingUp,
  MapPin,
  Clock,
  Building2,
  Users,
  DollarSign,
  FileText,
  BarChart3,
  Briefcase,
  Eye,
  Plus,
  Calculator,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { getDashboardData } from "@/lib/mock-data";

// Mock data - replace with actual API calls
const mockData = getDashboardData();

// Client Dashboard Component
function ClientDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-gold-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-200">
          Here&apos;s what&apos;s happening with your property search and
          investments.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Saved Properties
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.savedProperties}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.upcomingBookingsCount}
            </div>
            <p className="text-xs text-muted-foreground">Next: Jan 15, 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BMV Analyses</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.bmvAnalysesCount}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Searches
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.recentSearches}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Properties */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Properties</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/properties">View All</Link>
              </Button>
            </div>
            <CardDescription>
              Properties you&apos;ve recently viewed or saved
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.recentProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-500">{property.location}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">
                      {property.bedrooms} bed
                    </span>
                    <span className="text-sm text-gray-500">
                      {property.bathrooms} bath
                    </span>
                    <span className="text-sm text-gray-500">
                      {property.sqft} sqft
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <div className="text-sm font-medium text-gray-900">
                    {property.price}
                  </div>
                  <div className="flex items-center space-x-2">
                    {property.saved && (
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    )}
                    <span className="text-xs text-gray-500">
                      {property.viewed}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Bookings</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/bookings">View All</Link>
              </Button>
            </div>
            <CardDescription>Your scheduled property viewings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900">
                    {booking.property}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Agent: {booking.agent}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {booking.date} at {booking.time}
                    </span>
                  </div>
                </div>
                <Badge
                  variant={
                    booking.status === "confirmed" ? "default" : "secondary"
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* BMV Analysis Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent BMV Analyses</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/bmv">View All</Link>
            </Button>
          </div>
          <CardDescription>
            Your recent Below Market Value property analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockData.bmvAnalyses.map((analysis) => (
              <div key={analysis.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {analysis.property}
                  </h3>
                  <Badge
                    variant={
                      analysis.bmvScore >= 80
                        ? "default"
                        : analysis.bmvScore >= 60
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    Score: {analysis.bmvScore}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Estimated Value:</span>
                    <div className="font-medium">{analysis.estimatedValue}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Market Price:</span>
                    <div className="font-medium">{analysis.marketPrice}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Potential Savings:</span>
                    <div className="font-medium text-green-600">
                      {analysis.savings}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <div className="font-medium">{analysis.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-20 flex flex-col space-y-2">
              <Link href="/properties">
                <Search className="w-6 h-6" />
                <span>Search Properties</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-20 flex flex-col space-y-2"
            >
              <Link href="/tools/bmv-analyzer">
                <TrendingUp className="w-6 h-6" />
                <span>BMV Analysis</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-20 flex flex-col space-y-2"
            >
              <Link href="/dashboard/saved">
                <Heart className="w-6 h-6" />
                <span>Saved Properties</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Agent Dashboard Component
function AgentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Agent!</h1>
        <p className="text-blue-100">
          Manage your listings, bookings, and client relationships
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Next: Today, 2:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£45,200</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Listings</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/listings">View All</Link>
              </Button>
            </div>
            <CardDescription>Your recently added properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 1, title: "Modern 3BR Apartment", location: "Downtown", views: 245, status: "Active" },
              { id: 2, title: "Luxury Villa with Pool", location: "Suburbs", views: 189, status: "Active" },
              { id: 3, title: "Cozy 2BR Condo", location: "Midtown", views: 156, status: "Pending" },
            ].map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-gray-500">{listing.location}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      {listing.views} views
                    </span>
                    <Badge variant={listing.status === "Active" ? "default" : "secondary"}>
                      {listing.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Bookings</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/bookings">View All</Link>
              </Button>
            </div>
            <CardDescription>Scheduled property viewings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 1, property: "Modern 3BR Apartment", client: "John Doe", time: "Today, 2:00 PM", status: "Confirmed" },
              { id: 2, property: "Luxury Villa", client: "Jane Smith", time: "Tomorrow, 10:00 AM", status: "Pending" },
              { id: 3, property: "Cozy 2BR Condo", client: "Mike Johnson", time: "Jan 20, 3:00 PM", status: "Confirmed" },
            ].map((booking) => (
              <div
                key={booking.id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900">
                    {booking.property}
                  </h3>
                  <p className="text-sm text-gray-500">Client: {booking.client}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{booking.time}</span>
                  </div>
                </div>
                <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>
                  {booking.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-20 flex flex-col space-y-2">
              <Link href="/dashboard/listings">
                <Plus className="w-6 h-6" />
                <span>Add New Listing</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-20 flex flex-col space-y-2"
            >
              <Link href="/dashboard/clients">
                <Users className="w-6 h-6" />
                <span>Manage Clients</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-20 flex flex-col space-y-2"
            >
              <Link href="/dashboard/analytics">
                <BarChart3 className="w-6 h-6" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Investor Dashboard Component
function InvestorDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Investor!</h1>
        <p className="text-green-100">
          Track your investments, returns, and opportunities
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£2.4M</div>
            <p className="text-xs text-muted-foreground">+8.5% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">3 new this quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Returns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£24,500</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BMV Analyses</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Investment Opportunities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Investment Opportunities</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/opportunities">View All</Link>
              </Button>
            </div>
            <CardDescription>High-potential BMV properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 1, property: "Downtown Apartment Complex", bmvScore: 92, potentialROI: "18%", value: "£850K" },
              { id: 2, property: "Suburban Development", bmvScore: 87, potentialROI: "15%", value: "£1.2M" },
              { id: 3, property: "Commercial Building", bmvScore: 85, potentialROI: "22%", value: "£2.1M" },
            ].map((opportunity) => (
              <div
                key={opportunity.id}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {opportunity.property}
                  </h3>
                  <Badge variant="default">BMV: {opportunity.bmvScore}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Potential ROI:</span>
                    <div className="font-medium text-green-600">{opportunity.potentialROI}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Property Value:</span>
                    <div className="font-medium">{opportunity.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Payouts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Payouts</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/payouts">View All</Link>
              </Button>
            </div>
            <CardDescription>Your investment returns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 1, property: "Downtown Apartment", amount: "£8,500", date: "Jan 15, 2024", status: "Completed" },
              { id: 2, property: "Suburban House", amount: "£12,200", date: "Jan 10, 2024", status: "Completed" },
              { id: 3, property: "Commercial Space", amount: "£15,000", date: "Jan 5, 2024", status: "Pending" },
            ].map((payout) => (
              <div
                key={payout.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {payout.property}
                  </h3>
                  <p className="text-sm text-gray-500">{payout.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    {payout.amount}
                  </div>
                  <Badge variant={payout.status === "Completed" ? "default" : "secondary"}>
                    {payout.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-20 flex flex-col space-y-2">
              <Link href="/dashboard/opportunities">
                <TrendingUp className="w-6 h-6" />
                <span>Find Opportunities</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-20 flex flex-col space-y-2"
            >
              <Link href="/dashboard/bmv">
                <Calculator className="w-6 h-6" />
                <span>BMV Analysis</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-20 flex flex-col space-y-2"
            >
              <Link href="/dashboard/portfolio">
                <Briefcase className="w-6 h-6" />
                <span>My Portfolio</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Super Admin Dashboard Component
function SuperAdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-purple-100">
          Full system control and management
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+48 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">+23 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£458K</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* System Management */}
      <Card>
        <CardHeader>
          <CardTitle>System Management</CardTitle>
          <CardDescription>Control all aspects of the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-20 flex flex-col space-y-2">
              <Link href="/admin/users">
                <Users className="w-6 h-6" />
                <span>Manage Users</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col space-y-2">
              <Link href="/admin/properties">
                <Building2 className="w-6 h-6" />
                <span>Manage Properties</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col space-y-2">
              <Link href="/admin/analytics">
                <BarChart3 className="w-6 h-6" />
                <span>System Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-blue-100">
          Manage properties, users, and platform content
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">+23 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">642</div>
            <p className="text-xs text-muted-foreground">75% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+48 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-20 flex flex-col space-y-2">
              <Link href="/admin/properties">
                <Building2 className="w-6 h-6" />
                <span>Manage Properties</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col space-y-2">
              <Link href="/admin/users">
                <Users className="w-6 h-6" />
                <span>Manage Users</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col space-y-2">
              <Link href="/admin/blog">
                <FileText className="w-6 h-6" />
                <span>Manage Blog</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Guest Dashboard Component
function GuestDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome, Guest!</h1>
        <p className="text-gray-100">
          Explore our properties and create an account for full access
        </p>
      </div>

      {/* Limited Access Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">Limited Access</CardTitle>
          <CardDescription className="text-yellow-700">
            You&apos;re currently browsing as a guest. Create an account to unlock all features!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/register">Create Account</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>What You Can Do</CardTitle>
          <CardDescription>Available features for guest users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="h-20 flex flex-col space-y-2">
              <Link href="/properties">
                <Search className="w-6 h-6" />
                <span>Browse Properties</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col space-y-2">
              <Link href="/tools/bmv-analyzer">
                <Calculator className="w-6 h-6" />
                <span>BMV Analyzer</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col space-y-2">
              <Link href="/blog">
                <FileText className="w-6 h-6" />
                <span>Read Blog</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Please log in to view your dashboard</div>
      </div>
    );
  }

  // Render role-based dashboard
  switch (user.role) {
    case "super_admin":
      return <SuperAdminDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "agent":
      return <AgentDashboard />;
    case "investor":
      return <InvestorDashboard />;
    case "client":
      return <ClientDashboard />;
    case "guest":
      return <GuestDashboard />;
    default:
      return <ClientDashboard />;
  }
}
