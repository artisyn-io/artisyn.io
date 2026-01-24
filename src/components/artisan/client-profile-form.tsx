"use client"

import React from "react"

import { useState } from "react"
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
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-[#1e3a5f] tracking-tight">
          Complete your account
        </h1>
        <p className="text-[#6b7280]">
          This helps us personalize your experience and connect you with the right artisans.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-[#1e3a5f]">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#1e3a5f]">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#1e3a5f]">State</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => setFormData({ ...formData, state: value })}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Choose State" />
              </SelectTrigger>
              <SelectContent>
                {nigerianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-[#1e3a5f]">City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[#1e3a5f]">How did you hear about us?</Label>
          <Select
            value={formData.referralSource}
            onValueChange={(value) => setFormData({ ...formData, referralSource: value })}
          >
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Choose option" />
            </SelectTrigger>
            <SelectContent>
              {referralSources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
            isFormValid
              ? "bg-[#6366f1] hover:bg-[#5558e3]"
              : "bg-[#d1d5db] cursor-not-allowed"
          }`}
        >
          Complete Setup
        </button>
      </form>
    </div>
  )
}
