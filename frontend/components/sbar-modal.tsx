"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface SBARModalProps {
  isOpen: boolean
  onClose: () => void
  sbarData: {
    situation: string
    background: string
    assessment: string
    recommendation: string
  }
}

export function SBARModal({ isOpen, onClose, sbarData }: SBARModalProps) {
  const { toast } = useToast()
  const isMobile = useMobile()

  const handleCopy = () => {
    const sbarText = `SITUATION:
${sbarData.situation}

BACKGROUND:
${sbarData.background}

ASSESSMENT:
${sbarData.assessment}

RECOMMENDATION:
${sbarData.recommendation}`

    navigator.clipboard.writeText(sbarText)
    toast({
      title: "Copied!",
      description: "SBAR summary copied to clipboard",
      duration: 2000,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
            <div className="h-6 w-1.5 bg-rose-300 rounded-full"></div>
            SBAR Case Summary
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm md:text-base">
            Structured communication format for healthcare professionals
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="space-y-1.5">
            <h3 className="text-base md:text-lg font-semibold text-rose-500">Situation</h3>
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-100 text-gray-800 text-sm md:text-base">
              {sbarData.situation}
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base md:text-lg font-semibold text-slate-500">Background</h3>
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-100 text-gray-800 text-sm md:text-base">
              {sbarData.background}
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base md:text-lg font-semibold text-slate-600">Assessment</h3>
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-100 text-gray-800 text-sm md:text-base">
              {sbarData.assessment}
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base md:text-lg font-semibold text-rose-600">Recommendation</h3>
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-100 text-gray-800 text-sm md:text-base">
              {sbarData.recommendation}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
          <Button
            onClick={handleCopy}
            className="bg-slate-500 hover:bg-slate-600 flex items-center gap-2 w-full sm:w-auto"
          >
            <Copy className="h-4 w-4" />
            Copy SBAR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
