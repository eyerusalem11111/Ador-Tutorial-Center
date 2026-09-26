import React from 'react';
import { Star } from 'lucide-react';

export const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.05-.16-.03-.23-.02-.1.02-1.74 1.11-4.92 3.26-.47.32-.89.48-1.27.47-.42-.01-1.22-.24-1.82-.43-.73-.24-1.31-.37-1.26-.78.03-.21.32-.43.89-.66 3.49-1.52 5.82-2.52 6.99-3.02 3.33-1.39 4.02-1.63 4.47-1.64.1 0 .32.02.46.14.12.1.15.24.17.34-.01.07.01.21 0 .28z"/>
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.48V8.69a8.18 8.18 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-.88-.06z"/>
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.301-.777.979-.953 1.18-.175.2-.351.226-.652.075s-1.272-.469-2.423-1.495c-.895-.799-1.5-1.786-1.675-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.151-.176.2-.301.301-.502.1-.2.05-.376-.025-.526-.075-.151-.678-1.632-.928-2.234-.244-.588-.493-.508-.678-.518-.176-.009-.377-.011-.578-.011-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.909 1.23 3.11c.15.201 2.124 3.243 5.145 4.548.718.31 1.28.496 1.718.635.722.23 1.378.198 1.898.12.579-.087 1.78-.727 2.031-1.431.251-.703.251-1.306.176-1.431-.076-.125-.276-.2-.577-.35zM12.04 2C6.51 2 2.02 6.489 2.02 12.019c0 1.956.565 3.864 1.636 5.513L2 22.04l4.646-1.616a10.024 10.024 0 0 0 5.394 1.57h.005c5.528 0 10.02-4.49 10.02-10.02 0-2.678-1.042-5.197-2.936-7.09A9.957 9.957 0 0 0 12.04 2z"/>
  </svg>
);

export const GoldenStar: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <Star className={`fill-amber-400 text-amber-400 shrink-0 ${className}`} />
);

export const GoldenRatingBadge: React.FC<{ rating: number; max?: number; className?: string }> = ({
  rating,
  max = 5,
  className = '',
}) => (
  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 shadow-2xs ${className}`}>
    <GoldenStar className="w-3.5 h-3.5" />
    <span className="text-xs font-black text-amber-900 leading-none">
      {rating.toFixed(1)} / {max.toFixed(1)}
    </span>
  </div>
);

export const GoldenStarGroup: React.FC<{ count?: number; className?: string }> = ({
  count = 5,
  className = '',
}) => (
  <div className={`flex items-center gap-0.5 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <GoldenStar key={i} className="w-3.5 h-3.5" />
    ))}
  </div>
);

export const SocialMediaIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-4 h-4' }) => {
  const normalized = name.toLowerCase();
  if (normalized.includes('telegram')) return <TelegramIcon className={className} />;
  if (normalized.includes('instagram')) return <InstagramIcon className={className} />;
  if (normalized.includes('youtube')) return <YouTubeIcon className={className} />;
  if (normalized.includes('tiktok')) return <TikTokIcon className={className} />;
  if (normalized.includes('facebook')) return <FacebookIcon className={className} />;
  if (normalized.includes('whatsapp')) return <WhatsAppIcon className={className} />;
  return <TelegramIcon className={className} />;
};
