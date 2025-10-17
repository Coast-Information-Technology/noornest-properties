"use client";

import { useState } from "react";
import { Calendar, Camera, Save, Edit, Eye, EyeOff, Globe } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock user data - replace with actual API calls
const mockUserData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/avatars/john-doe.jpg",
  role: "Client",
  memberSince: "2023-06-15",
  lastLogin: "2024-01-12T10:30:00Z",
  preferences: {
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: true,
      propertyAlerts: true,
      bookingReminders: true,
      bmvUpdates: true,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: true,
      showPhone: false,
      showActivity: true,
    },
    search: {
      priceRange: { min: 200000, max: 800000 },
      propertyTypes: ["apartment", "house", "condo"],
      locations: ["Downtown", "Midtown", "Suburbs"],
      bedrooms: { min: 2, max: 4 },
      bathrooms: { min: 2, max: 3 },
    },
  },
  stats: {
    savedProperties: 12,
    completedBookings: 8,
    bmvAnalyses: 15,
    totalSearches: 45,
  },
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUserData.name,
    email: mockUserData.email,
    phone: mockUserData.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement API call to update user profile
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: mockUserData.name,
      email: mockUserData.email,
      phone: mockUserData.phone,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Overview */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
                <CardDescription>
                  Your basic account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={mockUserData.avatar}
                        alt={mockUserData.name}
                      />
                      <AvatarFallback className="text-2xl">
                        {mockUserData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {mockUserData.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {mockUserData.email}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      {mockUserData.role}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Account Stats */}
                <div className="space-y-3">
                  <h4 className="font-medium">Account Activity</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Saved Properties:</span>
                      <div className="font-medium">
                        {mockUserData.stats.savedProperties}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Bookings:</span>
                      <div className="font-medium">
                        {mockUserData.stats.completedBookings}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">BMV Analyses:</span>
                      <div className="font-medium">
                        {mockUserData.stats.bmvAnalyses}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Searches:</span>
                      <div className="font-medium">
                        {mockUserData.stats.totalSearches}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Account Info */}
                <div className="space-y-3">
                  <h4 className="font-medium">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-500">Member since:</span>
                      <span className="ml-auto font-medium">
                        {formatDate(mockUserData.memberSince)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-500">Last login:</span>
                      <span className="ml-auto font-medium">
                        {formatDateTime(mockUserData.lastLogin)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={mockUserData.role}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                {/* Password Section */}
                {isEditing && (
                  <div className="space-y-4 pt-6 border-t">
                    <h4 className="font-medium">Change Password</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "currentPassword",
                                e.target.value
                              )
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) =>
                            handleInputChange("newPassword", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about updates and activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    defaultChecked={
                      mockUserData.preferences.notifications.email
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via text message
                    </p>
                  </div>
                  <Switch
                    defaultChecked={mockUserData.preferences.notifications.sms}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    defaultChecked={mockUserData.preferences.notifications.push}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-gray-500">
                      Receive promotional content and updates
                    </p>
                  </div>
                  <Switch
                    defaultChecked={
                      mockUserData.preferences.notifications.marketing
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Property Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Get notified about new properties matching your criteria
                    </p>
                  </div>
                  <Switch
                    defaultChecked={
                      mockUserData.preferences.notifications.propertyAlerts
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Booking Reminders</Label>
                    <p className="text-sm text-gray-500">
                      Receive reminders about upcoming property viewings
                    </p>
                  </div>
                  <Switch
                    defaultChecked={
                      mockUserData.preferences.notifications.bookingReminders
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>BMV Analysis Updates</Label>
                    <p className="text-sm text-gray-500">
                      Get notified about BMV analysis results and updates
                    </p>
                  </div>
                  <Switch
                    defaultChecked={
                      mockUserData.preferences.notifications.bmvUpdates
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    defaultValue={
                      mockUserData.preferences.privacy.profileVisibility
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    Control who can see your profile information
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Email Address</Label>
                    <p className="text-sm text-gray-500">
                      Display your email address on your profile
                    </p>
                  </div>
                  <Switch
                    defaultChecked={mockUserData.preferences.privacy.showEmail}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Phone Number</Label>
                    <p className="text-sm text-gray-500">
                      Display your phone number on your profile
                    </p>
                  </div>
                  <Switch
                    defaultChecked={mockUserData.preferences.privacy.showPhone}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Activity Status</Label>
                    <p className="text-sm text-gray-500">
                      Let others see when you&apos;re online
                    </p>
                  </div>
                  <Switch
                    defaultChecked={
                      mockUserData.preferences.privacy.showActivity
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Preferences</CardTitle>
              <CardDescription>
                Set your default search criteria for property searches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min Price"
                      value={mockUserData.preferences.search.priceRange.min}
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      placeholder="Max Price"
                      value={mockUserData.preferences.search.priceRange.max}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Property Types</Label>
                  <Select defaultValue="apartment">
                    <SelectTrigger>
                      <SelectValue placeholder="Select property types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={mockUserData.preferences.search.bedrooms.min}
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={mockUserData.preferences.search.bedrooms.max}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={mockUserData.preferences.search.bathrooms.min}
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={mockUserData.preferences.search.bathrooms.max}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preferred Locations</Label>
                <Textarea
                  placeholder="Enter preferred locations (one per line)"
                  value={mockUserData.preferences.search.locations.join("\n")}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
