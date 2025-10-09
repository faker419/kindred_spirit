"use client"

import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { OnboardingQuestion } from "@/components/onboarding-question"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"

const questions = [
  {
    id: "feeling",
    question: "How are you feeling today?",
    type: "single" as const,
    options: [
      { value: "anxious", label: "Anxious", emoji: "😰" },
      { value: "sad", label: "Sad", emoji: "😢" },
      { value: "lonely", label: "Lonely", emoji: "😔" },
      { value: "overwhelmed", label: "Overwhelmed", emoji: "😵" },
      { value: "hopeful", label: "Hopeful", emoji: "🌟" },
      { value: "neutral", label: "Just okay", emoji: "😐" },
    ],
  },
  {
    id: "intent",
    question: "What do you seek?",
    type: "single" as const,
    options: [
      { value: "talk", label: "To talk and share", emoji: "💬" },
      { value: "listen", label: "To listen and support", emoji: "👂" },
      { value: "both", label: "Both - mutual support", emoji: "🤝" },
    ],
  },
  {
    id: "topics",
    question: "What topics resonate with you?",
    type: "multiple" as const,
    options: [
      { value: "anxiety", label: "Anxiety", emoji: "😰" },
      { value: "depression", label: "Depression", emoji: "🌧️" },
      { value: "grief", label: "Grief & Loss", emoji: "💔" },
      { value: "relationships", label: "Relationships", emoji: "💕" },
      { value: "work-stress", label: "Work Stress", emoji: "💼" },
      { value: "motivation", label: "Motivation", emoji: "⚡" },
      { value: "self-care", label: "Self-Care", emoji: "🌸" },
      { value: "life-changes", label: "Life Changes", emoji: "🦋" },
    ],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      localStorage.setItem("onboardingAnswers", JSON.stringify(answers))
      router.push("/match")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const canProceed = answers[currentQuestion.id] !== undefined

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pb-24 md:pb-8">
        <div className="container mx-auto px-4 pt-8 md:pt-16">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Step {currentStep + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 md:p-8 bg-card/80 backdrop-blur border-border/50 shadow-lg">
                  <OnboardingQuestion
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    type={currentQuestion.type}
                    value={answers[currentQuestion.id]}
                    onChange={(value) => handleAnswer(currentQuestion.id, value)}
                  />
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0} className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button onClick={handleNext} disabled={!canProceed} size="lg" className="rounded-xl px-8">
                {currentStep === questions.length - 1 ? "Get Started" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
