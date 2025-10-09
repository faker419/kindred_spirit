"use client"

import { useState, useRef, useEffect } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatMessage } from "@/components/chat-message"
import { PermanentContactModal } from "@/components/chat/permanent-contact-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MoreVertical, Video, LogOut, UserPlus, Flag, Menu, Smile } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: Date
}

interface ContactChat {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  isPermanent: boolean
  messages: Message[]
}

const mockContactChats: Record<string, ContactChat> = {
  "1": {
    id: "1",
    name: "Luna",
    avatar: "L",
    status: "online",
    isPermanent: true,
    messages: [
      {
        id: "1",
        text: "Hi there! Thanks for connecting. I've been feeling really overwhelmed lately.",
        sender: "other",
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: "2",
        text: "I completely understand. I've been there too. What's been weighing on you?",
        sender: "user",
        timestamp: new Date(Date.now() - 240000),
      },
      {
        id: "3",
        text: "Work has been really stressful, and I feel like I'm not doing enough for myself.",
        sender: "other",
        timestamp: new Date(Date.now() - 180000),
      },
    ],
  },
  "2": {
    id: "2",
    name: "Alex",
    avatar: "A",
    status: "away",
    isPermanent: true,
    messages: [
      {
        id: "1",
        text: "Hey! How have you been?",
        sender: "other",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: "2",
        text: "I'm doing okay, thanks for asking. How about you?",
        sender: "user",
        timestamp: new Date(Date.now() - 7100000),
      },
    ],
  },
  "3": {
    id: "3",
    name: "Maya",
    avatar: "M",
    status: "offline",
    isPermanent: true,
    messages: [
      {
        id: "1",
        text: "I really appreciate having you as a friend.",
        sender: "other",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "2",
        text: "Same here! You've been such a great support.",
        sender: "user",
        timestamp: new Date(Date.now() - 86300000),
      },
    ],
  },
  "4": {
    id: "4",
    name: "Jordan",
    avatar: "J",
    status: "online",
    isPermanent: false,
    messages: [
      {
        id: "1",
        text: "Thanks for listening to me today.",
        sender: "other",
        timestamp: new Date(Date.now() - 120000),
      },
      {
        id: "2",
        text: "Of course! I'm here for you.",
        sender: "user",
        timestamp: new Date(Date.now() - 60000),
      },
    ],
  },
}

export default function ChatPage() {
  const router = useRouter()
  const [activeContactId, setActiveContactId] = useState("1")
  const [messages, setMessages] = useState<Message[]>(mockContactChats[activeContactId]?.messages || [])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showVideoDialog, setShowVideoDialog] = useState(false)
  const [isWaitingForCall, setIsWaitingForCall] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showPermanentContactModal, setShowPermanentContactModal] = useState(false)
  const [permanentContactsCount, setPermanentContactsCount] = useState(3)
  const [otherUserContactsCount] = useState(4)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentContact = mockContactChats[activeContactId]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (mockContactChats[activeContactId]) {
      setMessages(mockContactChats[activeContactId].messages)
    }
  }, [activeContactId])

  useEffect(() => {
    if (isWaitingForCall) {
      const timer = setTimeout(() => {
        router.push("/call/session-123")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isWaitingForCall, router])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "That sounds really challenging. Remember to be kind to yourself during difficult times.",
        sender: "other",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const handleLeave = () => {
    if (confirm("Are you sure you want to leave this conversation? This chat will be deleted.")) {
      router.push("/match")
    }
  }

  const handleVideoRequest = () => {
    setShowVideoDialog(true)
    setIsWaitingForCall(true)
  }

  const handleRequestPermanentContact = () => {
    setShowPermanentContactModal(true)
  }

  const handleConfirmPermanentContact = () => {
    setPermanentContactsCount((prev) => prev + 1)
  }

  const isCurrentUserAtLimit = permanentContactsCount >= 5
  const isOtherUserAtLimit = otherUserContactsCount >= 5
  const canRequestPermanentContact = !isCurrentUserAtLimit && !isOtherUserAtLimit

  if (!currentContact) {
    return (
      <div className="flex h-screen pt-16 md:pb-0 pb-16 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
        <ChatSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeContactId={activeContactId}
          onSelectContact={(id) => {
            setActiveContactId(id)
            setIsSidebarOpen(false)
          }}
        />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Select a contact to start chatting</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen pt-16 md:pb-0 pb-16 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeContactId={activeContactId}
        onSelectContact={(id) => {
          setActiveContactId(id)
          setIsSidebarOpen(false)
        }}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 border-b border-border bg-card/80 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden rounded-full"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">{currentContact.avatar}</span>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{currentContact.name}</h2>
                <p className="text-xs text-muted-foreground capitalize">{currentContact.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleVideoRequest} className="rounded-full">
                <Video className="w-5 h-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl w-56">
                  <DropdownMenuItem className="rounded-lg">View Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {!currentContact.isPermanent && (
                    <>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuItem
                              onClick={handleRequestPermanentContact}
                              disabled={!canRequestPermanentContact}
                              className="rounded-lg"
                            >
                              <UserPlus className="w-4 h-4 mr-2" />
                              Request Permanent Contact
                            </DropdownMenuItem>
                          </TooltipTrigger>
                          {!canRequestPermanentContact && (
                            <TooltipContent side="left" className="rounded-lg max-w-xs">
                              <p className="text-xs">
                                {isCurrentUserAtLimit && isOtherUserAtLimit
                                  ? `Both you and ${currentContact.name} have reached the limit of 5 permanent contacts`
                                  : isCurrentUserAtLimit
                                    ? "You've reached your limit of 5 permanent contacts"
                                    : `${currentContact.name} has reached their limit of 5 permanent contacts`}
                              </p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem className="rounded-lg">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                  {!currentContact.isPermanent && (
                    <DropdownMenuItem onClick={handleLeave} className="text-destructive rounded-lg">
                      <LogOut className="w-4 h-4 mr-2" />
                      Leave Conversation
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-muted-foreground"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-muted-foreground"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-muted-foreground"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border bg-card/80 backdrop-blur">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border-border bg-background"
            />
            <Button type="button" variant="ghost" size="icon" className="rounded-xl">
              <Smile className="w-5 h-5" />
            </Button>
            <Button type="submit" size="icon" disabled={!inputValue.trim()} className="rounded-xl">
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Video Call Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Video Call Request</DialogTitle>
            <DialogDescription className="pt-4">
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <Video className="w-8 h-8 text-primary" />
                </motion.div>
                <p className="text-center text-muted-foreground">
                  Waiting for the other person to accept your video call...
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <PermanentContactModal
        isOpen={showPermanentContactModal}
        onClose={() => setShowPermanentContactModal(false)}
        contactName={currentContact.name}
        onConfirm={handleConfirmPermanentContact}
        isCurrentUserAtLimit={isCurrentUserAtLimit}
        isOtherUserAtLimit={isOtherUserAtLimit}
      />
    </div>
  )
}
