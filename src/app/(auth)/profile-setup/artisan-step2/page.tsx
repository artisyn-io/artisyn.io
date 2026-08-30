'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useOnboarding } from '@/components/artisan/onboarding-context';
import type { ArtisanFormData } from '@/components/artisan/onboarding-context';
import { ArtisanProfileStep2 } from '@/components/artisan/artisan-profile-step2';
import { OnboardingStepHeader } from '@/components/artisan/onboarding-step-header';

export default function ArtisanStep2() {
  const router = useRouter();
  const {
    accountType,
    artisanData,
    setArtisanData,
    completeOnboarding,
    completed,
    isHydrated,
  } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (completed) {
      router.replace('/profile-setup/success');
    } else if (accountType !== 'artisan') {
      router.replace('/profile-setup/account-type');
    }
  }, [accountType, completed, isHydrated, router]);

  if (!isHydrated || accountType !== 'artisan') {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-[#6366F1]">Loading...</div>
      </div>
    );
  }

  const handleComplete = async (data: Partial<ArtisanFormData>) => {
    if (isLoading) return;

    const updatedArtisanData = { ...artisanData, ...data };
    setArtisanData(updatedArtisanData);
    setIsLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedArtisanData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save profile data.');
      }

      completeOnboarding();
      router.push('/profile-setup/success');
    } catch (error) {
      console.error('Error saving profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[520px]">
      <OnboardingStepHeader
        currentStep={2}
        onBack={() => router.push('/profile-setup/artisan-step1')}
      />
      <ArtisanProfileStep2 data={artisanData} onComplete={handleComplete} />
    </div>
  );
}
