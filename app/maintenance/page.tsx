import { Wrench, Clock, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Wrench className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">We'll be back soon!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Reskil is currently undergoing scheduled maintenance to improve your learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3 text-gray-700">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Expected downtime: 30 minutes</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>Questions? Contact support</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">What we're working on:</h3>
            <ul className="text-gray-700 space-y-1">
              <li>• Improving course video quality</li>
              <li>• Enhancing user experience</li>
              <li>• Adding new features</li>
              <li>• Performance optimizations</li>
            </ul>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Follow us on social media for real-time updates</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
