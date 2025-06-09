"use client"

<<<<<<< HEAD
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => boolean
}
=======
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import api from './api'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthResponse {
  success: boolean
  message?: string
  token?: string
  user?: User
}

interface LoginParams {
  email: string
  password: string
  remember?: boolean
}

interface SignupParams {
  name: string
  email: string
  password: string
  role?: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  loginLoading: boolean
  signupLoading: boolean
  login: (params: LoginParams) => Promise<AuthResponse>
  logout: () => Promise<void>
  checkAuth: () => Promise<boolean>
  signup: (params: SignupParams) => Promise<AuthResponse>
}

>>>>>>> 82081f5 (update V3)
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
<<<<<<< HEAD

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
=======
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginLoading, setLoginLoading] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined")
  }

  // Token management
  const getToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
  }, [])

  const setToken = useCallback((token: string, remember: boolean = false): void => {
    if (typeof window === 'undefined') return
    
    if (remember) {
      localStorage.setItem("accessToken", token)
      sessionStorage.removeItem("accessToken")
    } else {
      sessionStorage.setItem("accessToken", token)
      localStorage.removeItem("accessToken")
    }
  }, [])

  const removeToken = useCallback((): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem("accessToken")
    sessionStorage.removeItem("accessToken")
  }, [])

  // Initial auth check
  useEffect(() => {
    checkAuth()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const login = async ({ email, password, remember = false }: LoginParams): Promise<AuthResponse> => {
    setLoginLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      
      if (data.token && data.user) {
        setToken(data.token, remember)
        setUser(data.user)
        setIsAuthenticated(true)
        return { success: true }
      }

      return {
        success: false,
        message: 'Invalid response from server'
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Network error occurred'
      }
    } finally {
      setLoginLoading(false)
    }
  }

  const signup = async ({ name, email, password, role }: SignupParams): Promise<AuthResponse> => {
    setSignupLoading(true)
    try {
      const { data } = await api.post('/auth/register', { 
        name, 
        email, 
        password,
        role
      })

      if (!data.success) {
        return {
          success: false,
          message: data.message || 'Signup failed'
        }
      }

      return {
        success: true,
        message: data.message
      }
    } catch (error) {
      console.error('Signup error:', error)
      return {
        success: false,
        message: 'Network error occurred'
      }
    } finally {
      setSignupLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await api.get('/auth/logout')
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      removeToken()
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const checkAuth = async (): Promise<boolean> => {
    const token = getToken()
    
    if (!token) {
      setLoading(false)
      return false
    }

    try {
      const { data } = await api.get('/auth/me')
      
      if (data.user) {
        setUser(data.user)
        setIsAuthenticated(true)
        return true
      }

      throw new Error('Invalid user data')
    } catch (error) {
      console.error('Auth check error:', error)
      removeToken()
      setUser(null)
      setIsAuthenticated(false)
      return false
    } finally {
      setLoading(false)
    }
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    loginLoading,
    signupLoading,
    login,
    logout,
    checkAuth,
    signup
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
>>>>>>> 82081f5 (update V3)
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
<<<<<<< HEAD
=======
}

export function useAuthenticatedFetch() {
  const authenticatedFetch = async (
    url: string,
    options: { 
      method?: string;
      body?: any;
      headers?: Record<string, string>;
    } = {}
  ) => {
    const { method = 'GET', body, headers = {} } = options;
    
    try {
      const response = await api.request({
        url,
        method,
        data: body,
        headers
      });
      
      return response.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  return authenticatedFetch
>>>>>>> 82081f5 (update V3)
}