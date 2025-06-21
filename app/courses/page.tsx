// app/courses/page.tsx
"use client";

import { CheckCircle, ArrowRight, Users, Clock } from "lucide-react";
import Link from "next/link";
import Head from 'next/head';

export default function CoursesPage() {
  const courses = [
    {
      id: "ecom-prodigy",
      title: "Ecom Prodigy",
      category: "Dropshipping Course",
      description: "60+ Hours of Content",
      learners: "40 Learners & Resellers",
      icon: "ECOM",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: "agency-blueprint",
      title: "Agency Blueprint",
      category: "SMMA Course",
      description: "45 Hours of Content",
      learners: "12 Learners & Resellers",
      icon: "AGENCY",
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: "dropship-pro",
      title: "Amazon Dropship Pro",
      category: "Amazon FBA Course",
      description: "61 Hours of Content",
      learners: "55 Learners & Resellers",
      icon: "DROPSHIP",
      color: "bg-green-100 text-green-800"
    },
    {
      id: "six-figure-closer",
      title: "Six Figure Closer",
      category: "Remote Closing Course",
      description: "41 Hours of Content",
      learners: "7 Learners & Resellers",
      icon: "SIX-FIGURE",
      color: "bg-red-100 text-red-800"
    },
    {
      id: "entrepreneur-academy",
      title: "Entrepreneurs Academy",
      category: "Done-For-You Community",
      description: "Pre-Built Community",
      learners: "200+ Member Community",
      icon: "ENTREPRENEURS",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      id: "ghost-creator",
      title: "Ghost Creator",
      category: "Youtube Automation Course",
      description: "71 Hours of Content",
      learners: "75 Learners & Resellers",
      icon: "GHOST",
      color: "bg-indigo-100 text-indigo-800"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>Reskil Courses - Premium White-Label Training</title>
        <meta name="description" content="Access our premium courses in ecommerce, agencies, dropshipping and more. Industry-leading training you can resell." />
      </Head>

      {/* Navigation */}
      <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container">
          <div className="flex items-center justify-center h-16 relative">
            <Link href="/" className="text-2xl font-bold text-primary absolute left-4 sm:left-6 lg:left-8">
              Reskil
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-primary">
                Features
              </Link>
              <Link href="/courses" className="text-muted-foreground hover:text-primary">
                Courses
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                Pricing
              </Link>
            </div>

            <Link href="/signup" className="btn-theme px-4 py-2 absolute right-4 sm:right-6 lg:right-8">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Courses Header */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">Premium Courses</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Industry-leading training programs created by experts. Start learning or resell under your own brand.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${course.color} w-12 h-12 rounded-lg flex items-center justify-center font-bold`}>
                    {course.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">Your Company Products</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{course.category}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span>{course.learners}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span>{course.description}</span>
                  </div>
                </div>

                <Link
                  href={`/courses/${course.id}`}
                  className="btn-theme w-full py-2 px-4 flex items-center justify-center mt-4"
                >
                  View Course <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container">
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
              <div key={index} className="bg-background p-6 rounded-lg border border-border">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Join 10,000+ Members Learning With Reskil</h3>
            <Link 
              href="/signup" 
              className="inline-block px-8 py-4 bg-background text-primary hover:bg-accent rounded-lg font-medium text-lg"
            >
              Get Instant Access
            </Link>
            <div className="mt-8 text-primary-foreground/80 text-sm">
              © {new Date().getFullYear()} Reskil. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}