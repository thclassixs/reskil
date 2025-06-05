"use client"

import Link from "next/link"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/" className="block">
            <EnhancedButton size="lg" className="w-full">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </EnhancedButton>
          </Link>

          <Link href="/courses" className="block">
            <EnhancedButton variant="outline" size="lg" className="w-full">
              <Search className="h-5 w-5 mr-2" />
              Browse Courses
            </EnhancedButton>
          </Link>

          <button onClick={() => window.history.back()} className="w-full">
            <EnhancedButton variant="ghost" size="lg" className="w-full">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </EnhancedButton>
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
