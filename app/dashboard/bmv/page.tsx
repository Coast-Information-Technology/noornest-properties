"use client";

import { useState } from "react";
import {
  Search,
  TrendingUp,
  Download,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  BarChart3,
  Filter,
  MoreVertical,
  Trash2,
  Share2,
  Star,
  AlertCircle,
  CheckCircle,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { getBMVAnalyses, getBMVUsageStats } from "@/lib/mock-data";

// Mock data - replace with actual API calls
const mockBMVAnalyses = getBMVAnalyses();
const mockUsageStats = getBMVUsageStats();

export default function BMVAnalysisPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filteredAnalyses = mockBMVAnalyses
    .filter((analysis) => {
      const matchesSearch =
        analysis.property.address
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        analysis.property.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || analysis.status === statusFilter;
      const matchesScore =
        scoreFilter === "all" ||
        (scoreFilter === "high" && analysis.analysis.bmvScore >= 80) ||
        (scoreFilter === "medium" &&
          analysis.analysis.bmvScore >= 60 &&
          analysis.analysis.bmvScore < 80) ||
        (scoreFilter === "low" && analysis.analysis.bmvScore < 60);
      return matchesSearch && matchesStatus && matchesScore;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "score":
          return b.analysis.bmvScore - a.analysis.bmvScore;
        case "savings":
          return b.analysis.potentialSavings - a.analysis.potentialSavings;
        default:
          return 0;
      }
    });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-primary";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-primary";
      case "High":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const AnalysisCard = ({
    analysis,
  }: {
    analysis: (typeof mockBMVAnalyses)[0];
  }) => (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {analysis.property.address}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {analysis.property.city}, {analysis.property.state}{" "}
                {analysis.property.zipCode}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{analysis.property.bedrooms} bed</span>
                <span>{analysis.property.bathrooms} bath</span>
                <span>{analysis.property.sqft} sqft</span>
                <span>{analysis.property.yearBuilt}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={getScoreBadgeVariant(analysis.analysis.bmvScore)}>
                Score: {analysis.analysis.bmvScore}
              </Badge>
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
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(analysis.analysis.estimatedValue)}
              </div>
              <div className="text-xs text-gray-500">Estimated Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {formatPrice(analysis.analysis.marketPrice)}
              </div>
              <div className="text-xs text-gray-500">Market Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatPrice(analysis.analysis.potentialSavings)}
              </div>
              <div className="text-xs text-gray-500">Potential Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {analysis.analysis.confidence}%
              </div>
              <div className="text-xs text-gray-500">Confidence</div>
            </div>
          </div>

          {/* Investment Grade and Risk */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  Grade: {analysis.analysis.investmentGrade}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle
                  className={`w-4 h-4 ${getRiskColor(
                    analysis.analysis.riskLevel
                  )}`}
                />
                <span
                  className={`text-sm font-medium ${getRiskColor(
                    analysis.analysis.riskLevel
                  )}`}
                >
                  Risk: {analysis.analysis.riskLevel}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(analysis.createdAt)}
            </div>
          </div>

          {/* Factor Scores */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">
              Factor Analysis
            </h4>
            <div className="space-y-2">
              {analysis.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-20 text-xs text-gray-600">
                    {factor.name}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Progress value={factor.score} className="flex-1 h-2" />
                      <span className="text-xs font-medium w-8">
                        {factor.score}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 w-8">
                    {factor.weight}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {analysis.notes && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">{analysis.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button asChild className="flex-1">
              <Link href={`/dashboard/bmv/${analysis.id}`}>
                <Eye className="w-4 h-4 mr-2" />
                View Full Report
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">BMV Analysis</h1>
          <p className="text-gray-600">
            Below Market Value property analysis and investment insights
          </p>
        </div>

        <Button asChild>
          <Link href="/tools/bmv-analyzer">
            <Search className="w-4 h-4 mr-2" />
            New Analysis
          </Link>
        </Button>
      </div>

      {/* Usage Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {mockUsageStats.thisMonth}
                </div>
                <div className="text-sm text-gray-500">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {mockUsageStats.remaining}
                </div>
                <div className="text-sm text-gray-500">Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {mockUsageStats.totalAnalyses}
                </div>
                <div className="text-sm text-gray-500">Total Analyses</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Next reset</div>
              <div className="font-medium">
                {formatDate(mockUsageStats.nextReset)}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Monthly Usage</span>
              <span>
                {mockUsageStats.thisMonth} / {mockUsageStats.limit}
              </span>
            </div>
            <Progress
              value={(mockUsageStats.thisMonth / mockUsageStats.limit) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search analyses..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (80+)</SelectItem>
                  <SelectItem value="medium">Medium (60-79)</SelectItem>
                  <SelectItem value="low">Low (&lt;60)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="score">Score</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analyses List */}
      {filteredAnalyses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No analyses found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "No analyses match your search criteria."
                : "You haven't performed any BMV analyses yet."}
            </p>
            <Button asChild>
              <Link href="/tools/bmv-analyzer">Start Your First Analysis</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAnalyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      )}
    </div>
  );
}
