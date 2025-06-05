"use client"

import { useState } from "react"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Play,
  Users,
  Shield,
  CheckCircle,
  Globe,
  Target,
  Award,
  Clock,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

type Language = "en" | "ar"

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const content = {
    en: {
      nav: {
        home: "Home",
        courses: "Courses",
        miniCourses: "Mini Courses",
        pricing: "Pricing",
        testimonials: "Reviews",
        faq: "FAQ",
        joinNow: "Join Now",
      },
      hero: {
        badge: "🚀 Join 10,000+ Students",
        title: "Master Digital Skills That Actually Pay",
        subtitle:
          "Learn ecommerce, AI, web development, and design with practical, no-fluff training. Get job-ready in weeks, not years.",
        cta1: "Start Learning Today",
        cta2: "Watch Preview",
        exploreBtn: "Explore Courses",
        stats: {
          students: "10,000+ Students",
          completion: "95% Completion Rate",
          satisfaction: "4.9/5 Rating",
        },
      },
      courses: {
        title: "Choose Your Learning Path",
        subtitle: "Flexible options designed for your schedule and budget",
        starter: {
          name: "Starter Course",
          price: "$49",
          description: "Perfect for beginners",
          features: [
            "5+ Hours of Video Content",
            "Downloadable Resources",
            "Community Access",
            "Certificate of Completion",
            "30-Day Money Back Guarantee",
          ],
          cta: "Get Started",
        },
        fullAccess: {
          name: "Full Access Pass",
          price: "$15/month",
          description: "Best value for serious learners",
          popular: "Most Popular",
          features: [
            "Access to ALL Courses",
            "New Content Every Week",
            "Live Q&A Sessions",
            "Priority Support",
            "Job Placement Assistance",
            "Cancel Anytime",
          ],
          cta: "Start Free Trial",
        },
        private: {
          name: "Private 1-on-1 Session",
          price: "$29",
          description: "Personalized mentoring",
          features: [
            "60-Minute Private Session",
            "Personalized Learning Plan",
            "Direct Mentor Access",
            "Custom Project Review",
            "Career Guidance",
          ],
          cta: "Book Session",
        },
      },
      features: {
        title: "Why Choose Reskil?",
        subtitle: "We focus on practical skills that get you hired",
        items: [
          {
            icon: Target,
            title: "Job-Ready Skills",
            description: "Learn exactly what employers want. No theory, just practical skills you can use immediately.",
          },
          {
            icon: Clock,
            title: "Learn at Your Pace",
            description: "Flexible schedule that fits your life. Study when you want, where you want.",
          },
          {
            icon: Users,
            title: "Expert Mentors",
            description: "Learn from industry professionals who've built successful careers in tech.",
          },
          {
            icon: Award,
            title: "Proven Results",
            description: "95% of our students land jobs or increase their income within 6 months.",
          },
        ],
      },
      testimonials: {
        title: "Success Stories",
        subtitle: "Real results from real students",
        items: [
          {
            name: "Sarah Johnson",
            role: "E-commerce Manager",
            content:
              "Reskil helped me transition from retail to running my own Shopify store. I'm now making $5k/month!",
            rating: 5,
          },
          {
            name: "Ahmed Hassan",
            role: "Web Developer",
            content:
              "The web development course was exactly what I needed. Got hired as a frontend developer within 3 months.",
            rating: 5,
          },
          {
            name: "Maria Garcia",
            role: "Digital Marketer",
            content: "The TikTok Ads training was incredible. I increased my client's sales by 300% in just 2 months.",
            rating: 5,
          },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about Reskil",
        items: [
          {
            question: "How long does it take to complete a course?",
            answer:
              "Most courses can be completed in 2-4 weeks with 1-2 hours of daily study. You can go at your own pace.",
          },
          {
            question: "Do I get a certificate?",
            answer:
              "Yes! You'll receive a certificate of completion for each course that you can add to your LinkedIn profile.",
          },
          {
            question: "Is there a money-back guarantee?",
            answer: "We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your money.",
          },
          {
            question: "Can I access courses on mobile?",
            answer: "Yes! Our platform works perfectly on all devices - desktop, tablet, and mobile.",
          },
          {
            question: "Do you offer job placement assistance?",
            answer:
              "Full Access Pass members get job placement assistance, including resume review and interview prep.",
          },
        ],
      },
      cta: {
        title: "Ready to Transform Your Career?",
        subtitle: "Join thousands of students who've already upgraded their skills and income",
        button: "Start Learning Now",
      },
      footer: {
        description: "Empowering the next generation of digital professionals",
        links: {
          courses: "Courses",
          about: "About",
          contact: "Contact",
          privacy: "Privacy",
          terms: "Terms",
        },
        copyright: "© 2025 Reskil. All rights reserved.",
        contact: {
          email: "support@reskil.com",
          phone: "+212 766-831008",
          instagram: "instagram.com/reskil.club",
        },
      },
    },
    ar: {
      nav: {
        home: "الرئيسية",
        courses: "الدورات",
        miniCourses: "الدورات المصغرة",
        pricing: "الأسعار",
        testimonials: "التقييمات",
        faq: "الأسئلة الشائعة",
        joinNow: "انضم الآن",
      },
      hero: {
        badge: "🚀 انضم لأكثر من 10,000 طالب",
        title: "أتقن المهارات الرقمية التي تدفع فعلاً",
        subtitle:
          "تعلم التجارة الإلكترونية والذكاء الاصطناعي وتطوير المواقع والتصميم بتدريب عملي بدون حشو. كن جاهزاً للعمل في أسابيع وليس سنوات.",
        cta1: "ابدأ التعلم اليوم",
        cta2: "شاهد المعاينة",
        exploreBtn: "استكشف الدورات",
        stats: {
          students: "+10,000 طالب",
          completion: "95% معدل الإكمال",
          satisfaction: "4.9/5 التقييم",
        },
      },
      courses: {
        title: "اختر مسارك التعليمي",
        subtitle: "خيارات مرنة مصممة لجدولك وميزانيتك",
        starter: {
          name: "الدورة التأسيسية",
          price: "490 درهم",
          description: "مثالية للمبتدئين",
          features: [
            "+5 ساعات من المحتوى المرئي",
            "موارد قابلة للتحميل",
            "الوصول للمجتمع",
            "شهادة إتمام",
            "ضمان استرداد لمدة 30 يوم",
          ],
          cta: "ابدأ الآن",
        },
        fullAccess: {
          name: "تذكرة الوصول الكامل",
          price: "150 درهم/شهر",
          description: "أفضل قيمة للمتعلمين الجادين",
          popular: "الأكثر شعبية",
          features: [
            "الوصول لجميع الدورات",
            "محتوى جديد كل أسبوع",
            "جلسات أسئلة وأجوبة مباشرة",
            "دعم أولوية",
            "مساعدة في التوظيف",
            "إلغاء في أي وقت",
          ],
          cta: "ابدأ التجربة المجانية",
        },
        private: {
          name: "جلسة خاصة 1-على-1",
          price: "290 درهم",
          description: "إرشاد شخصي",
          features: [
            "جلسة خاصة لمدة 60 دقيقة",
            "خطة تعلم شخصية",
            "وصول مباشر للمرشد",
            "مراجعة مشروع مخصص",
            "إرشاد مهني",
          ],
          cta: "احجز جلسة",
        },
      },
      features: {
        title: "لماذا تختار Reskil؟",
        subtitle: "نركز على المهارات العملية التي تؤهلك للتوظيف",
        items: [
          {
            icon: Target,
            title: "مهارات جاهزة للعمل",
            description: "تعلم بالضبط ما يريده أصحاب العمل. لا نظريات، فقط مهارات عملية يمكنك استخدامها فوراً.",
          },
          {
            icon: Clock,
            title: "تعلم بوتيرتك",
            description: "جدول مرن يناسب حياتك. ادرس متى تريد، أينما تريد.",
          },
          {
            icon: Users,
            title: "مرشدون خبراء",
            description: "تعلم من محترفين في الصناعة بنوا مسيرات مهنية ناجحة في التكنولوجيا.",
          },
          {
            icon: Award,
            title: "نتائج مثبتة",
            description: "95% من طلابنا يحصلون على وظائف أو يزيدون دخلهم خلال 6 أشهر.",
          },
        ],
      },
      testimonials: {
        title: "قصص النجاح",
        subtitle: "نتائج حقيقية من طلاب حقيقيين",
        items: [
          {
            name: "سارة أحمد",
            role: "مديرة تجارة إلكترونية",
            content:
              "ساعدني Reskil في الانتقال من البيع بالتجزئة إلى إدارة متجر Shopify الخاص بي. أحقق الآن 5000 دولار شهرياً!",
            rating: 5,
          },
          {
            name: "أحمد حسن",
            role: "مطور ويب",
            content: "دورة تطوير المواقع كانت بالضبط ما احتجته. حصلت على وظيفة كمطور واجهات أمامية خلال 3 أشهر.",
            rating: 5,
          },
          {
            name: "فاطمة المغربي",
            role: "مسوقة رقمية",
            content: "تدريب إعلانات TikTok كان رائعاً. زدت مبيعات عميلي بنسبة 300% في شهرين فقط.",
            rating: 5,
          },
        ],
      },
      faq: {
        title: "الأسئلة الشائعة",
        subtitle: "كل ما تحتاج معرفته عن Reskil",
        items: [
          {
            question: "كم من الوقت يستغرق إكمال الدورة؟",
            answer: "يمكن إكمال معظم الدورات في 2-4 أسابيع مع 1-2 ساعة دراسة يومياً. يمكنك التقدم بوتيرتك الخاصة.",
          },
          {
            question: "هل أحصل على شهادة؟",
            answer: "نعم! ستحصل على شهادة إتمام لكل دورة يمكنك إضافتها لملفك الشخصي على LinkedIn.",
          },
          {
            question: "هل يوجد ضمان استرداد الأموال؟",
            answer: "بالطبع! نقدم ضمان استرداد لمدة 30 يوماً. إذا لم تكن راضياً، سنسترد أموالك.",
          },
          {
            question: "هل يمكنني الوصول للدورات على الهاتف؟",
            answer: "نعم! منصتنا تعمل بشكل مثالي على جميع الأجهزة - الكمبيوتر والتابلت والهاتف.",
          },
          {
            question: "هل تقدمون مساعدة في التوظيف؟",
            answer:
              "أعضاء تذكرة الوصول الكامل يحصلون على مساعدة في التوظيف، بما في ذلك مراجعة السيرة الذاتية والتحضير للمقابلات.",
          },
        ],
      },
      cta: {
        title: "جاهز لتحويل مسيرتك المهنية؟",
        subtitle: "انضم لآلاف الطلاب الذين طوروا مهاراتهم ودخلهم بالفعل",
        button: "ابدأ التعلم الآن",
      },
      footer: {
        description: "تمكين الجيل القادم من المحترفين الرقميين",
        links: {
          courses: "الدورات",
          about: "من نحن",
          contact: "اتصل بنا",
          privacy: "الخصوصية",
          terms: "الشروط",
        },
        copyright: "© 2025 Reskil. جميع الحقوق محفوظة.",
        contact: {
          email: "support@reskil.com",
          phone: "+212 766-831008",
          instagram: "instagram.com/reskil.club",
        },
      },
    },
  }

  const t = content[language]
  const isRTL = language === "ar"

  return (
    <div className={`min-h-screen bg-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">Reskil</span>
              </div>
              <div className="hidden md:block">
                <div
                  className={`${isRTL ? "mr-10" : "ml-10"} flex items-baseline space-x-4 ${isRTL ? "space-x-reverse" : ""}`}
                >
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t.nav.home}
                  </button>
                  <Link
                    href="/courses"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t.nav.courses}
                  </Link>
                  <Link
                    href="/mini-courses"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t.nav.miniCourses}
                  </Link>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t.nav.pricing}
                  </button>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t.nav.testimonials}
                  </button>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t.nav.faq}
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span>{language === "en" ? "العربية" : "English"}</span>
              </EnhancedButton>
              <Link href="/admin">
                <EnhancedButton variant="ghost" size="sm">
                  Admin
                </EnhancedButton>
              </Link>
              <Link href="/signup">
                <EnhancedButton>{t.nav.joinNow}</EnhancedButton>
              </Link>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs">{language === "en" ? "AR" : "EN"}</span>
              </EnhancedButton>
              <EnhancedButton variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </EnhancedButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                scrollToSection("hero")
                setMobileMenuOpen(false)
              }}
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 w-full text-left"
            >
              {t.nav.home}
            </button>
            <Link
              href="/courses"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.courses}
            </Link>
            <Link
              href="/mini-courses"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.miniCourses}
            </Link>
            <button
              onClick={() => {
                scrollToSection("pricing")
                setMobileMenuOpen(false)
              }}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 w-full text-left"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => {
                scrollToSection("testimonials")
                setMobileMenuOpen(false)
              }}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 w-full text-left"
            >
              {t.nav.testimonials}
            </button>
            <button
              onClick={() => {
                scrollToSection("faq")
                setMobileMenuOpen(false)
              }}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 w-full text-left"
            >
              {t.nav.faq}
            </button>
            <div className="px-3 py-2">
              <Link href="/signup">
                <EnhancedButton className="w-full">{t.nav.joinNow}</EnhancedButton>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 text-sm font-medium px-4 py-2">
              {t.hero.badge}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">{t.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 mb-12">
              <Link href="/signup">
                <EnhancedButton size="lg" className="px-8 py-4 text-lg">
                  {t.hero.cta1}
                  <ArrowRight className={`${isRTL ? "mr-2" : "ml-2"} h-5 w-5`} />
                </EnhancedButton>
              </Link>
              <EnhancedButton
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => scrollToSection("video-preview")}
              >
                <Play className={`${isRTL ? "ml-2" : "mr-2"} h-5 w-5`} />
                {t.hero.cta2}
              </EnhancedButton>
              <Link href="/courses">
                <EnhancedButton variant="secondary" size="lg" className="px-8 py-4 text-lg">
                  {t.hero.exploreBtn}
                </EnhancedButton>
              </Link>
            </div>

            {/* YouTube Video Embed */}
            <div id="video-preview" className="max-w-4xl mx-auto mb-12">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/d8UykXD85m8"
                  title="Course Preview"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t.hero.stats.students}</div>
                <div className="text-gray-600">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t.hero.stats.completion}</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{t.hero.stats.satisfaction}</div>
                <div className="text-gray-600">Student Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.courses.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.courses.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Course */}
            <Card className="relative border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{t.courses.starter.name}</CardTitle>
                <div className="text-4xl font-bold text-blue-600 my-4">{t.courses.starter.price}</div>
                <p className="text-gray-600">{t.courses.starter.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {t.courses.starter.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className={`h-5 w-5 text-green-500 ${isRTL ? "ml-3" : "mr-3"}`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <EnhancedButton className="w-full">{t.courses.starter.cta}</EnhancedButton>
                </Link>
              </CardContent>
            </Card>

            {/* Full Access Pass */}
            <Card className="relative border-2 border-blue-500 shadow-lg scale-105 hover:shadow-xl transition-all duration-300">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                {t.courses.fullAccess.popular}
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{t.courses.fullAccess.name}</CardTitle>
                <div className="text-4xl font-bold text-blue-600 my-4">{t.courses.fullAccess.price}</div>
                <p className="text-gray-600">{t.courses.fullAccess.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {t.courses.fullAccess.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className={`h-5 w-5 text-green-500 ${isRTL ? "ml-3" : "mr-3"}`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <EnhancedButton className="w-full">{t.courses.fullAccess.cta}</EnhancedButton>
                </Link>
              </CardContent>
            </Card>

            {/* Private Session */}
            <Card className="relative border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{t.courses.private.name}</CardTitle>
                <div className="text-4xl font-bold text-blue-600 my-4">{t.courses.private.price}</div>
                <p className="text-gray-600">{t.courses.private.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {t.courses.private.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className={`h-5 w-5 text-green-500 ${isRTL ? "ml-3" : "mr-3"}`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <EnhancedButton className="w-full">{t.courses.private.cta}</EnhancedButton>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Trust Elements */}
          <div className="mt-16 text-center">
            <div className="flex justify-center items-center space-x-8 space-x-reverse opacity-60">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-sm">Secure Checkout</span>
              </div>
              <div className="flex items-center">
                <Users className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-sm">10,000+ Students</span>
              </div>
              <div className="flex items-center">
                <Award className="h-6 w-6 text-yellow-500 mr-2" />
                <span className="text-sm">Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.testimonials.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center ${isRTL ? "ml-4" : "mr-4"}`}
                    >
                      <span className="text-blue-600 font-semibold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.faq.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.faq.subtitle}</p>
          </div>
          <div className="space-y-4">
            {t.faq.items.map((item, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-blue-200 transition-colors">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                    {activeAccordion === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {activeAccordion === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.cta.title}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>
          <Link href="/signup">
            <EnhancedButton size="xl" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl">
              {t.cta.button}
              <ArrowRight className={`${isRTL ? "mr-2" : "ml-2"} h-5 w-5`} />
            </EnhancedButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-blue-400">Reskil</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${t.footer.contact.email}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {t.footer.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${t.footer.contact.phone}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {t.footer.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://${t.footer.contact.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t.footer.links.courses}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t.footer.links.about}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t.footer.links.contact}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t.footer.links.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t.footer.links.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
