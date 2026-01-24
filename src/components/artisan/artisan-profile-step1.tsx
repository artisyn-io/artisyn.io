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
import type { ArtisanFormData } from "@/app/(onboarding)/artisan/profile-setup/page"

interface ArtisanProfileStep1Props {
  data: ArtisanFormData
  onNext: (data: Partial<ArtisanFormData>) => void
}

const skillCategories = [
  "Carpentry",
  "Plumbing",
  "Electrical",
  "Painting",
  "Welding",
  "Masonry",
  "Tailoring",
  "Photography",
  "Graphic Design",
  "Other",
]

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

const experienceOptions = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
]

export function ArtisanProfileStep1({ data, onNext }: ArtisanProfileStep1Props) {
  const [formData, setFormData] = useState({
    fullName: data.fullName,
    email: data.email,
    skillCategory: data.skillCategory,
    state: data.state,
    city: data.city,
    yearsOfExperience: data.yearsOfExperience,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.skillCategory &&
    formData.state &&
    formData.city &&
    formData.yearsOfExperience

  return (
    <div className="space-y-[10px]">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-1.5 rounded-full bg-[#6366f1]" />
        <div className="w-8 h-1.5 rounded-full bg-[#e5e7eb]" />
      </div>

      <div className="space-y-[6px]">
        <h1 className="text-3xl font-bold text-[#020817] tracking-tight">
          Set up your artisan profile
        </h1>
        <p className="text-[#6B6878] mb-[5vh]">
          Tell us about your craft. This helps us review and curate your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-[15px]">
        <div className="space-y-[6px]">
          <Label htmlFor="fullName" className="text-[#020817] text-[14px] font-[400]">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="h-[5.5vh] w-full box-border px-[1vw]"
          />
        </div>

        <div className="space-y-[6px]">
          <Label htmlFor="email" className="text-[#020817] text-[14px] font-[400]">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-[5.5vh] w-full box-border px-[1vw]"
          />
        </div>

        <div className="space-y-[6px]">
          <Label className="text-[#020817] text-[14px] font-[400]">Craft / Skill Category</Label>
          <Select
            value={formData.skillCategory}
            onValueChange={(value) => setFormData({ ...formData, skillCategory: value })}
          >
            <SelectTrigger className="h-[5.5vh] w-full box-border px-[1vw]">
              <SelectValue placeholder="Choose a skill/category" />
            </SelectTrigger>
            <SelectContent>
              {skillCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-[16px]">
          <div className="space-y-[6px]">
            <Label className="text-[#020817] text-[14px] font-[400]">State</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => setFormData({ ...formData, state: value })}
            >
              <SelectTrigger className="h-[5.5vh] w-full box-border px-[1vw]">
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

          <div className="space-y-[6px]">
            <Label htmlFor="city" className="text-[#020817] text-[14px] font-[400]">City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="h-[5.5vh] w-full box-border px-[1vw]"
            />
          </div>
        </div>

        <div className="space-y-[6px]">
          <Label className="text-[#020817] text-[14px] font-[400]">Years of Experience</Label>
          <Select
            value={formData.yearsOfExperience}
            onValueChange={(value) => setFormData({ ...formData, yearsOfExperience: value })}
          >
            <SelectTrigger className="h-[5.5vh] w-full box-border px-[1vw]">
              <SelectValue placeholder="Choose an option" />
            </SelectTrigger>
            <SelectContent>
              {experienceOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`px-[2vw] py-[10px] mt-[4vh] rounded-lg font-medium text-[white] font-[500] text-[16px] transition-all duration-200 cursor-pointer bg-[#605DEC] border-none ${
            isFormValid
              ? "hover:bg-[#5558e3]"
              : "cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </form>
    </div>
  )
}
