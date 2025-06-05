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
  private storageKey = "reskil_video_progress"
  private purchasesKey = "reskil_purchases"

  private isClient(): boolean {
    return typeof window !== "undefined"
  }

  getVideoProgress(courseId: string, videoIndex: number): VideoProgress | null {
    if (!this.isClient()) return null

    const allProgress = this.getAllProgress()
    return allProgress.find((p) => p.courseId === courseId && p.videoIndex === videoIndex) || null
  }

  updateVideoProgress(courseId: string, videoIndex: number, progress: number): void {
    if (!this.isClient()) return

    const allProgress = this.getAllProgress()
    const existingIndex = allProgress.findIndex((p) => p.courseId === courseId && p.videoIndex === videoIndex)

    const videoProgress: VideoProgress = {
      courseId,
      videoIndex,
      progress: Math.min(100, Math.max(0, progress)),
      completed: progress >= 90, // Consider 90%+ as completed
      lastWatched: new Date(),
    }

    if (existingIndex >= 0) {
      allProgress[existingIndex] = videoProgress
    } else {
      allProgress.push(videoProgress)
    }

    localStorage.setItem(this.storageKey, JSON.stringify(allProgress))
  }

  getCourseProgress(courseId: string): CourseProgress {
    if (!this.isClient()) {
      return {
        courseId,
        videosCompleted: 0,
        totalVideos: this.getTotalVideosForCourse(courseId),
        overallProgress: 0,
        purchased: false,
      }
    }

    const allProgress = this.getAllProgress()
    const courseVideos = allProgress.filter((p) => p.courseId === courseId)
    const totalVideos = this.getTotalVideosForCourse(courseId)
    const videosCompleted = courseVideos.filter((v) => v.completed).length

    return {
      courseId,
      videosCompleted,
      totalVideos,
      overallProgress: totalVideos > 0 ? (videosCompleted / totalVideos) * 100 : 0,
      purchased: this.isPurchased(courseId),
    }
  }

  isVideoUnlocked(courseId: string, videoIndex: number): boolean {
    if (!this.isClient()) return videoIndex === 0 // Only first video unlocked on server

    // First video is always unlocked
    if (videoIndex === 0) return true

    // If course is purchased, all videos are unlocked
    if (this.isPurchased(courseId)) return true

    // Check if previous video is completed
    const previousVideoProgress = this.getVideoProgress(courseId, videoIndex - 1)
    return previousVideoProgress?.completed || false
  }

  purchaseCourse(courseId: string): void {
    if (!this.isClient()) return

    const purchases = this.getPurchases()
    if (!purchases.includes(courseId)) {
      purchases.push(courseId)
      localStorage.setItem(this.purchasesKey, JSON.stringify(purchases))
    }
  }

  isPurchased(courseId: string): boolean {
    if (!this.isClient()) return false

    const purchases = this.getPurchases()
    return purchases.includes(courseId)
  }

  private getAllProgress(): VideoProgress[] {
    if (!this.isClient()) return []

    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  private getPurchases(): string[] {
    if (!this.isClient()) return []

    try {
      const stored = localStorage.getItem(this.purchasesKey)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  private getTotalVideosForCourse(courseId: string): number {
    // This should match your course data
    const courseCounts: Record<string, number> = {
      "shopify-starter": 5,
      "tiktok-ads-mini": 3,
      "intro-ai-prompting": 3,
    }
    return courseCounts[courseId] || 0
  }

  resetProgress(courseId?: string): void {
    if (!this.isClient()) return

    if (courseId) {
      const allProgress = this.getAllProgress()
      const filtered = allProgress.filter((p) => p.courseId !== courseId)
      localStorage.setItem(this.storageKey, JSON.stringify(filtered))
    } else {
      localStorage.removeItem(this.storageKey)
    }
  }

  resetPurchases(): void {
    if (!this.isClient()) return
    localStorage.removeItem(this.purchasesKey)
  }
}

export const videoTracker = new VideoTrackingService()
