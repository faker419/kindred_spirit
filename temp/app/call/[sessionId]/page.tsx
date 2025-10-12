"use client"

import { useState, useEffect } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function VideoCallPage() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleEndCall = () => {
    if (confirm("Are you sure you want to end this call?")) {
      router.push("/chat")
    }
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Call Duration */}
            <div className="text-center mb-6">
              <Card className="inline-block px-4 py-2 bg-card/80 backdrop-blur border-border/50">
                <p className="text-sm font-medium text-muted-foreground">
                  Call Duration: <span className="text-foreground">{formatDuration(callDuration)}</span>
                </p>
              </Card>
            </div>

            {/* Video Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Partner Video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="relative aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-4xl text-primary-foreground font-bold">L</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Card className="px-3 py-1 bg-card/80 backdrop-blur">
                      <p className="text-sm font-medium text-foreground">Luna</p>
                    </Card>
                  </div>
                </Card>
              </motion.div>

              {/* Self Video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="relative aspect-video bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/20 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isVideoOff ? (
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                        <VideoOff className="w-12 h-12 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                        <span className="text-4xl text-primary-foreground font-bold">Y</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Card className="px-3 py-1 bg-card/80 backdrop-blur">
                      <p className="text-sm font-medium text-foreground">You</p>
                    </Card>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsMuted(!isMuted)}
                className={`rounded-full w-14 h-14 ${isMuted ? "bg-destructive/10 border-destructive" : "bg-transparent"}`}
              >
                {isMuted ? <MicOff className="w-6 h-6 text-destructive" /> : <Mic className="w-6 h-6" />}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`rounded-full w-14 h-14 ${isVideoOff ? "bg-destructive/10 border-destructive" : "bg-transparent"}`}
              >
                {isVideoOff ? <VideoOff className="w-6 h-6 text-destructive" /> : <Video className="w-6 h-6" />}
              </Button>

              <Button
                size="lg"
                onClick={handleEndCall}
                className="rounded-full w-16 h-16 bg-destructive hover:bg-destructive/90"
              >
                <PhoneOff className="w-7 h-7" />
              </Button>
            </div>

            {/* Call Info */}
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                This is a safe space. Be kind and respectful to each other.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
