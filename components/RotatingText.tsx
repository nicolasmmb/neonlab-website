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
  initial = { y: '100%' },
  animate = { y: 0 },
  exit = { y: '-100%' },
  staggerFrom = 'first',
  staggerDuration = 0.01,
  transition = { type: 'tween', duration: 0.3, ease: 'easeInOut' },
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
          delayChildren: 0.1,
          layout: {
            type: "spring",
            damping: 35,
            stiffness: 300,
            duration: 0.5
          }
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
