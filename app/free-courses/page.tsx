
"use client"

import { useState, useEffect, useMemo } from "react"
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

// ✅ Mock replacements for removed services
const getCourseVideos = async (courseId: string): Promise<CourseVideo[]> => {
  return [{ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }]
}

const getCoursePreviewVideo = async (courseId: string): Promise<string | null> => {
  return "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}

const videoTracker = {
  getCourseProgress: (courseId: string) => 0,
  getVideoProgress: async (courseId: string, index: number) => ({ completed: false }),
  purchaseCourse: (courseId: string) => {},
  isVideoUnlocked: (courseId: string, index: number) => true
}

export default function FreeCoursesPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [currentCourseTitle, setCurrentCourseTitle] = useState<string>("")
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({})
  const [courseVideos, setCourseVideos] = useState<CourseVideo[]>([])
  const [videoProgresses, setVideoProgresses] = useState<Record<number, VideoProgress | null>>({})
  const [isMounted, setIsMounted] = useState(false)

  const freeCourses: Course[] = useMemo(() => [
    {
      id: "shopify-starter",
      title: language === "en" ? "Shopify Starter Kit" : "مجموعة بداية Shopify",
      description: language === "en"
        ? "Learn the basics of setting up and running a Shopify store"
        : "تعلم أساسيات إعداد وإدارة متجر Shopify",
      price: language === "en" ? "$29" : "290 درهم",
      originalPrice: language === "en" ? "$49" : "490 درهم",
      duration: language === "en" ? "2 hours" : "ساعتان",
      level: language === "en" ? "Beginner" : "مبتدئ",
      category: language === "en" ? "E-commerce" : "التجارة الإلكترونية",
      features: language === "en"
        ? ["Store Setup", "Product Management", "Payment Processing", "Basic Marketing", "Order Fulfillment"]
        : ["إعداد المتجر", "إدارة المنتجات", "معالجة المدفوعات", "التسويق الأساسي", "تنفيذ الطلبات"],
    },
    {
      id: "tiktok-ads-mini",
      title: language === "en" ? "TikTok Ads Mini Course" : "دورة إعلانات TikTok المصغرة",
      description: language === "en"
        ? "Quick introduction to creating effective TikTok ad campaigns"
        : "مقدمة سريعة لإنشاء حملات إعلانية فعالة على TikTok",
      price: language === "en" ? "$19" : "190 درهم",
      originalPrice: language === "en" ? "$39" : "390 درهم",
      duration: language === "en" ? "1.5 hours" : "ساعة ونصف",
      level: language === "en" ? "Beginner" : "مبتدئ",
      category: language === "en" ? "Marketing" : "التسويق",
      features: language === "en"
        ? ["Ad Creation", "Targeting Strategies", "Budget Optimization", "Performance Tracking"]
        : ["إنشاء الإعلانات", "استراتيجيات الاستهداف", "تحسين الميزانية", "تتبع الأداء"],
    },
    {
      id: "intro-ai-prompting",
      title: language === "en" ? "Intro to AI Prompting" : "مقدمة في كتابة الأوامر للذكاء الاصطناعي",
      description: language === "en"
        ? "Learn the fundamentals of crafting effective prompts for AI tools"
        : "تعلم أساسيات صياغة الأوامر الفعالة لأدوات الذكاء الاصطناعي",
      price: language === "en" ? "$24" : "240 درهم",
      originalPrice: language === "en" ? "$44" : "440 درهم",
      duration: language === "en" ? "2 hours" : "ساعتان",
      level: language === "en" ? "Beginner" : "مبتدئ",
      category: language === "en" ? "AI & Automation" : "الذكاء الاصطناعي والأتمتة",
      features: language === "en"
        ? ["Prompt Engineering", "AI Tool Selection", "Workflow Integration", "Best Practices"]
        : ["هندسة الأوامر", "اختيار أدوات الذكاء الاصطناعي", "تكامل سير العمل", "أفضل الممارسات"],
    }
  ], [language])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const updateProgress = () => {
      const progress: Record<string, number> = {}
      freeCourses.forEach((course) => {
        progress[course.id] = videoTracker.getCourseProgress(course.id) || 0
      })
      setCourseProgress(progress)
    }
    updateProgress()
    const interval = setInterval(updateProgress, 3000)
    return () => clearInterval(interval)
  }, [isMounted, freeCourses])

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
    videoTracker.purchaseCourse(courseId)
    setCourseProgress((prev) => ({
      ...prev,
      [courseId]: videoTracker.getCourseProgress(courseId) || 0
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
    }
  }[language]

  const isRTL = language === "ar"

  const renderCourseVideos = (course: Course) => {
    if (!courseVideos.length) {
      return <p>{language === "en" ? "Loading videos..." : "جاري تحميل الفيديوهات..."}</p>
    }

    return courseVideos.map((video, index) => {
      const isUnlocked = videoTracker.isVideoUnlocked(course.id, index)
      const videoProgress = videoProgresses[index]

      return (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">
              {language === "en" ? `Video ${index + 1}` : `فيديو ${index + 1}`}
            </h4>
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

  return (
    <div className={`flex flex-col min-h-screen ${isRTL ? "font-arabic text-right" : "font-sans text-left"}`}>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-gray-100 dark:bg-gray-800">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Link>
        <h1 className="text-xl font-bold">{t.title}</h1>
        <EnhancedButton onClick={toggleLanguage} variant="outline">
          {language === "en" ? "العربية" : "English"}
        </EnhancedButton>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{t.subtitle}</p>
          <div className="grid gap-8">
            {freeCourses.map((course) => (
              <Card key={course.id} className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{t.duration}: {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span>{t.level}: {course.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>
                          {t.price}: <span className="font-semibold text-lg">
                            {course.price}
                            {course.originalPrice && (
                              <span className="line-through text-gray-500 ml-2">{course.originalPrice}</span>
                            )}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{course.category}</Badge>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{t.features}</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      {course.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <div className="flex gap-4 mt-6">
                      <EnhancedButton onClick={() => handlePurchase(course.id)} className="flex-1">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {courseProgress[course.id] === 100 ? t.purchased : t.purchase}
                      </EnhancedButton>
                      <EnhancedButton
                        variant="outline"
                        onClick={() => handlePreviewClick(course.id, course.title)}
                        className="flex-1"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {t.preview}
                      </EnhancedButton>
                    </div>
                  </div>
                </div>
                {courseProgress[course.id] > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">{t.progress}</h3>
                    <Progress value={courseProgress[course.id]} className="w-full" />
                    <p className="text-sm text-gray-500 mt-1">
                      {courseProgress[course.id]}% {t.completed}
                    </p>
                  </div>
                )}
                <div className="mt-6">
                  <EnhancedButton
                    variant="ghost"
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  >
                    {expandedCourse === course.id ? t.hideVideos : t.showVideos}
                  </EnhancedButton>
                  {expandedCourse === course.id && (
                    <div className="mt-4 space-y-4">{renderCourseVideos(course)}</div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-inner">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{t.ctaTitle}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{t.ctaSubtitle}</p>
            <Link href="/courses" passHref>
              <EnhancedButton size="lg">{t.ctaButton}</EnhancedButton>
            </Link>
          </div>
        </div>
      </main>

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
