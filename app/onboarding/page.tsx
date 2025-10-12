"use client";

import { useEffect, useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { OnboardingQuestion } from "@/components/onboarding-question";
import { OnboardingPreferences } from "@/components/onboarding-preferences";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [moods, setMoods] = useState<any[]>([]);
  const [subMoodMap, setSubMoodMap] = useState<Record<string, any[]>>({});
  const [subMoods, setSubMoods] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const moodEmojis: Record<string, string> = {
    Joy: "😊",
    Sadness: "😢",
    Angry: "😠",
    Fear: "😨",
    Surprise: "😲",
    Anger: "😠",
    Love: "🤩",
  };

  // 🧠 Fetch all moods (with submoods included)
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await fetch("/api/moods");
        if (!res.ok) throw new Error("Failed to load moods");
        const data = await res.json();

        const map: Record<string, any[]> = {};
        data.forEach((mood: any) => {
          map[mood.id] = mood.subMoods;
        });

        setMoods(data);
        setSubMoodMap(map);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  // 💭 Fetch topics when submoods change
  useEffect(() => {
    const fetchTopicsForSubmoods = async () => {
      const selectedSubmoods = answers.submoods;
      if (!selectedSubmoods || (Array.isArray(selectedSubmoods) && selectedSubmoods.length === 0))
        return;

      try {
        const res = await fetch("/api/topics/submood", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subMoodIds: selectedSubmoods }),
        });

        if (!res.ok) throw new Error("Failed to load topics");
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        console.error("Failed to fetch topics:", err);
      }
    };

    fetchTopicsForSubmoods();
  }, [answers.submoods]);


// 🎯 Update submoods instantly when mood changes
useEffect(() => {
  const moodId = Array.isArray(answers.mood) ? answers.mood[0] : answers.mood; // ensure string
  if (moodId) {
    const newSubmoods = subMoodMap[moodId] || [];
    setSubMoods(newSubmoods);
    setAnswers((prev) => ({ ...prev, submoods: [] }));
  }
}, [answers.mood, subMoodMap]);

  // 🪜 Define steps
  const questions = [
    {
      id: "mood",
      question: "How are you feeling today?",
      type: "single" as const,
      options: moods.map((m) => ({
        value: m.id.toString(),
        label: m.name,
        emoji: moodEmojis[m.name] || "🌀",
      })),
    },
    {
      id: "submoods",
      question: "Select up to 5 submoods that describe you right now:",
      type: "multiple" as const,
      options: subMoods.map((s) => ({
        value: s.id.toString(),
        label: s.name,
      })),
      maxSelect: 5,
    },
    {
      id: "preferences",
      question: "Help us find your ideal connection",
      type: "preferences" as const,
      options: [],
    },
    {
      id: "topics",
      question: "What topics resonate with you?",
      type: "multiple" as const,
      options: topics.map((t) => ({
        value: t.id.toString(),
        label: t.name,
        emoji: "💭",
      })),
    },
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      localStorage.setItem("onboardingAnswers", JSON.stringify(answers));
      router.push("/match");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const canProceed =
    answers[currentQuestion.id] !== undefined &&
    answers[currentQuestion.id]?.length !== 0;

  if (loading)
    return <div className="text-center mt-20">Loading moods...</div>;

  return (
    <ProtectedRoute>
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
                  <span className="text-sm font-medium text-primary">
                    {Math.round(progress)}%
                  </span>
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
                    {currentQuestion.type === "preferences" ? (
                      <OnboardingPreferences
                        value={answers[currentQuestion.id] as any}
                        onChange={(value) =>
                          handleAnswer(currentQuestion.id, value as any)
                        }
                      />
                    ) : (
                      <OnboardingQuestion
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        type={
                          currentQuestion.type as "single" | "multiple"
                        }
                        value={answers[currentQuestion.id]}
                        onChange={(value) => {
                          // Enforce max selection for submoods
                          if (
                            currentQuestion.id === "submoods" &&
                            Array.isArray(value) &&
                            value.length > 5
                          ) {
                            alert("You can select up to 5 submoods only.");
                            return;
                          }
                          handleAnswer(currentQuestion.id, value);
                        }}
                      />
                    )}
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  size="lg"
                  className="rounded-xl px-8"
                >
                  {currentStep === questions.length - 1
                    ? "Get Started"
                    : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </ProtectedRoute>
  );
}
