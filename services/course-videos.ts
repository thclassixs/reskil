import api from './api'

interface CourseVideo {
  title: string
  url: string
  description?: string
  locked: boolean
}

interface CourseVideos {
  [courseId: string]: CourseVideo[]
}

// SSR-safe storage helper
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  }
}

export async function getAllCourses(): Promise<CourseVideos> {
  if (typeof window === 'undefined') return {}
  
  try {
    const { data } = await api.get('/courses/videos')
    return data
  } catch (error) {
    console.error('Failed to fetch course videos:', error)
    return {}
  }
}

export async function getCourseVideos(courseId: string): Promise<CourseVideo[]> {
  if (typeof window === 'undefined') return []
  
  try {
    const cacheKey = `videos_${courseId}`
    const cached = safeLocalStorage.getItem(cacheKey)
    if (cached) return JSON.parse(cached)
    
    const { data } = await api.get(`/courses/${courseId}/videos`)
    safeLocalStorage.setItem(cacheKey, JSON.stringify(data))
    return data
  } catch (error) {
    console.error(`Failed to fetch videos for course ${courseId}:`, error)
    return []
  }
}

export async function getCoursePreviewVideo(courseId: string): Promise<string | null> {
  if (typeof window === 'undefined') return null
  
  try {
    const { data } = await api.get(`/courses/${courseId}/preview`)
    return data.url || null
  } catch (error) {
    console.error(`Failed to fetch preview video for course ${courseId}:`, error)
    return null
  }
}

export async function addCourseVideo(courseId: string, video: Omit<CourseVideo, "id">): Promise<void> {
  try {
    await api.post(`/courses/${courseId}/videos`, video)
    // Invalidate cache
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`videos_${courseId}`)
    }
  } catch (error) {
    console.error(`Failed to add video to course ${courseId}:`, error)
    throw error
  }
}

export async function updateCourseVideo(
  courseId: string,
  videoIndex: number,
  video: Partial<CourseVideo>
): Promise<void> {
  try {
    await api.put(`/courses/${courseId}/videos/${videoIndex}`, video)
    // Invalidate cache
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`videos_${courseId}`)
    }
  } catch (error) {
    console.error(`Failed to update video ${videoIndex} in course ${courseId}:`, error)
    throw error
  }
}

export async function deleteCourseVideo(courseId: string, videoIndex: number): Promise<void> {
  try {
    await api.delete(`/courses/${courseId}/videos/${videoIndex}`)
    // Invalidate cache
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`videos_${courseId}`)
    }
  } catch (error) {
    console.error(`Failed to delete video ${videoIndex} from course ${courseId}:`, error)
    throw error
  }
}