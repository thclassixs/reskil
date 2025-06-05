interface CourseVideo {
  url: string
  locked: boolean
  title: string
  description?: string
}

const courseVideosData: Record<string, CourseVideo[]> = {
  "shopify-starter": [
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      locked: false,
      title: "Shopify Starter Plan Review: Is It the Perfect Choice for Beginners?",
      description: "Complete review of Shopify's starter plan and its features for new entrepreneurs",
    },
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      locked: true,
      title: "Shopify Tutorial For Beginners 2024: The EASY Way To Set Up Your Store FAST",
      description: "Step-by-step tutorial on setting up your first Shopify store quickly and efficiently",
    },
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      locked: true,
      title: "How to build a Shopify store",
      description: "Comprehensive guide to building a professional Shopify store from scratch",
    },
  ],
  "tiktok-ads-mini": [
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      locked: false,
      title: "This is how i make $30,000 as a tik tok clipper from my couch",
      description: "Learn the secrets of making money as a TikTok content creator",
    },
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      locked: true,
      title: "TikTok Ads Review: How to Get More Sales with Low-Cost Video Campaigns",
      description: "Strategies for creating effective TikTok ad campaigns on a budget",
    },
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      locked: true,
      title: "How I use AI to Create Facebook/TikTok Ads 😱🤖",
      description: "Using AI tools to automate and optimize your social media advertising",
    },
  ],
  "intro-ai-prompting": [
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      locked: false,
      title: "Create an Entire Video with ChatGPT? #invideoAiPartner",
      description: "Learn how to use ChatGPT to create complete video content",
    },
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      locked: true,
      title: "Master the Perfect ChatGPT Prompt Formula (in just 8 minutes)!",
      description: "Quick guide to crafting effective prompts for ChatGPT",
    },
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      locked: true,
      title: "What is Prompt Engineering? (in about a minute)",
      description: "Brief introduction to the fundamentals of prompt engineering",
    },
  ],
}

export function getCourseVideos(courseId: string): CourseVideo[] {
  return courseVideosData[courseId] || []
}

export function getCoursePreviewVideo(courseId: string): string | null {
  const videos = getCourseVideos(courseId)
  return videos.length > 0 ? videos[0].url : null
}

// Admin functions for managing videos
export function addCourseVideo(courseId: string, video: CourseVideo): void {
  if (!courseVideosData[courseId]) {
    courseVideosData[courseId] = []
  }
  courseVideosData[courseId].push(video)
}

export function updateCourseVideo(courseId: string, videoIndex: number, video: Partial<CourseVideo>): void {
  if (courseVideosData[courseId] && courseVideosData[courseId][videoIndex]) {
    courseVideosData[courseId][videoIndex] = { ...courseVideosData[courseId][videoIndex], ...video }
  }
}

export function deleteCourseVideo(courseId: string, videoIndex: number): void {
  if (courseVideosData[courseId]) {
    courseVideosData[courseId].splice(videoIndex, 1)
  }
}

export function getAllCourses(): Record<string, CourseVideo[]> {
  return courseVideosData
}
