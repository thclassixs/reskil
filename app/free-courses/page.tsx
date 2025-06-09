"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Clock,
  Globe,
  ArrowLeft,
  Play,
  CheckCircle,
  ShoppingCart,
} from "lucide-react"
import { YouTubePlayer } from "@/components/youtube-player"
import { VideoPreviewModal } from "@/components/video-preview-modal"
import { getCourseVideos, getCoursePreviewVideo } from "@/services/course-videos"
import { videoTracker } from "@/services/video-tracking"

type Language = "en" | "ar"

interface Course {
  id: string
  title: string
  description: string
  price: string
  originalPrice?: string
  duration: string
  level: string
  category: string
  thumbnail?: string
  features: string[]
}

interface CourseVideo {
  url: string
}

interface VideoProgress {
  completed: boolean
}

export default function FreeCoursesPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [currentCourseTitle, setCurrentCourseTitle] = useState<string>("")
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [courseProgress, setCourseProgress] = useState<Record<string, any>>({})
  const [courseVideos, setCourseVideos] = useState<CourseVideo[]>([])
  const [videoProgresses, setVideoProgresses] = useState<Record<number, VideoProgress | null>>({})
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const updateProgress = () => {
      const progress: Record<string, any> = {}
      freeCourses.forEach((course) => {
        progress[course.id] = videoTracker.getCourseProgress(course.id)
      })
      setCourseProgress(progress)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 3000)
    return () => clearInterval(interval)
  }, [isMounted])

  useEffect(() => {
    const fetchVideosAndProgress = async () => {
      if (!expandedCourse || !isMounted) return
      const videos = await getCourseVideos(expandedCourse)
      setCourseVideos(videos)

      const progresses: Record<number, VideoProgress | null> = {}
      for (let i = 0; i < videos.length; i++) {
        progresses[i] = await videoTracker.getVideoProgress(expandedCourse, i)
      }
      setVideoProgresses(progresses)
    }

    fetchVideosAndProgress()
  }, [expandedCourse, isMounted])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const handlePurchase = (courseId: string) => {
    if (!isMounted) return
    videoTracker.purchaseCourse(courseId)
    setCourseProgress((prev) => ({
      ...prev,
      [courseId]: videoTracker.getCourseProgress(courseId),
    }))
    alert(language === "en" ? "Course purchased successfully!" : "تم شراء الدورة بنجاح!")
  }

  const handlePreviewClick = async (courseId: string, title: string) => {
    const previewVideo = await getCoursePreviewVideo(courseId)
    if (previewVideo) {
      setCurrentVideoUrl(previewVideo)
      setCurrentCourseTitle(title)
      setShowVideoModal(true)
    }
  }

  const freeCourses: Course[] = [
    {
      id: "shopify-starter",
      title: language === "en" ? "Shopify Starter Kit" : "مجموعة بداية Shopify",
      description:
        language === "en"
          ? "Learn the basics of setting up and running a Shopify store"
          : "تعلم أساسيات إعداد وإدارة متجر Shopify",
      price: language === "en" ? "$29" : "290 درهم",
      originalPrice: language === "en" ? "$49" : "490 درهم",
      duration: language === "en" ? "2 hours" : "ساعتان",
      level: language === "en" ? "Beginner" : "مبتدئ",
      category: language === "en" ? "E-commerce" : "التجارة الإلكترونية",
      features:
        language === "en"
          ? ["Store Setup", "Product Management", "Payment Processing", "Basic Marketing", "Order Fulfillment"]
          : ["إعداد المتجر", "إدارة المنتجات", "معالجة المدفوعات", "التسويق الأساسي", "تنفيذ الطلبات"],
    },
    {
      id: "tiktok-ads-mini",
      title: language === "en" ? "TikTok Ads Mini Course" : "دورة إعلانات TikTok المصغرة",
      description:
        language === "en"
          ? "Quick introduction to creating effective TikTok ad campaigns"
          : "مقدمة سريعة لإنشاء حملات إعلانية فعالة على TikTok",
      price: language === "en" ? "$19" : "190 درهم",
      originalPrice: language === "en" ? "$39" : "390 درهم",
      duration: language === "en" ? "1.5 hours" : "ساعة ونصف",
      level: language === "en" ? "Beginner" : "مبتدئ",
      category: language === "en" ? "Marketing" : "التسويق",
      features:
        language === "en"
          ? ["Ad Creation", "Targeting Strategies", "Budget Optimization", "Performance Tracking"]
          : ["إنشاء الإعلانات", "استراتيجيات الاستهداف", "تحسين الميزانية", "تتبع الأداء"],
    },
    {
      id: "intro-ai-prompting",
      title: language === "en" ? "Intro to AI Prompting" : "مقدمة في كتابة الأوامر للذكاء الاصطناعي",
      description:
        language === "en"
          ? "Learn the fundamentals of crafting effective prompts for AI tools"
          : "تعلم أساسيات صياغة الأوامر الفعالة لأدوات الذكاء الاصطناعي",
      price: language === "en" ? "$24" : "240 درهم",
      originalPrice: language === "en" ? "$44" : "440 درهم",
      duration: language === "en" ? "2 hours" : "ساعتان",
      level: language === "en" ? "Beginner" : "مبتدئ",
      category: language === "en" ? "AI & Automation" : "الذكاء الاصطناعي والأتمتة",
      features:
        language === "en"
          ? ["Prompt Engineering", "AI Tool Selection", "Workflow Integration", "Best Practices"]
          : ["هندسة الأوامر", "اختيار أدوات الذكاء الاصطناعي", "تكامل سير العمل", "أفضل الممارسات"],
    },
  ]

  const t = {
    en: {
      title: "Free Courses",
      subtitle: "Quick, focused courses to help you learn specific skills in just a few hours",
      price: "Price",
      duration: "Duration",
      level: "Level",
      enroll: "Enroll Now",
      preview: "Preview",
      showVideos: "Show Videos",
      hideVideos: "Hide Videos",
      completed: "Completed",
      progress: "Progress",
      purchase: "Purchase Course",
      purchased: "Purchased",
      ctaTitle: "Ready to Upgrade Your Skills?",
      ctaSubtitle: "Our Free Courses are perfect for busy professionals",
      ctaButton: "Get Started Today",
      features: "What you'll learn:",
    },
    ar: {
      title: "الدورات المجانية",
      subtitle: "دورات سريعة ومركزة لمساعدتك على تعلم مهارات محددة في ساعات قليلة",
      price: "السعر",
      duration: "المدة",
      level: "المستوى",
      enroll: "سجل الآن",
      preview: "معاينة",
      showVideos: "عرض الفيديوهات",
      hideVideos: "إخفاء الفيديوهات",
      completed: "مكتمل",
      progress: "التقدم",
      purchase: "شراء الدورة",
      purchased: "تم الشراء",
      ctaTitle: "جاهز لتطوير مهاراتك؟",
      ctaSubtitle: "دوراتنا المصغرة مثالية للمحترفين المشغولين",
      ctaButton: "ابدأ اليوم",
      features: "ما ستتعلمه:",
    },
  }[language]

  const isRTL = language === "ar"

  // باقي JSX ديالك بحالو، فقط غير هاد الجزء باش تعرض الفيديوهات
  const renderCourseVideos = (course: Course) => {
    return courseVideos.map((video: CourseVideo, index: number) => {
      const isUnlocked = isMounted ? videoTracker.isVideoUnlocked(course.id, index) : index === 0
      const videoProgress = videoProgresses[index]

      return (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Video {index + 1}</h4>
            {videoProgress?.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>
          <div className="border rounded-xl overflow-hidden">
            <YouTubePlayer
              videoUrl={video.url}
              isLocked={!isUnlocked}
              title={`${course.title} - Video ${index + 1}`}
              courseId={course.id}
              videoIndex={index}
              onUnlock={() => handlePurchase(course.id)}
            />
          </div>
        </div>
      )
    })
  }

  // كمل JSX ديالك من بعد على هاد الأساس

  return (
    <div>
      {/* باقي JSX ديالك هنا */}
      {currentVideoUrl && (
        <VideoPreviewModal
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          videoUrl={currentVideoUrl}
          title={`${currentCourseTitle} - Preview`}
        />
      )}
    </div>
  )
}
