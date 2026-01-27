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
import { SlideInFromBottom } from "@/components/SlideInFromBottom"
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
    <div className="space-y-[10px] sm:space-y-[12px]">
      <SlideInFromBottom delay={0.10} duration={0.45}>
        <div className="space-y-[6px] sm:space-y-[8px]">
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#020817] tracking-tight">
            Set up your artisan profile
          </h1>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#6B6878] mb-[24px] sm:mb-[32px] md:mb-[5vh]">
            Tell us about your craft. This helps us review and curate your profile.
          </p>
        </div>
      </SlideInFromBottom>

      <form onSubmit={handleSubmit} className="space-y-[14px] sm:space-y-[16px]">
        <SlideInFromBottom delay={0.16} duration={0.45}>
          <div className="space-y-[6px] sm:space-y-[8px]">
            <Label htmlFor="fullName" className="text-[#020817] text-[13px] sm:text-[14px] font-[400]">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="h-[48px] sm:h-[52px] md:h-[5.5vh] w-full box-border px-[14px] sm:px-[16px] md:px-[1vw] text-[14px] sm:text-[15px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#605DEC]"
            />
          </div>
        </SlideInFromBottom>

        <SlideInFromBottom delay={0.22} duration={0.45}>
          <div className="space-y-[6px] sm:space-y-[8px]">
            <Label htmlFor="email" className="text-[#020817] text-[13px] sm:text-[14px] font-[400]">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-[48px] sm:h-[52px] md:h-[5.5vh] w-full box-border px-[14px] sm:px-[16px] md:px-[1vw] text-[14px] sm:text-[15px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#605DEC]"
            />
          </div>
        </SlideInFromBottom>

        <SlideInFromBottom delay={0.28} duration={0.45}>
          <div className="space-y-[6px] sm:space-y-[8px]">
            <Label className="text-[#020817] text-[13px] sm:text-[14px] font-[400]">Craft / Skill Category</Label>
            <Select
              value={formData.skillCategory}
              onValueChange={(value) => setFormData({ ...formData, skillCategory: value })}
            >
              <SelectTrigger className="h-[48px] sm:h-[52px] md:h-[5.5vh] w-full box-border px-[14px] sm:px-[16px] md:px-[1vw] text-[14px] sm:text-[15px] focus:ring-0 focus:ring-offset-0 focus:border-[#605DEC]">
                <SelectValue placeholder="Choose a skill/category" />
              </SelectTrigger>
              <SelectContent className="rounded-[8px] sm:rounded-[10px] border border-[#E5E7EB] bg-[white] shadow-lg max-h-[240px] sm:max-h-[280px] md:max-h-[300px] overflow-y-auto">
                {skillCategories.map((category) => (
                  <SelectItem 
                    key={category} 
                    value={category}
                    className="cursor-pointer hover:bg-[#605DEC90] focus:bg-[#F3F4F6] px-[8px] sm:px-[10px] py-[6px] sm:py-[7px] text-[14px] sm:text-[15px]"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </SlideInFromBottom>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] sm:gap-[16px]">
          <SlideInFromBottom delay={0.34} duration={0.45}>
            <div className="space-y-[6px] sm:space-y-[8px]">
              <Label className="text-[#020817] text-[13px] sm:text-[14px] font-[400]">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData({ ...formData, state: value })}
              >
                <SelectTrigger className="h-[48px] sm:h-[52px] md:h-[5.5vh] w-full box-border px-[14px] sm:px-[16px] md:px-[1vw] text-[14px] sm:text-[15px] focus:ring-0 focus:ring-offset-0 focus:border-[#605DEC]">
                  <SelectValue placeholder="Choose State" />
                </SelectTrigger>
                <SelectContent className="rounded-[8px] sm:rounded-[10px] border border-[#E5E7EB] bg-[white] shadow-lg max-h-[240px] sm:max-h-[280px] md:max-h-[300px] overflow-y-auto">
                  {nigerianStates.map((state) => (
                    <SelectItem 
                      key={state} 
                      value={state}
                      className="cursor-pointer hover:bg-[#605DEC90] focus:bg-[#F3F4F6] px-[8px] sm:px-[10px] py-[6px] sm:py-[7px] text-[14px] sm:text-[15px]"
                    >
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </SlideInFromBottom>

          <SlideInFromBottom delay={0.40} duration={0.45}>
            <div className="space-y-[6px] sm:space-y-[8px]">
              <Label htmlFor="city" className="text-[#020817] text-[13px] sm:text-[14px] font-[400]">City</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="h-[48px] sm:h-[52px] md:h-[5.5vh] w-full box-border px-[14px] sm:px-[16px] md:px-[1vw] text-[14px] sm:text-[15px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#605DEC]"
              />
            </div>
          </SlideInFromBottom>
        </div>

        <SlideInFromBottom delay={0.46} duration={0.45}>
          <div className="space-y-[6px] sm:space-y-[8px]">
            <Label className="text-[#020817] text-[13px] sm:text-[14px] font-[400]">Years of Experience</Label>
            <Select
              value={formData.yearsOfExperience}
              onValueChange={(value) => setFormData({ ...formData, yearsOfExperience: value })}
            >
              <SelectTrigger className="h-[48px] sm:h-[52px] md:h-[5.5vh] w-full box-border px-[14px] sm:px-[16px] md:px-[1vw] text-[14px] sm:text-[15px] focus:ring-0 focus:ring-offset-0 focus:border-[#605DEC]">
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent className="rounded-[8px] sm:rounded-[10px] border border-[#E5E7EB] bg-[white] shadow-lg max-h-[240px] sm:max-h-[280px] md:max-h-[300px] overflow-y-auto">
                {experienceOptions.map((option) => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className="cursor-pointer hover:bg-[#605DEC90] focus:bg-[#F3F4F6] px-[8px] sm:px-[10px] py-[6px] sm:py-[7px] text-[14px] sm:text-[15px]"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </SlideInFromBottom>

        <SlideInFromBottom delay={0.56} duration={0.35}>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full sm:w-auto px-[32px] sm:px-[40px] md:px-[48px] py-[12px] sm:py-[13px] mt-[24px] sm:mt-[32px] md:mt-[4vh] rounded-[8px] sm:rounded-[10px] font-medium text-[white] font-[500] text-[15px] sm:text-[16px] transition-all duration-[200ms] cursor-pointer bg-[#605DEC] border-none ${
              isFormValid
                ? "hover:bg-[#5558e3]"
                : "hover:cursor-not-allowed opacity-[0.6]"
            }`}
          >
            Next
          </button>
        </SlideInFromBottom>
      </form>
    </div>
  )
}