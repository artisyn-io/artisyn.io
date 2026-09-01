import Image from 'next/image';
import { OnboardingProvider } from '@/components/artisan/onboarding-context';
import { OnboardingImagePanel } from '@/components/artisan/onboarding-image-panel';

export default function ProfileSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <div className="flex flex-col md:flex-row justify-between items-start overflow-hidden max-h-[100vh]">
        <div className="form_div flex flex-col justify-top items-start w-full md:w-auto mx-auto px-[20px] sm:px-[32px] md:px-[40px] py-[40px] sm:py-[56px] md:py-[7vh] overflow-y-auto h-[100vh] max-h-[100vh]">
          <div className="mb-[32px] sm:mb-[40px] md:mb-[4vh]">
            <Image
              src="/images/artisan_logo.png"
              alt="Artisyn logo"
              width={160}
              height={40}
              className="h-8 sm:h-[40px] w-auto"
            />
          </div>
          {children}
        </div>

        <OnboardingImagePanel />
      </div>
    </OnboardingProvider>
  );
}
