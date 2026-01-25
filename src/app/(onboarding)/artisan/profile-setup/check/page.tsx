"use client"
import { AccountTypeSelection } from "@/components/artisan/account-type-selection";
import { useEffect, useState } from "react";
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion";
import { ArtisanProfileStep1 } from "@/components/artisan/artisan-profile-step1";
import { ArtisanProfileStep2 } from "@/components/artisan/artisan-profile-step2";
import { OnboardingSuccess } from "@/components/artisan/onboarding-success";
import { ProgressIndicator } from "@/components/progress-indicator";

type AccountType = "artisan" | "client" | null
type OnboardingStep = "account-type" | "artisan-step1" | "artisan-step2" | "client-form" | "success"
interface ArtisanFormData {
  fullName: string
  email: string
  skillCategory: string
  state: string
  city: string
  yearsOfExperience: string
  profileImage: File | null
  bio: string
}

export default function page() {
  const [accountType, setAccountType] = useState<AccountType>(null)
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("account-type")
  const [isHydrated, setIsHydrated] = useState(false)
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

  // Load saved state on mount (runs once)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("artisan-onboarding-state")
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState)
          
          if (parsed.currentStep !== "success") {
            setCurrentStep(parsed.currentStep || "account-type")
            setAccountType(parsed.accountType || null)
            setArtisanData({
              ...artisanData,
              ...parsed.artisanData,
              profileImage: null,
            })
          }
        } catch (error) {
          console.error("Failed to parse saved state:", error)
          localStorage.removeItem("artisan-onboarding-state")
        }
      }
      setIsHydrated(true)
    }
  }, [])

  // Save state whenever it changes
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      if (currentStep !== "account-type" && currentStep !== "success") {
        const stateToSave = {
          currentStep,
          accountType,
          artisanData: {
            ...artisanData,
            profileImage: null,
          },
        }
        localStorage.setItem("artisan-onboarding-state", JSON.stringify(stateToSave))
      }
    }
  }, [currentStep, accountType, artisanData, isHydrated])
  
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

  // Handle back navigation
  const handleBack = () => {
    switch (currentStep) {
      case "artisan-step1":
        setCurrentStep("account-type")
        break
      case "artisan-step2":
        setCurrentStep("artisan-step1")
        break
      case "client-form":
        setCurrentStep("account-type")
        break
      default:
        break
    }
  }

  // Check if back button should be shown
  const showBackButton = () => {
    return currentStep !== "account-type" && currentStep !== "success"
  }

  const getBackgroundImage = () => {
    if (currentStep === "artisan-step2" || currentStep === "success") {
      return "/images/artisan_woman.png"
    }
    return "/images/artisan_woodworker.png"
  }

  // Get current progress for indicator
  const getProgressStep = () => {
    if (accountType === "artisan") {
      switch (currentStep) {
        case "artisan-step1":
          return 1
        case "artisan-step2":
          return 2
        default:
          return 0
      }
    }
    return 0
  }

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  }
  
  const handleArtisanStep1Next = (data: Partial<ArtisanFormData>) => {
    setArtisanData((prev) => ({ ...prev, ...data }))
    setCurrentStep("artisan-step2")
  }
  
  const handleArtisanStep2Complete = (data: Partial<ArtisanFormData>) => {
    setArtisanData((prev) => ({ ...prev, ...data }))
    setCurrentStep("success")
    if (typeof window !== "undefined") {
      localStorage.removeItem("artisan-onboarding-state")
    }
  }

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="text-[#6366F1]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex justify-between items-start overflow-hidden max-h-[100vh]">
      {/* Make form container a fixed width to prevent width changing across steps */}
      <div className="form_div flex flex-col justify-top items-start mx-auto px-[2vw] py-[7vh] overflow-hidden h-[100vh] max-h-[100vh]" style={{ width: 520, minWidth: 360, maxWidth: 520 }}>
        <div className="mb-[4vh]">
          <img src="/images/artisan_logo.png" alt="" />
        </div>

        {(accountType === "artisan" && (currentStep === "artisan-step1" || currentStep === "artisan-step2")) && (
          <div className="w-full flex items-center justify-between px-[1vw] mb-[28px]" style={{ maxWidth: 520 }}>
            <div className="flex-1">
              <ProgressIndicator currentStep={getProgressStep()} totalSteps={2} />
            </div>
            {showBackButton() && (
              <button
                onClick={handleBack}
                className="
                  flex items-center gap-[8px] 
                 hover:bg-[#ededfb] 
                  border-none bg-transparent 
                  text-[#6366F1] hover:text-[#4338ca] 
                  px-[18px] py-[7px] rounded-[8px]
                  font-medium
                  transition-all duration-200
                  group cursor-pointer
                "
              >
                <svg
                  className="w-[18px] h-[18px] mr-[2px] text-[#6366F1] group-hover:text-[#4338ca] transition-colors duration-150"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="text-[14px] font-medium">Back</span>
              </button>
            )}
          </div>
        )}

        {/* Make forms all same width: w-full, max-w-[520px], don't use max-w-md which is 28rem/448px */}
        <div className="w-full" style={{ maxWidth: 520, minWidth: 360 }}>
          <AnimatePresence mode="wait">
            {currentStep === "account-type" && (
              <motion.div
                key="account-type"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
                style={{ maxWidth: 520, minWidth: 360 }}
              >
                <AccountTypeSelection
                  selectedType={accountType}
                  onSelect={handleAccountTypeSelect}
                  onContinue={handleAccountTypeContinue}
                />
              </motion.div>
            )}

            {currentStep === "artisan-step1" && (
              <motion.div
                key="artisan-step1"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
                style={{ maxWidth: 520, minWidth: 360 }}
              >
                <ArtisanProfileStep1
                  data={artisanData}
                  onNext={handleArtisanStep1Next}
                />
              </motion.div>
            )}

            {currentStep === "artisan-step2" && (
              <motion.div
                key="artisan-step2"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
                style={{ maxWidth: 520, minWidth: 360 }}
              >
                <ArtisanProfileStep2
                  data={artisanData}
                  onComplete={handleArtisanStep2Complete}
                />
              </motion.div>
            )}

            {currentStep === "success" && (
              <motion.div
                key="success"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
                style={{ maxWidth: 520, minWidth: 360 }}
              >
                <OnboardingSuccess accountType={accountType} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div
        className="img_div shadow-lg"
        style={{
          width: "42vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px 0 rgba(99,102,241,0.07), 0 2px 8px 0 rgba(99,102,241,0.05)",
        }}
      >
        <motion.div
          key={getBackgroundImage()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={getBackgroundImage()}
            alt="Artisan at work"
            fill
            style={{
              objectFit: "cover",
              filter: "brightness(0.99) saturate(1.13) contrast(1.02)",
            }}
            sizes="(min-width: 1024px) 30vw, 50vw"
            priority
          />
          {/* Overlay gradient for style */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, rgba(99,102,241,0.13) 0%, rgba(255,255,255,0.07) 90%)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}