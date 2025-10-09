"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Users, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">A safe space for connection</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground leading-tight">
              Find someone who <span className="text-primary">understands</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
              You're not alone in what you're feeling. Connect with others who share your emotional journey and find
              comfort in genuine understanding.
            </p>

            <Link href="/onboarding">
              <Button size="lg" className="text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <Heart className="w-5 h-5 mr-2" />
                Find Connection
              </Button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
          >
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Meaningful Matches</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Connect with people who truly understand your struggles and experiences.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Safe Conversations</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Share your feelings in a judgment-free space with ephemeral, private chats.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Emotional Support</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you need to talk or listen, find the support that feels right for you.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
