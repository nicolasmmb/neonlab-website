"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { NeonlabAppleIcon } from '../components/Icons'

// carregar DotGrid client-side para reproduzir o mesmo background da home
const DotGrid = dynamic(() => import('../components/DotGrid'), { ssr: false })

export default function NotFound() {
    return (
        <section className="relative flex items-center justify-center min-h-[100dvh] text-center px-6 py-24">

            {/* Background igual ao da home */}
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
                    style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.6 }}
                />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70 pointer-events-none" />

            <div className="relative z-10 max-w-3xl w-full">
                <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-12">
                    <NeonlabAppleIcon className="mx-auto w-20 h-20 sm:w-28 sm:h-28" />

                    <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                        Página não encontrada
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-gray-300/90 leading-relaxed">
                        A página que você procura não existe ou foi removida. Verifique o endereço ou relate o problema para que possamos corrigir.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href={'/#contato'}
                            aria-label="Reportar problema"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 backdrop-blur-xl border border-white/20 text-white font-semibold px-5 py-3 rounded-lg"
                        >
                            Reportar problema
                        </Link>

                        <Link
                            href={'/'}
                            aria-label="Voltar para a Home"
                            className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 font-semibold px-5 py-3 rounded-lg"
                        >
                            Voltar para a Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
