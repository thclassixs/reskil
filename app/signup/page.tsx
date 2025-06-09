"use client"

import type React from "react"

import { useState } from "react"
<<<<<<< HEAD
import Link from "next/link"
=======
>>>>>>> 82081f5 (update V3)
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
<<<<<<< HEAD
import { Globe, ArrowLeft, Eye, EyeOff, Mail, Lock, User, CheckCircle } from "lucide-react"
=======
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Globe, ArrowLeft, Eye, EyeOff, Mail, Lock, User, CheckCircle, Loader2, AlertCircle } from "lucide-react"
>>>>>>> 82081f5 (update V3)

type Language = "en" | "ar"

export default function SignupPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
<<<<<<< HEAD
=======
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
>>>>>>> 82081f5 (update V3)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })

<<<<<<< HEAD
=======
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

>>>>>>> 82081f5 (update V3)
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
<<<<<<< HEAD
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Signup form submitted:", formData)
=======
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required"
    if (!formData.lastName.trim()) return "Last name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!formData.email.includes("@")) return "Please enter a valid email"
    if (formData.password.length < 6) return "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) return "Passwords do not match"
    if (!formData.agreeToTerms) return "You must agree to the terms of service"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email.toLowerCase(),
          password: formData.password,
          role: "STUDENT"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Signup failed")
      }

      setSuccess(true)
      
      if (data.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken)
      }
      
    } catch (err) {
      console.error("Signup error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
>>>>>>> 82081f5 (update V3)
  }

  const content = {
    en: {
      title: "Create Your Account",
      subtitle: "Join thousands of students transforming their careers",
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        password: "Password",
        confirmPassword: "Confirm Password",
        agreeToTerms: "I agree to the Terms of Service and Privacy Policy",
        subscribeNewsletter: "Subscribe to our newsletter for updates and tips",
        createAccount: "Create Account",
<<<<<<< HEAD
=======
        creating: "Creating Account...",
>>>>>>> 82081f5 (update V3)
        firstNamePlaceholder: "Enter your first name",
        lastNamePlaceholder: "Enter your last name",
        emailPlaceholder: "Enter your email address",
        passwordPlaceholder: "Create a strong password",
        confirmPasswordPlaceholder: "Confirm your password",
      },
      benefits: {
        title: "Why Join Reskil?",
        items: [
          "Access to 50+ premium courses",
          "Learn from industry experts",
          "Get job-ready skills",
          "Join a supportive community",
          "Lifetime access to content",
          "Certificate of completion",
        ],
      },
      login: {
        text: "Already have an account?",
<<<<<<< HEAD
        link: "Sign in here",
      },
      social: {
        title: "Or sign up with",
        google: "Continue with Google",
        facebook: "Continue with Facebook",
      },
=======
        link: "Sign in",
      },
      success: "Account created successfully! Welcome to Reskil!",
>>>>>>> 82081f5 (update V3)
    },
    ar: {
      title: "أنشئ حسابك",
      subtitle: "انضم لآلاف الطلاب الذين يحولون مسيراتهم المهنية",
      form: {
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        email: "عنوان البريد الإلكتروني",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        agreeToTerms: "أوافق على شروط الخدمة وسياسة الخصوصية",
        subscribeNewsletter: "اشترك في نشرتنا الإخبارية للحصول على التحديثات والنصائح",
        createAccount: "إنشاء حساب",
<<<<<<< HEAD
=======
        creating: "جاري إنشاء الحساب...",
>>>>>>> 82081f5 (update V3)
        firstNamePlaceholder: "أدخل اسمك الأول",
        lastNamePlaceholder: "أدخل اسم عائلتك",
        emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
        passwordPlaceholder: "أنشئ كلمة مرور قوية",
        confirmPasswordPlaceholder: "أكد كلمة المرور",
      },
      benefits: {
        title: "لماذا تنضم إلى Reskil؟",
        items: [
          "الوصول لأكثر من 50 دورة مميزة",
          "تعلم من خبراء الصناعة",
          "احصل على مهارات جاهزة للعمل",
          "انضم لمجتمع داعم",
          "وصول مدى الحياة للمحتوى",
          "شهادة إتمام",
        ],
      },
      login: {
        text: "لديك حساب بالفعل؟",
<<<<<<< HEAD
        link: "سجل دخولك هنا",
      },
      social: {
        title: "أو سجل باستخدام",
        google: "متابعة مع Google",
        facebook: "متابعة مع Facebook",
      },
=======
        link: "سجل دخولك",
      },
      success: "تم إنشاء الحساب بنجاح! مرحباً بك في Reskil!",
>>>>>>> 82081f5 (update V3)
    },
  }

  const t = content[language]
  const isRTL = language === "ar"

<<<<<<< HEAD
=======
  if (success) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">{t.success}</p>
            <Button 
              onClick={() => window.location.href = "/dashboard"} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

>>>>>>> 82081f5 (update V3)
  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
<<<<<<< HEAD
              <Link href="/" className="flex items-center">
                <ArrowLeft className={`h-5 w-5 text-gray-600 ${isRTL ? "ml-2" : "mr-2"}`} />
                <span className="text-2xl font-bold text-blue-600">Reskil</span>
              </Link>
=======
              <button onClick={() => window.history.back()} className="flex items-center">
                <ArrowLeft className={`h-5 w-5 text-gray-600 ${isRTL ? "ml-2" : "mr-2"}`} />
                <span className="text-2xl font-bold text-blue-600">Reskil</span>
              </button>
>>>>>>> 82081f5 (update V3)
            </div>
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Benefits */}
            <div className="hidden lg:block">
              <div className="sticky top-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.benefits.title}</h2>
                <div className="space-y-4">
                  {t.benefits.items.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className={`h-5 w-5 text-green-500 ${isRTL ? "ml-3" : "mr-3"}`} />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Start Learning Today</h3>
                  <p className="text-gray-600 text-sm">
                    Join our community and get instant access to beginner-friendly courses.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div>
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold text-gray-900 text-center">{t.title}</CardTitle>
                  <p className="text-gray-600 text-center">{t.subtitle}</p>
                </CardHeader>
                <CardContent className="px-0">
<<<<<<< HEAD
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">{t.form.firstName}</Label>
                        <div className="relative mt-1">
                          <User className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder={t.form.firstNamePlaceholder}
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
=======
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">{t.form.firstName}</Label>
                          <div className="relative mt-1">
                            <User className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                            <Input
                              id="firstName"
                              name="firstName"
                              type="text"
                              placeholder={t.form.firstNamePlaceholder}
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              disabled={isLoading}
                              className={isRTL ? "pr-10" : "pl-10"}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="lastName">{t.form.lastName}</Label>
                          <div className="relative mt-1">
                            <User className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                            <Input
                              id="lastName"
                              name="lastName"
                              type="text"
                              placeholder={t.form.lastNamePlaceholder}
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              disabled={isLoading}
                              className={isRTL ? "pr-10" : "pl-10"}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">{t.form.email}</Label>
                        <div className="relative mt-1">
                          <Mail className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t.form.emailPlaceholder}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
>>>>>>> 82081f5 (update V3)
                            className={isRTL ? "pr-10" : "pl-10"}
                          />
                        </div>
                      </div>
<<<<<<< HEAD
                      <div>
                        <Label htmlFor="lastName">{t.form.lastName}</Label>
                        <div className="relative mt-1">
                          <User className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder={t.form.lastNamePlaceholder}
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className={isRTL ? "pr-10" : "pl-10"}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">{t.form.email}</Label>
                      <div className="relative mt-1">
                        <Mail className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t.form.emailPlaceholder}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={isRTL ? "pr-10" : "pl-10"}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password">{t.form.password}</Label>
                      <div className="relative mt-1">
                        <Lock className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t.form.passwordPlaceholder}
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className={isRTL ? "pr-10 pl-10" : "pl-10 pr-10"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "left-3" : "right-3"}`}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">{t.form.confirmPassword}</Label>
                      <div className="relative mt-1">
                        <Lock className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t.form.confirmPasswordPlaceholder}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className={isRTL ? "pr-10 pl-10" : "pl-10 pr-10"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "left-3" : "right-3"}`}
                        >
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                          required
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm">
                          {t.form.agreeToTerms}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="subscribeNewsletter"
                          name="subscribeNewsletter"
                          checked={formData.subscribeNewsletter}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, subscribeNewsletter: checked as boolean })
                          }
                        />
                        <Label htmlFor="subscribeNewsletter" className="text-sm">
                          {t.form.subscribeNewsletter}
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      {t.form.createAccount}
                    </Button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">{t.social.title}</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3">
                      <Button variant="outline" className="w-full">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        {t.social.google}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      {t.login.text}{" "}
                      <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                        {t.login.link}
                      </Link>
                    </p>
                  </div>
=======

                      <div>
                        <Label htmlFor="password">{t.form.password}</Label>
                        <div className="relative mt-1">
                          <Lock className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={t.form.passwordPlaceholder}
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className={isRTL ? "pr-10 pl-10" : "pl-10 pr-10"}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                            className={`absolute top-3 h-4 w-4 text-gray-400 hover:text-gray-600 ${isRTL ? "left-3" : "right-3"}`}
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">{t.form.confirmPassword}</Label>
                        <div className="relative mt-1">
                          <Lock className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={t.form.confirmPasswordPlaceholder}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className={isRTL ? "pr-10 pl-10" : "pl-10 pr-10"}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                            className={`absolute top-3 h-4 w-4 text-gray-400 hover:text-gray-600 ${isRTL ? "left-3" : "right-3"}`}
                          >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                            required
                            disabled={isLoading}
                          />
                          <Label htmlFor="agreeToTerms" className="text-sm">
                            {t.form.agreeToTerms}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="subscribeNewsletter"
                            name="subscribeNewsletter"
                            checked={formData.subscribeNewsletter}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, subscribeNewsletter: checked as boolean })
                            }
                            disabled={isLoading}
                          />
                          <Label htmlFor="subscribeNewsletter" className="text-sm">
                            {t.form.subscribeNewsletter}
                          </Label>
                        </div>
                      </div>

                      <Button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            {t.form.creating}
                          </>
                        ) : (
                          t.form.createAccount
                        )}
                      </Button>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        {t.login.text}{" "}
                        <button 
                          onClick={() => window.location.href = "/login"} 
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {t.login.link}
                        </button>
                      </p>
                    </div>
                  </form>
>>>>>>> 82081f5 (update V3)
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 82081f5 (update V3)
