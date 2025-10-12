"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"
import type { User as SupabaseUser } from "@supabase/auth-js"


const createProfileForUser = async (id: string, fullName?: string) => {
  await fetch("/api/profile/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, fullName }),
  })
}

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
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const mapSupabaseUser = (user: SupabaseUser): User => ({
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.full_name ?? "No name",
    avatar: user.user_metadata?.avatar_url ?? undefined,
  })

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user) {
        const mappedUser = mapSupabaseUser(data.session.user)
        setUser(mappedUser)
        // Ensure profile exists
        await createProfileForUser(mappedUser.id, mappedUser.name)
      }
      setIsLoading(false)
    }
    fetchUser()

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const mappedUser = mapSupabaseUser(session.user)
        setUser(mappedUser)
        await createProfileForUser(mappedUser.id, mappedUser.name)
      } else {
        setUser(null)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (data.user) {
      const mappedUser = mapSupabaseUser(data.user)
      setUser(mappedUser)
      await createProfileForUser(mappedUser.id, mappedUser.name)
    }
    setIsLoading(false)
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/onboarding` },
    })
    if (error) throw error
    // Profile will be created after redirect in useEffect
    setIsLoading(false)
  }

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) throw error
    if (data.user) {
      const mappedUser = mapSupabaseUser(data.user)
      setUser(mappedUser)
      await createProfileForUser(mappedUser.id, name)
    }
    setIsLoading(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
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
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
