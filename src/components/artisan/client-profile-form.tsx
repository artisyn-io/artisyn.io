"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ClientFormData } from "@/app/(onboarding)/artisan/profile-setup/page"
import { SlideInFromBottom } from "../SlideInFromBottom"

interface ClientProfileFormProps {
  data: ClientFormData
  onComplete: (data: ClientFormData) => void
}

const nigerianStates = [
  "Lagos",
  "Abuja",
  "Rivers",
  "Kano",
  "Oyo",
  "Kaduna",
  "Enugu",
  "Delta",
  "Anambra",
  "Ogun",
]

const referralSources = [
  "Google Search",
  "Social Media",
  "Friend or Family",
  "Advertisement",
  "Blog or Article",
  "Other",
]

export function ClientProfileForm({ data, onComplete }: ClientProfileFormProps) {
  const [formData, setFormData] = useState<ClientFormData>({
    fullName: data.fullName,
    email: data.email,
    state: data.state,
    city: data.city,
    referralSource: data.referralSource,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.state &&
    formData.city &&
    formData.referralSource

  return (
    <div className="w-full max-w-[420px] bg-white shadow-xl rounded-[16px]">
      <SlideInFromBottom delay={0.055} duration={0.45}>
      <div className="mb-[32px]">
        <h1 className="text-3xl font-bold text-[#020817] tracking-tight">Complete your account</h1>
        <p className="text-[15px] text-[#667085]">This helps us personalize your experience and connect you with the right artisans.</p>
      </div>
      </SlideInFromBottom>
      <form onSubmit={handleSubmit} className="space-y-[24px]">
      <SlideInFromBottom delay={0.16} duration={0.45}>
          <div className="space-y-[6px]">
            <Label htmlFor="fullName" className="text-[#020817] text-[14px] font-[400]">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="h-[5.5vh] w-full box-border px-[1vw] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#605DEC]"
            />
          </div>
        </SlideInFromBottom>

        <SlideInFromBottom delay={0.22} duration={0.45}>
          <div className="space-y-[6px]">
            <Label htmlFor="email" className="text-[#020817] text-[14px] font-[400]">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-[5.5vh] w-full box-border px-[1vw] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#605DEC]"
            />
          </div>
        </SlideInFromBottom>
        <div className="w-full grid grid-cols-2 gap-[16px]">
          <SlideInFromBottom delay={0.34} duration={0.45}>
            <div className="space-y-[6px]">
              <Label className="text-[#020817] text-[14px] font-[400]">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData({ ...formData, state: value })}
              >
                <SelectTrigger className="h-[5.5vh] w-full box-border px-[1vw] focus:ring-0 focus:ring-offset-0 focus:border-[#605DEC]">
                  <SelectValue placeholder="Choose State" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-gray-200 bg-[white] shadow-lg max-h-[300px] overflow-y-auto">
                  {nigerianStates.map((state) => (
                    <SelectItem 
                      key={state} 
                      value={state}
                      className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100 px-[8px] py-[6px]"
                    >
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </SlideInFromBottom>

          <SlideInFromBottom delay={0.42} duration={0.45}>
            <div className="space-y-[6px]">
              <Label htmlFor="city" className="text-[#020817] text-[14px] font-[400]">City</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="h-[5.5vh] w-full box-border px-[1vw] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#605DEC]"
              />
            </div>
          </SlideInFromBottom>
        </div>
        <SlideInFromBottom delay={0.52} duration={0.45}>
        <div>
          <Label className="text-[#020817] text-[14px] font-[400]">
            How did you hear about us?
          </Label>
          <Select
            value={formData.referralSource}
            onValueChange={(value) => setFormData({ ...formData, referralSource: value })}
          >
            <SelectTrigger className="h-[5.5vh] w-full box-border px-[1vw] focus:ring-0 focus:ring-offset-0 focus:border-[#605DEC]">
              <SelectValue placeholder="Choose option" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-gray-200 bg-[white] shadow-lg max-h-[300px] overflow-y-auto">
              {referralSources.map((source) => (
                <SelectItem key={source} value={source} className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100 px-[8px] py-[6px]">
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        </SlideInFromBottom>
        <SlideInFromBottom delay={0.60} duration={0.45}>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-[2vw] py-[10px] mt-[4vh] rounded-lg font-medium text-[white] font-[500] text-[16px] transition-all duration-200 cursor-pointer bg-[#605DEC] border-none ${isFormValid
              ? "hover:bg-[#5558e3]"
              : "hover:cursor-not-allowed"
            }`}
        >
          Complete Setup
        </button>
        </SlideInFromBottom>
      </form>
    </div>
  )
}
