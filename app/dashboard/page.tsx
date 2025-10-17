import {
  Heart,
  Calendar,
  Search,
  TrendingUp,
  MapPin,
  Clock,
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
import { getDashboardData } from "@/lib/mock-data";

// Mock data - replace with actual API calls
const mockData = getDashboardData();

export default function ClientDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-blue-100">
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
