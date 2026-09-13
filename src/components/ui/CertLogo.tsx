'use client';

import React from 'react';

interface CertLogoProps {
  id: string;
  size?: number;
  color?: string;
}

export default function CertLogo({ id, size = 32, color = '#ffffff' }: CertLogoProps) {
  switch (id) {
    case 'aws-llm-genai':
      // Official AWS Text + Smile Arrow Logo matching user reference
      return (
        <svg width={size * 1.3} height={size} viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="4" y="20" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="21" fill="#FFFFFF" letterSpacing="-1">
            aws
          </text>
          <path
            d="M 8 25 Q 26 35 46 21"
            stroke="#FF9900"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 42 20 L 48 21 L 45 27 Z"
            fill="#FF9900"
          />
        </svg>
      );

    case 'ms-ai-ml':
      // Official Microsoft 4-Tile Logo
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="9.5" height="9.5" rx="1" fill="#F25022" />
          <rect x="12.5" y="2" width="9.5" height="9.5" rx="1" fill="#7FBA00" />
          <rect x="2" y="12.5" width="9.5" height="9.5" rx="1" fill="#00A4EF" />
          <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1" fill="#FFB900" />
        </svg>
      );

    case 'gen-ai-google':
      // Official Pristine Google Cloud 4-Color Vector Logo
      return (
        <svg width={size * 1.15} height={size * 1.15} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ea4535" d="M80.6 40.3h.4l-.2-.2 14-14v-.3c-11.8-10.4-28.1-14-43.2-9.5C36.5 20.8 24.9 32.8 20.7 48c.2-.1.5-.2.8-.2 5.2-3.4 11.4-5.4 17.9-5.4 2.2 0 4.3.2 6.4.6.1-.1.2-.1.3-.1 9-9.9 24.2-11.1 34.6-2.6h-.1z" />
          <path fill="#4285F4" d="M108.1 47.8c-2.3-8.5-7.1-16.2-13.8-22.1L80 39.9c6 4.9 9.5 12.3 9.3 20v2.5c16.9 0 16.9 25.2 0 25.2H63.9v20h-.1l.1.2h25.4c14.6.1 27.5-9.3 31.8-23.1 4.3-13.8-1-28.8-13-36.9z" />
          <path fill="#34a852" d="M39 107.9h26.3V87.7H39c-1.9 0-3.7-.4-5.4-1.1l-15.2 14.6v.2c6 4.3 13.2 6.6 20.7 6.6z" />
          <path fill="#f9bc15" d="M40.2 41.9c-14.9.1-28.1 9.3-32.9 22.8-4.8 13.6 0 28.5 11.8 37.3l15.6-14.9c-8.6-3.7-10.6-14.5-4-20.8 6.6-6.4 17.8-4.4 21.7 3.8L68 55.2C61.4 46.9 51.1 42 40.2 42.1z" />
        </svg>
      );

    case 'nitrostack-runner-up':
      // Official Nitrostack Cyan Delta Loop Emblem matching user reference image
      return (
        <svg width={size * 1.1} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 18 5 C 23 5 31 16 31 22 C 31 28 25 31 18 31 C 11 31 5 28 5 22 C 5 18 10 10 14 6"
            stroke="#00D2FF"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 4 25 L 11 27 L 8 32 Z"
            fill="#00A3FF"
          />
        </svg>
      );

    case 'dominion-best-design':
      // Dominion Emblem Logo matching user reference (Dark Green HI emblem)
      return (
        <svg width={size * 1.1} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#064E3B" />
          <path d="M6 9H11V23H6V9Z" fill="#10B981" />
          <path d="M11 14H16V18H11V14Z" fill="#10B981" />
          <rect x="17" y="9" width="10" height="14" rx="2" fill="#047857" />
          <rect x="20" y="11" width="4" height="10" rx="1" fill="#FFFFFF" />
        </svg>
      );

    case 'deep-learning-ai':
      // Official DeepLearning.AI Concentric Circles Logo matching user reference
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="17" fill="#FF3B5C" />
          <circle cx="18" cy="14" r="11" fill="#FFFFFF" />
          <circle cx="18" cy="14" r="8.5" fill="#FF3B5C" />
          <circle cx="18" cy="11.5" r="5.5" fill="#FFFFFF" />
          <circle cx="18" cy="11.5" r="3.5" fill="#FF3B5C" />
          <circle cx="18" cy="9.5" r="1.8" fill="#FFFFFF" />
        </svg>
      );

    case 'agentic-ai':
      // Official Vanderbilt University Gold "V" Logo matching user reference
      return (
        <svg width={size * 1.1} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="4" fill="#FFFFFF" />
          <path
            d="M 5 6 L 14 6 L 18 24 L 22 6 L 31 6 L 21 28 L 15 28 Z"
            fill="url(#vanderbilt-gold)"
          />
          <path
            d="M 14 6 L 18 16 L 22 6 Z"
            fill="#B8860B"
          />
          <defs>
            <linearGradient id="vanderbilt-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6C200" />
              <stop offset="50%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#8C6D23" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'fullstack-london':
      // Official University of London Coat of Arms Shield Logo matching user reference
      return (
        <svg width={size * 1.1} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="4" fill="#FFFFFF" />
          <path d="M 6 5 L 30 5 L 30 13 L 6 13 Z" fill="#003366" />
          <text x="9" y="11" fontFamily="serif" fontSize="5" fontWeight="bold" fill="#D4AF37">
            LONDON
          </text>
          <path d="M 6 13 L 30 13 L 30 24 C 30 30, 18 34, 18 34 C 18 34, 6 30, 6 24 Z" fill="#FFFFFF" stroke="#003366" strokeWidth="1.2" />
          <path d="M 15 13 H 21 V 32 H 15 Z" fill="#DC2626" />
          <path d="M 6 18 H 30 V 23 H 6 Z" fill="#DC2626" />
          <circle cx="18" cy="20.5" r="2.5" fill="#F59E0B" />
        </svg>
      );

    default:
      return null;
  }
}
