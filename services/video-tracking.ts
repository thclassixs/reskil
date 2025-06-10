import api from './api'

interface VideoProgress {
  courseId: string
  videoIndex: number
  progress: number // 0-100
  completed: boolean
  lastWatched: Date
}

interface CourseProgress {
  courseId: string
  videosCompleted: number
  totalVideos: number
  overallProgress: number
  purchased: boolean
}

class VideoTrackingService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined'
  }

  async getVideoProgress(courseId: string, videoIndex: number): Promise<VideoProgress | null> {
    if (!this.isBrowser()) return null
    
    try {
      const { data } = await api.get(`/enrollments/${courseId}/videos/${videoIndex}/progress`)
      return data
    } catch (error) {
      console.error(`Failed to get video progress for course ${courseId}, video ${videoIndex}:`, error)
      return null
    }
  }

  async updateVideoProgress(courseId: string, videoIndex: number, progress: number): Promise<void> {
    if (!this.isBrowser()) return
    
    try {
      await api.put(`/enrollments/${courseId}/videos/${videoIndex}/progress`, {
        progress: Math.min(100, Math.max(0, progress)),
        completed: progress >= 90
      })
    } catch (error) {
      console.error(`Failed to update video progress for course ${courseId}, video ${videoIndex}:`, error)
    }
  }

  async getCourseProgress(courseId: string): Promise<CourseProgress> {
    if (!this.isBrowser()) {
      return {
        courseId,
        videosCompleted: 0,
        totalVideos: 0,
        overallProgress: 0,
        purchased: false
      }
    }
    
    try {
      const { data } = await api.get(`/enrollments/${courseId}/progress`)
      return data
    } catch (error) {
      console.error(`Failed to get course progress for ${courseId}:`, error)
      return {
        courseId,
        videosCompleted: 0,
        totalVideos: 0,
        overallProgress: 0,
        purchased: false
      }
    }
  }

  async isVideoUnlocked(courseId: string, videoIndex: number): Promise<boolean> {
    if (!this.isBrowser()) return videoIndex === 0
    if (videoIndex === 0) return true
    
    try {
      const { data } = await api.get(`/enrollments/${courseId}/videos/${videoIndex}/access`)
      return data.unlocked
    } catch (error) {
      console.error(`Failed to check video access for course ${courseId}, video ${videoIndex}:`, error)
      return false
    }
  }

  async purchaseCourse(courseId: string): Promise<void> {
    if (!this.isBrowser()) return
    
    try {
      await api.post(`/enrollments`, { courseId })
    } catch (error) {
      console.error(`Failed to purchase course ${courseId}:`, error)
      throw error
    }
  }

  async isPurchased(courseId: string): Promise<boolean> {
    if (!this.isBrowser()) return false
    
    try {
      const { data } = await api.get(`/enrollments/${courseId}`)
      return data.enrolled
    } catch (error) {
      console.error(`Failed to check enrollment status for course ${courseId}:`, error)
      return false
    }
  }

  async resetProgress(courseId?: string): Promise<void> {
    if (!this.isBrowser()) return
    
    try {
      if (courseId) {
        await api.delete(`/enrollments/${courseId}/progress`)
      } else {
        await api.delete('/enrollments/progress')
      }
    } catch (error) {
      console.error('Failed to reset progress:', error)
      throw error
    }
  }

  async updateProgress(enrollmentId: string, videoId: string, progress: number): Promise<void> {
    if (!this.isBrowser()) return
    
    await api.put(`/enrollments/${enrollmentId}`, {
      videoId,
      progress,
      lastViewed: new Date().toISOString()
    })
  }

  async markComplete(enrollmentId: string, videoId: string): Promise<void> {
    if (!this.isBrowser()) return
    
    await api.put(`/enrollments/${enrollmentId}`, {
      videoId,
      completed: true,
      progress: 100
    })
  }

  async getProgress(enrollmentId: string): Promise<VideoProgress[]> {
    if (!this.isBrowser()) return []
    
    const { data } = await api.get(`/enrollments/${enrollmentId}`)
    return data.progress
  }
}

export const videoTracker = new VideoTrackingService()