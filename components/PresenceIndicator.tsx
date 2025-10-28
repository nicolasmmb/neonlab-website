'use client'

import { useEffect, useMemo, useState } from 'react'

type PresenceIndicatorProps = {
  className?: string
}

const PRESENCE_EVENT_NAME = 'neonlab:presence'

export default function PresenceIndicator({ className = '' }: PresenceIndicatorProps) {
  const [onlineVisitors, setOnlineVisitors] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handlePresenceUpdate = (event: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === 'number') {
        setOnlineVisitors(event.detail)
      }
    }

    window.addEventListener(PRESENCE_EVENT_NAME, handlePresenceUpdate as EventListener)

    return () => {
      window.removeEventListener(PRESENCE_EVENT_NAME, handlePresenceUpdate as EventListener)
    }
  }, [])

  const label = useMemo(() => {
    if (onlineVisitors === null) {
      return 'Conectando visitantes...'
    }

    if (onlineVisitors <= 0) {
      return 'Ninguém navegando agora'
    }

    if (onlineVisitors === 1) {
      return '1 pessoa navegando agora'
    }

    return `${onlineVisitors} pessoas navegando agora`
  }, [onlineVisitors])

  const classes = [
    'flex items-center gap-2 text-xs sm:text-sm text-gray-300/80',
    className.trim()
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} aria-live="polite">
      <span className="relative flex h-3 w-3 sm:h-4 sm:w-4">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/40 animate-ping" />
        <span className="relative inline-flex h-full w-full rounded-full bg-emerald-400" />
      </span>
      <span className="whitespace-nowrap" suppressHydrationWarning>
        {label}
      </span>
    </div>
  )
}
