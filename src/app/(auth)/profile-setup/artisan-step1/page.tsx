'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useOnboarding } from '@/components/artisan/onboarding-context';
import type { ArtisanFormData } from '@/components/artisan/onboarding-context';
import { ArtisanProfileStep1 } from '@/components/artisan/artisan-profile-step1';
import { OnboardingStepHeader } from '@/components/artisan/onboarding-step-header';

export default function ArtisanStep1() {
  const router = useRouter();
  const { accountType, artisanData, setArtisanData, completed, isHydrated } =
    useOnboarding();

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

  const handleNext = (data: Partial<ArtisanFormData>) => {
    setArtisanData(data);
    router.push('/profile-setup/artisan-step2');
  };

  return (
    <div className="w-full max-w-[520px]">
      <OnboardingStepHeader
        currentStep={1}
        onBack={() => router.push('/profile-setup/account-type')}
      />
      <ArtisanProfileStep1 data={artisanData} onNext={handleNext} />
    </div>
  );
}
