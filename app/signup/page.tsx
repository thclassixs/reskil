"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, CheckCircle, Loader2, AlertCircle, CreditCard, Calendar, Phone, DollarSign } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Used for overall form submission, including payment simulation
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "", // Consolidated from firstName and lastName
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
    // Payment fields
    cardNumber: "",
    expiryDate: "", // MM/YY
    cvc: "",
    cardHolderName: ""
  })

  // This will be undefined in the Canvas environment but kept for context.
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
    if (error) setError("") // Clear error on input change
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required."
    if (!formData.email.trim()) return "Email is required."
    if (!formData.email.includes("@") || !formData.email.includes(".")) return "Please enter a valid email address."
    if (!formData.phoneNumber.trim()) return "Phone number is required."
    if (formData.password.length < 6) return "Password must be at least 6 characters."
    if (formData.password !== formData.confirmPassword) return "Passwords do not match."
    if (!formData.agreeToTerms) return "You must agree to the terms of service."

    // Payment validation
    if (!formData.cardHolderName.trim()) return "Card holder name is required."
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) return "Card number must be 16 digits."
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) return "Expiry date must be in MM/YY format."
    if (!/^\d{3,4}$/.test(formData.cvc)) return "CVC must be 3 or 4 digits."

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
      // Step 1: Simulate payment processing
      console.log("Simulating payment...")
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate network delay for payment

      const paymentSuccess = true; // Placeholder for actual payment gateway result
      if (!paymentSuccess) {
        throw new Error("Payment failed. Please check your details or try another method.")
      }
      console.log("Payment simulation successful.")

      // Step 2: Proceed with account creation API call
      console.log("Attempting account creation...")
      const response = await fetch(`${API_BASE_URL || 'https://api.example.com'}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.fullName, // Use fullName for the name field
          email: formData.email.toLowerCase(),
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          role: "STUDENT",
          paymentDetails: {
            cardNumber: "************" + formData.cardNumber.replace(/\s/g, '').slice(-4),
            expiryDate: formData.expiryDate,
            cvc: "***",
            cardHolderName: formData.cardHolderName
          }
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Account creation failed. Please try again.")
      }

      setSuccess(true)
      console.log("Account created successfully:", data)

      if (data.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken)
      }

    } catch (err) {
      console.error("Signup/Payment error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred during signup.")
    } finally {
      setIsLoading(false)
    }
  }

  // Simplified content object directly for English
  const t = {
    title: "Create Your Account & Get Started",
    subtitle: "Unlock your potential with Reskil's premium courses. Secure your access today!",
    form: {
      fullName: "Full Name",
      email: "Email Address",
      phoneNumber: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      agreeToTerms: "I agree to the Terms of Service and Privacy Policy",
      subscribeNewsletter: "Subscribe to our newsletter for updates and tips",
      createAccount: "Pay & Create Account",
      creating: "Processing & Creating...",
      fullNamePlaceholder: "Enter your full name",
      emailPlaceholder: "Enter your email address",
      phoneNumberPlaceholder: "e.g., +1234567890",
      passwordPlaceholder: "Create a strong password",
      confirmPasswordPlaceholder: "Confirm your password",
      paymentDetails: "Payment Information",
      cardHolderName: "Card Holder Name",
      cardHolderNamePlaceholder: "John Doe",
      cardNumber: "Card Number",
      cardNumberPlaceholder: "•••• •••• •••• ••••",
      expiryDate: "Expiry Date (MM/YY)",
      expiryDatePlaceholder: "MM/YY",
      cvc: "CVC",
      cvcPlaceholder: "•••",
    },
    // Benefits object is no longer used for rendering, but kept in 't' for consistency in case of future use.
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
    paymentSummary: {
      title: "Order Summary",
      productName: "Reskil All-Access",
      price: "£49.00",
      billingCycle: "per month",
      description: "Instant Access to Reskil's full course library. Billed monthly.",
      subtotal: "£49.00",
      totalDueToday: "£49.00",
      promoCode: "Add promo code"
    },
    login: {
      text: "Already have an account?",
      link: "Sign in",
    },
    success: "Account created and payment successful! Welcome to Reskil!",
  }

  // This variable is no longer explicitly used for calculations within the component
  const PAYMENT_PLAN_PRICE = 49.00;

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => window.history.back()} className="flex items-center">
                <ArrowLeft className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-2xl font-bold text-blue-600">Reskil</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Payment Summary & Payment Information */}
            <div className="lg:block p-8 bg-blue-600 text-white rounded-lg shadow-lg relative">
              <div className="sticky top-8 space-y-8">
                {/* Payment Summary */}
                <Card className="bg-blue-600 text-white shadow-none border-none">
                  <CardTitle className="text-2xl font-bold mb-4 flex items-center">
                    <DollarSign className="h-6 w-6 mr-3" /> {t.paymentSummary.title}
                  </CardTitle>
                  <CardContent className="p-0 space-y-3">
                    <div className="text-3xl font-extrabold mb-2">
                      {t.paymentSummary.price}
                      <span className="text-lg font-medium opacity-80 ml-2">{t.paymentSummary.billingCycle}</span>
                    </div>
                    <p className="text-blue-100 mb-4">{t.paymentSummary.productName}</p>
                    <p className="text-blue-100 text-sm mb-6">{t.paymentSummary.description}</p>

                    <div className="space-y-3 text-blue-100 border-t border-blue-400 pt-6 mt-6">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Subtotal</span>
                        <span>{t.paymentSummary.subtotal}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          placeholder={t.paymentSummary.promoCode}
                          className="w-full p-2 bg-blue-700 border-blue-500 text-white placeholder-blue-200 rounded-md focus:ring-blue-300 focus:border-blue-300"
                        />
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md">Apply</Button>
                      </div>
                      <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t border-blue-400">
                        <span>Total due today</span>
                        <span>{t.paymentSummary.totalDueToday}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information - Moved to the left column */}
                <Card className="bg-blue-600 text-white shadow-none border-none">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-lg font-semibold text-white mb-4">{t.form.paymentDetails}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div>
                      <Label htmlFor="cardHolderName" className="text-blue-100">{t.form.cardHolderName}</Label>
                      <div className="relative mt-1">
                        <User className="absolute top-3 h-4 w-4 text-blue-200 left-3" />
                        <Input
                          id="cardHolderName"
                          name="cardHolderName"
                          type="text"
                          placeholder={t.form.cardHolderNamePlaceholder}
                          value={formData.cardHolderName}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="pl-10 bg-blue-700 border-blue-500 text-white placeholder-blue-200 focus:ring-blue-300 focus:border-blue-300"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardNumber" className="text-blue-100">{t.form.cardNumber}</Label>
                      <div className="relative mt-1">
                        <CreditCard className="absolute top-3 h-4 w-4 text-blue-200 left-3" />
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9\s]{13,19}"
                          autoComplete="cc-number"
                          placeholder={t.form.cardNumberPlaceholder}
                          value={formData.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="pl-10 bg-blue-700 border-blue-500 text-white placeholder-blue-200 focus:ring-blue-300 focus:border-blue-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-blue-100">{t.form.expiryDate}</Label>
                        <div className="relative mt-1">
                          <Calendar className="absolute top-3 h-4 w-4 text-blue-200 left-3" />
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            inputMode="numeric"
                            pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                            placeholder={t.form.expiryDatePlaceholder}
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className="pl-10 bg-blue-700 border-blue-500 text-white placeholder-blue-200 focus:ring-blue-300 focus:border-blue-300"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="text-blue-100">{t.form.cvc}</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute top-3 h-4 w-4 text-blue-200 left-3" />
                          <Input
                            id="cvc"
                            name="cvc"
                            type="text"
                            inputMode="numeric"
                            pattern="\d{3,4}"
                            placeholder={t.form.cvcPlaceholder}
                            value={formData.cvc}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className="pl-10 bg-blue-700 border-blue-500 text-white placeholder-blue-200 focus:ring-blue-300 focus:border-blue-300"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                      {/* Personal Information */}
                      <h3 className="text-lg font-semibold text-gray-900 pt-4">Personal Information</h3>
                      <div>
                        <Label htmlFor="fullName">{t.form.fullName}</Label>
                        <div className="relative mt-1">
                          <User className="absolute top-3 h-4 w-4 text-gray-400 left-3" />
                          <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder={t.form.fullNamePlaceholder}
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">{t.form.email}</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute top-3 h-4 w-4 text-gray-400 left-3" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t.form.emailPlaceholder}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber">{t.form.phoneNumber}</Label>
                        <div className="relative mt-1">
                          <Phone className="absolute top-3 h-4 w-4 text-gray-400 left-3" />
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            placeholder={t.form.phoneNumberPlaceholder}
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      {/* Account Security */}
                      <h3 className="text-lg font-semibold text-gray-900 pt-4">Account Security</h3>
                      <div>
                        <Label htmlFor="password">{t.form.password}</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute top-3 h-4 w-4 text-gray-400 left-3" />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={t.form.passwordPlaceholder}
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                            className="absolute top-3 h-4 w-4 text-gray-400 hover:text-gray-600 right-3"
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">{t.form.confirmPassword}</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute top-3 h-4 w-4 text-gray-400 left-3" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={t.form.confirmPasswordPlaceholder}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                            className="absolute top-3 h-4 w-4 text-gray-400 hover:text-gray-600 right-3"
                          >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </div>

                      {/* Moved Payment Details Section to the left column */}
                      {/* Original location:
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.form.paymentDetails}</h3>
                        <div className="space-y-4">
                          // ... payment fields ...
                        </div>
                      </div>
                      */}

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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
