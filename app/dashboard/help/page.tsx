"use client"

import { useState } from "react"
import { 
  Search,
  BookOpen,
  Mail,
  MessageCircle,
  Phone,
  FileText,
  HelpCircle,
  ChevronDown,
  ExternalLink
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I start a course?",
    answer: "To start a course, go to 'My Courses' section, select your desired course, and click the 'Start Learning' button. You can track your progress in the dashboard."
  },
  {
    question: "How do I earn certificates?",
    answer: "Certificates are awarded upon successful completion of courses. You need to complete all modules and pass the final assessment with a score of at least 70%."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. Payment information can be managed in your account settings."
  },
  {
    question: "Can I download course materials?",
    answer: "Yes, most course materials are available for download. Look for the download icon next to your course content."
  },
  {
    question: "How do I contact an instructor?",
    answer: "You can message instructors directly through the course discussion forum or via the messaging system in your dashboard."
  },
]

const helpCategories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    color: "text-blue-600 bg-blue-100",
    articles: "15 articles"
  },
  {
    title: "Account & Billing",
    icon: FileText,
    color: "text-purple-600 bg-purple-100",
    articles: "12 articles"
  },
  {
    title: "Technical Support",
    icon: HelpCircle,
    color: "text-green-600 bg-green-100",
    articles: "20 articles"
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Help Center</h1>
        <p className="text-gray-600">Find answers and get support</p>
      </div>

      {/* Search Section */}
      <Card className="p-6 mb-8">
        <div className="max-w-2xl mx-auto text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">How can we help you?</h2>
          <p className="text-gray-600">Search our knowledge base or browse categories below</p>
        </div>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search help articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {helpCategories.map((category) => {
          const Icon = category.icon
          return (
            <Card 
              key={category.title}
              className="p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.articles}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* FAQs Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <Card className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>

      {/* Contact Support */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
            <Button className="w-full">Start Chat</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-4">Get help via email</p>
            <Button variant="outline" className="w-full">Send Email</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-4">Call us for urgent help</p>
            <Button variant="outline" className="w-full">Call Now</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
