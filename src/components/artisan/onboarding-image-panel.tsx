'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

const ARTISAN_WOMAN_STEPS = ['/profile-setup/artisan-step2', '/profile-setup/success'];

export function OnboardingImagePanel() {
  const pathname = usePathname();
  const imageSrc = ARTISAN_WOMAN_STEPS.includes(pathname)
    ? '/images/artisan_woman.png'
    : '/images/artisan_woodworker.png';

  return (
    <div
      className="img_div shadow-lg hidden md:block"
      style={{
        width: '42vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        boxShadow:
          '0 8px 32px 0 rgba(99,102,241,0.07), 0 2px 8px 0 rgba(99,102,241,0.05)',
      }}
    >
      <Image
        key={imageSrc}
        src={imageSrc}
        alt="Artisan at work"
        fill
        style={{
          objectFit: 'cover',
          filter: 'brightness(0.99) saturate(1.13) contrast(1.02)',
        }}
        sizes="(min-width: 768px) 42vw, 0vw"
        priority
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(90deg, rgba(99,102,241,0.13) 0%, rgba(255,255,255,0.07) 90%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
