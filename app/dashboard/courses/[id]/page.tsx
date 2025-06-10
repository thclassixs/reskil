"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import api from "@/services/api"
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

type Language = "en" | "ar"

interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "quiz" | "assignment" | "download"
  isLocked: boolean
  videoUrl?: string
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

interface CourseVideo {
  id: string
  url: string
  title: string
  duration: string
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const [language, setLanguage] = useState<Language>("en")
  const [course, setCourse] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [courseVideos, setCourseVideos] = useState<CourseVideo[]>([])

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/courses/${courseId}`)
        setCourse(data)
      } catch (error) {
        console.error('Failed to fetch course:', error)
        setCourse(null)
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  useEffect(() => {
    const fetchCourseVideos = async () => {
      if (!courseId) return
      try {
        const { data } = await api.get(`/courses/${courseId}/videos`)
        setCourseVideos(data)
      } catch (error) {
        console.error('Failed to fetch course videos:', error)
        setCourseVideos([])
      }
    }

    fetchCourseVideos()
  }, [courseId])

  const handlePreviewClick = async () => {
    try {
      const { data: previewUrl } = await api.get(`/courses/${courseId}/preview`)
      setCurrentVideoUrl(previewUrl)
      setShowVideoModal(true)
    } catch (error) {
      console.error('Failed to get preview video:', error)
    }
  }

  const handleVideoClick = async (videoId: string) => {
    try {
      const { data: videoUrl } = await api.get(`/courses/${courseId}/videos/${videoId}`)
      setCurrentVideoUrl(videoUrl)
      setShowVideoModal(true)
    } catch (error) {
      console.error('Failed to get video:', error)
    }
  }

  const handleEnrollClick = async () => {
    try {
      await api.post(`/courses/${courseId}/enroll`)
      // Redirect to the first lesson or show success message
    } catch (error) {
      console.error('Failed to enroll in course:', error)
      // Show error message to user
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

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
                  onClick={handlePreviewClick}
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleEnrollClick}>
                      Enroll Now
                    </Button>
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
