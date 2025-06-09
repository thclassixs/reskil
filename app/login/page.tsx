"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Globe, ArrowLeft, Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from "lucide-react"

type Language = "en" | "ar"

export default function LoginPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>("en")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return // Prevent duplicate submissions
    
    setIsLoading(true)
    setError("")

    try {
      // Enhanced validation
      if (!formData.email.trim() || !formData.password.trim()) {
        throw new Error(t.form.fillAllFields)
      }

      if (!formData.email.includes("@") || !formData.email.includes(".")) {
        throw new Error(t.form.invalidEmail)
      }

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // For cookies if using HTTP-only
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || t.form.loginFailed)
      }

      // Handle token storage if using JWT
      if (data.accessToken) {
        if (formData.rememberMe) {
          localStorage.setItem("accessToken", data.accessToken)
        } else {
          sessionStorage.setItem("accessToken", data.accessToken)
        }
      }

      // Redirect to dashboard or intended page
      router.push("/dashboard")
      
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : t.form.loginFailed)
    } finally {
      setIsLoading(false)
    }
  }

  const content = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to continue your learning journey",
      form: {
        email: "Email Address",
        password: "Password",
        rememberMe: "Remember me",
        signIn: "Sign In",
        signingIn: "Signing In...",
        emailPlaceholder: "Enter your email address",
        passwordPlaceholder: "Enter your password",
        forgotPassword: "Forgot your password?",
        fillAllFields: "Please fill in all fields",
        invalidEmail: "Please enter a valid email address",
        loginFailed: "Login failed. Please try again.",
      },
      signup: {
        text: "Don't have an account?",
        link: "Sign up",
      },
    },
    ar: {
      title: "مرحباً بعودتك",
      subtitle: "سجل دخولك لمتابعة رحلة التعلم",
      form: {
        email: "عنوان البريد الإلكتروني",
        password: "كلمة المرور",
        rememberMe: "تذكرني",
        signIn: "تسجيل الدخول",
        signingIn: "جاري تسجيل الدخول...",
        emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
        passwordPlaceholder: "أدخل كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
        fillAllFields: "يرجى ملء جميع الحقول",
        invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صالح",
        loginFailed: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
      },
      signup: {
        text: "ليس لديك حساب؟",
        link: "سجل هنا",
      },
    },
  }

  const t = content[language]
  const isRTL = language === "ar"

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <ArrowLeft className={`h-5 w-5 text-gray-600 ${isRTL ? "ml-2" : "mr-2"}`} />
                <span className="text-2xl font-bold text-blue-600">Reskil</span>
              </Link>
            </div>
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">{t.title}</CardTitle>
              <p className="text-gray-600 text-center">{t.subtitle}</p>
            </CardHeader>
            <CardContent className="px-0">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      className={isRTL ? "pr-10" : "pl-10"}
                      autoFocus
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
                      disabled={isLoading}
                      className={isRTL ? "pr-10 pl-10" : "pl-10 pr-10"}
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className={`absolute top-3 h-4 w-4 text-gray-400 hover:text-gray-600 ${isRTL ? "left-3" : "right-3"}`}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                      disabled={isLoading}
                    />
                    <Label htmlFor="rememberMe" className="text-sm">
                      {t.form.rememberMe}
                    </Label>
                  </div>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-700"
                    onClick={(e) => isLoading && e.preventDefault()}
                  >
                    {t.form.forgotPassword}
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {t.form.signingIn}
                    </>
                  ) : (
                    t.form.signIn
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {t.signup.text}{" "}
                  <Link 
                    href="/signup" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={(e) => isLoading && e.preventDefault()}
                  >
                    {t.signup.link}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}