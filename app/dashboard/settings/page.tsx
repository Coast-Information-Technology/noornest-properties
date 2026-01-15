"use client";

import { useState } from "react";
import { Save, Eye, EyeOff } from "lucide-react";
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
};

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState(
    mockUserData.preferences.notifications
  );
  const [privacySettings, setPrivacySettings] = useState(
    mockUserData.preferences.privacy
  );
  const [searchPreferences, setSearchPreferences] = useState(
    mockUserData.preferences.search
  );
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean | string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearchChange = (key: string, value: any) => {
    setSearchPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement API call to save settings
    // Removed console.log for production
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

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
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("email", checked)
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
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("sms", checked)
                    }
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
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("push", checked)
                    }
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
                    checked={notificationSettings.marketing}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("marketing", checked)
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
                    checked={notificationSettings.propertyAlerts}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("propertyAlerts", checked)
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
                    checked={notificationSettings.bookingReminders}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("bookingReminders", checked)
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
                    checked={notificationSettings.bmvUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("bmvUpdates", checked)
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
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) =>
                      handlePrivacyChange("profileVisibility", value)
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
                    checked={privacySettings.showEmail}
                    onCheckedChange={(checked) =>
                      handlePrivacyChange("showEmail", checked)
                    }
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
                    checked={privacySettings.showPhone}
                    onCheckedChange={(checked) =>
                      handlePrivacyChange("showPhone", checked)
                    }
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
                    checked={privacySettings.showActivity}
                    onCheckedChange={(checked) =>
                      handlePrivacyChange("showActivity", checked)
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
                      value={searchPreferences.priceRange.min}
                      onChange={(e) =>
                        handleSearchChange("priceRange", {
                          ...searchPreferences.priceRange,
                          min: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      placeholder="Max Price"
                      value={searchPreferences.priceRange.max}
                      onChange={(e) =>
                        handleSearchChange("priceRange", {
                          ...searchPreferences.priceRange,
                          max: parseInt(e.target.value) || 0,
                        })
                      }
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
                      value={searchPreferences.bedrooms.min}
                      onChange={(e) =>
                        handleSearchChange("bedrooms", {
                          ...searchPreferences.bedrooms,
                          min: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={searchPreferences.bedrooms.max}
                      onChange={(e) =>
                        handleSearchChange("bedrooms", {
                          ...searchPreferences.bedrooms,
                          max: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={searchPreferences.bathrooms.min}
                      onChange={(e) =>
                        handleSearchChange("bathrooms", {
                          ...searchPreferences.bathrooms,
                          min: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={searchPreferences.bathrooms.max}
                      onChange={(e) =>
                        handleSearchChange("bathrooms", {
                          ...searchPreferences.bathrooms,
                          max: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preferred Locations</Label>
                <Textarea
                  placeholder="Enter preferred locations (one per line)"
                  value={searchPreferences.locations.join("\n")}
                  onChange={(e) =>
                    handleSearchChange(
                      "locations",
                      e.target.value.split("\n").filter((loc) => loc.trim())
                    )
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        handlePasswordChange("currentPassword", e.target.value)
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
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      handlePasswordChange("newPassword", e.target.value)
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
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      handlePasswordChange("confirmPassword", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

