"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Copy, RefreshCw, Key } from "lucide-react"
import { PasswordStrengthIndicator } from "./password-strength"

export function PasswordGenerator() {
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([16])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)

  const generatePassword = () => {
    let charset = ""
    const similar = "il1Lo0O"

    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (excludeSimilar) {
      charset = charset
        .split("")
        .filter((char) => !similar.includes(char))
        .join("")
    }

    if (!charset) {
      setPassword("Please select at least one character type")
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(result)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy password: ", err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Key className="h-4 w-4 mr-2" />
          Generate Password
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Password Generator</DialogTitle>
          <DialogDescription>Create a strong, secure password with custom settings</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Generated Password Display */}
          <div className="space-y-2">
            <Label>Generated Password</Label>
            <div className="flex space-x-2">
              <Input value={password} readOnly placeholder="Click generate to create password" className="font-mono" />
              <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!password}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {password && <PasswordStrengthIndicator password={password} />}
          </div>

          {/* Length Slider */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Length</Label>
              <span className="text-sm text-gray-600">{length[0]} characters</span>
            </div>
            <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
          </div>

          {/* Character Options */}
          <div className="space-y-4">
            <Label>Character Types</Label>

            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="text-sm font-normal">
                Uppercase Letters (A-Z)
              </Label>
              <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase" className="text-sm font-normal">
                Lowercase Letters (a-z)
              </Label>
              <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="numbers" className="text-sm font-normal">
                Numbers (0-9)
              </Label>
              <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="symbols" className="text-sm font-normal">
                Symbols (!@#$%^&*)
              </Label>
              <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="exclude-similar" className="text-sm font-normal">
                Exclude Similar Characters
              </Label>
              <Switch id="exclude-similar" checked={excludeSimilar} onCheckedChange={setExcludeSimilar} />
            </div>
          </div>

          {/* Generate Button */}
          <Button onClick={generatePassword} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
