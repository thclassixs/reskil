"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Settings {
  maintenanceMode: boolean
  signupEnabled: boolean
  defaultLanguage: string
  emailNotifications: boolean
  autoApproveUsers: boolean
  allowGuestAccess: boolean
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
  isMaintenanceMode: () => boolean
}

const defaultSettings: Settings = {
  maintenanceMode: false,
  signupEnabled: true,
  defaultLanguage: "ar",
  emailNotifications: true,
  autoApproveUsers: true,
  allowGuestAccess: false,
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem("admin_settings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.error("Failed to parse saved settings:", error)
      }
    }
  }, [])

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem("admin_settings", JSON.stringify(updatedSettings))
  }

  const isMaintenanceMode = (): boolean => {
    return settings.maintenanceMode
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isMaintenanceMode }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}