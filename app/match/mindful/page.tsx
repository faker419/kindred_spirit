"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Heart, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"

type ViewState = "browsing" | "awaiting" | "mutual-match"

interface Profile {
  id: string
  nickname: string
  avatar: string
  mood: string
  topics: string[]
  bio: string
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    nickname: "Luna",
    avatar: "/peaceful-person-avatar.png",
    mood: "Seeking comfort",
    topics: ["anxiety", "self-care", "motivation"],
    bio: "Going through a tough time and looking for someone who understands what it's like to feel overwhelmed.",
  },
  {
    id: "2",
    nickname: "River",
    avatar: "/calm-person-avatar.jpg",
    mood: "Here to listen",
    topics: ["grief", "life-changes", "relationships"],
    bio: "I've been through loss and want to support others. Sometimes we just need someone to hear us.",
  },
  {
    id: "3",
    nickname: "Sage",
    avatar: "/kind-person-avatar.jpg",
    mood: "Finding balance",
    topics: ["work-stress", "anxiety", "self-care"],
    bio: "Navigating work burnout and learning to prioritize myself. Would love to connect with others on similar journeys.",
  },
]

export default function MindfulMatchPage() {
  const router = useRouter()
  const [viewState, setViewState] = useState<ViewState>("browsing")
  const [profiles, setProfiles] = useState(mockProfiles)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)

  const currentProfile = profiles[currentIndex]

  const handleConnect = () => {
    setSelectedProfile(currentProfile)
    setViewState("awaiting")

    // Simulate waiting for response, then mutual match
    setTimeout(() => {
      setViewState("mutual-match")
    }, 3000)
  }

  const handleSkip = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setProfiles([])
    }
  }

  const handleOpenChat = () => {
    router.push("/chat")
  }

  const handleMaybeLater = () => {
    setViewState("browsing")
    setSelectedProfile(null)
  }

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-20 pb-32 md:pt-24 md:pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {/* Browsing Feed */}
                {viewState === "browsing" && currentProfile && (
                  <motion.div
                    key="browsing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-bold text-foreground mb-2">Mindful Connections</h1>
                      <p className="text-muted-foreground">Take your time to find someone who resonates</p>
                    </div>

                    <Card className="overflow-hidden bg-card border-border shadow-xl">
                      {/* Profile Image */}
                      <div className="relative h-64 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                        <Image
                          src={currentProfile.avatar || "/placeholder.svg"}
                          alt={currentProfile.nickname}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      </div>

                      {/* Profile Content */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h2 className="text-2xl font-bold text-foreground mb-1">{currentProfile.nickname}</h2>
                          <p className="text-sm text-muted-foreground italic">{currentProfile.mood}</p>
                        </div>

                        <p className="text-foreground leading-relaxed mb-4">{currentProfile.bio}</p>

                        {/* Topics */}
                        <div className="mb-6">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            Topics
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {currentProfile.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="rounded-full">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button variant="outline" onClick={handleSkip} className="flex-1 rounded-xl bg-transparent">
                            <X className="w-4 h-4 mr-2" />
                            Skip
                          </Button>
                          <Button onClick={handleConnect} className="flex-1 rounded-xl">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Awaiting Selection */}
                {viewState === "awaiting" && selectedProfile && (
                  <motion.div
                    key="awaiting"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center min-h-[60vh]"
                  >
                    <Card className="w-full p-8 bg-card/80 backdrop-blur border-border/50 text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                      >
                        <Clock className="w-8 h-8 text-primary" />
                      </motion.div>

                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        You've reached out to {selectedProfile.nickname}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                        If they feel the same, we'll let you know. Someone who may understand is considering your
                        connection.
                      </p>
                    </Card>
                  </motion.div>
                )}

                {/* Mutual Match Confirmation */}
                {viewState === "mutual-match" && selectedProfile && (
                  <motion.div
                    key="mutual-match"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center min-h-[60vh]"
                  >
                    <Card className="w-full p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                      >
                        <Heart className="w-10 h-10 text-primary-foreground" fill="currentColor" />
                      </motion.div>

                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        {selectedProfile.nickname} feels the same
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
                        Someone you resonated with is ready to connect. Would you like to begin a chat?
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                        <Button
                          variant="outline"
                          onClick={handleMaybeLater}
                          className="flex-1 rounded-xl bg-transparent"
                        >
                          Maybe Later
                        </Button>
                        <Button onClick={handleOpenChat} className="flex-1 rounded-xl">
                          Yes, Open Chat
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* No More Profiles */}
                {viewState === "browsing" && !currentProfile && (
                  <motion.div
                    key="no-profiles"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center min-h-[60vh]"
                  >
                    <Card className="w-full p-8 bg-card/80 backdrop-blur border-border/50 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                        <Heart className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">No more profiles right now</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">Check back later for new connections</p>
                      <Button onClick={() => router.push("/match")} className="rounded-xl">
                        Back to Match Options
                      </Button>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
