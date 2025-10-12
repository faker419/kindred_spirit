"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("kindred_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      avatar: "/peaceful-person-avatar.png",
    }

    setUser(mockUser)
    localStorage.setItem("kindred_user", JSON.stringify(mockUser))
  }

  const loginWithGoogle = async () => {
    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockUser: User = {
      id: "google_1",
      email: "user@gmail.com",
      name: "Google User",
      avatar: "/calm-person-avatar.jpg",
    }

    setUser(mockUser)
    localStorage.setItem("kindred_user", JSON.stringify(mockUser))
  }

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "new_" + Date.now(),
      email,
      name,
      avatar: "/kind-person-avatar.jpg",
    }

    setUser(mockUser)
    localStorage.setItem("kindred_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("kindred_user")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
