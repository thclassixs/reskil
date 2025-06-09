"use client"

import { Trophy, Star, Award, Target, Book, Clock, Zap, Crown } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const achievements = [
  {
    id: 1,
    title: "Course Champion",
    description: "Complete 5 courses",
    progress: 60,
    icon: Trophy,
    color: "bg-yellow-100 text-yellow-600",
    unlocked: true,
    xp: 500,
  },
  {
    id: 2,
    title: "Quick Learner",
    description: "Finish a course in under 2 weeks",
    progress: 100,
    icon: Zap,
    color: "bg-blue-100 text-blue-600",
    unlocked: true,
    xp: 300,
  },
  {
    id: 3,
    title: "Study Streak",
    description: "Login for 7 consecutive days",
    progress: 85,
    icon: Star,
    color: "bg-purple-100 text-purple-600",
    unlocked: true,
    xp: 200,
  },
  {
    id: 4,
    title: "Knowledge Master",
    description: "Score 100% in 3 course tests",
    progress: 33,
    icon: Crown,
    color: "bg-indigo-100 text-indigo-600",
    unlocked: false,
    xp: 400,
  },
]

const stats = [
  { title: "Total XP", value: "2,450", icon: Star },
  { title: "Achievements", value: "12/30", icon: Trophy },
  { title: "Current Streak", value: "5 days", icon: Zap },
  { title: "Study Time", value: "45h", icon: Clock },
]

export default function AchievementsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Achievements</h1>
        <p className="text-gray-600">Track your learning milestones and earn rewards</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => {
          const Icon = achievement.icon
          return (
            <Card key={achievement.id} className={`p-6 ${!achievement.unlocked && 'opacity-75'}`}>
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${achievement.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {achievement.title}
                    </h3>
                    <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                      {achievement.xp} XP
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Rewards Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Premium Course Access", xp: "5,000", icon: Book },
            { title: "Exclusive Workshop", xp: "3,000", icon: Target },
            { title: "Certificate Bundle", xp: "2,000", icon: Award },
          ].map((reward, index) => {
            const Icon = reward.icon
            return (
              <Card key={index} className="p-6 border-2 border-dashed">
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{reward.xp} XP required</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
