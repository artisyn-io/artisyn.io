"use client"

import React, { useState, useRef } from "react"
import { Camera } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { ArtisanFormData } from "@/app/(onboarding)/artisan/profile-setup/page"
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
    <div className="space-y-6">
      <SlideInFromBottom delay={0.15} duration={0.45}>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#020817] tracking-tight">
            Set up your artisan profile
          </h1>
          <p className="text-[#6B6878] mb-[5vh]">
            Tell us about your craft. This helps us review and curate your profile.
          </p>
        </div>
      </SlideInFromBottom>

      <form onSubmit={handleSubmit} className="space-y-6">
        <SlideInFromBottom delay={0.21} duration={0.45}>
          <div className="space-y-3">
            <Label className="text-[#020817] text-[14px] font-[400] mb-[1vh]">
              Upload profile image <span className="text-red-500">*</span>
            </Label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`w-[80px] h-[80px] border border-dashed rounded-lg flex items-center justify-center transition-colors overflow-hidden mb-[3vh] bg-transparent cursor-pointer ${
                profileImage || !imageTouched
                  ? "border-[#BDBCDB] hover:border-[#6366f1]"
                  : "border-red-500"
              }`}
            >
              {previewUrl ? (
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-[26px] h-[21px] text-[#212121]" />
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
              <div className="text-red-500 text-[13px] mt-[-7px] ml-[2px]">
                Please upload a profile image.
              </div>
            )}
          </div>
        </SlideInFromBottom>

        <SlideInFromBottom delay={0.32} duration={0.45}>
          <div className="space-y-3">
            <Label htmlFor="bio" className="text-[#020817] text-[14px] font-[400] mb-[1vh]">Brief About Your Work</Label>
            <textarea
              id="bio"
              placeholder="Describe your skills, experience, and the type of work you do."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full min-h-[180px] resize-none p-[20px] box-border border border-gray-300 rounded-md hover:border-[#6366f1] focus:ring-0 focus:ring-offset-0 focus:border-[#605DEC] focus:outline-none"
              rows={8}
            />
          </div>
        </SlideInFromBottom>

        <SlideInFromBottom delay={0.42} duration={0.35}>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-[2vw] py-[10px] mt-[4vh] rounded-lg font-medium text-[white] font-[500] text-[16px] transition-all duration-200 cursor-pointer bg-[#605DEC] border-none ${
              isFormValid
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
