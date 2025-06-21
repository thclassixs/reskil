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
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "25K+ Videos to Grow Your Social Media",
      description: "Unlock a premium vault of pre-edited viral content—luxury lifestyle reels, motivational clips, and more.",
      icon: Film,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Plug & Play Sales Funnels in 2 Minutes",
      description: "Every course comes with a high-converting landing page. No coding, no setup. Just personalize and start selling.",
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Built-in Expert AI Course Assistants",
      description: "Each course includes a pre-trained AI chatbot—ready to answer questions, close leads, and support students 24/7.",
      icon: Lightbulb,
      color: "text-green-600",
      bgColor: "bg-green-50"
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
          background: linear-gradient(to right, #3B82F6 var(--range-progress), #E5E7EB var(--range-progress));
          border-radius: 9999px;
        }
        input[type="range"]::-moz-range-track {
          background: linear-gradient(to right, #3B82F6 var(--range-progress), #E5E7EB var(--range-progress));
          border-radius: 9999px;
        }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .section-divider {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          height: 2px;
          margin: 0 auto;
          width: 100px;
          border-radius: 1px;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .shadow-elegant {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full transition-all duration-500 z-50 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                ResKil
                <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow"></div>
              </a>
            </div>
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                {["features", "courses", "pricing", "faq"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 capitalize relative group"
                  >
                    {section}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <a href="/signup">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Start Free Trial <ArrowRight className="inline ml-2 h-4 w-4" />
                </button>
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md fixed top-20 w-full z-40 animate-slide-down shadow-xl border-b border-gray-100">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {["features", "courses", "pricing", "faq"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-3 text-base font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 capitalize"
              >
                {section}
              </button>
            ))}
            <div className="pt-4">
              <a href="/signup">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:shadow-lg transition-all duration-300">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4 inline" />
                </button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 mb-8 border border-blue-200/50 hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-4 w-4 mr-2" /> 
            <span>New course just dropped for June 2025!</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
            Launch Your Digital Empire
            <br />
            <span className="gradient-text">White-Label Courses & AI-Powered Sales</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            ResKil provides everything you need to sell high-value digital courses under your brand, without creating content. Scale to <span className="font-bold text-blue-600">$10K+ monthly</span>, effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <a href="/signup">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-bold hover:shadow-elegant transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center">
                Start Your Business Now <ArrowRight className="ml-3 h-5 w-5" />
              </button>
            </a>
            <button className="px-10 py-4 border-2 border-gray-200 text-gray-700 rounded-xl text-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-300 flex items-center justify-center group">
              <Play className="mr-3 h-6 w-6 group-hover:text-blue-600" />
              Watch Demo
            </button>
          </div>
          
          {/* Stats Section with beautiful cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover-lift">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-3">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-gray-600 text-sm font-medium text-center">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="section-divider mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Scale to <span className="gradient-text">$10K+ Monthly</span> with Our Proven System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Try free for 7 days, no commitments. Everything you need to build a successful digital education business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-3xl border border-gray-100 hover-lift shadow-sm hover:shadow-elegant group"
              >
                <div className="flex items-start">
                  <div className={`p-4 rounded-2xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Results Section */}
      <section id="courses" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="section-divider mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Live Results: <span className="gradient-text">See What's Selling</span> in Real Time
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent insights from our top-performing courses. Real data, real results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover-lift hover:shadow-elegant group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {course.name}
                  </h3>
                  {course.trending && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> Trending
                    </span>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-extrabold text-blue-600 mb-2">{course.revenue}</p>
                    <p className="text-gray-600 font-medium">Total Revenue</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">Sales: {course.sales}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000" 
                        style={{ width: `${Math.min(100, parseInt(course.sales.replace(/,/g, '')) / 20)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a href="/courses">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-bold hover:shadow-elegant transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                Explore All Courses <ArrowRight className="ml-3 h-5 w-5" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* AI Social Media Content Generator */}
      <section className="py-24 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-white text-blue-600 shadow-sm mb-6 border border-blue-200/50">
              <Sparkles className="h-4 w-4 mr-2" /> New AI Feature
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              AI Social Media <span className="gradient-text">Content Generator</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Effortlessly create engaging social media posts for your courses using our advanced AI technology.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-elegant border border-gray-100">
            <div className="mb-8">
              <label htmlFor="socialContentTopic" className="block text-gray-900 text-lg font-bold mb-4">
                Enter your course topic or keyword:
              </label>
              <input
                type="text"
                id="socialContentTopic"
                value={socialContentTopic}
                onChange={(e) => setSocialContentTopic(e.target.value)}
                placeholder="e.g., 'Dropshipping for Beginners' or 'Advanced Copywriting'"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 text-lg shadow-sm transition-all duration-300"
              />
              {socialContentError && <p className="text-red-500 text-sm mt-3 font-medium">{socialContentError}</p>}
            </div>
            
            <button
              onClick={generateSocialMediaContent}
              disabled={isGeneratingContent}
              className={`w-full px-8 py-5 rounded-xl text-xl font-bold transition-all duration-300 flex items-center justify-center ${
                isGeneratingContent
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-elegant transform hover:scale-105'
              }`}
            >
              {isGeneratingContent ? (
                <>
                  <Loader2 className="animate-spin mr-3 h-6 w-6" /> Generating Amazing Content...
                </>
              ) : (
                <>Generate Content <Sparkles className="ml-3 h-6 w-6" /></>
              )}
            </button>
            
            {generatedSocialContent && (
              <div className="mt-10 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Your Generated Post:</h3>
                  <BadgeCheck className="h-6 w-6 text-blue-600 ml-3" />
                </div>
                <p className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed mb-6">{generatedSocialContent}</p>
                <div className="flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors duration-200">
                    Copy to clipboard <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* Pricing Section */}
<section id="pricing" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <div className="section-divider mb-6"></div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
        One Ultimate Plan. <span className="gradient-text">No Complicated Tiers.</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Everything you need to succeed, all included. Simple, transparent, and powerful.
      </p>
    </div>
    
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-10 rounded-3xl border-2 border-blue-200/50 shadow-elegant relative overflow-hidden hover-lift">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 z-10">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full transform rotate-12 shadow-lg">
            MOST POPULAR
          </div>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-2xl shadow-sm overflow-hidden border border-gray-200">
            <button
              onClick={() => setIsYearlyPricing(false)}
              className={`px-8 py-4 text-base font-semibold transition-all duration-300 ${
                !isYearlyPricing ? 'bg-white text-blue-600 shadow-md' : 'bg-transparent text-gray-700 hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearlyPricing(true)}
              className={`px-8 py-4 text-base font-semibold transition-all duration-300 ${
                isYearlyPricing ? 'bg-white text-blue-600 shadow-md' : 'bg-transparent text-gray-700 hover:bg-gray-50'
              }`}
            >
              Yearly (Save 30%)
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4">ResKil All-Access</h3>
          <div className="mb-8">
            <p className="text-5xl font-extrabold text-blue-600 mb-2 flex items-center justify-center">
              {isYearlyPricing ? (
                <>
                  $499<span className="text-xl text-gray-500 line-through ml-3">$588</span>
                </>
              ) : (
                <>
                  $49<span className="text-xl text-gray-500 line-through ml-3">$75</span>
                </>
              )}
            </p>
            <p className="text-gray-600 font-medium">
              {isYearlyPricing ? 'per year (billed annually)' : 'per month (billed monthly)'}
            </p>
          </div>
          
          <ul className="space-y-5 mb-12 text-left">
            {[
              "8+ Premium White-Labelled Courses to Sell",
              "25k+ Videos in Viral Content Library",
              "Integrated Website Builder + High-Converting Templates",
              "Custom AI Instructors & Support Chatbots",
              "24/7 Priority Support",
              "30-Day Money Back Guarantee"
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-lg">{feature}</span>
              </li>
            ))}
          </ul>
          
          <a href="/signup">
            <button className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-xl font-bold hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
              Get Instant Access <ArrowRight className="inline ml-3 h-5 w-5" />
            </button>
          </a>
          
          <p className="text-gray-500 mt-6 text-sm font-medium">
            Risk-free 7-day trial. Cancel anytime. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Profit Calculator */}
      <section className="py-24 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-divider mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Your <span className="gradient-text">Monthly Profit</span> Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See exactly how much you can earn with ResKil. Adjust the sliders to match your goals.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-elegant border border-gray-100">
            <div className="mb-10">
              <label htmlFor="resellPrice" className="block text-gray-900 text-xl font-bold mb-6">
                You resell our premium course for: <span className="text-blue-600">${resellPrice}</span>
              </label>
              <input
                type="range"
                id="resellPrice"
                min="0"
                max="1000"
                step="50"
                value={resellPrice}
                onChange={(e) => setResellPrice(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{ '--range-progress': `${(resellPrice / 1000) * 100}%` } as CustomCSSProperties}
              />
              <div className="flex justify-between text-gray-600 text-sm mt-4 font-medium">
                <span>$0</span>
                <span>$250</span>
                <span>$500</span>
                <span>$750</span>
                <span>$1000+</span>
              </div>
            </div>
            
            <div className="mb-10">
              <label htmlFor="monthlyStudents" className="block text-gray-900 text-xl font-bold mb-6">
                Students buy the course monthly: <span className="text-blue-600">{monthlyStudents}</span>
              </label>
              <input
                type="range"
                id="monthlyStudents"
                min="0"
                max="100"
                step="5"
                value={monthlyStudents}
                onChange={(e) => setMonthlyStudents(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{ '--range-progress': `${(monthlyStudents / 100) * 100}%` } as CustomCSSProperties}
              />
              <div className="flex justify-between text-gray-600 text-sm mt-4 font-medium">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100+</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-10 rounded-2xl mb-10 text-center border-2 border-blue-200/50">
              <p className="text-gray-700 text-xl font-medium mb-4">Estimated Monthly Profit:</p>
              <p className="text-5xl font-extrabold text-blue-600 mb-4">
                ${monthlyProfit}
              </p>
              <div className="flex items-center justify-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>After ResKil's $39.99 Monthly Investment</span>
              </div>
            </div>
            
            <a href="/signup">
              <button className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-xl font-bold hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
                Claim Your Profit Now <ArrowRight className="inline ml-3 h-5 w-5" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="section-divider mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of successful entrepreneurs building their digital empires with ResKil.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "ResKil transformed my business. I went from $0 to $15k/month in just 3 months! The white-label courses and AI tools are game-changers.",
                name: "Sarah Johnson",
                role: "Digital Marketing Agency Owner",
                stars: 5,
                avatar: "SJ"
              },
              {
                quote: "The quality of courses is outstanding. My students love the content and I keep 100% of profits. Best investment I've made in my business.",
                name: "Michael Chen",
                role: "Course Reseller",
                stars: 5,
                avatar: "MC"
              },
              {
                quote: "The AI tools alone are worth 10x the price. I've automated 80% of my course business and now focus on scaling. Incredible platform!",
                name: "David Rodriguez",
                role: "E-commerce Entrepreneur",
                stars: 5,
                avatar: "DR"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 hover-lift hover:shadow-elegant transition-all duration-300">
                <div className="flex mb-5">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="section-divider mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about ResKil. Can't find an answer? Contact our team.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
                <button
                  className={`w-full p-8 text-left flex justify-between items-center transition-all duration-300 ${
                    activeAccordion === index ? 'bg-white text-blue-600' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-semibold flex items-center">
                    <HelpCircle className={`h-5 w-5 mr-4 ${activeAccordion === index ? 'text-blue-500' : 'text-gray-500'}`} />
                    {faq.question}
                  </span>
                  {activeAccordion === index ? (
                    <ChevronUp className="h-6 w-6 text-blue-500" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500" />
                  )}
                </button>
                {activeAccordion === index && (
                  <div className="px-8 pb-8 pt-0 text-gray-700 animate-fade-in-down">
                    <p className="leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
            Ready to Build Your <span className="gradient-text">Digital Education Empire?</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of entrepreneurs who are generating passive income with ResKil. Start your 7-day free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="/signup">
              <button className="px-10 py-5 bg-white text-blue-600 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl transform hover:scale-105 hover:shadow-2xl flex items-center justify-center">
                Start Your Free Trial <ArrowRight className="ml-3 h-5 w-5" />
              </button>
            </a>
            <button className="px-10 py-5 border-2 border-white/30 text-white rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
              <Users className="mr-3 h-6 w-6" />
              Book Demo Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-white text-lg font-bold mb-6">Product</h3>
              <ul className="space-y-4">
                {['Features', 'Courses', 'Pricing'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-6">Resources</h3>
              <ul className="space-y-4">
                {['Help Center', 'Tutorials', 'Community'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-6">Company</h3>
              <ul className="space-y-4">
                {['About', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-6">Legal</h3>
              <ul className="space-y-4">
                {['Privacy', 'Terms', 'Cookie Policy', 'GDPR'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ResKil</span>
              <span className="ml-4 text-gray-500 text-sm">© {new Date().getFullYear()} All rights reserved</span>
            </div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              {['Tiktok', 'Instagram', 'X', 'YouTube'].map((social) => (
                <a 
                  key={social} 
                  href="reskil.club" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social}
                >
                  <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                    <span className="text-sm font-medium">{social.charAt(0)}</span>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Secure payment processing</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}