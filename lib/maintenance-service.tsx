"use client"

import { useState, useEffect } from "react"

interface MaintenanceConfig {
<<<<<<< HEAD
  enabled: boolean
  message?: string
  estimatedDuration?: string
  lastUpdated?: string
}

export function useMaintenanceMode() {
  const [maintenanceConfig, setMaintenanceConfig] = useState<MaintenanceConfig>({ enabled: false })
=======
  enabled: boolean;
  message: string;
  estimatedDuration: string;
  lastUpdated: Date;
}

export function useMaintenanceMode() {
  const [maintenanceConfig, setMaintenanceConfig] = useState<MaintenanceConfig>({ enabled: false } as MaintenanceConfig)
>>>>>>> 82081f5 (update V3)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const response = await fetch("/maintenance.json", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (response.ok) {
          const config: MaintenanceConfig = await response.json()
          setMaintenanceConfig(config)
        } else {
          console.warn("Failed to fetch maintenance config, defaulting to disabled")
<<<<<<< HEAD
          setMaintenanceConfig({ enabled: false })
        }
      } catch (error) {
        console.warn("Error fetching maintenance config:", error)
        setMaintenanceConfig({ enabled: false })
=======
          setMaintenanceConfig({ enabled: false } as MaintenanceConfig)
        }
      } catch (error) {
        console.warn("Error fetching maintenance config:", error)
        setMaintenanceConfig({ enabled: false } as MaintenanceConfig)
>>>>>>> 82081f5 (update V3)
      } finally {
        setIsLoading(false)
      }
    }

    checkMaintenanceMode()

    // Check for updates every 30 seconds
    const interval = setInterval(checkMaintenanceMode, 60000)

    return () => clearInterval(interval)
  }, [])

  return {
    isMaintenanceMode: maintenanceConfig.enabled,
    maintenanceConfig,
    isLoading,
  }
}
