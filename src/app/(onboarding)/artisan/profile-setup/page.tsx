"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AccountTypeSelection } from "@/components/artisan/account-type-selection"
import { ArtisanProfileStep1 } from "@/components/artisan/artisan-profile-step1"
import { ArtisanProfileStep2 } from "@/components/artisan/artisan-profile-step2"
import { ClientProfileForm } from "@/components/artisan/client-profile-form"
import { OnboardingSuccess } from "@/components/artisan/onboarding-success"
import { Logo } from "@/components/artisan/logo"
import Image from "next/image"
import { RightPanelImage } from "@/components/artisan/right-panel-image"

export type AccountType = "artisan" | "client" | null
export type OnboardingStep = "account-type" | "artisan-step1" | "artisan-step2" | "client-form" | "success"

export interface ArtisanFormData {
  fullName: string
  email: string
  skillCategory: string
  state: string
  city: string
  yearsOfExperience: string
  profileImage: File | null
  bio: string
}

export interface ClientFormData {
  fullName: string
  email: string
  state: string
  city: string
  referralSource: string
}

export default function OnboardingPage() {
  const [accountType, setAccountType] = useState<AccountType>(null)
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("account-type")
  const [artisanData, setArtisanData] = useState<ArtisanFormData>({
    fullName: "",
    email: "",
    skillCategory: "",
    state: "",
    city: "",
    yearsOfExperience: "",
    profileImage: null,
    bio: "",
  })
  const [clientData, setClientData] = useState<ClientFormData>({
    fullName: "",
    email: "",
    state: "",
    city: "",
    referralSource: "",
  })

  const handleAccountTypeSelect = (type: AccountType) => {
    setAccountType(type)
  }

  const handleAccountTypeContinue = () => {
    if (accountType === "artisan") {
      setCurrentStep("artisan-step1")
    } else if (accountType === "client") {
      setCurrentStep("client-form")
    }
  }

  const handleArtisanStep1Next = (data: Partial<ArtisanFormData>) => {
    setArtisanData((prev) => ({ ...prev, ...data }))
    setCurrentStep("artisan-step2")
  }

  const handleArtisanStep2Complete = (data: Partial<ArtisanFormData>) => {
    setArtisanData((prev) => ({ ...prev, ...data }))
    setCurrentStep("success")
  }

  const handleClientComplete = (data: ClientFormData) => {
    setClientData(data)
    setCurrentStep("success")
  }

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  }

  return (
    <div className="min-h-screen w-[100vw] flex-col justify-between bg-[red]">
      {/* Left side - Form content */}
      <div className="flex flex-col p-8 md:p-12">
        <Logo />

        {/* Form content */}
        <div className="flex-1 flex items-start pt-8">
          {/* <AnimatePresence mode="wait"> */}
            {currentStep === "account-type" && (
              <motion.div
                key="account-type"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
              >
                <AccountTypeSelection
                  selectedType={accountType}
                  onSelect={handleAccountTypeSelect}
                  onContinue={handleAccountTypeContinue}
                />
            </motion.div>
            )}

            {currentStep === "artisan-step1" && (
            //   <motion.div
            //     key="artisan-step1"
            //     variants={pageVariants}
            //     initial="initial"
            //     animate="animate"
            //     exit="exit"
            //     transition={{ duration: 0.3 }}
            //     className="w-full max-w-md"
            //   >
                <ArtisanProfileStep1
                  data={artisanData}
                  onNext={handleArtisanStep1Next}
                />
            //   </motion.div>
            )}

            {currentStep === "artisan-step2" && (
            //   <motion.div
            //     key="artisan-step2"
            //     variants={pageVariants}
            //     initial="initial"
            //     animate="animate"
            //     exit="exit"
            //     transition={{ duration: 0.3 }}
            //     className="w-full max-w-md"
            //   >
                <ArtisanProfileStep2
                  data={artisanData}
                  onComplete={handleArtisanStep2Complete}
                />
            //   </motion.div>
            )}

            {currentStep === "client-form" && (
            //   <motion.div
            //     key="client-form"
            //     variants={pageVariants}
            //     initial="initial"
            //     animate="animate"
            //     exit="exit"
            //     transition={{ duration: 0.3 }}
            //     className="w-full max-w-md"
            //   >
                <ClientProfileForm
                  data={clientData}
                  onComplete={handleClientComplete}
                />
            //   </motion.div>
            )}

            {currentStep === "success" && (
            //   <motion.div
            //     key="success"
            //     variants={pageVariants}
            //     initial="initial"
            //     animate="animate"
            //     exit="exit"
            //     transition={{ duration: 0.3 }}
            //     className="w-full max-w-md"
            //   >
                <OnboardingSuccess accountType={accountType} />
            //   </motion.div>
            )}
          {/* </AnimatePresence> */}
        </div>
        <div>
        <Image
            src="/images/artisan_woman.png"
            alt="Artisan at work"
            fill
            className=""
          />
      </div>
      </div>

      {/* Right side - Image */}
      {/* <RightPanelImage currentStep={currentStep} /> */}
      
    </div>
  )
}
