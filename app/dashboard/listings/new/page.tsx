"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PoundSterling,
  Upload,
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuillEditor from "@/components/ui/QuillEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NewListingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    city: "",
    postcode: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    propertyType: "",
    status: "draft",
    description: "",
    features: [] as string[],
  });
  const [newFeature, setNewFeature] = useState("");

  const tabs = ["basic", "details", "media"];
  const currentTabIndex = tabs.indexOf(activeTab);

  const handleNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1]);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create property listing
    // Removed console.log for production
    // Navigate back to listings page after successful submission
    router.push("/dashboard/listings");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/listings">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Listings
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Post New Property</h1>
          <p className="text-gray-600">
            Fill in the details to create a new property listing
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
          <CardDescription>
            Provide all the necessary details about your property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="media">Media & Features</TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Modern 3BR Apartment"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) =>
                        handleInputChange("propertyType", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="e.g., 123 Main Street"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="e.g., London"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode *</Label>
                    <Input
                      id="postcode"
                      value={formData.postcode}
                      onChange={(e) =>
                        handleInputChange("postcode", e.target.value)
                      }
                      placeholder="e.g., SW1A 1AA"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="450000"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms *</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) =>
                        handleInputChange("bedrooms", e.target.value)
                      }
                      placeholder="3"
                      min="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms *</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) =>
                        handleInputChange("bathrooms", e.target.value)
                      }
                      placeholder="2"
                      min="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Square Feet *</Label>
                    <Input
                      id="sqft"
                      type="number"
                      value={formData.sqft}
                      onChange={(e) => handleInputChange("sqft", e.target.value)}
                      placeholder="1200"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <QuillEditor
                    value={formData.description}
                    onChange={(value) => handleInputChange("description", value)}
                    placeholder="Describe the property in detail..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              {/* Media & Features Tab */}
              <TabsContent value="media" className="space-y-4">
                <div className="space-y-2">
                  <Label>Property Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB (max 10 images)
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      Select Images
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Features & Amenities</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="e.g., Parking, Pool, Gym"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddFeature}>
                      Add
                    </Button>
                  </div>
                  {formData.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {feature}
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center gap-2 pt-4 border-t">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentTabIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentTabIndex === tabs.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/listings")}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Listing</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

