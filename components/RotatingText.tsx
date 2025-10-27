'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplitTextProps {
  children: string
  className?: string
  initial: any
  animate: any
  exit: any
  transition: any
}

const SplitText: React.FC<SplitTextProps> = ({
  children,
  className,
  initial,
  animate,
  exit,
  transition,
}) => {
  if (typeof children !== 'string') {
    return null
  }

  return (
    <span className={`inline-block ${className}`}>
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={{ initial, animate, exit }}
          transition={transition}
          className="inline-block"
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

interface RotatingTextProps {
  texts: string[]
  mainClassName?: string
  splitLevelClassName?: string
  initial?: any
  animate?: any
  exit?: any
  staggerFrom?: 'first' | 'last'
  staggerDuration?: number
  transition?: any
  rotationInterval?: number
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  mainClassName = '',
  splitLevelClassName = '',
  // use numeric offsets (px) for smoother, predictable motion across devices
  initial = { y: 20, opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: -20, opacity: 0 },
  staggerFrom = 'first',
  // slightly larger stagger for a natural cascade
  staggerDuration = 0.04,
  // default per-character transition: spring for a lively yet smooth feel
  transition = { type: 'spring', damping: 18, stiffness: 200 },
  rotationInterval = 3000,
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, rotationInterval)
    return () => clearTimeout(timer)
  }, [index, texts.length, rotationInterval])

  const staggerDirection = staggerFrom === 'last' ? -1 : 1

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={texts[index]}
        initial={initial}
        animate={animate}
        exit={exit}
        className={mainClassName}
        layout
        layoutId="rotating-text-container"
        transition={{
          staggerChildren: staggerDuration,
          staggerDirection,
          // small delay so container moves before children animate
          delayChildren: 0.06,
          // use a short tween for the container layout to avoid heavy bounces
          layout: { type: 'tween', duration: 0.32, ease: 'easeInOut' }
        }}
      >
        <SplitText
          className={splitLevelClassName}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
        >
          {texts[index]}
        </SplitText>
      </motion.div>
    </AnimatePresence>
  )
}
