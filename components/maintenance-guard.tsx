"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useMaintenanceMode } from "@/lib/maintenance-service"

interface MaintenanceGuardProps {
  children: React.ReactNode
}

export function MaintenanceGuard({ children }: MaintenanceGuardProps) {
  const { isMaintenanceMode, isLoading } = useMaintenanceMode()
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  // Ensure this only runs on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Only run on client side and after loading is complete
    if (!isClient || isLoading) return

    const isAdminPath = pathname.startsWith("/admin")
    const isMaintenancePage = pathname === "/maintenance"

    // If maintenance mode is enabled and user is not on admin or maintenance paths
    if (isMaintenanceMode && !isAdminPath && !isMaintenancePage) {
      router.push("/maintenance")
      return
    }

    // If maintenance mode is disabled and user is on maintenance page (but not admin)
    if (!isMaintenanceMode && isMaintenancePage && !isAdminPath) {
      router.push("/")
      return
    }
  }, [isMaintenanceMode, isLoading, isClient, pathname, router])

  // Show loading state or children based on client-side status
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <>{children}</>
}
