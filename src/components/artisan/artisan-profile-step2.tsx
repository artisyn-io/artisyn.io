"use client"

import React, { useState, useRef } from "react"
import { Camera } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { ArtisanFormData } from "@/app/(auth)/profile-setup/page"
import { SlideInFromBottom } from "@/components/SlideInFromBottom"

interface ArtisanProfileStep2Props {
  data: ArtisanFormData
  onComplete: (data: Partial<ArtisanFormData>) => void
}

export function ArtisanProfileStep2({ data, onComplete }: ArtisanProfileStep2Props) {
  const [profileImage, setProfileImage] = useState<File | null>(data.profileImage)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [bio, setBio] = useState(data.bio)
  const [imageTouched, setImageTouched] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageTouched(true)
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setProfileImage(null)
      setPreviewUrl(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setImageTouched(true)
    // require image in addition to bio
    if (!profileImage) {
      return
    }
    onComplete({ profileImage, bio })
  }

  const isFormValid = bio.trim().length > 0 && !!profileImage

  return (
    <div className="space-y-[20px] sm:space-y-[24px]">
      <SlideInFromBottom delay={0.15} duration={0.45}>
        <div className="space-y-[6px] sm:space-y-[8px]">
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#020817] tracking-tight">
            Set up your artisan profile
          </h1>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#6B6878] mb-[24px] sm:mb-[32px] md:mb-[5vh]">
            Tell us about your craft. This helps us review and curate your profile.
          </p>
        </div>
      </SlideInFromBottom>

      <form onSubmit={handleSubmit} className="space-y-[20px] sm:space-y-[24px]">
        <SlideInFromBottom delay={0.21} duration={0.45}>
          <div className="space-y-[10px] sm:space-y-[12px]">
            <Label className="text-[#020817] text-[13px] sm:text-[14px] font-[400] mb-[8px] sm:mb-[1vh]">
              Upload profile image <span className="text-[#EF4444]">*</span>
            </Label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] border-[2px] border-dashed rounded-[8px] sm:rounded-[10px] flex items-center justify-center transition-colors overflow-hidden mb-[20px] sm:mb-[24px] md:mb-[3vh] bg-[transparent] cursor-pointer ${
                profileImage || !imageTouched
                  ? "border-[#BDBCDB] hover:border-[#6366f1]"
                  : "border-[#EF4444]"
              }`}
            >
              {previewUrl ? (
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-[24px] h-[20px] sm:w-[26px] sm:h-[21px] text-[#212121]" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
            />
            {!profileImage && imageTouched && (
              <div className="text-[#EF4444] text-[12px] sm:text-[13px] mt-[-6px] sm:mt-[-7px] ml-[2px]">
                Please upload a profile image.
              </div>
            )}
          </div>
        </SlideInFromBottom>

        <SlideInFromBottom delay={0.32} duration={0.45}>
          <div className="space-y-[10px] sm:space-y-[12px]">
            <Label htmlFor="bio" className="text-[#020817] text-[13px] sm:text-[14px] font-[400] mb-[8px] sm:mb-[1vh]">Brief About Your Work</Label>
            <textarea
              id="bio"
              placeholder="Describe your skills, experience, and the type of work you do."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full min-h-[160px] sm:min-h-[180px] resize-none p-[16px] sm:p-[18px] md:p-[20px] box-border border border-[#D1D5DB] rounded-[8px] sm:rounded-[10px] hover:border-[#6366f1] focus:ring-0 focus:ring-offset-0 focus:border-[#605DEC] focus:outline-none text-[14px] sm:text-[15px]"
              rows={8}
            />
          </div>
        </SlideInFromBottom>

        <SlideInFromBottom delay={0.42} duration={0.35}>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full sm:w-auto px-[32px] sm:px-[40px] md:px-[48px] py-[12px] sm:py-[13px] mt-[24px] sm:mt-[32px] md:mt-[4vh] rounded-[8px] sm:rounded-[10px] font-medium text-[white] font-[500] text-[15px] sm:text-[16px] transition-all duration-[200ms] cursor-pointer bg-[#605DEC] border-none ${
              isFormValid
                ? "hover:bg-[#5558e3]"
                : "hover:cursor-not-allowed opacity-[0.6]"
            }`}
          >
            Complete Setup
          </button>
        </SlideInFromBottom>
      </form>
    </div>
  )
}