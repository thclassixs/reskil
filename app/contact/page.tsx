"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Globe, ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"

type Language = "en" | "ar"

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "Get in touch with our team. We're here to help you succeed.",
      form: {
        title: "Send us a Message",
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        namePlaceholder: "Enter your full name",
        emailPlaceholder: "Enter your email address",
        subjectPlaceholder: "What's this about?",
        messagePlaceholder: "Tell us how we can help you...",
      },
      contact: {
        title: "Contact Information",
        email: {
          title: "Email Us",
          description: "Send us an email anytime",
          value: "support@reskil.com",
        },
        phone: {
          title: "Call Us",
          description: "Mon-Fri from 9am to 6pm",
          value: "+212 766-831008",
        },
        social: {
          title: "Follow Us",
          description: "Stay updated with our latest content",
          value: "instagram.com/reskil.club",
        },
        hours: {
          title: "Business Hours",
          description: "Our team is available during these hours",
          value: "Monday - Friday: 9:00 AM - 6:00 PM (GMT+1)",
        },
      },
      faq: {
        title: "Quick Questions?",
        description: "Check our FAQ section for instant answers to common questions.",
        button: "View FAQ",
      },
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "تواصل مع فريقنا. نحن هنا لمساعدتك على النجاح.",
      form: {
        title: "أرسل لنا رسالة",
        name: "الاسم الكامل",
        email: "عنوان البريد الإلكتروني",
        subject: "الموضوع",
        message: "الرسالة",
        send: "إرسال الرسالة",
        namePlaceholder: "أدخل اسمك الكامل",
        emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
        subjectPlaceholder: "ما هو موضوع رسالتك؟",
        messagePlaceholder: "أخبرنا كيف يمكننا مساعدتك...",
      },
      contact: {
        title: "معلومات الاتصال",
        email: {
          title: "راسلنا",
          description: "أرسل لنا بريد إلكتروني في أي وقت",
          value: "support@reskil.com",
        },
        phone: {
          title: "اتصل بنا",
          description: "الاثنين-الجمعة من 9 صباحاً إلى 6 مساءً",
          value: "+212 766-831008",
        },
        social: {
          title: "تابعنا",
          description: "ابق محدثاً بأحدث محتوانا",
          value: "instagram.com/reskil.club",
        },
        hours: {
          title: "ساعات العمل",
          description: "فريقنا متاح خلال هذه الساعات",
          value: "الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً (GMT+1)",
        },
      },
      faq: {
        title: "أسئلة سريعة؟",
        description: "تحقق من قسم الأسئلة الشائعة للحصول على إجابات فورية للأسئلة الشائعة.",
        button: "عرض الأسئلة الشائعة",
      },
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

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <MessageCircle className={`h-6 w-6 text-blue-600 ${isRTL ? "ml-3" : "mr-3"}`} />
                  {t.form.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t.form.name}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t.form.namePlaceholder}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t.form.email}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t.form.emailPlaceholder}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">{t.form.subject}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder={t.form.subjectPlaceholder}
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">{t.form.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t.form.messagePlaceholder}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t.form.send}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 mb-6">{t.contact.title}</CardTitle>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className={`h-6 w-6 text-blue-600 ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.contact.email.title}</h3>
                      <p className="text-gray-600 text-sm mb-1">{t.contact.email.description}</p>
                      <a href={`mailto:${t.contact.email.value}`} className="text-blue-600 hover:text-blue-700">
                        {t.contact.email.value}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className={`h-6 w-6 text-blue-600 ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.contact.phone.title}</h3>
                      <p className="text-gray-600 text-sm mb-1">{t.contact.phone.description}</p>
                      <a href={`tel:${t.contact.phone.value}`} className="text-blue-600 hover:text-blue-700">
                        {t.contact.phone.value}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className={`h-6 w-6 text-blue-600 ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.contact.social.title}</h3>
                      <p className="text-gray-600 text-sm mb-1">{t.contact.social.description}</p>
                      <a
                        href={`https://${t.contact.social.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {t.contact.social.value}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className={`h-6 w-6 text-blue-600 ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.contact.hours.title}</h3>
                      <p className="text-gray-600 text-sm mb-1">{t.contact.hours.description}</p>
                      <p className="text-gray-700">{t.contact.hours.value}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">{t.faq.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{t.faq.description}</p>
                <Link href="/#faq">
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    {t.faq.button}
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
