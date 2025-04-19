"use client"

import React, { useState, useRef } from "react"
import { Mic } from "lucide-react"

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

interface Props {
  onTextReceived: (text: string) => void
}

const VoiceInputButton: React.FC<Props> = ({ onTextReceived }) => {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  const handleVoiceClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.")
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.lang = "en-US"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setListening(true)

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript
      onTextReceived(result)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event)
    }

    recognition.onend = () => setListening(false)

    recognition.start()
  }

  return (
    <button
      onClick={handleVoiceClick}
      className="p-2 bg-rose-200 hover:bg-rose-300 text-rose-800 rounded-lg shadow-md transition-all"
      title="Use voice input"
    >
      <Mic className="w-5 h-5" />
    </button>
  )
}

export default VoiceInputButton
