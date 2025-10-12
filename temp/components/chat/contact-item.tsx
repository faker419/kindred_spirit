"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Circle } from "lucide-react"

interface ContactItemProps {
  id: string
  name: string
  avatar: string
  status?: "online" | "offline" | "away"
  lastMessage?: string
  timestamp?: string
  unread?: number
  isActive?: boolean
  isPermanent?: boolean
  onClick?: () => void
}

export function ContactItem({
  name,
  avatar,
  status,
  lastMessage,
  timestamp,
  unread,
  isActive,
  isPermanent,
  onClick,
}: ContactItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full p-3 rounded-xl transition-all text-left",
        isActive ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50",
      )}
    >
      <div className="flex items-center gap-3">
        {/* Avatar with status indicator */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">{avatar}</span>
          </div>
          {status && (
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background">
              <Circle
                className={cn(
                  "w-full h-full rounded-full",
                  status === "online" && "fill-green-500 text-green-500",
                  status === "away" && "fill-yellow-500 text-yellow-500",
                  status === "offline" && "fill-muted-foreground text-muted-foreground",
                )}
              />
            </div>
          )}
        </div>

        {/* Contact info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-sm text-foreground truncate">{name}</h3>
            {timestamp && <span className="text-xs text-muted-foreground">{timestamp}</span>}
          </div>
          {lastMessage && <p className="text-xs text-muted-foreground truncate">{lastMessage}</p>}
          {isPermanent && <span className="text-xs text-primary font-medium">Permanent Contact</span>}
        </div>

        {/* Unread badge */}
        {unread && unread > 0 && (
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs text-primary-foreground font-semibold">{unread}</span>
          </div>
        )}
      </div>
    </motion.button>
  )
}
