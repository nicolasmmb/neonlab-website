'use client'

import React from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { RotatingText } from './RotatingText'
import { Button } from './UI'
import { ArrowRight } from './Icons'

// Carregar DotGrid dinamicamente para evitar SSR
const DotGrid = dynamic(() => import('./DotGrid'), { ssr: false })

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Animações minimalistas
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100dvh] text-center px-4 sm:px-6 pt-24 sm:pt-28 md:pt-20 pb-10">

      {/* DotGrid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DotGrid
          dotSize={6}
          gap={24}
          baseColor="#1a1a1a"
          activeColor="#3b82f6"
          proximity={96}
          shockRadius={96}
          shockStrength={1}
          resistance={800}
          returnDuration={1.8}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.6
          }}
        />
      </div>

      {/* Gradiente suave por cima */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div variants={fadeIn} className="mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs sm:text-sm text-blue-200/90 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-300/60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-300/80"></span>
            </span>
            Disponível para novos projetos
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          variants={fadeIn}
          className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white mb-4 sm:mb-6 px-2"
        >
          Experiências digitais
        </motion.h1>

        {/* Texto Rotativo - Simplificado */}
        <motion.div variants={fadeIn} className="mb-6 sm:mb-8">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white/90">
              com
            </span>

            <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="inline-flex w-full px-4 sm:px-6 md:px-8 bg-gradient-to-br from-blue-400/15 via-purple-400/15 to-cyan-400/15 backdrop-blur-xl border border-white/15 py-2 sm:py-3 md:py-4 justify-center rounded-xl sm:rounded-2xl">
                <RotatingText
                  texts={['Performance', 'Tecnologia', 'Inovação', 'Design']}
                  mainClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white"
                  staggerFrom="last"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  staggerDuration={0.01}
                  splitLevelClassName="overflow-hidden"
                  transition={{
                    type: 'tween',
                    duration: 0.3,
                    ease: 'easeInOut'
                  }}
                  rotationInterval={3000}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Descrição */}
        <motion.p
          variants={fadeIn}
          className="mt-4 sm:mt-6 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300/90 leading-relaxed px-4"
        >
          Transformamos suas ideias em{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300/90 to-purple-300/90 font-semibold">
            experiências digitais modernas
          </span>{' '}
          que cativam, engajam e convertem.
        </motion.p>

        {/* CTAs - Sem hover effects complexos */}
        <motion.div
          variants={fadeIn}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          {/* CTA Primário */}
          <Button
            onClick={scrollToContact}
            className="relative bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 backdrop-blur-xl border border-white/20 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl active:scale-95 transition-transform duration-200 touch-manipulation"
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              Inicie seu Projeto
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
          </Button>

          {/* CTA Secundário */}
          <Button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl active:scale-95 transition-transform duration-200 touch-manipulation"
          >
            Ver Portfólio
          </Button>
        </motion.div>

        {/* Info adicional */}
        <motion.div variants={fadeIn} className="mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-0 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 max-w-full">
            {/* Badge 1 */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300/80 w-full sm:w-auto px-3 py-2">
              <span className="w-8 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400/80" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="whitespace-nowrap">Consultoria gratuita</span>
            </div>
            {/* mobile horizontal divider - starts at center of the check (1rem) */}
            <div className="sm:hidden" style={{ marginLeft: '1rem', width: 'calc(100% - 1rem)' }}>
              <div className="h-px bg-white/10" />
            </div>
            {/* desktop vertical divider */}
            <div className="hidden sm:block w-px h-4 bg-white/10 mx-2" />

            {/* Badge 2 */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300/80 w-full sm:w-auto px-3 py-2">
              <span className="w-8 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400/80" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="whitespace-nowrap">Resposta em 24h</span>
            </div>
            {/* mobile horizontal divider */}
            <div className="sm:hidden" style={{ marginLeft: '1rem', width: 'calc(100% - 1rem)' }}>
              <div className="h-px bg-white/10" />
            </div>
            {/* desktop vertical divider */}
            <div className="hidden sm:block w-px h-4 bg-white/10 mx-2" />

            {/* Badge 3 */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300/80 w-full sm:w-auto px-3 py-2">
              <span className="w-8 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400/80" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="whitespace-nowrap">Sem compromisso</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator - Sem animação */}
        <div className="mt-12 sm:mt-20 hidden sm:block">
          <div className="w-5 h-9 border-2 border-white/20 rounded-full mx-auto flex items-start justify-center p-1.5">
            <div className="w-1 h-1 bg-white/60 rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
