"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Copy, Send, AlertCircle, Heart, Pill, Loader2, ClipboardList } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import TypingDots from "@/components/typing-dots"
import { SBARModal } from "@/components/sbar-modal"
import VoiceInputButton from "@/components/voice-input-button"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSBARModalOpen, setIsSBARModalOpen] = useState(false)
  const [sbarData, setSBARData] = useState({
    situation: "",
    background: "",
    assessment: "",
    recommendation: "",
  })
  const { toast } = useToast()
  const isMobile = useMobile()

  // Handle voice input text
  const handleVoiceInput = (text: string) => {
    setQuery((prevQuery) => {
      const newQuery = prevQuery ? `${prevQuery} ${text}` : text
      return newQuery
    })

    toast({
      title: "Voice input received",
      description: "Text has been added to the query field",
      duration: 2000,
    })
  }

  // Simulate sending query to a local LLaMA model
  const handleSubmit = async (e: React.FormEvent | string) => {
    if (e instanceof Object) e.preventDefault()
  
    const queryText = typeof e === "string" ? e : query
    if (!queryText.trim()) return
  
    setIsLoading(true)
    setResponse("") // Clear previous response
  
    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: queryText }),
      })
  
      if (!res.ok) throw new Error("Failed to fetch response from backend")
  
      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      console.error("Fetch error:", error)
      setResponse("⚠️ Error: Unable to connect to the backend.")
      toast({
        title: "Error",
        description: "Could not connect to local AI assistant.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  

  const handleCopyResponse = () => {
    if (!response) return

    navigator.clipboard.writeText(response)
    toast({
      title: "Copied!",
      description: "Response copied to clipboard",
      duration: 2000,
    })
  }

  const generateSBAR = () => {
    // Simple rule-based approach to convert the response to SBAR format
    let situation = ""
    let background = ""
    let assessment = ""
    let recommendation = ""

    // Parse the response based on content
    const lines = response.split("\n")

    if (response.toLowerCase().includes("cpr for infant")) {
      // CPR response
      situation = "Infant requiring cardiopulmonary resuscitation (CPR)."
      background = "Patient is an infant who is unresponsive and not breathing normally."
      assessment = "Critical condition requiring immediate CPR intervention."
      recommendation = lines.slice(1).join("\n") // All steps after the first line
    } else if (response.toLowerCase().includes("epinephrine") && response.toLowerCase().includes("beta blocker")) {
      // Drug interaction response
      situation = "Potential drug interaction between epinephrine and beta blockers."
      background = "Patient may be on beta blocker medication and requires epinephrine administration."
      assessment = "Risk of severe hypertension and reflex bradycardia due to interaction."
      recommendation =
        "Consider reduced initial doses of epinephrine and careful monitoring. Monitor vital signs closely during administration."
    } else if (response.toLowerCase().includes("cardiac")) {
      // Chest pain response
      situation = "Patient presenting with chest pain and dizziness, suggesting potential cardiac event."
      background = "Symptoms indicate possible acute coronary syndrome or other cardiac emergency."
      assessment = "Potential cardiac event requiring immediate assessment and intervention."
      recommendation =
        "Check vital signs immediately. Monitor blood pressure and heart rate. Consider 12-lead ECG if available. Position patient comfortably and provide oxygen if needed. Be prepared to administer aspirin if no contraindications exist."
    } else {
      // Generic response
      situation = "Patient presenting with unspecified symptoms requiring assessment."
      background = "Limited information available about patient history and current condition."
      assessment = "Multiple potential conditions that require further evaluation."
      recommendation =
        "Monitor vital signs and assess for additional symptoms. Consider the patient's medical history and current medications. Provide supportive care while conducting further assessment."
    }

    setSBARData({
      situation,
      background,
      assessment,
      recommendation,
    })

    setIsSBARModalOpen(true)
  }

  const presetQueries = [
    {
      text: "Chest pain + dizziness",
      icon: <Heart className="h-5 w-5 flex-shrink-0" />,
    },
    {
      text: "CPR steps for infant",
      icon: <AlertCircle className="h-5 w-5 flex-shrink-0" />,
    },
    {
      text: "Drug interaction: Epi + beta blockers",
      icon: <Pill className="h-5 w-5 flex-shrink-0" />,
    },
  ]

  // Determine if we should show the response section
  const showResponseSection = isLoading || response

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      {/* Fixed top bar */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300 text-white py-3 z-10 shadow-lg">
        <div className="container max-w-5xl mx-auto flex items-center justify-center px-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-white p-1.5 md:p-2 rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-rose-400"
              >
                <path d="m8 16 2-6 2 6" />
                <path d="M12 10v4" />
                <rect width="16" height="16" x="4" y="4" rx="2" />
              </svg>
            </div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-800">
              LLaMAid: Ambulance AI Copilot
            </h1>
          </div>
        </div>
      </header>

      <div className="container max-w-5xl mx-auto pt-20 md:pt-24 px-3 md:px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-white to-slate-100 rounded-3xl transform -rotate-1 shadow-lg"></div>
          <Card className="relative overflow-hidden border-0 shadow-2xl rounded-2xl bg-white">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="h-6 md:h-8 w-1.5 bg-rose-300 rounded-full"></div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Medical Query Assistant</h2>
              </div>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 max-w-2xl">
                Enter symptoms or medical questions to receive AI-assisted guidance for emergency situations.
              </p>

              {/* Input area */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter symptoms or medical questions here..."
                    className="min-h-[120px] md:min-h-[140px] text-base md:text-lg p-4 md:p-5 border-2 border-gray-200 rounded-xl shadow-sm focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all resize-none pr-16"
                  />
                  <div className="absolute top-3 right-3 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-md">
                    Offline Mode
                  </div>

                  {/* Voice input button */}
                  <div className="absolute bottom-3 right-3">
                    <VoiceInputButton onTextReceived={handleVoiceInput} />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size={isMobile ? "default" : "lg"}
                    className={cn(
                      "bg-gradient-to-r from-rose-400 to-rose-300 hover:from-rose-500 hover:to-rose-400 text-white shadow-lg transition-all duration-200 text-base md:text-lg py-2 md:py-5 px-4 md:px-6 rounded-xl",
                      isLoading && "opacity-90",
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 md:h-5 md:w-5" />
                        Submit
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Preset queries */}
            <div className="bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 p-4 sm:p-6 md:p-8 border-t">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="h-6 md:h-8 w-1.5 bg-white rounded-full"></div>
                <h2 className="text-lg md:text-xl font-bold text-white">Quick Queries</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {presetQueries.map((presetQuery, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm text-sm md:text-base border-2 border-white/30 h-auto py-3 md:py-4 px-4 md:px-5 shadow-lg hover:shadow-xl hover:bg-white/30 transition-all duration-200 justify-start rounded-xl text-white"
                    onClick={() => {
                      setQuery(presetQuery.text)
                      handleSubmit(presetQuery.text)
                    }}
                  >
                    <div className="flex items-center gap-2 md:gap-3 w-full">
                      <div className="bg-white/20 p-1.5 md:p-2 rounded-lg">
                        <div className="text-white">{presetQuery.icon}</div>
                      </div>
                      <span className="truncate font-medium">{presetQuery.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Response area */}
        {showResponseSection && (
          <div className="relative mt-4 md:mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-white to-slate-100 rounded-3xl transform rotate-1 shadow-lg"></div>
            <Card className="relative border-0 shadow-2xl overflow-hidden rounded-2xl animate-fadeIn bg-white">
              <div className="bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 p-3 md:p-4 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 md:gap-3">
                  <div className="bg-white/20 p-1.5 md:p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>
                  AI Response
                </h2>
                {response && (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size={isMobile ? "default" : "lg"}
                      onClick={generateSBAR}
                      className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 flex items-center justify-center gap-2 rounded-lg w-full sm:w-auto"
                    >
                      <ClipboardList className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="whitespace-nowrap">Generate Case Summary</span>
                    </Button>
                    <Button
                      variant="outline"
                      size={isMobile ? "default" : "lg"}
                      onClick={handleCopyResponse}
                      className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 flex items-center justify-center gap-2 rounded-lg w-full sm:w-auto"
                    >
                      <Copy className="h-4 w-4 md:h-5 md:w-5" />
                      Copy
                    </Button>
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="bg-gray-50 p-4 md:p-5 rounded-xl min-h-[100px] max-h-[200px] overflow-y-auto whitespace-pre-line border border-gray-100 text-base md:text-lg leading-relaxed shadow-inner">
                  {isLoading ? (
                    <div className="flex items-start">
                      <TypingDots />
                    </div>
                  ) : (
                    response
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* SBAR Modal */}
      <SBARModal isOpen={isSBARModalOpen} onClose={() => setIsSBARModalOpen(false)} sbarData={sbarData} />
    </div>
  )
}
