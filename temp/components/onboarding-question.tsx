"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Option {
  value: string
  label: string
  emoji?: string
}

interface OnboardingQuestionProps {
  question: string
  options: Option[]
  type: "single" | "multiple"
  value?: string | string[]
  onChange: (value: string | string[]) => void
}

export function OnboardingQuestion({ question, options, type, value, onChange }: OnboardingQuestionProps) {
  const handleSingleSelect = (optionValue: string) => {
    onChange(optionValue)
  }

  const handleMultipleSelect = (optionValue: string) => {
    const currentValues = (value as string[]) || []
    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter((v) => v !== optionValue))
    } else {
      onChange([...currentValues, optionValue])
    }
  }

  const isSelected = (optionValue: string) => {
    if (type === "single") {
      return value === optionValue
    }
    return ((value as string[]) || []).includes(optionValue)
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-foreground text-balance">{question}</h2>

      <div className="grid gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={() => (type === "single" ? handleSingleSelect(option.value) : handleMultipleSelect(option.value))}
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
              "hover:border-primary/50 hover:bg-muted/50",
              isSelected(option.value) ? "border-primary bg-primary/10 shadow-md" : "border-border bg-card",
            )}
          >
            {option.emoji && <span className="text-3xl">{option.emoji}</span>}
            <span className="font-medium text-foreground flex-1">{option.label}</span>
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected(option.value) ? "border-primary bg-primary" : "border-muted-foreground",
              )}
            >
              {isSelected(option.value) && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
            </div>
          </motion.button>
        ))}
      </div>

      {type === "multiple" && <p className="text-sm text-muted-foreground mt-4">Select all that apply</p>}
    </div>
  )
}
