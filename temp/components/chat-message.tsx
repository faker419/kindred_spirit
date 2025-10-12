"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div className={cn("flex flex-col max-w-[75%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm",
            isUser ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted text-foreground rounded-bl-md",
          )}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">{formatTime(message.timestamp)}</span>
      </div>
    </motion.div>
  )
}
