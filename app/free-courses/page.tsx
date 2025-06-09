"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
<<<<<<< HEAD
import { Star, Clock, Globe, ArrowLeft, Play, CheckCircle, ShoppingCart } from "lucide-react"
=======
import {
  Star,
  Clock,
  Globe,
  ArrowLeft,
  Play,
  CheckCircle,
  ShoppingCart,
} from "lucide-react"
>>>>>>> 82081f5 (update V3)
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

<<<<<<< HEAD
export default function freeCoursesPage() {
=======
interface CourseVideo {
  url: string
}

interface VideoProgress {
  completed: boolean
}

export default function FreeCoursesPage() {
>>>>>>> 82081f5 (update V3)
  const [language, setLanguage] = useState<Language>("en")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [currentCourseTitle, setCurrentCourseTitle] = useState<string>("")
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [courseProgress, setCourseProgress] = useState<Record<string, any>>({})
<<<<<<< HEAD
=======
  const [courseVideos, setCourseVideos] = useState<CourseVideo[]>([])
  const [videoProgresses, setVideoProgresses] = useState<Record<number, VideoProgress | null>>({})
>>>>>>> 82081f5 (update V3)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

<<<<<<< HEAD
=======
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

>>>>>>> 82081f5 (update V3)
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

<<<<<<< HEAD
  const content = {
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
=======
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
>>>>>>> 82081f5 (update V3)
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

<<<<<<< HEAD
  const t = content[language]
  const isRTL = language === "ar"

  useEffect(() => {
    if (!isMounted) return

    // Update course progress when component mounts
    const updateProgress = () => {
      const progress: Record<string, any> = {}
      freeCourses.forEach((course) => {
        progress[course.id] = videoTracker.getCourseProgress(course.id)
      })
      setCourseProgress(progress)
    }

    updateProgress()

    // Update progress every few seconds
    const interval = setInterval(updateProgress, 3000)
    return () => clearInterval(interval)
  }, [isMounted])

  const handlePurchase = (courseId: string) => {
    if (!isMounted) return

    // Mock purchase - in real app this would integrate with payment processor
    videoTracker.purchaseCourse(courseId)
    setCourseProgress((prev) => ({
      ...prev,
      [courseId]: videoTracker.getCourseProgress(courseId),
    }))
    alert(language === "en" ? "Course purchased successfully!" : "تم شراء الدورة بنجاح!")
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <ArrowLeft
                  className={`h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors ${isRTL ? "ml-2" : "mr-2"}`}
                />
                <span className="text-2xl font-bold text-blue-600">Reskil</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span>{language === "en" ? "العربية" : "English"}</span>
              </EnhancedButton>
              <Link href="/login">
                <EnhancedButton variant="ghost">Login</EnhancedButton>
              </Link>
              <Link href="/signup">
                <EnhancedButton>Sign Up</EnhancedButton>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">{t.subtitle}</p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {freeCourses.map((course) => {
              const progress = courseProgress[course.id]
              const isPurchased = progress?.purchased || false
              const courseVideos = getCourseVideos(course.id)

              return (
                <Card
                  key={course.id}
                  className={`border-2 ${expandedCourse === course.id ? "border-blue-300 shadow-lg" : "border-gray-200"} hover:border-blue-300 transition-all duration-300 overflow-hidden`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-3">
                          <Badge variant="secondary" className="text-xs font-medium">
                            {course.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {course.level}
                          </Badge>
                          {isPurchased && <Badge className="text-xs bg-green-100 text-green-800">{t.purchased}</Badge>}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">{course.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
                          <span className="text-gray-700 font-medium">{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className={`h-5 w-5 text-yellow-400 ${isRTL ? "ml-2" : "mr-2"}`} />
                          <span className="text-gray-700 font-medium">4.8/5</span>
                        </div>
                      </div>

                      {/* Course Features */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">{t.features}</h4>
                        <ul className="grid grid-cols-1 gap-2">
                          {course.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <CheckCircle
                                className={`h-4 w-4 text-green-500 ${isRTL ? "ml-2" : "mr-2"} flex-shrink-0`}
                              />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Progress Bar */}
                      {progress && progress.overallProgress > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 font-medium">{t.progress}</span>
                            <span className="text-gray-900 font-semibold">{Math.round(progress.overallProgress)}%</span>
                          </div>
                          <Progress value={progress.overallProgress} className="h-3" />
                          <p className="text-xs text-gray-500">
                            {progress.videosCompleted} of {progress.totalVideos} videos completed
                          </p>
                        </div>
                      )}

                      {/* Pricing and Actions */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold text-blue-600">{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {!isPurchased ? (
                            <EnhancedButton
                              size="lg"
                              onClick={() => handlePurchase(course.id)}
                              className="flex items-center space-x-2"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span>{t.purchase}</span>
                            </EnhancedButton>
                          ) : (
                            <EnhancedButton
                              size="lg"
                              variant="success"
                              onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                            >
                              {expandedCourse === course.id ? t.hideVideos : t.showVideos}
                            </EnhancedButton>
                          )}

                          <EnhancedButton
                            variant="outline"
                            size="lg"
                            onClick={() => {
                              const previewVideo = getCoursePreviewVideo(course.id)
                              if (previewVideo) {
                                setCurrentVideoUrl(previewVideo)
                                setCurrentCourseTitle(course.title)
                                setShowVideoModal(true)
                              }
                            }}
                            className="flex items-center space-x-2"
                          >
                            <Play className="h-4 w-4" />
                            <span>{t.preview}</span>
                          </EnhancedButton>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {expandedCourse === course.id && isPurchased ? (
                        <div className="space-y-4">
                          <h3 className="font-semibold text-gray-900 text-lg mb-4">Course Videos</h3>
                          {courseVideos.map((video, index) => {
                            const isUnlocked = isMounted ? videoTracker.isVideoUnlocked(course.id, index) : index === 0
                            const videoProgress = isMounted ? videoTracker.getVideoProgress(course.id, index) : null

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
                          })}
                        </div>
                      ) : (
                        <div className="rounded-xl overflow-hidden">
                          <YouTubePlayer
                            videoUrl={getCoursePreviewVideo(course.id) || ""}
                            isLocked={false}
                            title={`${course.title} - Preview`}
                            showProgress={false}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.ctaTitle}</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">{t.ctaSubtitle}</p>
          <Link href="/signup">
            <EnhancedButton size="xl" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl">
              {t.ctaButton}
            </EnhancedButton>
          </Link>
        </div>
      </section>

      {/* Video Preview Modal */}
=======
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
>>>>>>> 82081f5 (update V3)
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
