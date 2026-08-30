'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AccountTypeSelection } from '@/components/artisan/account-type-selection';
import { ArtisanProfileStep1 } from '@/components/artisan/artisan-profile-step1';
import { ArtisanProfileStep2 } from '@/components/artisan/artisan-profile-step2';
import Image from 'next/image';
import { OnboardingSuccess } from '@/components/artisan/onboarding-success';
import { ProgressIndicator } from '@/components/progress-indicator';
import { saveProfile } from '@/lib/api/profile';

export default function ProfileSetupIndex() {
  const router = useRouter();
  const { accountType, completed, isHydrated } = useOnboarding();

  useEffect(() => {
    if (!isHydrated) return;
    if (completed) {
      router.replace('/profile-setup/success');
    } else if (accountType === 'artisan') {
      router.replace('/profile-setup/artisan-step1');
    } else if (accountType === 'client') {
      router.replace('/profile-setup/client-form');
    } else {
      router.replace('/profile-setup/account-type');
    }
  });

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const handleArtisanStep1Next = (data: Partial<ArtisanFormData>) => {
    setArtisanData((prev) => ({ ...prev, ...data }));
    setCurrentStep('artisan-step2');
  };

  const handleArtisanStep2Complete = async (data: Partial<ArtisanFormData>) => {
    // Return if app is already in loading state.
    if (isLoading) return;

    // Use merged local object to handle async React state updates.
    const updatedArtisanData = { ...artisanData, ...data };

    setArtisanData(updatedArtisanData);
    setIsLoading(true);

    try {
      const responseData = await saveProfile(updatedArtisanData);
      console.log('Profile saved successfully:', responseData);

      if (typeof window !== 'undefined') {
        localStorage.removeItem('artisan-onboarding-state');
      }

      setCurrentStep('success');

      setTimeout(() => {
        setArtisanData(initialState.artisanData);
      }, 2000);
    } catch (error) {
      console.error('Error saving profile data:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred while saving profile data to server. Please try again.';

      console.error('Error message:', errorMessage);
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
    <div className="flex justify-center items-center h-[60vh]">
      <div className="text-[#6366F1]">Loading...</div>
    </div>
  );
}
