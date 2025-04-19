"use client"

import { useState } from "react"
import { Mic } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface VoiceInputButtonProps {
  onTextReceived: (text: string) => void
  className?: string
}

const VoiceInputButton = ({ onTextReceived, className }: VoiceInputButtonProps) => {
  const [isListening, setIsListening] = useState(false)
  const isMobile = useMobile()

  // Mock voice recognition
  const startListening = () => {
    setIsListening(true)

    // Simulate voice recognition after a delay
    setTimeout(() => {
      // Mock responses based on random selection
      const mockResponses = [
        "Patient complaining of chest pain and dizziness for the past hour.",
        "Infant not breathing, unresponsive. Started CPR two minutes ago.",
        "Patient on beta blockers needs epinephrine. Concerned about drug interaction.",
        "Elderly patient with shortness of breath and confusion.",
        "Trauma patient with suspected internal bleeding after car accident.",
      ]

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      onTextReceived(randomResponse)
      setIsListening(false)
    }, 3000) // 3 seconds of "listening"
  }

  const buttonSize = isMobile ? "w-10 h-10" : "w-12 h-12"
  const iconSize = isMobile ? "h-4 w-4" : "h-5 w-5"

  return (
    <button
      type="button"
      onClick={startListening}
      disabled={isListening}
      className={cn(
        "relative flex items-center justify-center rounded-full transition-all",
        buttonSize,
        isListening ? "bg-rose-100" : "bg-gray-100 hover:bg-gray-200",
        className,
      )}
      aria-label={isListening ? "Listening..." : "Voice input"}
    >
      <Mic className={cn(iconSize, isListening ? "text-rose-500" : "text-gray-500")} />

      {/* Listening animation */}
      {isListening && (
        <>
          <span className="absolute inset-0 rounded-full animate-ping-slow bg-rose-200 opacity-75"></span>
          <span className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-rose-500 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
            Listening...
          </span>
        </>
      )}
    </button>
  )
}

export default VoiceInputButton
