
"use client"

import { useState } from "react"
import {
  Star, Play, CheckCircle, ChevronDown, ChevronUp, Menu, X, ArrowRight,
  Users, Shield, Globe, Lightbulb, Zap, Film, TrendingUp, DollarSign,
  Sparkles, Loader2
} from "lucide-react"

interface CustomCSSProperties extends React.CSSProperties {
  '--range-progress'?: string;
}

export default function LandingPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isYearlyPricing, setIsYearlyPricing] = useState(false)
  const [resellPrice, setResellPrice] = useState(500)
  const [monthlyStudents, setMonthlyStudents] = useState(20)
  const [socialContentTopic, setSocialContentTopic] = useState("")
  const [generatedSocialContent, setGeneratedSocialContent] = useState("")
  const [isGeneratingContent, setIsGeneratingContent] = useState(false)
  const [socialContentError, setSocialContentError] = useState("")

  const RESKIL_MONTHLY_INVESTMENT = 49.99

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const monthlyProfit = (resellPrice * monthlyStudents - RESKIL_MONTHLY_INVESTMENT).toFixed(2)

  const generateSocialMediaContent = async () => {
    if (!socialContentTopic.trim()) {
      setSocialContentError("Please enter a topic to generate content.")
      return
    }
    setIsGeneratingContent(true)
    setGeneratedSocialContent("")
    setSocialContentError("")

    try {
      const prompt = `Generate a short, engaging social media post for a course about "${socialContentTopic}". Include relevant emojis and a strong call to action. Make it concise and attention-grabbing.`
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] }
      const apiKey = "AIzaSyAiNUPrY-gyonRR3M4njdL972W5BBIFl9Q"
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error(`API error: ${response.statusText}`)

      const result = await response.json()
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        setGeneratedSocialContent(result.candidates[0].content.parts[0].text)
      } else {
        setSocialContentError("Failed to generate content. Please try again.")
      }
    } catch (error) {
      setSocialContentError(`An error occurred: ${error instanceof Error ? error.message : "Please check console for details."}`)
    } finally {
      setIsGeneratingContent(false)
    }
  }

  const courses = [
    { name: "Dropshipping Course", revenue: "$22,454.20", sales: "424", trending: "" },
    { name: "Copywriting Course", revenue: "$95,254.67", sales: "1,162", trending: "+1" },
    { name: "SMMA Course", revenue: "$104,530.21", sales: "1,537", trending: "+1" },
    { name: "High Ticket Closer Course", revenue: "$102,816.52", sales: "1,049", trending: "+1" },
    { name: "Day Trading Course", revenue: "$32,031.26", sales: "372", trending: "+1" }
  ]

  const features = [
    {
      title: "White-label & Resell Premium Courses",
      description: "Access 8 high-value courses across in-demand niches—ready to resell instantly with no content creation required.",
      icon: Globe
    },
    {
      title: "25K+ Videos to Grow Your Social Media",
      description: "Unlock a premium vault of pre-edited viral content—luxury lifestyle reels, motivational clips, and more.",
      icon: Film
    },
    {
      title: "Plug & Play Sales Funnels in 2 Minutes",
      description: "Every course comes with a high-converting landing page. No coding, no setup. Just personalize and start selling.",
      icon: Zap
    },
    {
      title: "Built-in Expert AI Course Assistants",
      description: "Each course includes a pre-trained AI chatbot—ready to answer questions, close leads, and support students 24/7.",
      icon: Lightbulb
    }
  ]

  const faqs = [
    { question: "Do I keep 100% of the profits?", answer: "Yes, you get to keep 100% of the profit you earn from your sales! There are no additional commissions or hidden charges." },
    { question: "How do payments work?", answer: "ResKil integrates with major payment providers like Stripe, PayPal, and Square. All payments go directly to you." },
    { question: "Can I bundle courses?", answer: "Yes! You can bundle multiple courses together, offer them individually, or create unique package deals." },
    { question: "How do I cancel?", answer: "Canceling takes two clicks in your dashboard—no hassle, no complications." }
  ]

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-900">
      <style jsx>{`
        input[type="range"]::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #3B82F6 var(--range-progress), #BFDBFE var(--range-progress));
          border-radius: 9999px;
        }
        input[type="range"]::-moz-range-track {
          background: linear-gradient(to right, #3B82F6 var(--range-progress), #BFDBFE var(--range-progress));
          border-radius: 9999px;
        }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-down { animation: slideDown 0.3s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
        .animate-fade-in-down { animation: fadeInDown 0.3s ease-out; }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-blue-600">ResKil</a>
            </div>
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                {["features", "courses", "pricing", "faq"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 capitalize"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <a href="/signup">
                <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors duration-200">
                  Start now →
                </button>
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-1"
              >
                {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg absolute w-full z-40 animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["features", "courses", "pricing", "faq"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600 w-full text-left rounded-md capitalize"
              >
                {section}
              </button>
            ))}
            <div className="px-3 py-2">
              <a href="/signup">
                <button className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-200">
                  Start now →
                </button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
            🚀 New course just dropped for June 2025!
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Launch Your Digital Empire: <span className="text-blue-600">White-Label Courses & AI-Powered Sales</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            ResKil provides everything you need to sell high-value digital courses under your brand, without creating content. Scale to $10K+ /monthly, effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="/signup">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                Start your business now →
              </button>
            </a>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center">
              <Play className="mr-3 h-6 w-6 text-blue-600" />
              Watch Demo
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12">
            <div className="flex items-center text-gray-700 text-lg">
              <Users className="h-6 w-6 text-blue-500 mr-3" />
              <span className="font-semibold">15,000+ Successful ResKilrs</span>
            </div>
            <div className="flex items-center text-gray-700 text-lg">
              <Shield className="h-6 w-6 text-green-500 mr-3" />
              <span className="font-semibold">100% White-Labeled & Yours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Scale to <span className="text-blue-600">$10K+ /month</span> with Our Proven System
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Try free for 7 days, no commitments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Results Section */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Live Results: <span className="text-blue-600">See What's Selling</span> in Real Time
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Transparent insights from our top-performing courses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-extrabold text-blue-600 mb-1">{course.revenue}</p>
                    <p className="text-gray-600 text-sm">Total Revenue Generated</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-800">Sales: {course.sales}</p>
                    {course.trending && (
                      <p className="text-green-500 text-sm font-semibold flex items-center justify-end mt-1">
                        <TrendingUp className="h-4 w-4 mr-1" /> {course.trending} spot
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/courses">
              <button className="px-8 py-3 text-lg font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors duration-200 rounded-lg flex items-center justify-center mx-auto">
                Explore All Courses <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* AI Social Media Content Generator */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">✨ AI Social Media Content Generator ✨</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Effortlessly generate engaging social media posts for your courses using AI.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200">
            <div className="mb-6 text-left">
              <label htmlFor="socialContentTopic" className="block text-gray-700 text-lg font-semibold mb-3">
                Enter your course topic or keyword:
              </label>
              <input
                type="text"
                id="socialContentTopic"
                value={socialContentTopic}
                onChange={(e) => setSocialContentTopic(e.target.value)}
                placeholder="e.g., 'Dropshipping for Beginners' or 'Advanced Copywriting'"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              {socialContentError && <p className="text-red-500 text-sm mt-2">{socialContentError}</p>}
            </div>
            <button
              onClick={generateSocialMediaContent}
              disabled={isGeneratingContent}
              className={`w-full px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 flex items-center justify-center ${
                isGeneratingContent
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl transform hover:-translate-y-1'
              }`}
            >
              {isGeneratingContent ? (
                <>
                  <Loader2 className="animate-spin mr-3 h-6 w-6" /> Generating...
                </>
              ) : (
                <>Generate Content ✨ →</>
              )}
            </button>
            {generatedSocialContent && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Your Generated Post:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{generatedSocialContent}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              One Ultimate Plan. <span className="text-blue-600">No Complicated Tiers.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to succeed, all included.</p>
          </div>
          <div className="max-w-2xl mx-auto bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-white rounded-xl shadow-sm border border-gray-200">
                <button
                  onClick={() => setIsYearlyPricing(false)}
                  className={`px-6 py-3 text-base font-semibold rounded-l-xl transition-colors duration-200 ${
                    !isYearlyPricing ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearlyPricing(true)}
                  className={`px-6 py-3 text-base font-semibold rounded-r-xl transition-colors duration-200 ${
                    isYearlyPricing ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Yearly (7 Months Free)
                </button>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-extrabold text-gray-900 mb-2">ResKil All-Access</h3>
              <p className="text-5xl font-extrabold text-blue-600 mb-6 flex items-center justify-center">
                {isYearlyPricing ? (
                  <>
                    $499<span className="text-lg text-gray-500 line-through ml-3">$588</span>
                    <span className="text-xl text-gray-600 font-medium ml-2">/year</span>
                  </>
                ) : (
                  <>
                    $49<span className="text-lg text-gray-500 line-through ml-3">$75</span>
                    <span className="text-xl text-gray-600 font-medium ml-2">/month</span>
                  </>
                )}
              </p>
              <ul className="space-y-3 mb-8 text-left text-lg">
                {[
                  "8+ Premium White-Labelled Courses to Sell",
                  "25k+ Videos in Viral Content Library",
                  "Integrated Website Builder + High-Converting Templates",
                  "Custom AI Instructors & Support Chatbots",
                  "24/7 Priority Support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/signup">
                <button className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors duration-300 shadow-xl transform hover:-translate-y-1">
                  Get Instant Access →
                </button>
              </a>
              <p className="text-gray-500 mt-4 text-sm">Risk-free 7-day trial. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Your <span className="text-blue-600">Monthly Profit</span> Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">See how much you can earn with ResKil.</p>
          </div>
          <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="mb-6">
              <label htmlFor="resellPrice" className="block text-gray-700 font-semibold mb-3 text-lg">
                You resell our premium course for: <span className="text-blue-600 font-extrabold text-2xl">${resellPrice}</span>
              </label>
              <input
                type="range"
                id="resellPrice"
                min="0"
                max="1000"
                step="50"
                value={resellPrice}
                onChange={(e) => setResellPrice(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                style={{ '--range-progress': `${(resellPrice / 1000) * 100}%` } as CustomCSSProperties}
              />
              <div className="flex justify-between text-gray-600 text-sm mt-2">
                <span>$0</span>
                <span>$250</span>
                <span>$500</span>
                <span>$750</span>
                <span>$1000+</span>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="monthlyStudents" className="block text-gray-700 font-semibold mb-3 text-lg">
                Students buy the course monthly: <span className="text-blue-600 font-extrabold text-2xl">{monthlyStudents}</span>
              </label>
              <input
                type="range"
                id="monthlyStudents"
                min="0"
                max="100"
                step="5"
                value={monthlyStudents}
                onChange={(e) => setMonthlyStudents(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                style={{ '--range-progress': `${(monthlyStudents / 100) * 100}%` } as CustomCSSProperties}
              />
              <div className="flex justify-between text-gray-600 text-sm mt-2">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100+</span>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg mb-6 text-center">
              <p className="text-gray-700 text-lg mb-2">Estimated Monthly Profit:</p>
              <p className="text-5xl font-extrabold text-blue-700 flex items-center justify-center">
                <DollarSign className="h-10 w-10 mr-2" /> {monthlyProfit}
              </p>
              <p className="text-gray-500 text-xs mt-3">*Minus ResKil $49.99 Monthly Investment. Calculations are estimates.</p>
            </div>
            <a href="/signup">
              <button className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors duration-300 shadow-xl transform hover:-translate-y-1">
                Claim Your Profit Now →
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to know about ResKil.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  className={`w-full p-6 text-left flex justify-between items-center transition-all duration-300 ${
                    activeAccordion === index ? 'bg-blue-50 text-blue-700 font-semibold' : 'bg-white hover:bg-gray-50 text-gray-900'
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg">{faq.question}</span>
                  {activeAccordion === index ? (
                    <ChevronUp className="h-6 w-6 text-blue-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500 flex-shrink-0 ml-4" />
                  )}
                </button>
                {activeAccordion === index && (
                  <div className="p-6 pt-0 text-gray-700 animate-fade-in-down">
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Join <span className="text-yellow-300">15,000+ ResKilrs</span> Making Money Today</h2>
          <p className="text-xl text-blue-100 mb-8">
            Unlock your potential and build a thriving digital product business with our proven system.
          </p>
          <a href="/signup">
            <button className="bg-white text-blue-600 px-10 py-5 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors duration-300 shadow-xl transform hover:-translate-y-1">
              Get Instant Access &rarr;
            </button>
          </a>
          <div className="mt-8 flex justify-center items-center text-white text-lg">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-3 font-semibold">4.8 out of 5 stars based on 500+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Reskil</h3>
              <p className="text-gray-400 leading-relaxed">
                Empowering the next generation of digital professionals
              </p>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:support@reskil.com" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    support@reskil.com
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+212766831008" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +212 766-831008
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/reskil" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/courses" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a 
                    href="/about" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/privacy" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a 
                    href="/terms" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Reskil. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}