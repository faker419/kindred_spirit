"use client"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface PreferencesValue {
  ageRange: [number, number]
  gender: string
  emotionalResonance: string
}

interface OnboardingPreferencesProps {
  value?: PreferencesValue
  onChange: (value: PreferencesValue) => void
}

const genderOptions = [
  { value: "any", label: "Doesn't matter", emoji: "🌈" },
  { value: "male", label: "Male", emoji: "👨" },
  { value: "female", label: "Female", emoji: "👩" },
  { value: "non-binary", label: "Non-binary", emoji: "⚧️" },
]

const resonanceOptions = [
  {
    value: "parallel",
    label: "Parallel",
    description: "Someone feeling the same way",
    emoji: "🤝",
  },
  {
    value: "complementary",
    label: "Complementary",
    description: "Someone who can balance my emotions",
    emoji: "⚖️",
  },
  {
    value: "opposing",
    label: "Opposing",
    description: "Someone with opposite emotional state",
    emoji: "🔄",
  },
]

export function OnboardingPreferences({ value, onChange }: OnboardingPreferencesProps) {
  const currentValue: PreferencesValue = value || {
    ageRange: [18, 65],
    gender: "",
    emotionalResonance: "",
  }

  const handleAgeRangeChange = (newRange: number[]) => {
    onChange({
      ...currentValue,
      ageRange: [newRange[0], newRange[1]],
    })
  }

  const handleGenderChange = (gender: string) => {
    onChange({
      ...currentValue,
      gender,
    })
  }

  const handleResonanceChange = (resonance: string) => {
    onChange({
      ...currentValue,
      emotionalResonance: resonance,
    })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-balance">
        Help us find your ideal connection
      </h2>

      {/* Age Range */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Desired age range</Label>
        <div className="px-2">
          <Slider
            min={18}
            max={80}
            step={1}
            value={currentValue.ageRange}
            onValueChange={handleAgeRangeChange}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{currentValue.ageRange[0]} years</span>
            <span>{currentValue.ageRange[1]} years</span>
          </div>
        </div>
      </div>

      {/* Gender Preference */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Preferred gender</Label>
        <div className="grid gap-2">
          {genderOptions.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => handleGenderChange(option.value)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
                "hover:border-primary/50 hover:bg-muted/50",
                currentValue.gender === option.value
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card",
              )}
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="font-medium text-foreground flex-1">{option.label}</span>
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                  currentValue.gender === option.value ? "border-primary bg-primary" : "border-muted-foreground",
                )}
              >
                {currentValue.gender === option.value && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Emotional Resonance */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Emotional resonance</Label>
        <div className="grid gap-2">
          {resonanceOptions.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 + 0.2 }}
              onClick={() => handleResonanceChange(option.value)}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left",
                "hover:border-primary/50 hover:bg-muted/50",
                currentValue.emotionalResonance === option.value
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card",
              )}
            >
              <span className="text-2xl mt-0.5">{option.emoji}</span>
              <div className="flex-1">
                <div className="font-medium text-foreground">{option.label}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{option.description}</div>
              </div>
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all mt-1",
                  currentValue.emotionalResonance === option.value
                    ? "border-primary bg-primary"
                    : "border-muted-foreground",
                )}
              >
                {currentValue.emotionalResonance === option.value && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
