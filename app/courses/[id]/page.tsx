"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Globe,
  ArrowLeft,
  Star,
  Clock,
  Users,
  CheckCircle,
  Play,
  FileText,
  Award,
  BarChart,
  MessageSquare,
  Share2,
  Heart,
  BookOpen,
  Video,
  Download,
  Lock,
  AlertCircle,
} from "lucide-react"
import { YouTubePlayer } from "@/components/youtube-player"
import { VideoPreviewModal } from "@/components/video-preview-modal"
import { getCourseVideos, getCoursePreviewVideo } from "@/services/course-videos"

type Language = "en" | "ar"

interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "quiz" | "assignment" | "download"
  isLocked: boolean
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Review {
  id: string
  name: string
  avatar: string
  date: string
  rating: number
  comment: string
}

interface CourseData {
  id: string
  title: string
  subtitle: string
  instructor: {
    name: string
    title: string
    avatar: string
  }
  level: string
  category: string
  rating: number
  reviewCount: number
  studentsCount: string
  lastUpdated: string
  language: string
  duration: string
  description: string
  whatYouWillLearn: string[]
  requirements: string[]
  price: string
  originalPrice: string
  thumbnail: string
  modules: Module[]
  reviews: Review[]
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const [language, setLanguage] = useState<Language>("en")
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)

  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [courseVideos, setCourseVideos] = useState<any[]>([])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  useEffect(() => {
    // Simulate API call to fetch course data
    const fetchCourse = async () => {
      setLoading(true)
      // In a real app, you would fetch from an API based on courseId
      // For now, we'll use mock data
      const mockCourses = {
        "shopify-store-mastery": {
          en: {
            id: "shopify-store-mastery",
            title: "Shopify Store Mastery",
            subtitle: "Build and scale profitable Shopify stores from scratch",
            instructor: {
              name: "Sarah Johnson",
              title: "E-commerce Specialist",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            level: "Beginner",
            category: "E-commerce",
            rating: 4.9,
            reviewCount: 342,
            studentsCount: "2,500+",
            lastUpdated: "January 2025",
            language: "English",
            duration: "6 weeks (24 hours)",
            description:
              "Learn how to build, launch, and scale a successful Shopify store from scratch. This comprehensive course covers everything from store setup and product research to marketing strategies and analytics. By the end of this course, you'll have all the skills needed to create and run a profitable e-commerce business.",
            whatYouWillLearn: [
              "Set up a professional Shopify store with optimal settings",
              "Find winning products and reliable suppliers",
              "Create high-converting product pages and checkout experience",
              "Implement effective marketing strategies for e-commerce",
              "Analyze store performance and optimize for conversions",
              "Scale your business with automation and systems",
            ],
            requirements: [
              "No prior Shopify experience needed",
              "Basic computer skills",
              "A computer with internet access",
              "Budget for Shopify subscription (optional during learning)",
            ],
            price: "$49",
            originalPrice: "$99",
            thumbnail: "/placeholder.svg?height=600&width=800",
            modules: [
              {
                id: "module-1",
                title: "Getting Started with Shopify",
                description: "Learn the fundamentals of Shopify and set up your store",
                lessons: [
                  {
                    id: "lesson-1-1",
                    title: "Introduction to E-commerce and Shopify",
                    duration: "15:30",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-2",
                    title: "Creating Your Shopify Account",
                    duration: "12:45",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-3",
                    title: "Navigating the Shopify Dashboard",
                    duration: "18:20",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-4",
                    title: "Store Settings and Configuration",
                    duration: "22:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-1-5",
                    title: "Module 1 Assignment: Store Setup",
                    duration: "30:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-2",
                title: "Product Research and Selection",
                description: "Find winning products and reliable suppliers",
                lessons: [
                  {
                    id: "lesson-2-1",
                    title: "Product Research Fundamentals",
                    duration: "24:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-2",
                    title: "Finding Profitable Niches",
                    duration: "19:45",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-3",
                    title: "Supplier Research and Evaluation",
                    duration: "28:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-4",
                    title: "Product Pricing Strategies",
                    duration: "16:20",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-5",
                    title: "Module 2 Quiz: Product Research",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-3",
                title: "Store Design and Optimization",
                description: "Create a professional and high-converting store design",
                lessons: [
                  {
                    id: "lesson-3-1",
                    title: "Choosing the Right Theme",
                    duration: "14:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-2",
                    title: "Homepage Design Best Practices",
                    duration: "22:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-3",
                    title: "Product Page Optimization",
                    duration: "26:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-4",
                    title: "Checkout Optimization",
                    duration: "18:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-5",
                    title: "Design Resources Pack",
                    duration: "N/A",
                    type: "download",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-4",
                title: "Marketing and Traffic Generation",
                description: "Learn effective strategies to drive traffic to your store",
                lessons: [
                  {
                    id: "lesson-4-1",
                    title: "Marketing Fundamentals for E-commerce",
                    duration: "20:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-2",
                    title: "Facebook and Instagram Ads",
                    duration: "32:45",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-3",
                    title: "Email Marketing for Shopify",
                    duration: "28:20",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-4",
                    title: "SEO for Shopify Stores",
                    duration: "24:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-5",
                    title: "Module 4 Assignment: Marketing Plan",
                    duration: "45:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-5",
                title: "Analytics and Optimization",
                description: "Track performance and optimize for better results",
                lessons: [
                  {
                    id: "lesson-5-1",
                    title: "Setting Up Shopify Analytics",
                    duration: "16:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-2",
                    title: "Google Analytics Integration",
                    duration: "19:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-3",
                    title: "Key Metrics to Track",
                    duration: "22:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-4",
                    title: "A/B Testing for Conversion Optimization",
                    duration: "25:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-5",
                    title: "Module 5 Quiz: Analytics",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-6",
                title: "Scaling Your Shopify Business",
                description: "Take your store to the next level with advanced strategies",
                lessons: [
                  {
                    id: "lesson-6-1",
                    title: "Automation and Systems",
                    duration: "23:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-2",
                    title: "Inventory Management at Scale",
                    duration: "18:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-3",
                    title: "Customer Service Excellence",
                    duration: "21:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-4",
                    title: "Expanding to Multiple Channels",
                    duration: "26:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-5",
                    title: "Final Project: Complete Store Launch Plan",
                    duration: "60:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
            ],
            reviews: [
              {
                id: "review-1",
                name: "Michael Thompson",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "January 15, 2025",
                rating: 5,
                comment:
                  "This course was exactly what I needed to start my e-commerce journey. The instructor explains everything clearly and provides actionable steps. I launched my store halfway through the course and already made my first sales!",
              },
              {
                id: "review-2",
                name: "Jessica Lee",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "December 28, 2024",
                rating: 5,
                comment:
                  "Comprehensive and well-structured. The product research module alone was worth the price of the entire course. Highly recommended for anyone serious about Shopify.",
              },
              {
                id: "review-3",
                name: "David Wilson",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "December 10, 2024",
                rating: 4,
                comment:
                  "Great course with lots of valuable information. The only reason I'm giving 4 stars instead of 5 is that some of the Facebook ads content could be more up-to-date. Otherwise, excellent value.",
              },
            ],
          },
          ar: {
            id: "shopify-store-mastery",
            title: "إتقان متاجر Shopify",
            subtitle: "بناء وتوسيع متاجر Shopify مربحة من الصفر",
            instructor: {
              name: "سارة جونسون",
              title: "متخصصة في التجارة الإلكترونية",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            level: "مبتدئ",
            category: "التجارة الإلكترونية",
            rating: 4.9,
            reviewCount: 342,
            studentsCount: "+2,500",
            lastUpdated: "يناير 2025",
            language: "الإنجليزية",
            duration: "6 أسابيع (24 ساعة)",
            description:
              "تعلم كيفية بناء وإطلاق وتوسيع متجر Shopify ناجح من الصفر. تغطي هذه الدورة الشاملة كل شيء من إعداد المتجر وبحث المنتجات إلى استراتيجيات التسويق والتحليلات. بحلول نهاية هذه الدورة، ستكون لديك جميع المهارات اللازمة لإنشاء وإدارة عمل تجاري إلكتروني مربح.",
            whatYouWillLearn: [
              "إعداد متجر Shopify احترافي بإعدادات مثالية",
              "العثور على منتجات رابحة وموردين موثوقين",
              "إنشاء صفحات منتجات وتجربة دفع عالية التحويل",
              "تنفيذ استراتيجيات تسويقية فعالة للتجارة الإلكترونية",
              "تحليل أداء المتجر والتحسين للتحويلات",
              "توسيع عملك باستخدام الأتمتة والأنظمة",
            ],
            requirements: [
              "لا تحتاج إلى خبرة سابقة في Shopify",
              "مهارات كمبيوتر أساسية",
              "جهاز كمبيوتر متصل بالإنترنت",
              "ميزانية لاشتراك Shopify (اختياري أثناء التعلم)",
            ],
            price: "490 درهم",
            originalPrice: "990 درهم",
            thumbnail: "/placeholder.svg?height=600&width=800",
            modules: [
              {
                id: "module-1",
                title: "البدء مع Shopify",
                description: "تعلم أساسيات Shopify وإعداد متجرك",
                lessons: [
                  {
                    id: "lesson-1-1",
                    title: "مقدمة في التجارة الإلكترونية و Shopify",
                    duration: "15:30",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-2",
                    title: "إنشاء حساب Shopify الخاص بك",
                    duration: "12:45",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-3",
                    title: "التنقل في لوحة تحكم Shopify",
                    duration: "18:20",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-4",
                    title: "إعدادات وتكوين المتجر",
                    duration: "22:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-1-5",
                    title: "مهمة الوحدة 1: إعداد المتجر",
                    duration: "30:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-2",
                title: "بحث واختيار المنتجات",
                description: "العثور على منتجات رابحة وموردين موثوقين",
                lessons: [
                  {
                    id: "lesson-2-1",
                    title: "أساسيات بحث المنتجات",
                    duration: "24:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-2",
                    title: "العثور على تخصصات مربحة",
                    duration: "19:45",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-3",
                    title: "بحث وتقييم الموردين",
                    duration: "28:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-4",
                    title: "استراتيجيات تسعير المنتجات",
                    duration: "16:20",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-5",
                    title: "اختبار الوحدة 2: بحث المنتجات",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-3",
                title: "تصميم وتحسين المتجر",
                description: "إنشاء تصميم متجر احترافي وعالي التحويل",
                lessons: [
                  {
                    id: "lesson-3-1",
                    title: "اختيار القالب المناسب",
                    duration: "14:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-2",
                    title: "أفضل ممارسات تصميم الصفحة الرئيسية",
                    duration: "22:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-3",
                    title: "تحسين صفحة المنتج",
                    duration: "26:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-4",
                    title: "تحسين عملية الدفع",
                    duration: "18:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-5",
                    title: "حزمة موارد التصميم",
                    duration: "غير متاح",
                    type: "download",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-4",
                title: "التسويق وجذب الزيارات",
                description: "تعلم استراتيجيات فعالة لجذب الزيارات إلى متجرك",
                lessons: [
                  {
                    id: "lesson-4-1",
                    title: "أساسيات التسويق للتجارة الإلكترونية",
                    duration: "20:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-2",
                    title: "إعلانات فيسبوك وانستغرام",
                    duration: "32:45",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-3",
                    title: "التسويق عبر البريد الإلكتروني لـ Shopify",
                    duration: "28:20",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-4",
                    title: "تحسين محركات البحث لمتاجر Shopify",
                    duration: "24:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-5",
                    title: "مهمة الوحدة 4: خطة تسويقية",
                    duration: "45:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-5",
                title: "التحليلات والتحسين",
                description: "تتبع الأداء والتحسين للحصول على نتائج أفضل",
                lessons: [
                  {
                    id: "lesson-5-1",
                    title: "إعداد تحليلات Shopify",
                    duration: "16:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-2",
                    title: "تكامل Google Analytics",
                    duration: "19:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-3",
                    title: "المقاييس الرئيسية للتتبع",
                    duration: "22:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-4",
                    title: "اختبار A/B لتحسين التحويل",
                    duration: "25:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-5",
                    title: "اختبار الوحدة 5: التحليلات",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-6",
                title: "توسيع عملك على Shopify",
                description: "ارتق بمتجرك إلى المستوى التالي باستراتيجيات متقدمة",
                lessons: [
                  {
                    id: "lesson-6-1",
                    title: "الأتمتة والأنظمة",
                    duration: "23:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-2",
                    title: "إدارة المخزون على نطاق واسع",
                    duration: "18:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-3",
                    title: "التميز في خدمة العملاء",
                    duration: "21:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-4",
                    title: "التوسع إلى قنوات متعددة",
                    duration: "26:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-5",
                    title: "المشروع النهائي: خطة إطلاق متجر كاملة",
                    duration: "60:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
            ],
            reviews: [
              {
                id: "review-1",
                name: "مايكل طومسون",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "15 يناير 2025",
                rating: 5,
                comment:
                  "كانت هذه الدورة بالضبط ما احتجته لبدء رحلتي في التجارة الإلكترونية. يشرح المدرب كل شيء بوضوح ويقدم خطوات قابلة للتنفيذ. أطلقت متجري في منتصف الدورة وحققت بالفعل مبيعاتي الأولى!",
              },
              {
                id: "review-2",
                name: "جيسيكا لي",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "28 ديسمبر 2024",
                rating: 5,
                comment:
                  "شاملة ومنظمة جيداً. وحدة بحث المنتجات وحدها كانت تستحق سعر الدورة بأكملها. أوصي بشدة لأي شخص جاد بشأن Shopify.",
              },
              {
                id: "review-3",
                name: "ديفيد ويلسون",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "10 ديسمبر 2024",
                rating: 4,
                comment:
                  "دورة رائعة مع الكثير من المعلومات القيمة. السبب الوحيد لإعطائي 4 نجوم بدلاً من 5 هو أن بعض محتوى إعلانات فيسبوك يمكن أن يكون أكثر حداثة. بخلاف ذلك، قيمة ممتازة.",
              },
            ],
          },
        },
        "react-development-bootcamp": {
          en: {
            id: "react-development-bootcamp",
            title: "React Development Bootcamp",
            subtitle: "Master React.js and build modern web applications",
            instructor: {
              name: "Ahmed Hassan",
              title: "Senior Frontend Developer",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            level: "Intermediate",
            category: "Web Development",
            rating: 4.8,
            reviewCount: 215,
            studentsCount: "1,800+",
            lastUpdated: "February 2025",
            language: "English",
            duration: "8 weeks (32 hours)",
            description:
              "Take your web development skills to the next level with our comprehensive React.js bootcamp. Learn how to build modern, interactive web applications using the most popular frontend library. This course covers everything from React fundamentals to advanced state management, API integration, and deployment strategies. By the end, you'll be able to create professional React applications from scratch.",
            whatYouWillLearn: [
              "Master React fundamentals including components, props, and state",
              "Work with hooks and functional components",
              "Implement state management with Context API and Redux",
              "Build responsive UIs with modern CSS frameworks",
              "Connect to backend APIs and handle data fetching",
              "Deploy React applications to production",
              "Implement authentication and protected routes",
              "Optimize performance and debug React applications",
            ],
            requirements: [
              "Basic knowledge of HTML, CSS, and JavaScript",
              "Understanding of ES6+ features (arrow functions, destructuring, etc.)",
              "Familiarity with npm or yarn package managers",
              "A computer with Node.js installed",
            ],
            price: "$79",
            originalPrice: "$129",
            thumbnail: "/placeholder.svg?height=600&width=800",
            modules: [
              {
                id: "module-1",
                title: "React Fundamentals",
                description: "Learn the core concepts of React.js",
                lessons: [
                  {
                    id: "lesson-1-1",
                    title: "Introduction to React and Its Ecosystem",
                    duration: "18:45",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-2",
                    title: "Setting Up Your Development Environment",
                    duration: "22:30",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-3",
                    title: "Creating Your First React Component",
                    duration: "25:15",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-4",
                    title: "JSX Syntax and Expressions",
                    duration: "20:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-1-5",
                    title: "Module 1 Project: Simple React App",
                    duration: "45:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-2",
                title: "Components and Props",
                description: "Master component-based architecture and props",
                lessons: [
                  {
                    id: "lesson-2-1",
                    title: "Component Types and Architecture",
                    duration: "24:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-2",
                    title: "Props and PropTypes",
                    duration: "19:45",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-3",
                    title: "Component Composition",
                    duration: "22:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-4",
                    title: "Conditional Rendering",
                    duration: "18:20",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-5",
                    title: "Module 2 Quiz: Components and Props",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-3",
                title: "State and Lifecycle",
                description: "Learn how to manage state and component lifecycle",
                lessons: [
                  {
                    id: "lesson-3-1",
                    title: "Introduction to State",
                    duration: "21:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-2",
                    title: "useState Hook",
                    duration: "26:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-3",
                    title: "Component Lifecycle with useEffect",
                    duration: "28:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-4",
                    title: "Managing Complex State",
                    duration: "24:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-5",
                    title: "Module 3 Project: Interactive Counter App",
                    duration: "60:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-4",
                title: "Forms and Events",
                description: "Handle user input and events in React",
                lessons: [
                  {
                    id: "lesson-4-1",
                    title: "Event Handling in React",
                    duration: "19:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-2",
                    title: "Controlled vs Uncontrolled Components",
                    duration: "22:45",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-3",
                    title: "Form Validation",
                    duration: "26:20",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-4",
                    title: "Custom Hooks for Forms",
                    duration: "24:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-5",
                    title: "Module 4 Quiz: Forms and Events",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-5",
                title: "Routing and Navigation",
                description: "Create multi-page applications with React Router",
                lessons: [
                  {
                    id: "lesson-5-1",
                    title: "Introduction to React Router",
                    duration: "23:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-2",
                    title: "Setting Up Routes",
                    duration: "19:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-3",
                    title: "Route Parameters and Queries",
                    duration: "22:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-4",
                    title: "Protected Routes and Authentication",
                    duration: "28:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-5",
                    title: "Module 5 Project: Multi-page Application",
                    duration: "60:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-6",
                title: "State Management",
                description: "Learn advanced state management techniques",
                lessons: [
                  {
                    id: "lesson-6-1",
                    title: "Context API",
                    duration: "25:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-2",
                    title: "Introduction to Redux",
                    duration: "28:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-3",
                    title: "Redux Toolkit",
                    duration: "26:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-4",
                    title: "State Management Best Practices",
                    duration: "22:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-5",
                    title: "Module 6 Quiz: State Management",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-7",
                title: "API Integration",
                description: "Connect your React app to backend services",
                lessons: [
                  {
                    id: "lesson-7-1",
                    title: "Fetching Data with useEffect",
                    duration: "23:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-7-2",
                    title: "Working with Axios",
                    duration: "20:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-7-3",
                    title: "Error Handling",
                    duration: "18:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-7-4",
                    title: "Custom Hooks for API Calls",
                    duration: "24:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-7-5",
                    title: "Module 7 Project: Data Dashboard",
                    duration: "60:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-8",
                title: "Deployment and Best Practices",
                description: "Deploy your React app and learn professional best practices",
                lessons: [
                  {
                    id: "lesson-8-1",
                    title: "Optimizing React Applications",
                    duration: "22:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-8-2",
                    title: "Testing React Components",
                    duration: "26:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-8-3",
                    title: "Building for Production",
                    duration: "19:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-8-4",
                    title: "Deployment Options",
                    duration: "24:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-8-5",
                    title: "Final Project: Complete React Application",
                    duration: "90:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
            ],
            reviews: [
              {
                id: "review-1",
                name: "Emily Rodriguez",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "February 10, 2025",
                rating: 5,
                comment:
                  "This bootcamp transformed me from a basic HTML/CSS developer to a confident React developer. The instructor explains complex concepts in a way that's easy to understand, and the projects are practical and engaging. I landed a React developer job just two weeks after completing this course!",
              },
              {
                id: "review-2",
                name: "James Chen",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "January 25, 2025",
                rating: 5,
                comment:
                  "Excellent course structure and content. The progression from fundamentals to advanced topics is well thought out. I especially appreciated the sections on state management and API integration, which are crucial for real-world applications.",
              },
              {
                id: "review-3",
                name: "Sophia Williams",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "January 12, 2025",
                rating: 4,
                comment:
                  "Very comprehensive bootcamp with great explanations and examples. The only reason I'm giving 4 stars is that I wish there was more content on testing React applications. Otherwise, it's an excellent resource for learning React.",
              },
            ],
          },
          ar: {
            id: "react-development-bootcamp",
            title: "معسكر تطوير React",
            subtitle: "أتقن React.js وابني تطبيقات ويب حديثة",
            instructor: {
              name: "أحمد حسن",
              title: "مطور واجهة أمامية أول",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            level: "متوسط",
            category: "تطوير الويب",
            rating: 4.8,
            reviewCount: 215,
            studentsCount: "+1,800",
            lastUpdated: "فبراير 2025",
            language: "الإنجليزية",
            duration: "8 أسابيع (32 ساعة)",
            description:
              "ارتق بمهارات تطوير الويب لديك إلى المستوى التالي مع معسكر React.js الشامل. تعلم كيفية بناء تطبيقات ويب حديثة وتفاعلية باستخدام أشهر مكتبة للواجهة الأمامية. تغطي هذه الدورة كل شيء من أساسيات React إلى إدارة الحالة المتقدمة وتكامل API واستراتيجيات النشر. في النهاية، ستكون قادراً على إنشاء تطبيقات React احترافية من الصفر.",
            whatYouWillLearn: [
              "إتقان أساسيات React بما في ذلك المكونات والخصائص والحالة",
              "العمل مع Hooks والمكونات الوظيفية",
              "تنفيذ إدارة الحالة باستخدام Context API و Redux",
              "بناء واجهات مستخدم متجاوبة باستخدام أطر CSS الحديثة",
              "الاتصال بواجهات برمجة التطبيقات الخلفية والتعامل مع جلب البيانات",
              "نشر تطبيقات React للإنتاج",
              "تنفيذ المصادقة والمسارات المحمية",
              "تحسين الأداء وتصحيح أخطاء تطبيقات React",
            ],
            requirements: [
              "معرفة أساسية بـ HTML و CSS و JavaScript",
              "فهم ميزات ES6+ (الدوال السهمية، التفكيك، إلخ)",
              "الإلمام بمديري الحزم npm أو yarn",
              "جهاز كمبيوتر مثبت عليه Node.js",
            ],
            price: "790 درهم",
            originalPrice: "1290 درهم",
            thumbnail: "/placeholder.svg?height=600&width=800",
            modules: [
              {
                id: "module-1",
                title: "أساسيات React",
                description: "تعلم المفاهيم الأساسية لـ React.js",
                lessons: [
                  {
                    id: "lesson-1-1",
                    title: "مقدمة في React ونظامه البيئي",
                    duration: "18:45",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-2",
                    title: "إعداد بيئة التطوير الخاصة بك",
                    duration: "22:30",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-3",
                    title: "إنشاء أول مكون React الخاص بك",
                    duration: "25:15",
                    type: "video",
                    isLocked: false,
                  },
                  {
                    id: "lesson-1-4",
                    title: "بناء جملة JSX والتعبيرات",
                    duration: "20:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-1-5",
                    title: "مشروع الوحدة 1: تطبيق React بسيط",
                    duration: "45:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-2",
                title: "المكونات والخصائص",
                description: "إتقان البنية المعمارية القائمة على المكونات والخصائص",
                lessons: [
                  {
                    id: "lesson-2-1",
                    title: "أنواع المكونات والبنية المعمارية",
                    duration: "24:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-2",
                    title: "الخصائص وأنواع الخصائص",
                    duration: "19:45",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-3",
                    title: "تكوين المكونات",
                    duration: "22:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-4",
                    title: "العرض الشرطي",
                    duration: "18:20",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-2-5",
                    title: "اختبار الوحدة 2: المكونات والخصائص",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-3",
                title: "الحالة ودورة الحياة",
                description: "تعلم كيفية إدارة الحالة ودورة حياة المكون",
                lessons: [
                  {
                    id: "lesson-3-1",
                    title: "مقدمة في الحالة",
                    duration: "21:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-2",
                    title: "خطاف useState",
                    duration: "26:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-3",
                    title: "دورة حياة المكون مع useEffect",
                    duration: "28:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-4",
                    title: "إدارة الحالة المعقدة",
                    duration: "24:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-3-5",
                    title: "مشروع الوحدة 3: تطبيق عداد تفاعلي",
                    duration: "60:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-4",
                title: "النماذج والأحداث",
                description: "التعامل مع إدخال المستخدم والأحداث في React",
                lessons: [
                  {
                    id: "lesson-4-1",
                    title: "معالجة الأحداث في React",
                    duration: "19:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-2",
                    title: "المكونات المتحكم بها مقابل غير المتحكم بها",
                    duration: "22:45",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-3",
                    title: "التحقق من صحة النموذج",
                    duration: "26:20",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-4",
                    title: "خطافات مخصصة للنماذج",
                    duration: "24:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-4-5",
                    title: "اختبار الوحدة 4: النماذج والأحداث",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-5",
                title: "التوجيه والتنقل",
                description: "إنشاء تطبيقات متعددة الصفحات باستخدام React Router",
                lessons: [
                  {
                    id: "lesson-5-1",
                    title: "مقدمة في React Router",
                    duration: "23:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-2",
                    title: "إعداد المسارات",
                    duration: "19:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-3",
                    title: "معلمات المسار والاستعلامات",
                    duration: "22:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-4",
                    title: "المسارات المحمية والمصادقة",
                    duration: "28:10",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-5-5",
                    title: "مشروع الوحدة 5: تطبيق متعدد الصفحات",
                    duration: "60:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-6",
                title: "إدارة الحالة",
                description: "تعلم تقنيات إدارة الحالة المتقدمة",
                lessons: [
                  {
                    id: "lesson-6-1",
                    title: "Context API",
                    duration: "25:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-2",
                    title: "مقدمة في Redux",
                    duration: "28:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-3",
                    title: "Redux Toolkit",
                    duration: "26:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-4",
                    title: "أفضل ممارسات إدارة الحالة",
                    duration: "22:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-6-5",
                    title: "اختبار الوحدة 6: إدارة الحالة",
                    duration: "15:00",
                    type: "quiz",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-7",
                title: "تكامل API",
                description: "ربط تطبيق React الخاص بك بخدمات الواجهة الخلفية",
                lessons: [
                  {
                    id: "lesson-7-1",
                    title: "جلب البيانات باستخدام useEffect",
                    duration: "23:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-7-2",
                    title: "العمل مع Axios",
                    duration: "20:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-7-3",
                    title: "معالجة الأخطاء",
                    duration: "18:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-7-4",
                    title: "خطافات مخصصة لاستدعاءات API",
                    duration: "24:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-7-5",
                    title: "مشروع الوحدة 7: لوحة معلومات البيانات",
                    duration: "60:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
              {
                id: "module-8",
                title: "النشر وأفضل الممارسات",
                description: "نشر تطبيق React الخاص بك وتعلم أفضل الممارسات المهنية",
                lessons: [
                  {
                    id: "lesson-8-1",
                    title: "تحسين تطبيقات React",
                    duration: "22:50",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-8-2",
                    title: "اختبار مكونات React",
                    duration: "26:30",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-8-3",
                    title: "البناء للإنتاج",
                    duration: "19:15",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-8-4",
                    title: "خيارات النشر",
                    duration: "24:40",
                    type: "video",
                    isLocked: true,
                  },
                  {
                    id: "lesson-8-5",
                    title: "المشروع النهائي: تطبيق React كامل",
                    duration: "90:00",
                    type: "assignment",
                    isLocked: true,
                  },
                ],
              },
            ],
            reviews: [
              {
                id: "review-1",
                name: "إيميلي رودريغيز",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "10 فبراير 2025",
                rating: 5,
                comment:
                  "حول هذا المعسكر التدريبي من مطور HTML/CSS أساسي إلى مطور React واثق. يشرح المدرب المفاهيم المعقدة بطريقة سهلة الفهم، والمشاريع عملية وجذابة. حصلت على وظيفة مطور React بعد أسبوعين فقط من إكمال هذه الدورة!",
              },
              {
                id: "review-2",
                name: "جيمس تشن",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "25 يناير 2025",
                rating: 5,
                comment:
                  "هيكل ومحتوى الدورة ممتاز. التقدم من الأساسيات إلى المواضيع المتقدمة مدروس جيداً. قدرت بشكل خاص أقسام إدارة الحالة وتكامل API، وهي أمور حاسمة للتطبيقات الواقعية.",
              },
              {
                id: "review-3",
                name: "صوفيا ويليامز",
                avatar: "/placeholder.svg?height=50&width=50",
                date: "12 يناير 2025",
                rating: 4,
                comment:
                  "معسكر شامل للغاية مع شروحات وأمثلة رائعة. السبب الوحيد لإعطائي 4 نجوم هو أنني أتمنى لو كان هناك المزيد من المحتوى حول اختبار تطبيقات React. بخلاف ذلك، إنه مصدر ممتاز لتعلم React.",
              },
            ],
          },
        },
      }

      // Get the course data based on the courseId and language
      const courseData = mockCourses[courseId]?.[language]
      setCourse(courseData || null)
      setLoading(false)
    }

    fetchCourse()
  }, [courseId, language])

  useEffect(() => {
    if (courseId) {
      const videos = getCourseVideos(courseId)
      setCourseVideos(videos)

      // Set the preview video if available
      const previewVideo = getCoursePreviewVideo(courseId)
      setCurrentVideoUrl(previewVideo)
    }
  }, [courseId])

  const isRTL = language === "ar"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link href="/courses">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Browse All Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Calculate total course duration
  const calculateTotalDuration = () => {
    let totalMinutes = 0
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        if (lesson.duration !== "N/A") {
          const [minutes, seconds] = lesson.duration.split(":").map(Number)
          totalMinutes += minutes + seconds / 60
        }
      })
    })
    return Math.round(totalMinutes)
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const totalDuration = calculateTotalDuration()

  // Function to render lesson icon based on type
  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "quiz":
        return <FileText className="h-4 w-4" />
      case "assignment":
        return <BookOpen className="h-4 w-4" />
      case "download":
        return <Download className="h-4 w-4" />
      default:
        return <Video className="h-4 w-4" />
    }
  }

  return (
    <div className={`min-h-screen bg-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/courses" className="flex items-center">
                <ArrowLeft className={`h-5 w-5 text-gray-600 ${isRTL ? "ml-2" : "mr-2"}`} />
                <span className="text-2xl font-bold text-blue-600">Reskil</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>{language === "en" ? "العربية" : "English"}</span>
              </Button>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Course Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Badge variant="secondary" className="text-xs">
                  {course.category}
                </Badge>
                <Badge variant="outline" className={`text-xs ${isRTL ? "mr-2" : "ml-2"}`}>
                  {course.level}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.subtitle}</p>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={course.instructor.avatar || "/placeholder.svg"}
                      alt={course.instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`${isRTL ? "mr-3" : "ml-3"}`}>
                    <p className="font-medium text-gray-900">{course.instructor.name}</p>
                    <p className="text-sm text-gray-600">{course.instructor.title}</p>
                  </div>
                </div>

                <div className={`flex items-center ${isRTL ? "mr-6" : "ml-6"}`}>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(course.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm text-gray-600 ${isRTL ? "mr-1" : "ml-1"}`}>
                    {course.rating} ({course.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center">
                  <Users className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span className="text-sm text-gray-700">{course.studentsCount} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span className="text-sm text-gray-700">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span className="text-sm text-gray-700">{totalLessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Globe className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span className="text-sm text-gray-700">{course.language}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Enroll Now - {course.price}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center"
                  onClick={() => {
                    if (currentVideoUrl) {
                      setShowVideoModal(true)
                    }
                  }}
                >
                  <Play className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  Watch Preview
                </Button>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-xl">
              {currentVideoUrl ? (
                <YouTubePlayer videoUrl={currentVideoUrl} isLocked={false} title={`${course.title} - Preview`} />
              ) : (
                <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-auto" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
                      <p className="text-gray-700 leading-relaxed">{course.description}</p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className={`h-5 w-5 text-green-500 ${isRTL ? "ml-3" : "mr-3"} mt-0.5`} />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {course.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Instructor</h2>
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={course.instructor.avatar || "/placeholder.svg"}
                            alt={course.instructor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className={`${isRTL ? "mr-4" : "ml-4"}`}>
                          <h3 className="text-xl font-semibold text-gray-900">{course.instructor.name}</h3>
                          <p className="text-gray-600 mb-2">{course.instructor.title}</p>
                          <p className="text-gray-700">
                            Experienced instructor with a passion for teaching practical, job-ready skills. Has helped
                            thousands of students launch successful careers in the digital industry.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
                      <div className="text-sm text-gray-600">
                        {totalLessons} lessons • {totalDuration} minutes
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="space-y-4">
                      {course.modules.map((module, index) => (
                        <AccordionItem key={module.id} value={module.id} className="border rounded-lg overflow-hidden">
                          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                            <div className="flex flex-col items-start text-left">
                              <div className="font-semibold text-lg text-gray-900">
                                {index + 1}. {module.title}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">{module.description}</div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-0">
                            <div className="divide-y divide-gray-200">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lesson.id}
                                  className={`flex items-center justify-between px-6 py-4 ${
                                    lesson.isLocked ? "opacity-70" : ""
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        lesson.isLocked ? "bg-gray-100" : "bg-blue-100"
                                      } ${isRTL ? "ml-3" : "mr-3"}`}
                                    >
                                      {getLessonIcon(lesson.type)}
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">
                                        {index + 1}.{lessonIndex + 1} {lesson.title}
                                      </div>
                                      <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <span
                                          className={`capitalize px-2 py-0.5 rounded-full ${
                                            lesson.type === "video"
                                              ? "bg-blue-50 text-blue-700"
                                              : lesson.type === "quiz"
                                                ? "bg-purple-50 text-purple-700"
                                                : lesson.type === "assignment"
                                                  ? "bg-amber-50 text-amber-700"
                                                  : "bg-green-50 text-green-700"
                                          }`}
                                        >
                                          {lesson.type}
                                        </span>
                                        <span className={`${isRTL ? "mr-2" : "ml-2"}`}>{lesson.duration}</span>
                                      </div>
                                    </div>
                                  </div>
                                  {lesson.isLocked ? (
                                    <Lock className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="rounded-full w-8 h-8 p-0"
                                      onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        const videoIndex = index * module.lessons.length + lessonIndex
                                        if (courseVideos[videoIndex]) {
                                          setCurrentVideoUrl(courseVideos[videoIndex].url)
                                          setShowVideoModal(true)
                                        }
                                      }}
                                    >
                                      <Play className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
                      <div className="flex items-center">
                        <div className="text-3xl font-bold text-gray-900 mr-2">{course.rating}</div>
                        <div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(course.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{course.reviewCount} reviews</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {course.reviews.map((review) => (
                        <Card key={review.id} className="p-6">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                              <img
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className={`${isRTL ? "mr-4" : "ml-4"} flex-1`}>
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">{review.name}</h3>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex my-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Price</span>
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                        {course.originalPrice && (
                          <span className="text-gray-500 line-through ml-2 text-sm">{course.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Enroll Now</Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total lessons</span>
                      <span className="font-medium">{totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total duration</span>
                      <span className="font-medium">{totalDuration} minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Language</span>
                      <span className="font-medium">{course.language}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Last updated</span>
                      <span className="font-medium">{course.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">This course includes:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Video className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-3" : "mr-3"}`} />
                        <span className="text-gray-700">{course.duration} of video content</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-3" : "mr-3"}`} />
                        <span className="text-gray-700">Comprehensive resources</span>
                      </div>
                      <div className="flex items-center">
                        <Award className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-3" : "mr-3"}`} />
                        <span className="text-gray-700">Certificate of completion</span>
                      </div>
                      <div className="flex items-center">
                        <BarChart className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-3" : "mr-3"}`} />
                        <span className="text-gray-700">Progress tracking</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-3" : "mr-3"}`} />
                        <span className="text-gray-700">Instructor Q&A support</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Share2 className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Heart className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                        Wishlist
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Card 1 */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Course thumbnail"
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-blue-600">Popular</Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    Digital Marketing
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Beginner
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mb-2">TikTok Ads Mastery</CardTitle>
                <p className="text-gray-600 text-sm">Create viral TikTok ad campaigns that convert</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">$59</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.7</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Course</Button>
              </CardContent>
            </Card>

            {/* Course Card 2 */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Course thumbnail"
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    AI & Automation
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Beginner
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mb-2">AI Automation for Business</CardTitle>
                <p className="text-gray-600 text-sm">Automate your business processes with AI tools</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">$69</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Course</Button>
              </CardContent>
            </Card>

            {/* Course Card 3 */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Course thumbnail"
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    Design
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Beginner
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mb-2">UI/UX Design Fundamentals</CardTitle>
                <p className="text-gray-600 text-sm">Design beautiful and user-friendly interfaces</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">$55</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Course</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-blue-100 mb-8">Enroll now and take the first step towards mastering new skills</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            Enroll Now - {course.price}
          </Button>
        </div>
      </section>

      {/* Video Preview Modal */}
      {currentVideoUrl && (
        <VideoPreviewModal
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          videoUrl={currentVideoUrl}
          title={`${course.title} - Video Preview`}
        />
      )}
    </div>
  )
}
