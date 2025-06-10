"use client"

import { useEffect, useState } from "react"
import { Wrench, Clock, Mail, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useMaintenanceMode } from "@/contexts/maintenance-service"
import { useRouter } from "next/navigation"

interface MaintenanceConfig {
  enabled: boolean
  message?: string
  estimatedDuration?: string
  lastUpdated?: string
}

export default function MaintenancePage() {
  const { maintenanceConfig, isMaintenanceMode } = useMaintenanceMode()
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    // If maintenance mode is disabled, redirect to home
    if (!isMaintenanceMode) {
      router.push("/")
      return
    }

    // Update time left every minute
    const updateTimeLeft = () => {
      if (maintenanceConfig.lastUpdated && maintenanceConfig.estimatedDuration) {
        const lastUpdated = new Date(maintenanceConfig.lastUpdated)
        const durationMinutes = Number.parseInt(maintenanceConfig.estimatedDuration) || 30
        const endTime = new Date(lastUpdated.getTime() + durationMinutes * 60000)
        const now = new Date()
        const diff = endTime.getTime() - now.getTime()

        if (diff > 0) {
          const minutes = Math.floor(diff / 60000)
          const seconds = Math.floor((diff % 60000) / 1000)
          setTimeLeft(`${minutes}m ${seconds}s`)
        } else {
          setTimeLeft("Soon")
        }
      }
    }

    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [maintenanceConfig, isMaintenanceMode, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Wrench className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">We'll be back soon!</h1>
            <p className="text-xl text-gray-600 mb-8">
              {maintenanceConfig.message ||
                "Reskil is currently undergoing scheduled maintenance to improve your learning experience."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3 text-gray-700">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>
                {timeLeft
                  ? `Time remaining: ${timeLeft}`
                  : `Expected downtime: ${maintenanceConfig.estimatedDuration || "30 minutes"}`}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>Questions? Contact support</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">What we're working on:</h3>
            <ul className="text-gray-700 space-y-1">
              <li>• Improving course video quality</li>
              <li>• Enhancing user experience</li>
              <li>• Adding new features</li>
              <li>• Performance optimizations</li>
            </ul>
          </div>

          <div className="text-sm text-gray-500">
            <p>Follow us on social media for real-time updates</p>
            {maintenanceConfig.lastUpdated && (
              <p className="mt-2">Last updated: {new Date(maintenanceConfig.lastUpdated).toLocaleString()}</p>
            )}
          </div>

          {/* Admin access button (hidden from regular users) */}
          <div className="mt-8">
            <Button variant="outline" onClick={() => router.push("/admin/login")} className="text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Admin Access
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
