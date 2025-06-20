"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import users from "@/data/users.json"

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

  const getToken = useCallback(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem("accessToken")
  }, [])

  const setToken = useCallback((token: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem("accessToken", token)
  }, [])

  const removeToken = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem("accessToken")
  }, [])

  const simulateApiCall = (data: any, delay = 500) =>
    new Promise(resolve => setTimeout(() => resolve(data), delay))

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async ({ email, password }: LoginParams): Promise<AuthResponse> => {
    setLoginLoading(true)
    try {
      const foundUser = users.find(u => u.email === email && u.password === password)

      if (foundUser) {
        const token = `mock-token-${foundUser.id}-${Date.now()}`
        const userData: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role
        }

        await simulateApiCall({ success: true })
        setToken(token)
        setUser(userData)
        setIsAuthenticated(true)
        return { success: true, token, user: userData }
      } else {
        await simulateApiCall({ success: false })
        return { success: false, message: "Email ou mot de passe incorrect" }
      }
    } catch (err) {
      return { success: false, message: "Erreur inconnue" }
    } finally {
      setLoginLoading(false)
    }
  }

  const signup = async ({ name, email, password, role = "student" }: SignupParams): Promise<AuthResponse> => {
    setSignupLoading(true)
    try {
      const exists = users.some(u => u.email === email)
      if (exists) {
        await simulateApiCall(null)
        return { success: false, message: "Utilisateur existe déjà" }
      }

      const newUser = {
        id: `u${String(users.length + 1).padStart(3, "0")}`,
        name,
        email,
        password,
        role,
        domain: role === "student" ? "Driving" : undefined,
        language: "en",
        progress: {},
        createdAt: new Date().toISOString()
      }

      console.log("🆕 Utilisateur enregistré:", newUser)
      ;(users as any).push(newUser) // non persistant

      await simulateApiCall(null)
      return { success: true, message: "Compte créé avec succès" }
    } catch (err) {
      return { success: false, message: "Erreur lors de la création" }
    } finally {
      setSignupLoading(false)
    }
  }

  const logout = async () => {
    await simulateApiCall(null)
    removeToken()
    setUser(null)
    setIsAuthenticated(false)
  }

  const checkAuth = async (): Promise<boolean> => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return false
    }

    try {
      const match = token.match(/mock-token-(u\d{3})-/)
      const id = match?.[1]
      const found = users.find(u => u.id === id)

      if (found) {
        const userData: User = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role
        }

        await simulateApiCall(null)
        setUser(userData)
        setIsAuthenticated(true)
        return true
      }

      throw new Error("Invalid token")
    } catch (err) {
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
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}