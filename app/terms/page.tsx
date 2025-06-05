"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ArrowLeft, FileText } from "lucide-react"

type Language = "en" | "ar"

export default function TermsPage() {
  const [language, setLanguage] = useState<Language>("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const content = {
    en: {
      title: "Terms of Service",
      subtitle: "Please read these terms carefully before using our platform",
      lastUpdated: "Last updated: January 1, 2025",
      sections: [
        {
          title: "Acceptance of Terms",
          content: [
            "By accessing and using Reskil's platform, you accept and agree to be bound by the terms and provision of this agreement.",
            "If you do not agree to abide by the above, please do not use this service.",
            "These terms apply to all visitors, users, and others who access or use the service.",
          ],
        },
        {
          title: "Description of Service",
          content: [
            "Reskil provides online educational courses and training materials in digital skills including e-commerce, web development, AI, and digital marketing.",
            "The service includes access to video content, downloadable resources, community features, and certificates of completion.",
            "We reserve the right to modify, suspend, or discontinue any part of the service at any time.",
          ],
        },
        {
          title: "User Accounts",
          content: [
            "You must create an account to access most features of our platform.",
            "You are responsible for maintaining the confidentiality of your account credentials.",
            "You agree to provide accurate, current, and complete information during registration.",
            "You are responsible for all activities that occur under your account.",
            "You must notify us immediately of any unauthorized use of your account.",
          ],
        },
        {
          title: "Payment and Refunds",
          content: [
            "Course fees are clearly displayed before purchase and are subject to change.",
            "Payment is required before accessing paid content.",
            "We offer a 30-day money-back guarantee for most courses.",
            "Refund requests must be submitted within the specified timeframe.",
            "Subscription services can be cancelled at any time, with access continuing until the end of the billing period.",
          ],
        },
        {
          title: "Intellectual Property",
          content: [
            "All content on the platform, including videos, text, graphics, and software, is owned by Reskil or our content creators.",
            "You may not reproduce, distribute, modify, or create derivative works of our content without permission.",
            "You retain ownership of any content you submit to the platform.",
            "By submitting content, you grant us a license to use, modify, and display it in connection with the service.",
          ],
        },
        {
          title: "User Conduct",
          content: [
            "You agree not to use the service for any unlawful purpose or in any way that could damage our platform.",
            "You may not share your account credentials with others.",
            "You may not attempt to gain unauthorized access to any part of the service.",
            "You may not upload or transmit viruses or other malicious code.",
            "We reserve the right to terminate accounts that violate these terms.",
          ],
        },
        {
          title: "Limitation of Liability",
          content: [
            "Reskil shall not be liable for any indirect, incidental, special, or consequential damages.",
            "Our total liability shall not exceed the amount paid by you for the service.",
            "We do not guarantee that the service will be uninterrupted or error-free.",
            "You use the service at your own risk.",
          ],
        },
        {
          title: "Changes to Terms",
          content: [
            "We reserve the right to modify these terms at any time.",
            "Changes will be posted on this page with an updated effective date.",
            "Your continued use of the service after changes constitutes acceptance of the new terms.",
            "We encourage you to review these terms periodically.",
          ],
        },
        {
          title: "Contact Information",
          content: [
            "If you have any questions about these Terms of Service, please contact us:",
            "Email: legal@reskil.com",
            "Phone: +212 766-831008",
            "Address: Reskil Legal Team, Morocco",
          ],
        },
      ],
    },
    ar: {
      title: "شروط الخدمة",
      subtitle: "يرجى قراءة هذه الشروط بعناية قبل استخدام منصتنا",
      lastUpdated: "آخر تحديث: 1 يناير 2025",
      sections: [
        {
          title: "قبول الشروط",
          content: [
            "من خلال الوصول إلى منصة Reskil واستخدامها، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية.",
            "إذا كنت لا توافق على الالتزام بما ورد أعلاه، يرجى عدم استخدام هذه الخدمة.",
            "تنطبق هذه الشروط على جميع الزوار والمستخدمين وغيرهم ممن يصلون إلى الخدمة أو يستخدمونها.",
          ],
        },
        {
          title: "وصف الخدمة",
          content: [
            "تقدم Reskil دورات تعليمية عبر الإنترنت ومواد تدريبية في المهارات الرقمية بما في ذلك التجارة الإلكترونية وتطوير المواقع والذكاء الاصطناعي والتسويق الرقمي.",
            "تشمل الخدمة الوصول إلى المحتوى المرئي والموارد القابلة للتحميل وميزات المجتمع وشهادات الإكمال.",
            "نحتفظ بالحق في تعديل أو تعليق أو إيقاف أي جزء من الخدمة في أي وقت.",
          ],
        },
        {
          title: "حسابات المستخدمين",
          content: [
            "يجب إنشاء حساب للوصول إلى معظم ميزات منصتنا.",
            "أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك.",
            "توافق على تقديم معلومات دقيقة وحديثة وكاملة أثناء التسجيل.",
            "أنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك.",
            "يجب إخطارنا فوراً بأي استخدام غير مصرح به لحسابك.",
          ],
        },
        {
          title: "الدفع والاسترداد",
          content: [
            "رسوم الدورات معروضة بوضوح قبل الشراء وقابلة للتغيير.",
            "الدفع مطلوب قبل الوصول إلى المحتوى المدفوع.",
            "نقدم ضمان استرداد الأموال لمدة 30 يوماً لمعظم الدورات.",
            "يجب تقديم طلبات الاسترداد خلال الإطار الزمني المحدد.",
            "يمكن إلغاء خدمات الاشتراك في أي وقت، مع استمرار الوصول حتى نهاية فترة الفوترة.",
          ],
        },
        {
          title: "الملكية الفكرية",
          content: [
            "جميع المحتويات على المنصة، بما في ذلك مقاطع الفيديو والنصوص والرسوم والبرامج، مملوكة لـ Reskil أو منشئي المحتوى لدينا.",
            "لا يجوز لك إعادة إنتاج أو توزيع أو تعديل أو إنشاء أعمال مشتقة من محتوانا دون إذن.",
            "تحتفظ بملكية أي محتوى تقدمه إلى المنصة.",
            "من خلال تقديم المحتوى، تمنحنا ترخيصاً لاستخدامه وتعديله وعرضه فيما يتعلق بالخدمة.",
          ],
        },
        {
          title: "سلوك المستخدم",
          content: [
            "توافق على عدم استخدام الخدمة لأي غرض غير قانوني أو بأي طريقة قد تضر بمنصتنا.",
            "لا يجوز لك مشاركة بيانات اعتماد حسابك مع الآخرين.",
            "لا يجوز لك محاولة الحصول على وصول غير مصرح به إلى أي جزء من الخدمة.",
            "لا يجوز لك تحميل أو نقل الفيروسات أو أي رمز ضار آخر.",
            "نحتفظ بالحق في إنهاء الحسابات التي تنتهك هذه الشروط.",
          ],
        },
        {
          title: "تحديد المسؤولية",
          content: [
            "لن تكون Reskil مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية.",
            "لن تتجاوز مسؤوليتنا الإجمالية المبلغ الذي دفعته مقابل الخدمة.",
            "لا نضمن أن الخدمة ستكون غير منقطعة أو خالية من الأخطاء.",
            "تستخدم الخدمة على مسؤوليتك الخاصة.",
          ],
        },
        {
          title: "تغييرات الشروط",
          content: [
            "نحتفظ بالحق في تعديل هذه الشروط في أي وقت.",
            "سيتم نشر التغييرات على هذه الصفحة مع تاريخ سريان محدث.",
            "استمرارك في استخدام الخدمة بعد التغييرات يشكل قبولاً للشروط الجديدة.",
            "نشجعك على مراجعة هذه الشروط بشكل دوري.",
          ],
        },
        {
          title: "معلومات الاتصال",
          content: [
            "إذا كان لديك أي أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا:",
            "البريد الإلكتروني: legal@reskil.com",
            "الهاتف: +212 766-831008",
            "العنوان: فريق Reskil القانوني، المغرب",
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
            <FileText className="h-16 w-16 text-blue-600" />
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Our Terms?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our legal team is here to help clarify any questions you may have about our terms of service.
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
