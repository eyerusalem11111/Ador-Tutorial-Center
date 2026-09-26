import React from 'react';

interface AdorLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark' | 'horizontal' | 'badge';
  className?: string;
  textColor?: string;
  whiteBackground?: boolean;
}

export const AdorLogo: React.FC<AdorLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  className = '',
  textColor = 'text-[#014aac]',
  whiteBackground = false,
}) => {
  // Pure Blue & White Badge for modal headers and dark backgrounds
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2.5 bg-white px-4 py-2 rounded-2xl shadow-md border border-white/80 select-none ${className}`}>
        <img
          src="/ador-logo-mark.png"
          alt="Ador Logo Emblem"
          className="h-9 w-auto object-contain shrink-0"
          loading="eager"
          decoding="async"
        />
        <div className="flex flex-col text-left justify-center">
          <span className="font-black text-sm tracking-tight text-[#014aac] leading-none">
            ADOR
          </span>
          <span className="font-extrabold text-[10px] tracking-tight text-[#014aac] mt-0.5">
            Tutorial Center
          </span>
        </div>
      </div>
    );
  }
  const markSizeClasses = {
    sm: 'h-8 w-auto max-w-[36px]',
    md: 'h-10 sm:h-11 w-auto max-w-[48px]',
    lg: 'h-16 w-auto max-w-[72px]',
    xl: 'h-24 sm:h-28 w-auto max-w-[120px]',
  }[size];

  const fullSizeClasses = {
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64',
    xl: 'w-72 sm:w-80',
  }[size];

  // 1. Pure Emblem Mark
  if (variant === 'mark') {
    return (
      <div 
        className={`inline-flex items-center justify-center ${whiteBackground ? 'bg-white p-2 rounded-2xl shadow-xs' : ''} ${className}`}
      >
        <img
          src="/ador-logo-mark.png"
          alt="Ador Logo Emblem"
          className={`${markSizeClasses} object-contain shrink-0 transition-transform duration-200 hover:scale-105`}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // 2. Horizontal lockup: Emblem + Typography (Navbar & Headers)
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <img
          src="/ador-logo-mark.png"
          alt="Ador Logo Emblem"
          className={`${markSizeClasses} object-contain shrink-0 transition-transform duration-200 hover:scale-105`}
          loading="eager"
          decoding="async"
        />
        <div className="flex flex-col justify-center">
          <span className="font-extrabold tracking-tight text-lg sm:text-xl leading-none text-[#014aac] dark:text-blue-400">
            Ador
          </span>
          <span className="font-extrabold tracking-tight text-xs sm:text-sm leading-tight text-[#014aac] dark:text-blue-400 mt-0.5">
            Tutorial Center
          </span>
        </div>
      </div>
    );
  }

  // 3. Full Stacked Variant (Hero Card & Showcase)
  return (
    <div 
      className={`inline-flex flex-col items-center text-center select-none ${whiteBackground ? 'bg-white p-6 rounded-3xl shadow-lg border border-slate-100' : ''} ${className}`}
    >
      <img
        src="/ador-logo.png"
        alt="Ador Tutorial Center Official Brand Identity"
        className={`${fullSizeClasses} h-auto object-contain transition-transform duration-200 hover:scale-105`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
