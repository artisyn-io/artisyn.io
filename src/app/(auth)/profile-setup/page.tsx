'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useOnboarding } from '@/components/artisan/onboarding-context';

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
