// app/courses/[id]/page.tsx
"use client";

import { CheckCircle, ArrowRight, Star, Users, BookOpen, BarChart2 } from "lucide-react";
import Link from "next/link";
import Head from 'next/head';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const { id } = useParams();
  
  // Sample course data - in a real app you'd fetch this based on the ID
  const course = {
    id: "ecom-prodigy",
    title: "ECOM PRODIGY",
    subtitle: "White-label and resell this premium dropshipping course",
    description: "Our immediate success system includes the Ecom Prodigy content, plug-and-play resources, content library and more.",
    price: 97,
    features: [
      "60+ Video Lessons",
      "8 Masterclass Training Modules",
      "Complete Supplier Database",
      "Automated Funnel Templates",
      "24/7 Support Community"
    ],
    stats: [
      { value: "5x", label: "Increase in student success rate" },
      { value: "3x", label: "More conversions than industry average" },
      { value: "9.8/10", label: "Student satisfaction rating" }
    ],
    faqs: [
      {
        question: "How do I resell this course?",
        answer: "After purchase, you'll get white-label rights to rebrand and resell the course as your own."
      },
      {
        question: "What's included in the package?",
        answer: "You get the full course, marketing materials, sales funnels, and ongoing updates."
      },
      {
        question: "Can I offer this to multiple students?",
        answer: "Yes, you can sell to unlimited students with your reseller license."
      },
      {
        question: "How often is the content updated?",
        answer: "We update the course material quarterly to reflect industry changes."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>{course.title} | Reskil</title>
        <meta name="description" content={course.description} />
      </Head>

      {/* Navigation - White background with centered links */}
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

            <Link href="/login" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white absolute right-4 sm:right-6 lg:right-8">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Course Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{course.title}</h1>
              <h2 className="text-2xl text-gray-700 mb-6">{course.subtitle}</h2>
              <p className="text-lg text-gray-600 mb-8">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <Users className="text-blue-600 mr-2" />
                  <span>2,000+ Students</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <Star className="text-yellow-500 mr-2" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <BookOpen className="text-blue-600 mr-2" />
                  <span>60+ Lessons</span>
                </div>
              </div>

              <Link
                href={`/signup?course=${course.id}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white text-lg"
              >
                Enroll Now - ${course.price} <ArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="lg:w-1/3 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Course Highlights</h3>
              <ul className="space-y-4">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Course Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Student Success Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {course.stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl text-center border border-gray-200">
                <div className="text-4xl font-bold text-blue-600 mb-3">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profit Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Calculate Your Reselling Profit</h2>
          
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">You resell {course.title} for</h3>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">$</span>
                  <input 
                    type="number" 
                    defaultValue="100"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full text-xl"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Students per month</h3>
                <input 
                  type="range" 
                  min="10" 
                  max="1000" 
                  defaultValue="50"
                  className="w-full"
                />
                <div className="flex justify-between text-gray-600 mt-2">
                  <span>10</span>
                  <span>1000</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-bold mb-2 text-center">Estimated Monthly Profit</h3>
              <div className="text-4xl font-bold text-blue-600 text-center mb-2">$9,950</div>
              <p className="text-gray-600 text-center">Your profit potential with this course</p>
            </div>

            <div className="mt-8 text-center">
              <Link
                href={`/signup?course=${course.id}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white text-lg"
              >
                Claim Your Profit Potential <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {course.faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
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
            <h3 className="text-2xl font-bold mb-6">Ready to Start Your Course Business?</h3>
            <Link 
              href={`/signup?course=${course.id}`}
              className="inline-block px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium text-lg"
            >
              Enroll Now
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