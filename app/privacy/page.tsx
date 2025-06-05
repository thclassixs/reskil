"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ArrowLeft, Shield } from "lucide-react"

type Language = "en" | "ar"

export default function PrivacyPage() {
  const [language, setLanguage] = useState<Language>("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const content = {
    en: {
      title: "Privacy Policy",
      subtitle: "How we collect, use, and protect your information",
      lastUpdated: "Last updated: January 1, 2025",
      sections: [
        {
          title: "Information We Collect",
          content: [
            "Personal Information: When you create an account, we collect your name, email address, and other contact information you provide.",
            "Usage Data: We automatically collect information about how you use our platform, including courses accessed, time spent, and progress made.",
            "Device Information: We collect information about the device you use to access our services, including IP address, browser type, and operating system.",
            "Cookies: We use cookies and similar technologies to enhance your experience and analyze usage patterns.",
          ],
        },
        {
          title: "How We Use Your Information",
          content: [
            "Provide Services: To deliver our educational content and maintain your account.",
            "Improve Platform: To analyze usage patterns and improve our courses and platform functionality.",
            "Communication: To send you important updates, course recommendations, and marketing communications (with your consent).",
            "Support: To provide customer support and respond to your inquiries.",
            "Legal Compliance: To comply with legal obligations and protect our rights.",
          ],
        },
        {
          title: "Information Sharing",
          content: [
            "We do not sell, trade, or rent your personal information to third parties.",
            "Service Providers: We may share information with trusted service providers who help us operate our platform.",
            "Legal Requirements: We may disclose information when required by law or to protect our rights and safety.",
            "Business Transfers: In the event of a merger or acquisition, your information may be transferred to the new entity.",
          ],
        },
        {
          title: "Data Security",
          content: [
            "We implement industry-standard security measures to protect your personal information.",
            "All data transmission is encrypted using SSL/TLS protocols.",
            "We regularly update our security practices and conduct security audits.",
            "Access to personal information is restricted to authorized personnel only.",
          ],
        },
        {
          title: "Your Rights",
          content: [
            "Access: You can request access to the personal information we hold about you.",
            "Correction: You can request correction of inaccurate or incomplete information.",
            "Deletion: You can request deletion of your personal information, subject to legal requirements.",
            "Portability: You can request a copy of your data in a portable format.",
            "Opt-out: You can opt out of marketing communications at any time.",
          ],
        },
        {
          title: "Contact Us",
          content: [
            "If you have any questions about this Privacy Policy, please contact us:",
            "Email: privacy@reskil.com",
            "Phone: +212 766-831008",
            "Address: Reskil Privacy Team, Morocco",
          ],
        },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      subtitle: "كيف نجمع ونستخدم ونحمي معلوماتك",
      lastUpdated: "آخر تحديث: 1 يناير 2025",
      sections: [
        {
          title: "المعلومات التي نجمعها",
          content: [
            "المعلومات الشخصية: عند إنشاء حساب، نجمع اسمك وعنوان بريدك الإلكتروني ومعلومات الاتصال الأخرى التي تقدمها.",
            "بيانات الاستخدام: نجمع تلقائياً معلومات حول كيفية استخدامك لمنصتنا، بما في ذلك الدورات المُتاحة والوقت المُستغرق والتقدم المُحرز.",
            "معلومات الجهاز: نجمع معلومات حول الجهاز الذي تستخدمه للوصول إلى خدماتنا، بما في ذلك عنوان IP ونوع المتصفح ونظام التشغيل.",
            "ملفات تعريف الارتباط: نستخدم ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربتك وتحليل أنماط الاستخدام.",
          ],
        },
        {
          title: "كيف نستخدم معلوماتك",
          content: [
            "تقديم الخدمات: لتقديم محتوانا التعليمي والحفاظ على حسابك.",
            "تحسين المنصة: لتحليل أنماط الاستخدام وتحسين دوراتنا ووظائف المنصة.",
            "التواصل: لإرسال التحديثات المهمة وتوصيات الدورات والاتصالات التسويقية (بموافقتك).",
            "الدعم: لتقديم دعم العملاء والرد على استفساراتك.",
            "الامتثال القانوني: للامتثال للالتزامات القانونية وحماية حقوقنا.",
          ],
        },
        {
          title: "مشاركة المعلومات",
          content: [
            "نحن لا نبيع أو نتاجر أو نؤجر معلوماتك الشخصية لأطراف ثالثة.",
            "مقدمو الخدمات: قد نشارك المعلومات مع مقدمي الخدمات الموثوقين الذين يساعدوننا في تشغيل منصتنا.",
            "المتطلبات القانونية: قد نكشف المعلومات عند الطلب بموجب القانون أو لحماية حقوقنا وسلامتنا.",
            "عمليات النقل التجارية: في حالة الاندماج أو الاستحواذ، قد يتم نقل معلوماتك إلى الكيان الجديد.",
          ],
        },
        {
          title: "أمان البيانات",
          content: [
            "نطبق تدابير أمنية معيارية في الصناعة لحماية معلوماتك الشخصية.",
            "جميع عمليات نقل البيانات مشفرة باستخدام بروتوكولات SSL/TLS.",
            "نحدث ممارساتنا الأمنية بانتظام ونجري عمليات تدقيق أمني.",
            "الوصول إلى المعلومات الشخصية مقتصر على الموظفين المخولين فقط.",
          ],
        },
        {
          title: "حقوقك",
          content: [
            "الوصول: يمكنك طلب الوصول إلى المعلومات الشخصية التي نحتفظ بها عنك.",
            "التصحيح: يمكنك طلب تصحيح المعلومات غير الدقيقة أو غير المكتملة.",
            "الحذف: يمكنك طلب حذف معلوماتك الشخصية، مع مراعاة المتطلبات القانونية.",
            "قابلية النقل: يمكنك طلب نسخة من بياناتك بتنسيق قابل للنقل.",
            "إلغاء الاشتراك: يمكنك إلغاء الاشتراك في الاتصالات التسويقية في أي وقت.",
          ],
        },
        {
          title: "اتصل بنا",
          content: [
            "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا:",
            "البريد الإلكتروني: privacy@reskil.com",
            "الهاتف: +212 766-831008",
            "العنوان: فريق خصوصية Reskil، المغرب",
          ],
        },
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
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{t.subtitle}</p>
          <p className="text-sm text-gray-500">{t.lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <Card key={index} className="p-8">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Your Privacy?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're committed to transparency. Contact us if you need clarification on any privacy matters.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
