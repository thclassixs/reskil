"use client"

import { useState, useEffect, useRef } from "react"
import { Lock, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface YouTubePlayerProps {
  videoUrl: string
  isLocked: boolean
  onUnlock?: () => void
  title?: string
  courseId?: string
  videoIndex?: number
  showProgress?: boolean
}

export function YouTubePlayer({
  videoUrl,
  isLocked,
  onUnlock,
  title,
  courseId,
  videoIndex = 0,
  showProgress = true,
}: YouTubePlayerProps) {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeVideoId(videoUrl)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Load existing progress only on client side
    if (isMounted && courseId !== undefined && showProgress) {
      
    }
  }, [courseId, videoIndex, showProgress, isMounted])

  useEffect(() => {
    // Reset states when video URL changes
    setIsError(false)
    setIsLoading(true)
    setProgress(0)
    setIsCompleted(false)
    
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
  }, [videoUrl])

  const handleIframeLoad = () => {
    setIsLoading(false)

    // Start progress tracking simulation (in real app, you'd use YouTube API)
    if (isMounted && courseId !== undefined && showProgress && !isCompleted) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(100, prev + 2) // Simulate 2% every second

          if (newProgress >= 90 && !isCompleted) {
            setIsCompleted(true)
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current)
            }
          }

          return newProgress
        })
      }, 1000)
    }
  }

  const handleIframeError = () => {
    setIsError(true)
    setIsLoading(false)
  }

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  if (isLocked) {
    return (
      <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title || "Content Locked"}</h3>
          <p className="text-gray-600 mb-6 max-w-sm">
            Enroll in this course or complete the previous video to unlock this content
          </p>
          <Button
            onClick={onUnlock}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Unlock Content
          </Button>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="relative aspect-video bg-gradient-to-br from-red-50 to-red-100 rounded-xl overflow-hidden flex items-center justify-center border border-red-200">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Unavailable</h3>
          <p className="text-gray-600 max-w-sm">
            This video is no longer available or cannot be played. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {videoId && isMounted && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
            title={title || "YouTube video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && courseId !== undefined && isMounted && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-900 font-medium">{Math.round(progress)}%</span>
              {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
          </div>
          <Progress value={progress} max={100} className="h-2" />
        </div>
      )}
    </div>
  )
}