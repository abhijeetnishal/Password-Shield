"use client"

import { useMemo } from "react"
import { Progress } from "@/components/ui/progress"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" }

    let score = 0
    const feedback = []

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    if (password.length >= 16) score += 1

    // Character variety
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    // Bonus for very long passwords
    if (password.length >= 20) score += 1

    // Determine strength level
    if (score <= 2) {
      return { score: (score / 8) * 100, label: "Weak", color: "bg-red-500" }
    } else if (score <= 4) {
      return { score: (score / 8) * 100, label: "Fair", color: "bg-yellow-500" }
    } else if (score <= 6) {
      return { score: (score / 8) * 100, label: "Good", color: "bg-blue-500" }
    } else {
      return { score: (score / 8) * 100, label: "Strong", color: "bg-green-500" }
    }
  }, [password])

  if (!password) return null

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Password Strength</span>
        <span
          className={`font-medium ${
            strength.label === "Weak"
              ? "text-red-600"
              : strength.label === "Fair"
                ? "text-yellow-600"
                : strength.label === "Good"
                  ? "text-blue-600"
                  : "text-green-600"
          }`}
        >
          {strength.label}
        </span>
      </div>
      <Progress value={strength.score} className="h-2" />
    </div>
  )
}
