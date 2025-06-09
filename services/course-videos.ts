<<<<<<< HEAD
// Updated course videos with the new content
=======
import api from '../lib/api'
>>>>>>> 82081f5 (update V3)

interface CourseVideo {
  title: string
  url: string
  description?: string
  locked: boolean
}

interface CourseVideos {
  [courseId: string]: CourseVideo[]
}

<<<<<<< HEAD
// Mock video data with the updated content
const courseVideos: CourseVideos = {
  "shopify-starter": [
    {
      title: "Shopify Starter Plan Review: Is It the Perfect Choice for Beginners?",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Preview video
      description: "Complete review of Shopify's starter plan and its features",
      locked: false,
    },
    {
      title: "Shopify Tutorial For Beginners 2024: The EASY Way To Set Up Your Store FAST",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Step-by-step tutorial for setting up your first Shopify store",
      locked: true,
    },
    {
      title: "How to build a Shopify store",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Complete guide to building a professional Shopify store",
      locked: true,
    },
  ],
  "tiktok-ads-mini": [
    {
      title: "This is how i make $30,000 as a tik tok clipper from my couch",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Preview video
      description: "Learn how to make money as a TikTok content creator",
      locked: false,
    },
    {
      title: "TikTok Ads Review: How to Get More Sales with Low-Cost Video Campaigns",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Comprehensive review of TikTok advertising strategies",
      locked: true,
    },
    {
      title: "How I use AI to Create Facebook/TikTok Ads 😱🤖",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "AI-powered ad creation techniques for social media",
      locked: true,
    },
  ],
  "intro-ai-prompting": [
    {
      title: "Create an Entire Video with ChatGPT? #invideoAiPartner",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Preview video
      description: "Learn how to create videos using AI tools",
      locked: false,
    },
    {
      title: "Master the Perfect ChatGPT Prompt Formula (in just 8 minutes)!",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "The ultimate guide to crafting effective AI prompts",
      locked: true,
    },
    {
      title: "What is Prompt Engineering? (in about a minute)",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Quick introduction to prompt engineering concepts",
      locked: true,
    },
  ],
  "shopify-store-mastery": [
    {
      title: "Shopify Store Mastery - Course Introduction",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Preview video
      description: "Introduction to the complete Shopify mastery course",
      locked: false,
    },
    {
      title: "Setting Up Your Shopify Store",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Complete store setup and configuration",
      locked: true,
    },
    {
      title: "Product Research and Selection",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Finding winning products for your store",
      locked: true,
    },
  ],
  "react-development-bootcamp": [
    {
      title: "React Bootcamp - Course Overview",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Preview video
      description: "Overview of the React development bootcamp",
      locked: false,
    },
    {
      title: "React Fundamentals",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Core concepts of React development",
      locked: true,
    },
    {
      title: "Building Your First React App",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Hands-on React application development",
      locked: true,
    },
  ],
}

export function getAllCourses(): CourseVideos {
  return courseVideos
}

export function getCourseVideos(courseId: string): CourseVideo[] {
  return courseVideos[courseId] || []
}

export function getCoursePreviewVideo(courseId: string): string | null {
  const videos = getCourseVideos(courseId)
  const previewVideo = videos.find((video) => !video.locked)
  return previewVideo?.url || null
}

export function addCourseVideo(courseId: string, video: Omit<CourseVideo, "id">): void {
  if (!courseVideos[courseId]) {
    courseVideos[courseId] = []
  }
  courseVideos[courseId].push(video as CourseVideo)
}

export function updateCourseVideo(courseId: string, videoIndex: number, video: Partial<CourseVideo>): void {
  if (courseVideos[courseId] && courseVideos[courseId][videoIndex]) {
    courseVideos[courseId][videoIndex] = { ...courseVideos[courseId][videoIndex], ...video }
  }
}

export function deleteCourseVideo(courseId: string, videoIndex: number): void {
  if (courseVideos[courseId]) {
    courseVideos[courseId].splice(videoIndex, 1)
  }
}
=======
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
>>>>>>> 82081f5 (update V3)
