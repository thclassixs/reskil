"use client"

import type React from "react"
<<<<<<< HEAD

import { useState } from "react"
import Link from "next/link"
=======
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
>>>>>>> 82081f5 (update V3)
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
<<<<<<< HEAD
import { Globe, ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react"
=======
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Globe, ArrowLeft, Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from "lucide-react"
>>>>>>> 82081f5 (update V3)

type Language = "en" | "ar"

export default function LoginPage() {
<<<<<<< HEAD
  const [language, setLanguage] = useState<Language>("en")
  const [showPassword, setShowPassword] = useState(false)
=======
  const router = useRouter()
  const [language, setLanguage] = useState<Language>("en")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
>>>>>>> 82081f5 (update V3)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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
    console.log("Login form submitted:", formData)
=======
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
>>>>>>> 82081f5 (update V3)
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
<<<<<<< HEAD
        emailPlaceholder: "Enter your email address",
        passwordPlaceholder: "Enter your password",
        forgotPassword: "Forgot your password?",
      },
      signup: {
        text: "Don't have an account?",
        link: "Sign up here",
      },
      social: {
        title: "Or sign in with",
        google: "Continue with Google",
=======
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
>>>>>>> 82081f5 (update V3)
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
<<<<<<< HEAD
        emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
        passwordPlaceholder: "أدخل كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
=======
        signingIn: "جاري تسجيل الدخول...",
        emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
        passwordPlaceholder: "أدخل كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
        fillAllFields: "يرجى ملء جميع الحقول",
        invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صالح",
        loginFailed: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
>>>>>>> 82081f5 (update V3)
      },
      signup: {
        text: "ليس لديك حساب؟",
        link: "سجل هنا",
      },
<<<<<<< HEAD
      social: {
        title: "أو سجل دخولك باستخدام",
        google: "متابعة مع Google",
      },
=======
>>>>>>> 82081f5 (update V3)
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
<<<<<<< HEAD
=======
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

>>>>>>> 82081f5 (update V3)
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
<<<<<<< HEAD
                      className={isRTL ? "pr-10" : "pl-10"}
=======
                      disabled={isLoading}
                      className={isRTL ? "pr-10" : "pl-10"}
                      autoFocus
>>>>>>> 82081f5 (update V3)
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
<<<<<<< HEAD
                      className={isRTL ? "pr-10 pl-10" : "pl-10 pr-10"}
=======
                      disabled={isLoading}
                      className={isRTL ? "pr-10 pl-10" : "pl-10 pr-10"}
                      minLength={6}
>>>>>>> 82081f5 (update V3)
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
                      className={`absolute top-3 h-4 w-4 text-gray-400 ${isRTL ? "left-3" : "right-3"}`}
=======
                      disabled={isLoading}
                      className={`absolute top-3 h-4 w-4 text-gray-400 hover:text-gray-600 ${isRTL ? "left-3" : "right-3"}`}
                      aria-label={showPassword ? "Hide password" : "Show password"}
>>>>>>> 82081f5 (update V3)
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
<<<<<<< HEAD
=======
                      disabled={isLoading}
>>>>>>> 82081f5 (update V3)
                    />
                    <Label htmlFor="rememberMe" className="text-sm">
                      {t.form.rememberMe}
                    </Label>
                  </div>
<<<<<<< HEAD
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
=======
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-700"
                    onClick={(e) => isLoading && e.preventDefault()}
                  >
>>>>>>> 82081f5 (update V3)
                    {t.form.forgotPassword}
                  </Link>
                </div>

<<<<<<< HEAD
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {t.form.signIn}
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

                <div className="mt-6">
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
                  {t.signup.text}{" "}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
=======
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
>>>>>>> 82081f5 (update V3)
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 82081f5 (update V3)
