"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye, Edit, Trash2, Filter } from "lucide-react"
import { adminService, type AdminCourse } from "@/services/admin-service"
import Link from "next/link"

export default function CoursesManagement() {
  const [courses, setCourses] = useState<AdminCourse[]>(adminService.getAllCourses())
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || course.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(courses.map((c) => c.category)))]

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      adminService.deleteCourse(courseId)
      setCourses(adminService.getAllCourses())
    }
  }

  const togglePublishStatus = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    if (course) {
      adminService.updateCourse(courseId, { isPublished: !course.isPublished })
      setCourses(adminService.getAllCourses())
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600">Manage your course catalog</p>
        </div>
        <Link href="/admin/courses/new">
          <EnhancedButton className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Course</span>
          </EnhancedButton>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                    <Badge variant={course.isPublished ? "default" : "secondary"}>
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>

                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">Price:</span> {course.price}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {course.duration}
                    </div>
                    <div>
                      <span className="font-medium">Level:</span> {course.level}
                    </div>
                    <div>
                      <span className="font-medium">Instructor:</span> {course.instructor.name}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-700">Features:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {course.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {course.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Link href={`/courses/${course.id}`}>
                    <EnhancedButton variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </EnhancedButton>
                  </Link>

                  <Link href={`/admin/courses/${course.id}/edit`}>
                    <EnhancedButton variant="outline" size="sm" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </EnhancedButton>
                  </Link>

                  <EnhancedButton
                    variant={course.isPublished ? "secondary" : "default"}
                    size="sm"
                    onClick={() => togglePublishStatus(course.id)}
                    className="w-full"
                  >
                    {course.isPublished ? "Unpublish" : "Publish"}
                  </EnhancedButton>

                  <EnhancedButton
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </EnhancedButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No courses found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
