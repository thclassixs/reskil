"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => boolean
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem("admin_token")
    const expiry = localStorage.getItem("admin_token_expiry")

    if (token && expiry) {
      const now = new Date().getTime()
      if (now < Number.parseInt(expiry)) {
        setIsAuthenticated(true)
      } else {
        // Token expired, clear it
        localStorage.removeItem("admin_token")
        localStorage.removeItem("admin_token_expiry")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Validate credentials
    if (email === "admin@reskil.com" && password === "classixs12340") {
      // Create a token with 24-hour expiry
      const token = btoa(`${email}:${Date.now()}`)
      const expiry = new Date().getTime() + 24 * 60 * 60 * 1000 // 24 hours

      localStorage.setItem("admin_token", token)
      localStorage.setItem("admin_token_expiry", expiry.toString())
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_token_expiry")
    setIsAuthenticated(false)
  }

  const checkAuth = (): boolean => {
    const token = localStorage.getItem("admin_token")
    const expiry = localStorage.getItem("admin_token_expiry")

    if (!token || !expiry) return false

    const now = new Date().getTime()
    if (now >= Number.parseInt(expiry)) {
      logout()
      return false
    }

    return true
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}