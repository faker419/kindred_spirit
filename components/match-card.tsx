"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import Image from "next/image"
import { MessageCircle, Ear, Users } from "lucide-react"

interface Match {
  id: string
  nickname: string
  avatar: string
  mood: string
  topics: string[]
  bio: string
  intent: "talk" | "listen" | "both"
}

interface MatchCardProps {
  match: Match
  onPass: () => void
  onLike: () => void
}

const topicLabels: Record<string, string> = {
  anxiety: "Anxiety",
  depression: "Depression",
  grief: "Grief & Loss",
  relationships: "Relationships",
  "work-stress": "Work Stress",
  motivation: "Motivation",
  "self-care": "Self-Care",
  "life-changes": "Life Changes",
}

const intentIcons = {
  talk: MessageCircle,
  listen: Ear,
  both: Users,
}

const intentLabels = {
  talk: "Wants to talk",
  listen: "Here to listen",
  both: "Mutual support",
}

export function MatchCard({ match, onPass, onLike }: MatchCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onLike()
    } else if (info.offset.x < -100) {
      onPass()
    }
  }

  const IntentIcon = intentIcons[match.intent]

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <Card className="h-full bg-card border-border shadow-xl rounded-3xl overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Avatar Section */}
          <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
            <Image src={match.avatar || "/placeholder.svg"} alt={match.nickname} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">{match.nickname}</h2>
                <p className="text-sm text-muted-foreground italic">{match.mood}</p>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                <IntentIcon className="w-4 h-4" />
                <span className="text-xs font-medium">{intentLabels[match.intent]}</span>
              </div>
            </div>

            <p className="text-foreground leading-relaxed mb-4">{match.bio}</p>

            {/* Topics */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Shared Topics</p>
              <div className="flex flex-wrap gap-2">
                {match.topics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="rounded-full px-3 py-1">
                    {topicLabels[topic]}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
