"use client"
import { AccountTypeSelection } from "@/components/artisan/account-type-selection";
import { useState } from "react";
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion";
import { ArtisanProfileStep1 } from "@/components/artisan/artisan-profile-step1";


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

      const getBackgroundImage = () => {
        if (currentStep === "client-form") {
          return "/images/artisan_woman.png"
        }
        return "/images/artisan_woodworker.png"
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
  return (
    <div className="flex justify-between items-start">
        <div className="form_div flex flex-col justify-top items-start w-[30vw] mx-auto py-[10vh]">
            <div className="mb-[5vh]">
                <img src="/images/artisan_logo.png" alt="" />
            </div>
            <div>
            {currentStep === "account-type" && (<AnimatePresence mode="wait">
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
                </AnimatePresence>)
            }

{currentStep === "artisan-step1" && (
              <motion.div
                key="artisan-step1"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
              >
                <ArtisanProfileStep1
                  data={artisanData}
                  onNext={handleArtisanStep1Next}
                />
             </motion.div>
            )}
            </div>
        </div>
        <div className="img_div" style={{ width: "42vw", height: "100vh", position: "relative" }}>
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
            style={{ objectFit: "cover" }}
            sizes="(min-width: 1024px) 30vw, 50vw"
            priority
          />
          </motion.div>
        </div>
    </div>
  )
}
