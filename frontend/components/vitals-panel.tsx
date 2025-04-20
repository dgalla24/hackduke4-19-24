"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, ChevronLeft, Activity, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export interface VitalsData {
  hr: string
  systolic: string
  diastolic: string
  rr: string
  spo2: string
  age: string
  gender: string
  allergies: string
}

interface VitalsPanelProps {
  onVitalsChange: (vitals: VitalsData) => void
  onApplyVitals: () => void
}

export function VitalsPanel({ onVitalsChange, onApplyVitals }: VitalsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [vitals, setVitals] = useState<VitalsData>({
    hr: "",
    systolic: "",
    diastolic: "",
    rr: "",
    spo2: "",
    age: "",
    gender: "",
    allergies: "",
  })
  const isMobile = useMobile()

  const handleInputChange = (field: keyof VitalsData, value: string) => {
    const updatedVitals = { ...vitals, [field]: value }
    setVitals(updatedVitals)
    onVitalsChange(updatedVitals)
  }

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  const handleApply = () => {
    onApplyVitals()
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    const emptyVitals = {
      hr: "",
      systolic: "",
      diastolic: "",
      rr: "",
      spo2: "",
      age: "",
      gender: "",
      allergies: "",
    }
    setVitals(emptyVitals)
    onVitalsChange(emptyVitals)
  }

  return (
    <div
      className={cn(
        "fixed top-20 md:top-24 bottom-0 bg-white shadow-xl transition-all duration-300 z-20 flex",
        isOpen ? "right-0" : isMobile ? "-right-full" : "-right-[320px]",
      )}
    >
      {/* Toggle button */}
      <button
        onClick={togglePanel}
        className="absolute left-0 top-4 -translate-x-full bg-rose-300 hover:bg-rose-400 text-white p-2 rounded-l-lg shadow-md flex items-center justify-center"
        aria-label={isOpen ? "Close vitals panel" : "Open vitals panel"}
      >
        {isOpen ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            <span className="text-sm font-medium">Vitals</span>
            <ChevronLeft className="h-5 w-5" />
          </div>
        )}
      </button>

      {/* Panel content */}
      <div className="w-full sm:w-[320px] h-full overflow-y-auto p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-1.5 bg-rose-300 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-800">Patient Vitals</h2>
        </div>

        <div className="space-y-5 flex-1">
          {/* Vital signs section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-rose-400" />
              <h3 className="text-lg font-semibold text-gray-700">Vital Signs</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="hr" className="text-sm text-gray-600">
                  Heart Rate
                </Label>
                <div className="relative">
                  <Input
                    id="hr"
                    type="number"
                    placeholder="70"
                    value={vitals.hr}
                    onChange={(e) => handleInputChange("hr", e.target.value)}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">bpm</span>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="spo2" className="text-sm text-gray-600">
                  SpO2
                </Label>
                <div className="relative">
                  <Input
                    id="spo2"
                    type="number"
                    placeholder="98"
                    value={vitals.spo2}
                    onChange={(e) => handleInputChange("spo2", e.target.value)}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="bp" className="text-sm text-gray-600">
                  Blood Pressure
                </Label>
                <div className="flex items-center gap-1">
                  <Input
                    id="systolic"
                    type="number"
                    placeholder="120"
                    value={vitals.systolic}
                    onChange={(e) => handleInputChange("systolic", e.target.value)}
                    className="w-1/2"
                  />
                  <span className="text-gray-500">/</span>
                  <Input
                    id="diastolic"
                    type="number"
                    placeholder="80"
                    value={vitals.diastolic}
                    onChange={(e) => handleInputChange("diastolic", e.target.value)}
                    className="w-1/2"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="rr" className="text-sm text-gray-600">
                  Resp. Rate
                </Label>
                <div className="relative">
                  <Input
                    id="rr"
                    type="number"
                    placeholder="16"
                    value={vitals.rr}
                    onChange={(e) => handleInputChange("rr", e.target.value)}
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">/min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient info section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-slate-500" />
              <h3 className="text-lg font-semibold text-gray-700">Patient Info</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="age" className="text-sm text-gray-600">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="52"
                  value={vitals.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="gender" className="text-sm text-gray-600">
                  Gender
                </Label>
                <Select value={vitals.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="allergies" className="text-sm text-gray-600">
                Allergies
              </Label>
              <Input
                id="allergies"
                placeholder="None, or list allergies"
                value={vitals.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button onClick={handleApply} className="bg-rose-400 hover:bg-rose-500 text-white w-full">
            Apply to Query
          </Button>
          <Button variant="outline" onClick={handleClear} className="w-full">
            Clear All
          </Button>
        </div>
      </div>
    </div>
  )
}
