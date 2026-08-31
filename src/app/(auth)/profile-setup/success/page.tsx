'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useOnboarding } from '@/components/artisan/onboarding-context';
import { OnboardingSuccess } from '@/components/artisan/onboarding-success';
import { dashboardRouteForRole } from '@/lib/navigation';

export default function OnboardingSuccessStep() {
  const router = useRouter();
  const { accountType, isHydrated } = useOnboarding();

  useEffect(() => {
    if (!isHydrated) return;
    if (accountType == null) {
      router.replace('/profile-setup/account-type');
    }
  }, [accountType, isHydrated, router]);

  const handleContinue = () => {
    router.push(dashboardRouteForRole(accountType));
  };

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-[#6366F1]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[520px]">
      <OnboardingSuccess accountType={accountType} onContinue={handleContinue} />
    </div>
  );
}
