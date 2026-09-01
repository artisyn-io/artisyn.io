'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useOnboarding } from '@/components/artisan/onboarding-context';
import {
  ClientProfileForm,
  type ClientFormData,
} from '@/components/artisan/client-profile-form';
import { OnboardingStepHeader } from '@/components/artisan/onboarding-step-header';

export default function ClientFormStep() {
  const router = useRouter();
  const {
    accountType,
    clientData,
    setClientData,
    completeOnboarding,
    completed,
    isHydrated,
  } = useOnboarding();

  useEffect(() => {
    if (!isHydrated) return;
    if (completed) {
      router.replace('/profile-setup/success');
    } else if (accountType !== 'client') {
      router.replace('/profile-setup/account-type');
    }
  }, [accountType, completed, isHydrated, router]);

  if (!isHydrated || accountType !== 'client') {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-[#6366F1]">Loading...</div>
      </div>
    );
  }

  const handleComplete = (data: ClientFormData) => {
    setClientData(data);
    completeOnboarding();
    router.push('/profile-setup/success');
  };

  return (
    <div className="w-full max-w-[520px]">
      <OnboardingStepHeader
        currentStep={1}
        onBack={() => router.push('/profile-setup/account-type')}
      />
      <ClientProfileForm data={clientData} onComplete={handleComplete} />
    </div>
  );
}
