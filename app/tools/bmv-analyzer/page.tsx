"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  MapPin,
  Home,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Download,
  Share2,
} from "lucide-react";
import { PropertyType, BMVAnalysisRequest } from "@/types";
import { PROPERTY_TYPES, BMV_SCORE_RANGES } from "@/constants";

export default function BMVAnalyzerPage() {
  const [formData, setFormData] = useState<BMVAnalysisRequest>({
    address: "",
    propertyType: "house",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1500,
    yearBuilt: 2010,
    additionalInfo: "",
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [maxDailyUsage] = useState(2); // Guest limit

  const handleInputChange = (field: keyof BMVAnalysisRequest, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAnalyze = async () => {
    if (dailyUsage >= maxDailyUsage) {
      alert(
        "You have reached your daily analysis limit. Please register for unlimited access."
      );
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        id: "1",
        address: formData.address,
        propertyType: formData.propertyType,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        squareFeet: formData.squareFeet,
        yearBuilt: formData.yearBuilt,
        marketValue: 450000,
        estimatedValue: 380000,
        bmvScore: 87,
        confidence: 92,
        factors: [
          {
            name: "Location Quality",
            impact: "positive",
            score: 85,
            description: "Excellent neighborhood with good amenities",
          },
          {
            name: "Property Condition",
            impact: "positive",
            score: 90,
            description: "Well-maintained property with recent updates",
          },
          {
            name: "Market Trends",
            impact: "positive",
            score: 88,
            description: "Rising market values in the area",
          },
          {
            name: "Comparable Sales",
            impact: "positive",
            score: 82,
            description: "Recent sales support higher valuation",
          },
        ],
        report: {
          summary:
            "This property shows excellent investment potential with a strong BMV score. The location is desirable, and recent market trends support higher valuations.",
          recommendations: [
            "Consider making an offer quickly as similar properties are selling fast",
            "Negotiate based on the estimated value range",
            "Factor in potential renovation costs if needed",
            "Monitor market trends for optimal timing",
          ],
          marketTrends:
            "The local market is experiencing steady growth with 8% year-over-year appreciation.",
          investmentPotential: "high" as const,
          riskAssessment: "low" as const,
        },
      };

      setAnalysisResult(mockResult);
      setDailyUsage((prev) => prev + 1);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    const range = BMV_SCORE_RANGES.find(
      (r) => score >= r.min && score <= r.max
    );
    return range?.color || "gray";
  };

  const getScoreLabel = (score: number) => {
    const range = BMV_SCORE_RANGES.find(
      (r) => score >= r.min && score <= r.max
    );
    return range?.label || "Unknown";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Calculator className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">BMV Property Analyzer</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Analyze any property to discover its true market value and
            investment potential. Get instant insights to make smarter real
            estate decisions.
          </p>

          {/* Usage Limit Warning */}
          {dailyUsage >= maxDailyUsage && (
            <div className="bg-accent border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                <p className="text-primary">
                  You've reached your daily limit ({maxDailyUsage} analyses).
                  <a href="/register" className="underline ml-1">
                    Register for unlimited access
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analysis Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Property Details</span>
              </CardTitle>
              <CardDescription>
                Enter the property information to get started with your
                analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St, City, State 12345"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) =>
                      handleInputChange("propertyType", value as PropertyType)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PROPERTY_TYPES).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    placeholder="2010"
                    value={formData.yearBuilt || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "yearBuilt",
                        parseInt(e.target.value) || undefined
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.bedrooms}
                    onChange={(e) =>
                      handleInputChange("bedrooms", parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="1"
                    max="8"
                    step="0.5"
                    value={formData.bathrooms}
                    onChange={(e) =>
                      handleInputChange("bathrooms", parseFloat(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="squareFeet">Square Feet</Label>
                  <Input
                    id="squareFeet"
                    type="number"
                    min="100"
                    max="50000"
                    value={formData.squareFeet}
                    onChange={(e) =>
                      handleInputChange("squareFeet", parseInt(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any additional details about the property..."
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    handleInputChange("additionalInfo", e.target.value)
                  }
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={
                  isAnalyzing ||
                  !formData.address ||
                  dailyUsage >= maxDailyUsage
                }
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4 mr-2" />
                    Analyze Property
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                {/* BMV Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>BMV Analysis Results</span>
                      <Badge
                        variant={
                          getScoreColor(analysisResult.bmvScore) === "green"
                            ? "default"
                            : "secondary"
                        }
                        className={`${
                          getScoreColor(analysisResult.bmvScore) === "green"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : ""
                        }`}
                      >
                        {analysisResult.bmvScore}/100
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {getScoreLabel(analysisResult.bmvScore)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>BMV Score</span>
                        <span>{analysisResult.bmvScore}%</span>
                      </div>
                      <Progress
                        value={analysisResult.bmvScore}
                        className="h-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          ${analysisResult.estimatedValue.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Estimated Value
                        </p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          ${analysisResult.marketValue.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Market Price
                        </p>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                        Potential Savings: $
                        {(
                          analysisResult.marketValue -
                          analysisResult.estimatedValue
                        ).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Investment Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Factors</CardTitle>
                    <CardDescription>
                      Key factors influencing the BMV score
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.factors.map(
                        (factor: any, index: number) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{factor.name}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground">
                                  {factor.score}%
                                </span>
                                {factor.impact === "positive" ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-red-500" />
                                )}
                              </div>
                            </div>
                            <Progress value={factor.score} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                              {factor.description}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Results
                  </Button>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Ready to Analyze?
                  </h3>
                  <p className="text-muted-foreground">
                    Fill in the property details on the left to get your BMV
                    analysis results.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Usage Information */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Daily Usage</h3>
                <p className="text-sm text-muted-foreground">
                  {dailyUsage} of {maxDailyUsage} analyses used today
                </p>
              </div>
              <div className="w-32">
                <Progress
                  value={(dailyUsage / maxDailyUsage) * 100}
                  className="h-2"
                />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="text-sm text-muted-foreground">
              <p>• Free users get {maxDailyUsage} analyses per day</p>
              <p>• Registered users get unlimited analyses</p>
              <p>
                • Premium users get ad-free experience and downloadable reports
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
