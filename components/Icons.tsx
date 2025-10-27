'use client'

import React from 'react'

interface NeonlabAppleIconProps {
  className?: string
  id?: string
}

export const NeonlabAppleIcon: React.FC<NeonlabAppleIconProps> = ({ className, id }) => (
  <svg
    id={id}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
  >
    <defs>
      <linearGradient id="glassBase" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1C2130" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#2A2F45" stopOpacity="0.85" />
      </linearGradient>

      <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
      </linearGradient>

      <linearGradient id="neonGlowOutline" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#80B3FF" />
        <stop offset="50%" stopColor="#C3A0F5" />
        <stop offset="100%" stopColor="#80B3FF" />
      </linearGradient>
      <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
        <feOffset dx="0" dy="2" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3"></feFuncA>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="10" y="10" width="80" height="80" rx="20" ry="20" fill="url(#glassBase)" />
    <g filter="url(#dropshadow)">
      <path
        d="M 35 25 L 65 25 Q 75 25, 75 35 L 75 65 Q 75 75, 65 75 L 35 75 Q 25 75, 25 65 L 25 35 Q 25 25, 35 25 Z"
        stroke="url(#neonGlowOutline)"
        strokeWidth="4"
        fill="rgba(255, 255, 255, 0.05)"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="5" fill="#C3A0F5" opacity="0.8" />
      <circle cx="50" cy="50" r="3" fill="white" opacity="0.9" />
    </g>
    <rect
      x="10"
      y="10"
      width="80"
      height="80"
      rx="20"
      ry="20"
      stroke="rgba(255, 255, 255, 0.1)"
      strokeWidth="1"
      fill="none"
    />

  </svg>
)

export const ArrowRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)
