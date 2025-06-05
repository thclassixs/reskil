"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSettings } from "@/lib/settings-service"
import { useAuth } from "@/lib/auth-context"

interface MaintenanceGuardProps {
  children: React.ReactNode
}

export function MaintenanceGuard({ children }: MaintenanceGuardProps) {
  const { isMaintenanceMode } = useSettings()
  const { checkAuth } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isAdmin = checkAuth()
    const isMaintenancePage = pathname === "/maintenance"
    const isAdminRoute = pathname.startsWith("/admin")

    // If maintenance mode is on and user is not admin and not already on maintenance page
    if (isMaintenanceMode() && !isAdmin && !isMaintenancePage && !isAdminRoute) {
      router.push("/maintenance")
    }

    // If maintenance mode is off and user is on maintenance page, redirect to home
    if (!isMaintenanceMode() && isMaintenancePage) {
      router.push("/")
    }
  }, [isMaintenanceMode, checkAuth, router, pathname])

  return <>{children}</>
}
