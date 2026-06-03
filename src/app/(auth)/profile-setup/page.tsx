"use client";
import { AccountTypeSelection } from "@/components/artisan/account-type-selection";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArtisanProfileStep1 } from "@/components/artisan/artisan-profile-step1";
import { ArtisanProfileStep2 } from "@/components/artisan/artisan-profile-step2";
import { OnboardingSuccess } from "@/components/artisan/onboarding-success";
import { ProgressIndicator } from "@/components/progress-indicator";

export type AccountType = "artisan" | "client" | null;
export type OnboardingStep =
  | "account-type"
  | "artisan-step1"
  | "artisan-step2"
  | "client-form"
  | "success";
export interface ArtisanFormData {
  fullName: string;
  email: string;
  skillCategory: string;
  state: string;
  city: string;
  yearsOfExperience: string;
  profileImage: File | null;
  bio: string;
}

function getInitialState() {
  const defaultState = {
    accountType: null as AccountType,
    currentStep: "account-type" as OnboardingStep,
    artisanData: {
      fullName: "",
      email: "",
      skillCategory: "",
      state: "",
      city: "",
      yearsOfExperience: "",
      profileImage: null as File | null,
      bio: "",
    },
  };

  if (typeof window !== "undefined") {
    try {
      const savedState = localStorage.getItem("artisan-onboarding-state");
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.currentStep !== "success") {
          return {
            accountType: parsed.accountType || null,
            currentStep: parsed.currentStep || "account-type",
            artisanData: {
              ...defaultState.artisanData,
              ...parsed.artisanData,
              profileImage: null,
            },
          };
        }
      }
    } catch (error) {
      console.error("Failed to parse saved state:", error);
      localStorage.removeItem("artisan-onboarding-state");
    }
  }

  return defaultState;
}

export default function Page() {
  const initialState = getInitialState();
  const [accountType, setAccountType] = useState<AccountType>(
    initialState.accountType,
  );
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(
    initialState.currentStep,
  );
  const [isHydrated] = useState(true);
  const [artisanData, setArtisanData] = useState<ArtisanFormData>(
    initialState.artisanData,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        };
        localStorage.setItem(
          "artisan-onboarding-state",
          JSON.stringify(stateToSave),
        );
      }
    }
  }, [currentStep, accountType, artisanData, isHydrated]);

  const handleAccountTypeSelect = (type: AccountType) => {
    setAccountType(type);
  };

  const handleAccountTypeContinue = () => {
    if (accountType === "artisan") {
      setCurrentStep("artisan-step1");
    } else if (accountType === "client") {
      setCurrentStep("client-form");
    }
  };

  // Handle back navigation
  const handleBack = () => {
    switch (currentStep) {
      case "artisan-step1":
        setCurrentStep("account-type");
        break;
      case "artisan-step2":
        setCurrentStep("artisan-step1");
        break;
      case "client-form":
        setCurrentStep("account-type");
        break;
      default:
        break;
    }
  };

  // Check if back button should be shown
  const showBackButton = () => {
    return currentStep !== "account-type" && currentStep !== "success";
  };

  const getBackgroundImage = () => {
    if (currentStep === "artisan-step2" || currentStep === "success") {
      return "/images/artisan_woman.png";
    }
    return "/images/artisan_woodworker.png";
  };

  // Get current progress for indicator
  const getProgressStep = () => {
    if (accountType === "artisan") {
      switch (currentStep) {
        case "artisan-step1":
          return 1;
        case "artisan-step2":
          return 2;
        default:
          return 0;
      }
    }
    return 0;
  };

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const handleArtisanStep1Next = (data: Partial<ArtisanFormData>) => {
    setArtisanData((prev) => ({ ...prev, ...data }));
    setCurrentStep("artisan-step2");
  };

  const handleArtisanStep2Complete = async (data: Partial<ArtisanFormData>) => {

    // Return if app is already in loading state.
    if(isLoading) return;

    // Use merged local object to handle async React state updates.
    const updatedArtisanData = {...artisanData, ...data};

    setArtisanData(updatedArtisanData);
    setIsLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedArtisanData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save profile data.');
      }

      const responseData = await response.json();
      console.log('Profile saved successfully:', responseData);

      if (typeof window !== "undefined") {
        localStorage.removeItem("artisan-onboarding-state");
      }

      setCurrentStep("success");

      setTimeout(() => {
        setArtisanData(initialState.artisanData);
      }, 2000);

    } catch (error) {
      console.error('Error saving profile data:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An error occurred while saving profile data to server. Please try again.';
      
        console.error("Error message:", errorMessage);

    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="text-[#6366F1]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start overflow-hidden max-h-[100vh]">
      {/* Form container - responsive width */}
      <div className="form_div flex flex-col justify-top items-start w-full md:w-auto mx-auto px-[20px] sm:px-[32px] md:px-[40px] py-[40px] sm:py-[56px] md:py-[7vh] overflow-y-auto h-[100vh] max-h-[100vh]">
        <div className="mb-[32px] sm:mb-[40px] md:mb-[4vh]">
          <img
            src="/images/artisan_logo.png"
            alt="Artisyn logo"
            width={160}
            className="h-8 sm:h-[40px] w-auto"
          />
          height={40}
          <img
            src="/images/artisan_logo.png"
            alt="Artisyn logo"
            width={160}
            height={40}
            className="h-8 sm:h-[40px] w-auto"
          />
        </div>

        {accountType === "artisan" &&
          (currentStep === "artisan-step1" ||
            currentStep === "artisan-step2") && (
            <div
              className="w-full flex items-center justify-between px-[8px] sm:px-[12px] md:px-[1vw] mb-[24px] sm:mb-[28px]"
              style={{ maxWidth: 520 }}
            >
              <div className="flex-1">
                <ProgressIndicator
                  currentStep={getProgressStep()}
                  totalSteps={2}
                />
              </div>
              {showBackButton() && (
                <button
                  onClick={handleBack}
                  className="
                  flex items-center gap-[8px] 
                  hover:bg-[#ededfb] 
                  border-none bg-[transparent] 
                  text-[#6366F1] hover:text-[#4338ca] 
                  px-[12px] sm:px-[16px] md:px-[18px] py-[6px] sm:py-[7px] rounded-[8px]
                  font-medium text-[13px] sm:text-[14px]
                  transition-all duration-[200ms]
                  group cursor-pointer
                "
                >
                  <svg
                    className="w-4 sm:w-[18px] h-[16px] sm:h-[18px] mr-[2px] text-[#6366F1] group-hover:text-[#4338ca] transition-colors duration-[150ms]"
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
                  <span className="font-medium">Back</span>
                </button>
              )}
            </div>
          )}

        {/* Forms container with responsive width */}
        <div className="w-full max-w-[520px]">
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
              >
                <OnboardingSuccess accountType={accountType} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Image section - hidden on mobile, visible on medium screens and up */}
      <div
        className="img_div shadow-lg hidden md:block"
        style={{
          width: "42vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 8px 32px 0 rgba(99,102,241,0.07), 0 2px 8px 0 rgba(99,102,241,0.05)",
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
            sizes="(min-width: 768px) 42vw, 0vw"
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
  );
}
