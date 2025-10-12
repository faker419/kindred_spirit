"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Camera, Save, X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ProtectedRoute } from "@/components/auth/protected-route"

const emotionalStateTags = [
  { value: "anxious", label: "Anxious", emoji: "😰" },
  { value: "sad", label: "Sad", emoji: "😢" },
  { value: "lonely", label: "Lonely", emoji: "😔" },
  { value: "hopeful", label: "Hopeful", emoji: "🌟" },
  { value: "calm", label: "Calm", emoji: "😌" },
  { value: "overwhelmed", label: "Overwhelmed", emoji: "😵" },
  { value: "motivated", label: "Motivated", emoji: "💪" },
  { value: "grateful", label: "Grateful", emoji: "🙏" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    nickname: "You",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Looking for meaningful connections and support.",
    emotionalState: ["hopeful", "calm"],
  })

  const [editedProfile, setEditedProfile] = useState(profile)

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const toggleEmotionalState = (value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      emotionalState: prev.emotionalState.includes(value)
        ? prev.emotionalState.filter((s) => s !== value)
        : [...prev.emotionalState, value],
    }))
  }

  const displayProfile = isEditing ? editedProfile : profile

  return (
    <ProtectedRoute>
      <Navbar />
      <PageWrapper>
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-20 pb-32 md:pt-24 md:pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="rounded-xl">
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleCancel} variant="outline" className="rounded-xl bg-transparent">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="rounded-xl">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Card */}
              <Card className="p-6 md:p-8 bg-card/80 backdrop-blur border-border/50 shadow-lg rounded-3xl">
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
                      <Image
                        src={displayProfile.avatar || "/placeholder.svg"}
                        alt={displayProfile.nickname}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Nickname */}
                <div className="mb-6">
                  <Label htmlFor="nickname" className="text-sm font-semibold text-foreground mb-2 block">
                    Nickname
                  </Label>
                  {isEditing ? (
                    <Input
                      id="nickname"
                      value={editedProfile.nickname}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, nickname: e.target.value }))}
                      className="rounded-xl border-border bg-background"
                    />
                  ) : (
                    <p className="text-lg font-medium text-foreground">{displayProfile.nickname}</p>
                  )}
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <Label htmlFor="bio" className="text-sm font-semibold text-foreground mb-2 block">
                    About You
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      className="rounded-xl border-border bg-background resize-none"
                    />
                  ) : (
                    <p className="text-foreground leading-relaxed">{displayProfile.bio}</p>
                  )}
                </div>

                {/* Emotional State Tags */}
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-3 block">Current Emotional State</Label>
                  <div className="flex flex-wrap gap-2">
                    {emotionalStateTags.map((tag) => {
                      const isSelected = displayProfile.emotionalState.includes(tag.value)
                      return (
                        <motion.button
                          key={tag.value}
                          onClick={() => isEditing && toggleEmotionalState(tag.value)}
                          disabled={!isEditing}
                          whileHover={isEditing ? { scale: 1.05 } : {}}
                          whileTap={isEditing ? { scale: 0.95 } : {}}
                          className={`${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted text-muted-foreground border-border"
                          } border-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            isEditing ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <span className="mr-2">{tag.emoji}</span>
                          {tag.label}
                        </motion.button>
                      )
                    })}
                  </div>
                  {isEditing && (
                    <p className="text-xs text-muted-foreground mt-2">Select tags that describe how you're feeling</p>
                  )}
                </div>
              </Card>

              {/* Additional Info */}
              <Card className="mt-6 p-6 bg-accent/10 backdrop-blur border-accent/20 rounded-2xl">
                <h3 className="font-semibold text-foreground mb-2">Privacy & Safety</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your conversations are ephemeral and not stored. You can leave any conversation at any time. Remember
                  to be kind and respectful to others.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </PageWrapper>
    </ProtectedRoute>
  )
}
