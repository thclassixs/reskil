// app/courses/page.tsx
"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Head from 'next/head';

export default function CoursesPage() {
  const courses = [
    {
      id: "ecom-prodigy",
      title: "ECOM PRODIGY",
      description: "Ecommerce Mastery Course",
      features: [
        "60+ Lessons",
        "8 Masterclass Videos",
        "Ecommerce Headquarters Access"
      ]
    },
    {
      id: "agency-blueprint",
      title: "AGENCY BLUEPRINT",
      description: "Digital Agency Course",
      features: [
        "90+ Lessons",
        "5 Masterclass Videos",
        "3 Case Studies"
      ]
    },
    {
      id: "dropship-pro",
      title: "DROPSHIP PRO",
      description: "Amazon Dropshipping Course",
      features: [
        "10+ Lessons",
        "2 Masterclass Videos",
        "Supplier Database"
      ]
    },
    {
      id: "six-figure-closer",
      title: "SIX-FIGURE CLOSER®",
      description: "Sales Mastery Program",
      features: [
        "7 Week Training",
        "7 Masterclass Videos",
        "Premium Resources"
      ]
    },
    {
      id: "entrepreneur-academy",
      title: "ENTREPRENEUR ACADEMY",
      description: "Business Growth Community",
      features: [
        "Private Network",
        "200+ Member Community",
        "Weekly Masterminds"
      ]
    },
    {
      id: "ghost-creator",
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
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-background border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold mb-2 text-primary">{course.title}</h3>
                <p className="text-muted-foreground mb-6">{course.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/courses/${course.id}`}
                  className="btn-theme w-full py-3 px-6"
                >
                  View Course <ArrowRight className="ml-2" />
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