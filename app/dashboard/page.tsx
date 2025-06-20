//dashboad/page.tsx
"use client"

import { useAuth } from '@/contexts/auth-context'
import { redirect } from 'next/navigation'
import { BookOpen, Clock, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from 'react'
import { getCourseById } from '@/services/courseService'

interface DashboardCourse {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  domain: 'Driving' | 'Restaurant' | 'Freelance';
}

interface CustomUser {
  name: string;
  domain: 'Driving' | 'Restaurant' | 'Freelance';
  progress?: {
    [domain: string]: {
      completedSections?: number[];
    };
  };
  language?: string;
}

const isCustomUser = (u: any): u is CustomUser =>
  u && typeof u.name === 'string' && typeof u.domain === 'string'

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const [courses, setCourses] = useState<DashboardCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      redirect('/login')
    }
  }, [loading, isAuthenticated])

  useEffect(() => {
    const fetchCourses = async () => {
      if (!isCustomUser(user)) return

      setIsLoading(true)
      try {
        const domainCourse = await getCourseById(user.domain)
        const userProgress = user.progress?.[user.domain]?.completedSections?.length || 0
        const totalSections = domainCourse.content[user.language || 'en']?.sections.length || 1
        const progress = Math.round((userProgress / totalSections) * 100)

        setCourses([{
          id: user.domain,
          title: domainCourse.course,
          progress,
          lastAccessed: new Date().toISOString().split('T')[0],
          domain: user.domain
        }])
      } catch (error) {
        console.error("Error loading courses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user && isAuthenticated) {
      fetchCourses()
    }
  }, [user, isAuthenticated])

  if (loading || !isAuthenticated || !isCustomUser(user)) {
    return <div>Loading...</div>
  }

  const typedUser = user

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {typedUser.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          {typedUser.domain === 'Driving' 
            ? "Your professional driving dashboard"
            : typedUser.domain === 'Restaurant'
            ? "Your restaurant management dashboard"
            : typedUser.domain === 'Freelance'
            ? "Your freelance business dashboard"
            : "Here's your learning progress"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Courses */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>Your {typedUser.domain} Course</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 text-center">Loading course...</div>
              ) : courses.length > 0 ? (
                <div className="divide-y">
                  {courses.map((course) => (
                    <div key={course.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {course.progress === 100 ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between mt-3 text-xs text-gray-500">
                        <span>Last accessed: {course.lastAccessed}</span>
                        <Button variant="link" size="sm" className="h-4 p-0" asChild>
                          <a href={`/dashboard/${course.id.toLowerCase()}`}>
                            Continue
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No active courses. Explore our catalog to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col gap-1" asChild>
                <a href={`/dashboard/${typedUser.domain.toLowerCase()}/quiz`}>
                  <BookOpen className="h-5 w-5" />
                  <span className="text-xs">Take Quiz</span>
                </a>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-1">
                <Clock className="h-5 w-5" />
                <span className="text-xs">Study Plan</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-1">
                <Award className="h-5 w-5" />
                <span className="text-xs">My Certificates</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-1">
                <Users className="h-5 w-5" />
                <span className="text-xs">Community</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
