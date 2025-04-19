"use client"

import type React from "react"

const TypingDots: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 px-2 py-1 bg-slate-200 rounded-lg w-fit">
      <div className="typing-dot"></div>
      <div className="typing-dot animation-delay-200"></div>
      <div className="typing-dot animation-delay-400"></div>
    </div>
  )
}

export default TypingDots
