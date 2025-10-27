import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(to bottom right, #1C2130, #2A2F45)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#80B3FF',
          fontWeight: 'bold',
          borderRadius: '8px',
        }}
      >
        N
      </div>
    ),
    {
      ...size,
    }
  )
}
