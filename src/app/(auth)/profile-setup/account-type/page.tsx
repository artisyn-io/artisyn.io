'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useOnboarding } from '@/components/artisan/onboarding-context';
import { AccountTypeSelection } from '@/components/artisan/account-type-selection';

export default function AccountTypeStep() {
  const router = useRouter();
  const { accountType, setAccountType, completed, isHydrated } = useOnboarding();

  const handleSelect = (type: 'artisan' | 'client' | null) => {
    setAccountType(type);
  };

  const handleContinue = () => {
    if (accountType === 'artisan') {
      router.push('/profile-setup/artisan-step1');
    } else if (accountType === 'client') {
      router.push('/profile-setup/client-form');
    }
  };

  useEffect(() => {
    if (!isHydrated) return;
    if (completed) {
      router.replace('/profile-setup/success');
    }
  }, [completed, isHydrated, router]);

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-[#6366F1]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[520px]">
      <AccountTypeSelection
        selectedType={accountType}
        onSelect={handleSelect}
        onContinue={handleContinue}
      />
    </div>
  );
}
