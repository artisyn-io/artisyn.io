"use client"

import React from "react"

import { useState, useRef } from "react"
import { Camera } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ArtisanFormData } from "@/app/(onboarding)/artisan/profile-setup/page"

interface ArtisanProfileStep2Props {
  data: ArtisanFormData
  onComplete: (data: Partial<ArtisanFormData>) => void
}

export function ArtisanProfileStep2({ data, onComplete }: ArtisanProfileStep2Props) {
  const [profileImage, setProfileImage] = useState<File | null>(data.profileImage)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [bio, setBio] = useState(data.bio)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete({ profileImage, bio })
  }

  const isFormValid = bio.trim().length > 0

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-1.5 rounded-full bg-[#6366f1]/40" />
        <div className="w-8 h-1.5 rounded-full bg-[#6366f1]" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-[#1e3a5f] tracking-tight">
          Set up your artisan profile
        </h1>
        <p className="text-[#6b7280]">
          Tell us about your craft. This helps us review and curate your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label className="text-[#1e3a5f]">Upload profile image</Label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 border-2 border-dashed border-[#d1d5db] rounded-lg flex items-center justify-center hover:border-[#6366f1] transition-colors overflow-hidden"
          >
            {previewUrl ? (
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-6 h-6 text-[#9ca3af]" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="bio" className="text-[#1e3a5f]">Brief About Your Work</Label>
          <Textarea
            id="bio"
            placeholder="Describe your skills, experience, and the type of work you do."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-[180px] resize-none"
          />
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
