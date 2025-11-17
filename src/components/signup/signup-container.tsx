"use client";

import { useState } from "react";
import RoleSelection from "./role-selection";
import ProfileForm from "./profile-form";
import WalletConnect from "./wallet-connect";
import {
  AccountRole,
  SignupStep,
  ProfileFormValues,
} from "@/types/sigup.types";
import { ArrowLeft } from "lucide-react";

export default function SignupContainer() {
  const [currentStep, setCurrentStep] = useState<SignupStep>("role");
  const [selectedRole, setSelectedRole] = useState<AccountRole | null>(null);
  const [profileData, setProfileData] = useState<ProfileFormValues | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: AccountRole) => {
    setSelectedRole(role);
    setCurrentStep("profile");
  };

  const handleProfileSubmit = (data: ProfileFormValues) => {
    setProfileData(data);
    setCurrentStep("wallet");
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    if (selectedRole && profileData) {
      console.log("Signup complete:", {
        role: selectedRole,
        profile: profileData,
      });
    }
  };

  const handleBack = () => {
    if (currentStep === "profile") {
      setCurrentStep("role");
      setSelectedRole(null);
    } else if (currentStep === "wallet") {
      setCurrentStep("profile");
    }
  };

  return (
    <div className="space-y-4">
      {/* Back Button */}
      {currentStep !== "role" && (
        <button
          onClick={handleBack}
          className="text-sm text-gray-600 hover:text-gray-900 transition flex items-center gap-1"
          aria-label="Go back to previous step"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      )}

      {/* Content */}
      {currentStep === "role" && (
        <RoleSelection onRoleSelect={handleRoleSelect} isLoading={isLoading} />
      )}

      {currentStep === "profile" && selectedRole && (
        <ProfileForm
          role={selectedRole}
          onSubmit={handleProfileSubmit}
          isLoading={isLoading}
        />
      )}

      {currentStep === "wallet" && selectedRole && profileData && (
        <WalletConnect
          role={selectedRole}
          profileData={profileData}
          onConnect={handleWalletConnect}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
