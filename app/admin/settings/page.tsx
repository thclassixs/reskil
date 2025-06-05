"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Label } from "@/components/ui/label"
import { Save, Globe, Users, Wrench, AlertTriangle } from "lucide-react"
import { useSettings } from "@/lib/settings-service"

export default function AdminSettings() {
  const { settings, updateSettings } = useSettings()
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const handleToggle = (key: keyof typeof settings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    }
    updateSettings({ [key]: !settings[key] })

    // Show immediate feedback for maintenance mode
    if (key === "maintenanceMode") {
      setSaveMessage(
        newSettings.maintenanceMode
          ? "⚠️ Maintenance mode enabled - Users will be redirected"
          : "✅ Maintenance mode disabled - Site is now accessible",
      )
      setTimeout(() => setSaveMessage(""), 5000)
    }
  }

  const handleLanguageChange = (language: string) => {
    updateSettings({ defaultLanguage: language })
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSaveMessage("✅ Settings saved successfully!")
    setIsSaving(false)

    setTimeout(() => setSaveMessage(""), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your platform configuration</p>
        </div>
        <EnhancedButton onClick={handleSave} className="flex items-center space-x-2" disabled={isSaving}>
          <Save className="h-4 w-4" />
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </EnhancedButton>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">{saveMessage}</p>
        </div>
      )}

      {/* Maintenance Mode Warning */}
      {settings.maintenanceMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <p className="text-yellow-800 font-medium">
              Maintenance mode is currently active. All non-admin users are being redirected to the maintenance page.
            </p>
          </div>
        </div>
      )}

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
                settings.maintenanceMode ? "bg-yellow-600" : "bg-gray-200"
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
