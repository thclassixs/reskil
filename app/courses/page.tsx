"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Head from 'next/head';

export default function CoursesPage() {
  const courses = [
    {
      title: "ECOM PRODIGY",
      description: "Ecommerce Mastery Course",
      features: [
        "60+ Lessons",
        "8 Masterclass Videos",
        "Ecommerce Headquarters Access"
      ]
    },
    {
      title: "AGENCY BLUEPRINT",
      description: "Digital Agency Course",
      features: [
        "90+ Lessons",
        "5 Masterclass Videos",
        "3 Case Studies"
      ]
    },
    {
      title: "DROPSHIP PRO",
      description: "Amazon Dropshipping Course",
      features: [
        "10+ Lessons",
        "2 Masterclass Videos",
        "Supplier Database"
      ]
    },
    {
      title: "SIX-FIGURE CLOSER®",
      description: "Sales Mastery Program",
      features: [
        "7 Week Training",
        "7 Masterclass Videos",
        "Premium Resources"
      ]
    },
    {
      title: "ENTREPRENEUR ACADEMY",
      description: "Business Growth Community",
      features: [
        "Private Network",
        "200+ Member Community",
        "Weekly Masterminds"
      ]
    },
    {
      title: "GHOST CREATOR",
      description: "Automation Course",
      features: [
        "7 Week Program",
        "7 Implementation Guides",
        "Automation Templates"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>Reskil Courses - Premium White-Label Training</title>
        <meta name="description" content="Access our premium courses in ecommerce, agencies, dropshipping and more. Industry-leading training you can resell." />
      </Head>

      {/* Navigation*/}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 relative">
            <Link href="/" className="text-2xl font-bold text-blue-600 absolute left-4 sm:left-6 lg:left-8">
              Reskil
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </Link>
              <Link href="/courses" className="text-gray-600 hover:text-blue-600">
                Courses
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600">
                Pricing
              </Link>
            </div>

            <Link href="/signup" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white absolute right-4 sm:right-6 lg:right-8">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Courses Header */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">Premium Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Industry-leading training programs created by experts. Start learning or resell under your own brand.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold mb-2 text-blue-600">{course.title}</h3>
                <p className="text-gray-600 mb-6">{course.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center justify-center w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white"
                >
                  View Course <ArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How do I access the courses?",
                answer: "After purchase, you'll get instant access to our learning platform where all courses are available."
              },
              {
                question: "Can I resell these courses?",
                answer: "Yes! All courses come with white-label rights so you can rebrand and resell them."
              },
              {
                question: "Can I take multiple courses at once?",
                answer: "Absolutely. Our system lets you enroll in as many courses as you want simultaneously."
              },
              {
                question: "How do I cancel my subscription?",
                answer: "You can cancel anytime from your account settings with no cancellation fees."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue Footer */}
      <footer className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Join 10,000+ Members Learning With Reskil</h3>
            <Link 
              href="/signup" 
              className="inline-block px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium text-lg"
            >
              Get Instant Access
            </Link>
            <div className="mt-8 text-blue-100 text-sm">
              © {new Date().getFullYear()} Reskil. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}