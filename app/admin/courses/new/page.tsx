"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, ArrowLeft } from "lucide-react"
import { adminService } from "@/services/admin-service"
import Link from "next/link"

export default function NewCourse() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    duration: "",
    level: "Beginner",
    category: "",
    features: [] as string[],
    instructor: {
      name: "",
      title: "",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    isPublished: false,
  })

  const [newFeature, setNewFeature] = useState("")

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      adminService.createCourse(formData)
      alert("Course created successfully!")
      router.push("/admin/courses")
    } catch (error) {
      alert("Error creating course. Please try again.")
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/courses">
          <EnhancedButton variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </EnhancedButton>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600">Add a new course to your catalog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="e.g., E-commerce, Marketing"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what students will learn"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="$29"
                  required
                />
              </div>

              <div>
                <Label htmlFor="originalPrice">Original Price</Label>
                <Input
                  id="originalPrice"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                  placeholder="$49"
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="2 hours"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="level">Level *</Label>
              <select
                id="level"
                value={formData.level}
                onChange={(e) => handleInputChange("level", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Instructor Information */}
        <Card>
          <CardHeader>
            <CardTitle>Instructor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="instructorName">Instructor Name *</Label>
                <Input
                  id="instructorName"
                  value={formData.instructor.name}
                  onChange={(e) => handleInputChange("instructor.name", e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="instructorTitle">Instructor Title *</Label>
                <Input
                  id="instructorTitle"
                  value={formData.instructor.title}
                  onChange={(e) => handleInputChange("instructor.title", e.target.value)}
                  placeholder="E-commerce Specialist"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Features */}
        <Card>
          <CardHeader>
            <CardTitle>Course Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex space-x-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature (e.g., Store Setup)"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <EnhancedButton type="button" onClick={addFeature}>
                <Plus className="h-4 w-4" />
              </EnhancedButton>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{feature}</span>
                  <button type="button" onClick={() => removeFeature(index)} className="ml-1 hover:text-red-600">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Publishing Options */}
        <Card>
          <CardHeader>
            <CardTitle>Publishing Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => handleInputChange("isPublished", e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="isPublished">Publish course immediately</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/courses">
            <EnhancedButton variant="outline" type="button">
              Cancel
            </EnhancedButton>
          </Link>
          <EnhancedButton type="submit" className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Create Course</span>
          </EnhancedButton>
        </div>
      </form>
    </div>
  )
}
