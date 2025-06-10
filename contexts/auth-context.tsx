// contexts/auth-context.tsx
"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import api from '../services/api'

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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginLoading, setLoginLoading] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)
  
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
  }, [])

  const login = async ({ email, password, remember = false }: LoginParams): Promise<AuthResponse> => {
    setLoginLoading(true)
    try {
      console.log('🔑 Attempting login for:', email)
      
      const { data } = await api.post('/auth/login', { email, password })
      
      console.log('📥 Login response:', data)
      
      if (data.token && data.user) {
        setToken(data.token, remember)
        setUser(data.user)
        setIsAuthenticated(true)
        console.log('✅ Login successful')
        return { success: true }
      }

      return {
        success: false,
        message: data.message || 'Invalid response from server'
      }
    } catch (error: any) {
      console.error('🚨 Login error:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      }
    } finally {
      setLoginLoading(false)
    }
  }

  const signup = async ({ name, email, password, role }: SignupParams): Promise<AuthResponse> => {
    setSignupLoading(true)
    try {
      console.log('📝 Attempting signup for:', { name, email, role })
      console.log('🌐 API Base URL:', api.defaults.baseURL)
      
      const { data } = await api.post('/auth/signup', { 
        name, 
        email, 
        password,
        role
      })

      console.log('📥 Signup response:', data)

      if (data.success) {
        console.log('✅ Signup successful')
        return {
          success: true,
          message: data.message || 'Account created successfully'
        }
      }

      return {
        success: false,
        message: data.message || 'Signup failed'
      }
    } catch (error: any) {
      console.error('🚨 Signup error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      })
      
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed'
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
      console.log('👋 User logged out')
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
        console.log('✅ Auth check passed')
        return true
      }

      throw new Error('Invalid user data')
    } catch (error) {
      console.error('❌ Auth check failed:', error)
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
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
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
}