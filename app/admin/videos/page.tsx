"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Video, Edit, Trash2, Save, X, Lock, Unlock } from "lucide-react"
import { getAllCourses, addCourseVideo, updateCourseVideo, deleteCourseVideo } from "@/services/course-videos"

export default function VideosManagement() {
  const [courses] = useState(getAllCourses())
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState<{ courseId: string; index: number } | null>(null)

  const [videoForm, setVideoForm] = useState({
    title: "",
    url: "",
    description: "",
    locked: true,
  })

  const resetForm = () => {
    setVideoForm({
      title: "",
      url: "",
      description: "",
      locked: true,
    })
    setShowAddForm(false)
    setEditingVideo(null)
  }

  const handleAddVideo = () => {
    if (!selectedCourse || !videoForm.title || !videoForm.url) {
      alert("Please fill in all required fields")
      return
    }

    addCourseVideo(selectedCourse, {
      title: videoForm.title,
      url: videoForm.url,
      description: videoForm.description,
      locked: videoForm.locked,
    })

    resetForm()
    alert("Video added successfully!")
  }

  const handleUpdateVideo = () => {
    if (!editingVideo || !videoForm.title || !videoForm.url) {
      alert("Please fill in all required fields")
      return
    }

    updateCourseVideo(editingVideo.courseId, editingVideo.index, {
      title: videoForm.title,
      url: videoForm.url,
      description: videoForm.description,
      locked: videoForm.locked,
    })

    resetForm()
    alert("Video updated successfully!")
  }

  const handleDeleteVideo = (courseId: string, videoIndex: number) => {
    if (confirm("Are you sure you want to delete this video?")) {
      deleteCourseVideo(courseId, videoIndex)
      alert("Video deleted successfully!")
    }
  }

  const startEdit = (courseId: string, videoIndex: number) => {
    const video = courses[courseId][videoIndex]
    setVideoForm({
      title: video.title,
      url: video.url,
      description: video.description || "",
      locked: video.locked,
    })
    setEditingVideo({ courseId, index: videoIndex })
    setShowAddForm(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Management</h1>
          <p className="text-gray-600">Manage videos for all courses</p>
        </div>
        <EnhancedButton onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Video</span>
        </EnhancedButton>
      </div>

      {/* Add/Edit Video Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingVideo ? "Edit Video" : "Add New Video"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="course">Course *</Label>
                <select
                  id="course"
                  value={editingVideo ? editingVideo.courseId : selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  disabled={!!editingVideo}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select a course</option>
                  {Object.keys(courses).map((courseId) => (
                    <option key={courseId} value={courseId}>
                      {courseId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="videoTitle">Video Title *</Label>
                <Input
                  id="videoTitle"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter video title"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="videoUrl">YouTube URL *</Label>
              <Input
                id="videoUrl"
                value={videoForm.url}
                onChange={(e) => setVideoForm((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>

            <div>
              <Label htmlFor="videoDescription">Description</Label>
              <Textarea
                id="videoDescription"
                value={videoForm.description}
                onChange={(e) => setVideoForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the video content"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="videoLocked"
                checked={videoForm.locked}
                onChange={(e) => setVideoForm((prev) => ({ ...prev, locked: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="videoLocked">Lock this video (requires course purchase)</Label>
            </div>

            <div className="flex justify-end space-x-4">
              <EnhancedButton variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </EnhancedButton>
              <EnhancedButton
                onClick={editingVideo ? handleUpdateVideo : handleAddVideo}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{editingVideo ? "Update Video" : "Add Video"}</span>
              </EnhancedButton>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Videos List */}
      <div className="space-y-6">
        {Object.entries(courses).map(([courseId, videos]) => (
          <Card key={courseId}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>{courseId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                <Badge variant="outline">{videos.length} videos</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {videos.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No videos added yet</p>
              ) : (
                <div className="space-y-4">
                  {videos.map((video, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{video.title}</h4>
                          <Badge variant={video.locked ? "destructive" : "default"}>
                            {video.locked ? (
                              <>
                                <Lock className="h-3 w-3 mr-1" />
                                Locked
                              </>
                            ) : (
                              <>
                                <Unlock className="h-3 w-3 mr-1" />
                                Free
                              </>
                            )}
                          </Badge>
                        </div>
                        {video.description && <p className="text-sm text-gray-600 mb-2">{video.description}</p>}
                        <p className="text-xs text-gray-500">{video.url}</p>
                      </div>

                      <div className="flex space-x-2">
                        <EnhancedButton variant="outline" size="sm" onClick={() => startEdit(courseId, index)}>
                          <Edit className="h-4 w-4" />
                        </EnhancedButton>
                        <EnhancedButton
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteVideo(courseId, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </EnhancedButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
