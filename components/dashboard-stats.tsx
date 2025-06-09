// components/dashboard-stats.tsx
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Award, Trophy } from "lucide-react"
import api from "@/lib/api"

interface DashboardStats {
  coursesInProgress: number
  totalHours: number
  certificatesEarned: number
  achievementPoints: number
  monthlyProgress: {
    courses: number
    hours: number
    certificates: number
  }
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats')
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div>Loading stats...</div>
  }

  if (!stats) {
    return <div>Failed to load stats</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
          <BookOpen className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.coursesInProgress}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.monthlyProgress.courses} courses this month
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-blue-100">
            <div className="h-2 w-3/4 rounded-full bg-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
          <Clock className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalHours}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.monthlyProgress.hours} hours from last week
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-blue-100">
            <div className="h-2 w-1/2 rounded-full bg-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
          <Award className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.monthlyProgress.certificates} certificate this month
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-blue-100">
            <div className="h-2 w-1/3 rounded-full bg-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Achievement Points</CardTitle>
          <Trophy className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.achievementPoints}</div>
          <p className="text-xs text-muted-foreground">
            +120 points this week
          </p>
          <div className="mt-4 h-2 w-full rounded-full bg-blue-100">
            <div className="h-2 w-2/3 rounded-full bg-blue-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}