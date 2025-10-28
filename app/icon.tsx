import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size.width}
        height={size.height}
      >
        <defs>
          <linearGradient id="glassBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1C2130" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2A2F45" stopOpacity="0.85" />
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
              <feFuncA type="linear" slope="0.3" />
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
            d="M35 25H65C75 25 75 35 75 35V65C75 75 65 75 65 75H35C25 75 25 65 25 65V35C25 25 35 25 35 25Z"
            stroke="url(#neonGlowOutline)"
            strokeWidth="4"
            fill="rgba(255, 255, 255, 0.05)"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="50" r="5" fill="#C3A0F5" opacity="0.8" />
          <circle cx="50" cy="50" r="3" fill="#ffffff" opacity="0.9" />
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
    ),
    {
      ...size,
    }
  )
}
