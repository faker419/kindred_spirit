"use client"

import { useState } from "react"
import { ContactItem } from "./contact-item"
import { Button } from "@/components/ui/button"
import { Plus, ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Contact {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  isPermanent: boolean
}

interface ActiveMatch {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread?: number
}

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeContactId?: string
  onSelectContact: (id: string) => void
}

const mockContacts: Contact[] = [
  { id: "1", name: "Luna", avatar: "L", status: "online", isPermanent: true },
  { id: "2", name: "Alex", avatar: "A", status: "away", isPermanent: true },
  { id: "3", name: "Maya", avatar: "M", status: "offline", isPermanent: true },
]

const mockActiveMatch: ActiveMatch | null = {
  id: "4",
  name: "Jordan",
  avatar: "J",
  lastMessage: "Thanks for listening...",
  timestamp: "2m ago",
  unread: 2,
}

export function ChatSidebar({ isOpen, onClose, activeContactId, onSelectContact }: ChatSidebarProps) {
  const router = useRouter()
  const [contacts] = useState<Contact[]>(mockContacts)
  const [activeMatch] = useState<ActiveMatch | null>(mockActiveMatch)

  const handleNewMatch = () => {
    router.push("/match")
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 w-80 bg-card border-r border-border z-50 transition-transform duration-300",
          "md:relative md:translate-x-0 md:z-0",
          "flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* User Profile Header */}
        <div className="p-4 border-b border-border bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-foreground">Messages</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-lg">Y</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">You</h3>
              <p className="text-xs text-muted-foreground">Seeking connection</p>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Permanent Contacts Section */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Contacts</h3>
              <span className="text-xs text-muted-foreground">{contacts.length}/5</span>
            </div>
            <div className="space-y-2">
              {contacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  id={contact.id}
                  name={contact.name}
                  avatar={contact.avatar}
                  status={contact.status}
                  isPermanent={contact.isPermanent}
                  isActive={activeContactId === contact.id}
                  onClick={() => onSelectContact(contact.id)}
                />
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Active Match</h3>
            {activeMatch ? (
              <ContactItem
                id={activeMatch.id}
                name={activeMatch.name}
                avatar={activeMatch.avatar}
                lastMessage={activeMatch.lastMessage}
                timestamp={activeMatch.timestamp}
                unread={activeMatch.unread}
                isActive={activeContactId === activeMatch.id}
                onClick={() => onSelectContact(activeMatch.id)}
              />
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No active match</p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <Button
            onClick={handleNewMatch}
            className="w-full rounded-xl gap-2 bg-transparent"
            variant="outline"
            disabled={!!activeMatch}
          >
            <Plus className="w-4 h-4" />
            {activeMatch ? "Finish current match first" : "New Match"}
          </Button>
        </div>
      </aside>
    </>
  )
}
