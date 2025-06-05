"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Mail, Calendar, User, MoreVertical } from "lucide-react"

interface AdminUser {
  id: string
  name: string
  email: string
  signupDate: string
  status: "active" | "inactive" | "suspended"
  coursesEnrolled: number
  lastLogin: string
}

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock user data
  const users: AdminUser[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      signupDate: "2024-01-15",
      status: "active",
      coursesEnrolled: 3,
      lastLogin: "2025-01-05",
    },
    {
      id: "2",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      signupDate: "2024-02-20",
      status: "active",
      coursesEnrolled: 2,
      lastLogin: "2025-01-04",
    },
    {
      id: "3",
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      signupDate: "2024-03-10",
      status: "inactive",
      coursesEnrolled: 1,
      lastLogin: "2024-12-20",
    },
    {
      id: "4",
      name: "John Smith",
      email: "john.smith@email.com",
      signupDate: "2024-01-05",
      status: "active",
      coursesEnrolled: 5,
      lastLogin: "2025-01-05",
    },
    {
      id: "5",
      name: "Fatima Al-Zahra",
      email: "fatima.alzahra@email.com",
      signupDate: "2024-04-12",
      status: "suspended",
      coursesEnrolled: 0,
      lastLogin: "2024-11-15",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage your platform users</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Total: {users.length} users</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Courses</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Signup Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(user.status)} capitalize`}>{user.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 font-medium">{user.coursesEnrolled}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(user.signupDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600">{new Date(user.lastLogin).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-4">
                      <EnhancedButton variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </EnhancedButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
