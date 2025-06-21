"use client"

import { useState, useEffect } from "react"
import {
  Star, Play, CheckCircle, ChevronDown, ChevronUp, Menu, X, ArrowRight,
  Users, Shield, Globe, Lightbulb, Zap, Film, TrendingUp, DollarSign,
  Sparkles, Loader2, Rocket, BadgeCheck, BarChart2, Clock, Award, HelpCircle
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
  const [isScrolled, setIsScrolled] = useState(false)

  const RESKIL_MONTHLY_INVESTMENT = 39.99

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      icon: Globe,
      color: "text-purple-600"
    },
    {
      title: "25K+ Videos to Grow Your Social Media",
      description: "Unlock a premium vault of pre-edited viral content—luxury lifestyle reels, motivational clips, and more.",
      icon: Film,
      color: "text-blue-600"
    },
    {
      title: "Plug & Play Sales Funnels in 2 Minutes",
      description: "Every course comes with a high-converting landing page. No coding, no setup. Just personalize and start selling.",
      icon: Zap,
      color: "text-yellow-600"
    },
    {
      title: "Built-in Expert AI Course Assistants",
      description: "Each course includes a pre-trained AI chatbot—ready to answer questions, close leads, and support students 24/7.",
      icon: Lightbulb,
      color: "text-green-600"
    }
  ]

  const stats = [
    { value: "15,000+", label: "Successful Students", icon: Users },
    { value: "$100M+", label: "Generated Revenue", icon: DollarSign },
    { value: "8", label: "Premium Courses", icon: Award },
    { value: "24/7", label: "Support Available", icon: Clock }
  ]

  const faqs = [
    { question: "Do I keep 100% of the profits?", answer: "Yes, you get to keep 100% of the profit you earn from your sales! There are no additional commissions or hidden charges." },
    { question: "How do payments work?", answer: "ResKil integrates with major payment providers like Stripe, PayPal, and Square. All payments go directly to you." },
    { question: "Can I bundle courses?", answer: "Yes! You can bundle multiple courses together, offer them individually, or create unique package deals." },
    { question: "How do I cancel?", answer: "Canceling takes two clicks in your dashboard—no hassle, no complications." },
    { question: "Is there a money-back guarantee?", answer: "Absolutely! We offer a 30-day money-back guarantee if you're not satisfied with our platform." }
  ]

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-900">
      <style jsx>{`
        input[type="range"]::-webkit-slider-runnable-track {
          background: linear-gradient(to right, hsl(var(--primary)) var(--range-progress), #BFDBFE var(--range-progress));
          border-radius: 9999px;
        }
        input[type="range"]::-moz-range-track {
          background: linear-gradient(to right, hsl(var(--primary)) var(--range-progress), #BFDBFE var(--range-progress));
          border-radius: 9999px;
        }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(90deg, #3B82F6, #8B5CF6);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full transition-all duration-300 z-50 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
              <img 
                  src="/REL.png"
                  alt="ResKil" 
                  className="h-8 w-auto" // Adjust height as needed
                />
              </a>
            </div>
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                {["features", "courses", "pricing", "faq"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 capitalize ${isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <a href="/signup">
                <button className={`px-6 py-2.5 rounded-lg transition-all duration-300 ${isScrolled ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : 'bg-white hover:bg-gray-100 text-blue-600 shadow-lg'}`}>
                  Start now <ArrowRight className="inline ml-1 h-4 w-4" />
                </button>
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-1 ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-blue-200'}`}
              >
                {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white fixed top-16 w-full z-40 animate-slide-down shadow-xl">
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
                <button className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                  Start now <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:100px_100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white mb-6 border border-white/20">
            <Sparkles className="h-4 w-4 mr-2" /> New course just dropped for June 2025!
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Launch Your Digital Empire <br />
            <span className="gradient-text">White-Label Courses & AI-Powered Sales</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            ResKil provides everything you need to sell high-value digital courses under your brand, without creating content. Scale to $10K+ /monthly, effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a href="/signup">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl transform hover:-translate-y-1 hover:shadow-2xl flex items-center">
                Start your business now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </a>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
              <Play className="mr-3 h-6 w-6" />
              Watch Demo
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="flex items-center">
                  <stat.icon className="h-8 w-8 text-white mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-blue-100 text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Scale to <span className="gradient-text">$10K+ /month</span> with Our Proven System
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Try free for 7 days, no commitments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-200/50 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 h-1 w-full ${feature.color.replace('text-', 'bg-')}`}></div>
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${feature.color.replace('text-', 'bg-')}/10 mb-5`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Results Section */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Live Results: <span className="gradient-text">See What's Selling</span> in Real Time
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Transparent insights from our top-performing courses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-200/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                  {course.trending && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> Trending
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-extrabold text-blue-600 mb-1">{course.revenue}</p>
                    <p className="text-gray-600 text-sm">Total Revenue</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-800">Sales: {course.sales}</p>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${Math.min(100, parseInt(course.sales.replace(/,/g, '')) / 20)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/courses">
              <button className="px-8 py-3.5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center mx-auto">
                Explore All Courses <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* AI Social Media Content Generator */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-blue-600 shadow-sm mb-4">
              <Sparkles className="h-4 w-4 mr-2" /> New Feature
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              AI Social Media <span className="gradient-text">Content Generator</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Effortlessly create engaging social media posts for your courses using our AI.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200/50">
            <div className="mb-6">
              <label htmlFor="socialContentTopic" className="block text-gray-700 text-lg font-semibold mb-3">
                Enter your course topic or keyword:
              </label>
              <input
                type="text"
                id="socialContentTopic"
                value={socialContentTopic}
                onChange={(e) => setSocialContentTopic(e.target.value)}
                placeholder="e.g., 'Dropshipping for Beginners' or 'Advanced Copywriting'"
                className="w-full px-5 py-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm"
              />
              {socialContentError && <p className="text-red-500 text-sm mt-2">{socialContentError}</p>}
            </div>
            <button
              onClick={generateSocialMediaContent}
              disabled={isGeneratingContent}
              className={`w-full px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 flex items-center justify-center ${
                isGeneratingContent
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-xl transform hover:-translate-y-1'
              }`}
            >
              {isGeneratingContent ? (
                <>
                  <Loader2 className="animate-spin mr-3 h-6 w-6" /> Generating...
                </>
              ) : (
                <>Generate Content <Sparkles className="ml-2 h-5 w-5" /></>
              )}
            </button>
            {generatedSocialContent && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-left">
                <div className="flex items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-800">Your Generated Post:</h3>
                  <BadgeCheck className="h-5 w-5 text-blue-500 ml-2" />
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{generatedSocialContent}</p>
                <div className="mt-4 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    Copy to clipboard <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              One Ultimate Plan. <span className="gradient-text">No Complicated Tiers.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to succeed, all included.</p>
          </div>
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4">
              <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12">
                MOST POPULAR
              </div>
            </div>
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setIsYearlyPricing(false)}
                  className={`px-6 py-3 text-base font-semibold transition-colors duration-200 ${
                    !isYearlyPricing ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearlyPricing(true)}
                  className={`px-6 py-3 text-base font-semibold transition-colors duration-200 ${
                    isYearlyPricing ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Yearly (Save 30%)
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
              <ul className="space-y-4 mb-10 text-left">
                {[
                  "8+ Premium White-Labelled Courses to Sell",
                  "25k+ Videos in Viral Content Library",
                  "Integrated Website Builder + High-Converting Templates",
                  "Custom AI Instructors & Support Chatbots",
                  "24/7 Priority Support",
                  "30-Day Money Back Guarantee"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="/signup">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1 hover:shadow-2xl">
                  Get Instant Access <ArrowRight className="inline ml-2 h-5 w-5" />
                </button>
              </a>
              <p className="text-gray-500 mt-4 text-sm">Risk-free 7-day trial. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Your <span className="gradient-text">Monthly Profit</span> Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">See how much you can earn with ResKil.</p>
          </div>
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="mb-8">
              <label htmlFor="resellPrice" className="block text-gray-700 font-semibold mb-4 text-lg">
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
            <div className="mb-8">
              <label htmlFor="monthlyStudents" className="block text-gray-700 font-semibold mb-4 text-lg">
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
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl mb-8 text-center border border-blue-100">
              <p className="text-gray-700 text-lg mb-3">Estimated Monthly Profit:</p>
              <p className="text-5xl font-extrabold text-blue-700 flex items-center justify-center">
                <DollarSign className="h-10 w-10 mr-2" /> {monthlyProfit}
              </p>
              <p className="text-gray-500 text-sm mt-4">*Minus ResKil $39.99 Monthly Investment. Calculations are estimates.</p>
            </div>
            <a href="/signup">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:-translate-y-1 hover:shadow-2xl">
                Claim Your Profit Now <ArrowRight className="inline ml-2 h-5 w-5" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of successful entrepreneurs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "ResKil transformed my business. I went from $0 to $15k/month in just 3 months!",
                name: "Sarah Johnson",
                role: "Digital Marketing Agency Owner",
                stars: 5
              },
              {
                quote: "The quality of courses is outstanding. My students love the content and I keep 100% of profits.",
                name: "Michael Chen",
                role: "Course Reseller",
                stars: 5
              },
              {
                quote: "Best investment I've made. The AI tools alone are worth 10x the price.",
                name: "David Rodriguez",
                role: "E-commerce Entrepreneur",
                stars: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 text-lg mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to know about ResKil.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <button
                  className={`w-full p-6 text-left flex justify-between items-center transition-all duration-300 ${
                    activeAccordion === index ? 'bg-white text-blue-700 font-semibold' : 'bg-white hover:bg-gray-50 text-gray-900'
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg flex items-center">
                    <HelpCircle className={`h-5 w-5 mr-3 ${activeAccordion === index ? 'text-blue-600' : 'text-gray-500'}`} />
                    {faq.question}
                  </span>
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
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:100px_100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Build Your <span className="gradient-text">Digital Education Empire?</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Join thousands of entrepreneurs who are generating passive income with ResKil. Start your 7-day free trial today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/signup">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center">
                Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </a>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
              <Users className="mr-3 h-6 w-6" />
              Book Demo Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {['Features', 'Courses', 'Pricing', 'Testimonials'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {['Blog', 'Help Center', 'Tutorials', 'Community'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {['About', 'Careers', 'Contact', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {['Privacy', 'Terms', 'Cookie Policy', 'GDPR'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-xl font-bold text-white">ResKil</span>
            </div>
            <div className="flex space-x-6">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">{social}</span>
                  {/* Replace with actual social icons */}
                  <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              &copy; {new Date().getFullYear()} ResKil. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
