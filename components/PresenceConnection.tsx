'use client'

import { useEffect } from 'react'
import { resolveBotApiBaseUrl } from '@/lib/botApi'

const buildStreamUrl = () => `${resolveBotApiBaseUrl()}/presence/stream`

export default function PresenceConnection() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const streamUrl = buildStreamUrl()
    const source = new EventSource(streamUrl)

    source.onopen = () => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[PresenceConnection] stream conectado', { streamUrl })
      }
    }

    source.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as { online?: number }
        if (typeof payload.online === 'number') {
          const updateEvent = new CustomEvent('neonlab:presence', {
            detail: payload.online,
          })
          window.dispatchEvent(updateEvent)
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[PresenceConnection] evento inválido', error)
        }
      }
    }

    source.onerror = (error) => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[PresenceConnection] erro no stream', error)
      }
    }

    return () => {
      source.close()
    }
  }, [])

  return null
}

