"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, MessageCircle, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isAuthPage = pathname === "/login" || pathname === "/signup"
  if (isAuthPage) return null

  const authenticatedLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/match", label: "Match", icon: Heart },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const unauthenticatedLinks = [{ href: "/", label: "Home", icon: Home }]

  const links = user ? authenticatedLinks : unauthenticatedLinks

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around md:justify-between h-16">
          {/* Logo - hidden on mobile, shown on desktop */}
          <Link href="/" className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-semibold text-lg text-foreground">Kindred Spirit</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 md:gap-2 w-full md:w-auto justify-around md:justify-end">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs md:text-sm font-medium">{link.label}</span>
                </Link>
              )
            })}

            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-xs md:text-sm font-medium">Logout</span>
              </Button>
            ) : (
              <Link
                href="/login"
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <User className="w-5 h-5" />
                <span className="text-xs md:text-sm font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
