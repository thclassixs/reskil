"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import api from "@/services/api"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, CheckCircle, Play } from "lucide-react"
import { VideoPreviewModal } from "@/components/video-preview-modal"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Language = "en" | "ar"

interface Course {
  id: string
  title: string
  category: string
  price: string
  duration: string
  students: string
  rating: number
  level: string
  description: string
  features: string[]
  thumbnail?: string
}

export default function CoursesPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [currentCourseTitle, setCurrentCourseTitle] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/courses')
        setCourses(data)
      } catch (error) {
        console.error('Failed to fetch courses:', error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (categoryFilter !== "all" && course.category !== categoryFilter) {
        return false
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
        )
      }
      
      return true
    }).sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating
      }
      return 0 // default to original order for "relevance"
    })
  }, [courses, categoryFilter, searchQuery, sortBy])

  const content = {
    en: {
      title: "Our Courses",
      subtitle: "Master in-demand digital skills with our comprehensive course catalog",
      viewCourse: "View Course",
      preview: "Preview",
      ctaTitle: "Ready to Start Learning?",
      ctaSubtitle: "Join thousands of students transforming their careers",
      ctaButton: "Get Started Today",
      categories: {
        all: "All Categories",
        ecommerce: "E-commerce",
        webdev: "Web Development",
        ai: "AI & Automation",
        marketing: "Digital Marketing",
        design: "Design",
      },
    },
    ar: {
      title: "دوراتنا",
      subtitle: "أتقن المهارات الرقمية المطلوبة مع كتالوج دوراتنا الشامل",
      viewCourse: "عرض الدورة",
      preview: "معاينة",
      ctaTitle: "جاهز لبدء التعلم؟",
      ctaSubtitle: "انضم لآلاف الطلاب الذين يحولون مسيراتهم المهنية",
      ctaButton: "ابدأ اليوم",
      categories: {
        all: "جميع الفئات",
        ecommerce: "التجارة الإلكترونية",
        webdev: "تطوير المواقع",
        ai: "الذكاء الاصطناعي",
        marketing: "التسويق الرقمي",
        design: "التصميم",
      },
    },
  }

  const t = content[language]
  const isRTL = language === "ar"

  const handlePreviewClick = async (courseId: string, title: string) => {
    try {
      const { data: previewUrl } = await api.get(`/courses/${courseId}/preview`)
      setCurrentVideoUrl(previewUrl)
      setCurrentCourseTitle(title)
      setShowVideoModal(true)
    } catch (error) {
      console.error('Failed to get preview video:', error)
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold mb-5">{t.title}</h1>
        <p className="text-gray-600 mb-8">{t.subtitle}</p>

        {/* Filtering and Sorting */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-3 md:mb-0">
            <Input
              type="text"
              placeholder="Search courses..."
              className="mr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.categories.all} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.categories).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Courses Grid */}
        <section className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 h-full hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {t.categories[course.category as keyof typeof t.categories]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">{course.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-blue-600">{course.price}</div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                      {course.students}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm">What you'll learn:</h4>
                    <ul className="space-y-1">
                      {course.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className={`h-4 w-4 text-green-500 ${isRTL ? "ml-2" : "mr-2"}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/courses/${course.id}`} className="flex-1">
                      <EnhancedButton className="w-full">{t.viewCourse}</EnhancedButton>
                    </Link>
                    <EnhancedButton
                      variant="outline"
                      size="default"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handlePreviewClick(course.id, course.title)
                      }}
                      className="px-3"
                    >
                      <Play className="h-4 w-4" />
                    </EnhancedButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Video Preview Modal */}
        {currentVideoUrl && (
          <VideoPreviewModal
            isOpen={showVideoModal}
            onClose={() => setShowVideoModal(false)}
            videoUrl={currentVideoUrl}
            title={`${currentCourseTitle} - Preview`}
          />
        )}
      </div>
    </div>
  )
}
