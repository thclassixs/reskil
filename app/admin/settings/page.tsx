"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Label } from "@/components/ui/label"
import { Save, Globe, Users, Wrench } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    signupEnabled: true,
    defaultLanguage: "en",
    emailNotifications: true,
    autoApproveUsers: true,
    allowGuestAccess: false,
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleLanguageChange = (language: string) => {
    setSettings((prev) => ({
      ...prev,
      defaultLanguage: language,
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your platform configuration</p>
        </div>
        <EnhancedButton onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </EnhancedButton>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="h-5 w-5" />
            <span>General Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Maintenance Mode</Label>
              <p className="text-sm text-gray-600">Enable maintenance mode to prevent user access</p>
            </div>
            <button
              onClick={() => handleToggle("maintenanceMode")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.maintenanceMode ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">User Signup</Label>
              <p className="text-sm text-gray-600">Allow new users to register accounts</p>
            </div>
            <button
              onClick={() => handleToggle("signupEnabled")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.signupEnabled ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.signupEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Auto-approve Users</Label>
              <p className="text-sm text-gray-600">Automatically approve new user registrations</p>
            </div>
            <button
              onClick={() => handleToggle("autoApproveUsers")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoApproveUsers ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoApproveUsers ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Language Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">Default Language</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  settings.defaultLanguage === "en"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium">English</div>
                <div className="text-sm text-gray-600">Default platform language</div>
              </button>
              <button
                onClick={() => handleLanguageChange("ar")}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  settings.defaultLanguage === "ar"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium">العربية</div>
                <div className="text-sm text-gray-600">Arabic language support</div>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>User Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Email Notifications</Label>
              <p className="text-sm text-gray-600">Send email notifications to users</p>
            </div>
            <button
              onClick={() => handleToggle("emailNotifications")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Guest Access</Label>
              <p className="text-sm text-gray-600">Allow guests to browse courses without signup</p>
            </div>
            <button
              onClick={() => handleToggle("allowGuestAccess")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.allowGuestAccess ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.allowGuestAccess ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <Label className="font-medium text-gray-900">Platform Version</Label>
              <p className="text-gray-600">v1.0.0</p>
            </div>
            <div>
              <Label className="font-medium text-gray-900">Last Updated</Label>
              <p className="text-gray-600">January 5, 2025</p>
            </div>
            <div>
              <Label className="font-medium text-gray-900">Environment</Label>
              <p className="text-gray-600">Production</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
