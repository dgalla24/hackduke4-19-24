import React from "react"

interface HighlightedTextProps {
  text: string
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text }) => {
  if (!text) return null

  // Define urgency keywords and their corresponding styles
  const urgencyPatterns = [
    {
      // Critical urgency - red
      pattern: /\b(critical|immediate|emergency|urgent|severe|life-threatening)\b/gi,
      className:
        "inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800 mx-0.5",
    },
    {
      // High urgency - amber/yellow
      pattern: /\b(monitor|check|assess|potential|caution|warning|careful|risk|danger)\b/gi,
      className:
        "inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-800 mx-0.5",
    },
    {
      // Important actions - blue
      pattern: /\b(consider|provide|administer|position|prepare|continue|ensure)\b/gi,
      className:
        "inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 mx-0.5",
    },
  ]

  // Process the text to highlight urgency keywords
  let processedText = text
  let segments: React.ReactNode[] = []
  let lastIndex = 0

  // Function to process a single urgency pattern
  const processPattern = (pattern: RegExp, className: string) => {
    const matches = [...processedText.matchAll(new RegExp(pattern, "gi"))]

    if (matches.length === 0) return

    const newSegments: React.ReactNode[] = []
    let currentIndex = 0

    matches.forEach((match) => {
      if (match.index === undefined) return

      // Add text before the match
      if (match.index > currentIndex) {
        newSegments.push(processedText.substring(currentIndex, match.index))
      }

      // Add the highlighted match
      newSegments.push(
        <span key={`highlight-${match.index}`} className={className}>
          {match[0]}
        </span>,
      )

      currentIndex = match.index + match[0].length
    })

    // Add any remaining text
    if (currentIndex < processedText.length) {
      newSegments.push(processedText.substring(currentIndex))
    }

    processedText = newSegments
      .map((segment, index) =>
        typeof segment === "string"
          ? segment
          : React.cloneElement(segment as React.ReactElement, { key: `cloned-segment-${index}` }),
      )
      .join("")
  }

  // Process each line separately to preserve line breaks
  const lines = text.split("\n")

  return (
    <>
      {lines.map((line, lineIndex) => {
        // Reset for each line
        processedText = line
        segments = []
        lastIndex = 0

        // Process each pattern
        urgencyPatterns.forEach(({ pattern, className }) => {
          const matches = [...line.matchAll(new RegExp(pattern, "gi"))]

          matches.forEach((match) => {
            if (match.index === undefined) return

            // Add text before the match
            if (match.index > lastIndex) {
              segments.push(line.substring(lastIndex, match.index))
            }

            // Add the highlighted match
            segments.push(
              <span key={`highlight-${lineIndex}-${match.index}`} className={className}>
                {match[0]}
              </span>,
            )

            lastIndex = match.index + match[0].length
          })
        })

        // Add any remaining text
        if (lastIndex < line.length) {
          segments.push(line.substring(lastIndex))
        }

        // If no matches were found, just return the line
        if (segments.length === 0) {
          segments.push(line)
        }

        return (
          <React.Fragment key={`line-${lineIndex}`}>
            {segments}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default HighlightedText
