"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Globe, ArrowLeft, Target, Users, Award, Heart, Lightbulb, Rocket } from "lucide-react"

type Language = "en" | "ar"

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const content = {
    en: {
      title: "About Reskil",
      subtitle: "Empowering the next generation of digital professionals",
      mission: {
        title: "Our Mission",
        description:
          "To make high-quality digital education accessible to everyone, regardless of their background or location. We believe that practical skills and real-world experience are the keys to career transformation.",
      },
      story: {
        title: "Our Story",
        description:
          "Founded in 2023, Reskil was born from the frustration of seeing talented individuals struggle to find relevant, practical education that actually leads to employment. Our founders, having built successful careers in tech and digital marketing, decided to create the platform they wished existed when they were starting out.",
      },
      values: [
        {
          icon: Target,
          title: "Practical Focus",
          description: "We teach skills that employers actually want, not outdated theory.",
        },
        {
          icon: Users,
          title: "Community Driven",
          description: "Learning is better together. Our community supports each other's growth.",
        },
        {
          icon: Award,
          title: "Quality First",
          description: "Every course is crafted by industry experts with proven track records.",
        },
        {
          icon: Heart,
          title: "Student Success",
          description: "Your success is our success. We're invested in your career transformation.",
        },
      ],
      team: {
        title: "Meet Our Team",
        members: [
          {
            name: "Sarah Ahmed",
            role: "Founder & CEO",
            bio: "Former Google product manager with 8+ years in tech. Built and scaled multiple digital products.",
          },
          {
            name: "Mohamed Hassan",
            role: "Head of Education",
            bio: "Ex-Shopify developer and e-commerce consultant. Helped 100+ businesses scale online.",
          },
          {
            name: "Fatima Al-Zahra",
            role: "Marketing Director",
            bio: "Digital marketing expert who's managed $10M+ in ad spend across various platforms.",
          },
        ],
      },
      stats: [
        { number: "10,000+", label: "Students Enrolled" },
        { number: "95%", label: "Completion Rate" },
        { number: "4.9/5", label: "Average Rating" },
        { number: "85%", label: "Job Placement Rate" },
      ],
    },
    ar: {
      title: "عن Reskil",
      subtitle: "تمكين الجيل القادم من المحترفين الرقميين",
      mission: {
        title: "مهمتنا",
        description:
          "جعل التعليم الرقمي عالي الجودة متاحاً للجميع، بغض النظر عن خلفيتهم أو موقعهم. نؤمن أن المهارات العملية والخبرة الواقعية هي مفاتيح التحول المهني.",
      },
      story: {
        title: "قصتنا",
        description:
          "تأسست Reskil في عام 2023، وُلدت من الإحباط من رؤية الأفراد الموهوبين يكافحون للعثور على تعليم عملي ومناسب يؤدي فعلاً إلى التوظيف. مؤسسونا، الذين بنوا مسيرات مهنية ناجحة في التكنولوجيا والتسويق الرقمي، قرروا إنشاء المنصة التي تمنوا وجودها عندما كانوا يبدؤون.",
      },
      values: [
        {
          icon: Target,
          title: "التركيز العملي",
          description: "نعلم المهارات التي يريدها أصحاب العمل فعلاً، وليس النظريات القديمة.",
        },
        {
          icon: Users,
          title: "مدفوع بالمجتمع",
          description: "التعلم أفضل معاً. مجتمعنا يدعم نمو بعضهم البعض.",
        },
        {
          icon: Award,
          title: "الجودة أولاً",
          description: "كل دورة مصممة من قبل خبراء الصناعة ذوي السجلات المثبتة.",
        },
        {
          icon: Heart,
          title: "نجاح الطلاب",
          description: "نجاحك هو نجاحنا. نحن مستثمرون في تحولك المهني.",
        },
      ],
      team: {
        title: "تعرف على فريقنا",
        members: [
          {
            name: "سارة أحمد",
            role: "المؤسس والرئيس التنفيذي",
            bio: "مديرة منتجات سابقة في Google مع أكثر من 8 سنوات في التكنولوجيا. بنت ووسعت منتجات رقمية متعددة.",
          },
          {
            name: "محمد حسن",
            role: "رئيس التعليم",
            bio: "مطور Shopify سابق ومستشار تجارة إلكترونية. ساعد أكثر من 100 شركة على التوسع عبر الإنترنت.",
          },
          {
            name: "فاطمة الزهراء",
            role: "مديرة التسويق",
            bio: "خبيرة تسويق رقمي أدارت أكثر من 10 مليون دولار في الإنفاق الإعلاني عبر منصات مختلفة.",
          },
        ],
      },
      stats: [
        { number: "+10,000", label: "طالب مسجل" },
        { number: "95%", label: "معدل الإكمال" },
        { number: "4.9/5", label: "متوسط التقييم" },
        { number: "85%", label: "معدل التوظيف" },
      ],
    },
  }

  const t = content[language]
  const isRTL = language === "ar"

  return (
    <div className={`min-h-screen bg-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <Lightbulb className={`h-8 w-8 text-blue-600 ${isRTL ? "ml-4" : "mr-4"}`} />
                <h2 className="text-2xl font-bold text-gray-900">{t.mission.title}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{t.mission.description}</p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center mb-6">
                <Rocket className={`h-8 w-8 text-blue-600 ${isRTL ? "ml-4" : "mr-4"}`} />
                <h2 className="text-2xl font-bold text-gray-900">{t.story.title}</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{t.story.description}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.team.title}</h2>
            <p className="text-xl text-gray-600">The experts behind your success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.team.members.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-blue-100 mb-8">Start your journey with thousands of successful students</p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
