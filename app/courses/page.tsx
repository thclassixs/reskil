"use client"

import { useState } from "react"
import Link from "next/link"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, CheckCircle, Globe, ArrowLeft, Play } from "lucide-react"
import { VideoPreviewModal } from "@/components/video-preview-modal"
import { getCoursePreviewVideo } from "@/services/course-videos"

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
}

export default function CoursesPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [currentCourseTitle, setCurrentCourseTitle] = useState<string>("")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

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
        ecommerce: "E-commerce",
        webdev: "Web Development",
        ai: "AI & Automation",
        marketing: "Digital Marketing",
        design: "Design",
      },
      courses: [
        {
          id: "shopify-store-mastery",
          title: "Shopify Store Mastery",
          category: "ecommerce",
          price: "$49",
          duration: "6 weeks",
          students: "2,500+",
          rating: 4.9,
          level: "Beginner",
          description: "Build and scale profitable Shopify stores from scratch",
          features: ["Store Setup", "Product Research", "Marketing Strategies", "Analytics"],
        },
        {
          id: "react-development-bootcamp",
          title: "React Development Bootcamp",
          category: "webdev",
          price: "$79",
          duration: "8 weeks",
          students: "1,800+",
          rating: 4.8,
          level: "Intermediate",
          description: "Master React.js and build modern web applications",
          features: ["React Fundamentals", "State Management", "API Integration", "Deployment"],
        },
        {
          id: "ai-automation-for-business",
          title: "AI Automation for Business",
          category: "ai",
          price: "$69",
          duration: "4 weeks",
          students: "1,200+",
          rating: 4.9,
          level: "Beginner",
          description: "Automate your business processes with AI tools",
          features: ["ChatGPT Integration", "Workflow Automation", "AI Tools", "Business Applications"],
        },
        {
          id: "tiktok-ads-mastery",
          title: "TikTok Ads Mastery",
          category: "marketing",
          price: "$59",
          duration: "5 weeks",
          students: "3,100+",
          rating: 4.7,
          level: "Beginner",
          description: "Create viral TikTok ad campaigns that convert",
          features: ["Ad Creation", "Targeting", "Optimization", "Scaling"],
        },
        {
          id: "ui-ux-design-fundamentals",
          title: "UI/UX Design Fundamentals",
          category: "design",
          price: "$55",
          duration: "6 weeks",
          students: "900+",
          rating: 4.8,
          level: "Beginner",
          description: "Design beautiful and user-friendly interfaces",
          features: ["Design Principles", "Figma", "Prototyping", "User Research"],
        },
        {
          id: "full-stack-web-development",
          title: "Full-Stack Web Development",
          category: "webdev",
          price: "$99",
          duration: "12 weeks",
          students: "1,500+",
          rating: 4.9,
          level: "Advanced",
          description: "Become a complete web developer with modern technologies",
          features: ["Frontend & Backend", "Database Design", "API Development", "DevOps"],
        },
      ],
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
        ecommerce: "التجارة الإلكترونية",
        webdev: "تطوير المواقع",
        ai: "الذكاء الاصطناعي",
        marketing: "التسويق الرقمي",
        design: "التصميم",
      },
      courses: [
        {
          id: "shopify-store-mastery",
          title: "إتقان متاجر Shopify",
          category: "ecommerce",
          price: "490 درهم",
          duration: "6 أسابيع",
          students: "+2,500",
          rating: 4.9,
          level: "مبتدئ",
          description: "بناء وتوسيع متاجر Shopify مربحة من الصفر",
          features: ["إعداد المتجر", "بحث المنتجات", "استراتيجيات التسويق", "التحليلات"],
        },
        {
          id: "react-development-bootcamp",
          title: "معسكر تطوير React",
          category: "webdev",
          price: "790 درهم",
          duration: "8 أسابيع",
          students: "+1,800",
          rating: 4.8,
          level: "متوسط",
          description: "أتقن React.js وابني تطبيقات ويب حديثة",
          features: ["أساسيات React", "إدارة الحالة", "تكامل API", "النشر"],
        },
        {
          id: "ai-automation-for-business",
          title: "أتمتة الذكاء الاصطناعي للأعمال",
          category: "ai",
          price: "690 درهم",
          duration: "4 أسابيع",
          students: "+1,200",
          rating: 4.9,
          level: "مبتدئ",
          description: "أتمت عمليات عملك باستخدام أدوات الذكاء الاصطناعي",
          features: ["تكامل ChatGPT", "أتمتة سير العمل", "أدوات الذكاء الاصطناعي", "تطبيقات الأعمال"],
        },
        {
          id: "tiktok-ads-mastery",
          title: "إتقان إعلانات TikTok",
          category: "marketing",
          price: "590 درهم",
          duration: "5 أسابيع",
          students: "+3,100",
          rating: 4.7,
          level: "مبتدئ",
          description: "أنشئ حملات إعلانية فيروسية على TikTok تحقق التحويلات",
          features: ["إنشاء الإعلانات", "الاستهداف", "التحسين", "التوسع"],
        },
        {
          id: "ui-ux-design-fundamentals",
          title: "أساسيات تصميم UI/UX",
          category: "design",
          price: "550 درهم",
          duration: "6 أسابيع",
          students: "+900",
          rating: 4.8,
          level: "مبتدئ",
          description: "صمم واجهات جميلة وسهلة الاستخدام",
          features: ["مبادئ التصميم", "Figma", "النماذج الأولية", "بحث المستخدم"],
        },
        {
          id: "full-stack-web-development",
          title: "تطوير الويب الشامل",
          category: "webdev",
          price: "990 درهم",
          duration: "12 أسبوع",
          students: "+1,500",
          rating: 4.9,
          level: "متقدم",
          description: "كن مطور ويب شامل بالتقنيات الحديثة",
          features: ["الواجهة الأمامية والخلفية", "تصميم قواعد البيانات", "تطوير API", "DevOps"],
        },
      ],
    },
  }

  const t = content[language]
  const isRTL = language === "ar"

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t.subtitle}</p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.courses.map((course) => (
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
                        const previewVideo = getCoursePreviewVideo(course.id)
                        if (previewVideo) {
                          setCurrentVideoUrl(previewVideo)
                          setCurrentCourseTitle(course.title)
                          setShowVideoModal(true)
                        }
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.ctaTitle}</h2>
          <p className="text-xl text-blue-100 mb-8">{t.ctaSubtitle}</p>
          <Link href="/signup">
            <EnhancedButton size="xl" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl">
              {t.ctaButton}
            </EnhancedButton>
          </Link>
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
  )
}
