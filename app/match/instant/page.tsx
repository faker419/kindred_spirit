"use client"

import { useState, useEffect } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, X } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function InstantMatchPage() {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(true)
  const [matchFound, setMatchFound] = useState(false)

  useEffect(() => {
    // Simulate searching for a match
    const timer = setTimeout(() => {
      setMatchFound(true)
      setIsSearching(false)

      // Transition to chat after showing match found
      setTimeout(() => {
        router.push("/chat")
      }, 2000)
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  const handleCancel = () => {
    router.push("/match")
  }

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-20 pb-32 md:pt-24 md:pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto flex items-center justify-center min-h-[60vh]">
              <Card className="w-full p-8 bg-card/80 backdrop-blur border-border/50 text-center">
                {isSearching && !matchFound && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-20 h-20 mx-auto"
                    >
                      <Loader2 className="w-20 h-20 text-primary" />
                    </motion.div>

                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Searching for someone who understands...
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        We're finding someone for you — take a deep breath.
                      </p>
                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      <Button variant="outline" onClick={handleCancel} className="rounded-xl bg-transparent">
                        <X className="w-4 h-4 mr-2" />
                        Cancel Search
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {matchFound && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                    >
                      <span className="text-4xl">✨</span>
                    </motion.div>

                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">Match Found!</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        We found someone who's here for you. Starting your conversation...
                      </p>
                    </div>
                  </motion.div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
