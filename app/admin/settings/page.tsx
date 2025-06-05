"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Save, AlertTriangle } from "lucide-react"
import { useMaintenanceMode } from "@/lib/maintenance-service"

interface MaintenanceConfig {
  enabled: boolean
  message: string
  estimatedDuration: string
  lastUpdated: string
}

export default function AdminSettingsPage() {
  const { maintenanceConfig, isMaintenanceMode } = useMaintenanceMode()
  const [settings, setSettings] = useState<MaintenanceConfig>({
    enabled: false,
    message: "We're currently performing scheduled maintenance to improve your experience.",
    estimatedDuration: "30 minutes",
    lastUpdated: new Date().toISOString(),
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    if (maintenanceConfig) {
      setSettings({
        enabled: maintenanceConfig.enabled || false,
        message:
          maintenanceConfig.message || "We're currently performing scheduled maintenance to improve your experience.",
        estimatedDuration: maintenanceConfig.estimatedDuration || "30 minutes",
        lastUpdated: maintenanceConfig.lastUpdated || new Date().toISOString(),
      })
    }
  }, [maintenanceConfig])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage("")

    try {
      const updatedSettings = {
        ...settings,
        lastUpdated: new Date().toISOString(),
      }

      // In a real application, this would be an API call to update the JSON file
      // For demo purposes, we'll simulate the save
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSettings(updatedSettings)
      setSaveMessage("Settings saved successfully!")

      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      setSaveMessage("Failed to save settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">System Settings</h1>
      </div>

      {isMaintenanceMode && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Maintenance mode is currently active. Regular users cannot access the website.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Mode</CardTitle>
          <CardDescription>Control website accessibility and display maintenance messages to users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Enable Maintenance Mode</Label>
              <p className="text-sm text-gray-600">
                When enabled, all users except admins will be redirected to the maintenance page
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, enabled: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Maintenance Message</Label>
            <Textarea
              id="message"
              value={settings.message}
              onChange={(e) => setSettings((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Enter the message to display to users during maintenance"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Estimated Duration</Label>
            <Input
              id="duration"
              value={settings.estimatedDuration}
              onChange={(e) => setSettings((prev) => ({ ...prev, estimatedDuration: e.target.value }))}
              placeholder="e.g., 30 minutes, 2 hours"
            />
          </div>

          {saveMessage && (
            <Alert className={saveMessage.includes("Failed") ? "border-red-200" : "border-green-200"}>
              <AlertDescription className={saveMessage.includes("Failed") ? "text-red-700" : "text-green-700"}>
                {saveMessage}
              </AlertDescription>
            </Alert>
          )}

          <Button onClick={handleSave} disabled={isSaving} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure general website settings and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">User Registration</Label>
              <p className="text-sm text-gray-600">Allow new users to register accounts</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Email Notifications</Label>
              <p className="text-sm text-gray-600">Send email notifications to users</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Auto-approve Users</Label>
              <p className="text-sm text-gray-600">Automatically approve new user registrations</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
