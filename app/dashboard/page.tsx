// app/dashboard/page.tsx
"use client"

import { useAuth } from '@/contexts/auth-context'
import { redirect } from 'next/navigation'
import DashboardStats from '@/components/dashboard-stats'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, description: "Started the 'React Development Bootcamp'", date: "2024-08-01" },
    { id: 2, description: "Completed 'Shopify Store Mastery'", date: "2024-07-25" },
    { id: 3, description: "Reviewed 'AI Automation for Business'", date: "2024-07-20" },
  ])

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      redirect('/login')
    }
  }, [loading, isAuthenticated])

  useEffect(() => {
    // Simulate fetching recent activity from an API
    const fetchRecentActivity = async () => {
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setRecentActivity([
        { id: 1, description: "Started the 'React Development Bootcamp'", date: "2024-08-01" },
        { id: 2, description: "Completed 'Shopify Store Mastery'", date: "2024-07-25" },
        { id: 3, description: "Reviewed 'AI Automation for Business'", date: "2024-07-20" },
        { id: 4, description: "Enrolled in 'UI/UX Design Fundamentals'", date: "2024-07-15" },
      ]);
    };

    fetchRecentActivity();
  }, []);

  if (loading || !isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">Here's what's happening with your learning today</p>
      </div>

      <DashboardStats />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentActivity.map((activity) => (
            <Card key={activity.id}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{activity.description}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">Date: {activity.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}