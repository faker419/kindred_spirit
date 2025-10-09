"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function MatchPage() {
  const router = useRouter()

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-20 pb-32 md:pt-24 md:pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Connection</h1>
                <p className="text-muted-foreground">Choose how you'd like to connect</p>
              </div>

              {/* Match Mode Options */}
              <div className="space-y-4">
                {/* Instant Match */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Card
                    className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                    onClick={() => router.push("/match/instant")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">Instant Match</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          Connect immediately with someone who's available right now. Quick, spontaneous support when
                          you need it most.
                        </p>
                        <Button className="w-full rounded-xl">Find Someone Now</Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Mindful Match */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card
                    className="p-6 bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20 hover:border-secondary/40 transition-colors cursor-pointer"
                    onClick={() => router.push("/match/mindful")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">Mindful Match</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          Browse profiles thoughtfully and connect with those who truly resonate. Take your time to find
                          the right connection.
                        </p>
                        <Button variant="outline" className="w-full rounded-xl bg-transparent">
                          Browse Profiles
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
