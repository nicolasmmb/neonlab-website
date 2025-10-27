'use client'

import React, { useState } from 'react'
import { NeonlabAppleIcon } from './Icons'
import HeroSection from './HeroSection'
import { Button, Input, Textarea, Card, CardHeader, CardTitle, CardContent } from './UI'

export default function HomePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)

  const currentYear = new Date().getFullYear()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulário enviado:', { name, email, message })
    setFormSuccess(true)
    setName('')
    setEmail('')
    setMessage('')
    setTimeout(() => {
      setFormSuccess(false)
    }, 3000)
  }



  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100 font-sans overflow-x-hidden reactbits-background">
      {/* Header padrão, mais natural */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/10 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2">
            <NeonlabAppleIcon id="neonlab-icon-download" className="w-8 h-8" />
            <span className="text-lg font-bold text-white">Neonlab.dev</span>
          </div>
          <nav className="hidden md:flex gap-2">
            <a
              href="#portfolio"
              className="text-sm text-gray-300 hover:text-white transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              Portfólio
            </a>
            <a
              href="#contato"
              className="text-sm text-gray-300 hover:text-white transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              Contato
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section Melhorado */}
        <HeroSection />

        <section id="portfolio" className="py-20 lg:py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
              Nosso Portfólio
            </h2>
            <p className="text-center text-lg text-gray-400/80 mt-4 max-w-2xl mx-auto">
              Projetos que transformam ideias em realidade digital de alta performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              <Card>
                <CardHeader>
                  <CardTitle>E-commerce SaaS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400/90">
                    Plataforma de e-commerce de alta performance com arquitetura JAMstack, focada em
                    velocidade e SEO.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Analítico</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400/90">
                    Interface de análise de dados (SaaS) em tempo real, construída com React e D3.js
                    para visualizações complexas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Landing Page Interativa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400/90">
                    Experiência web imersiva com animações WebGL e GSAP para o lançamento de um
                    produto de tecnologia.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="contato" className="py-20 lg:py-32 px-6">
          <div className="container mx-auto max-w-3xl">
            {/* Card de contato com glassmorphism */}
            <div className="p-8 md:p-12 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
                Vamos Criar o Futuro
              </h2>
              <p className="text-center text-lg text-gray-400/80 mt-4 max-w-xl mx-auto">
                Tem uma ideia? Vamos conversar sobre como a Neonlab.dev pode dar vida ao seu próximo
                projeto.
              </p>

              <form onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300/90">
                    Nome
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300/90">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300/90">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Descreva sua ideia ou necessidade..."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="text-center pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] py-4"
                  >
                    Enviar Mensagem
                  </Button>
                </div>

                {formSuccess && (
                  <div className="p-4 text-center text-emerald-300/90 border border-emerald-500/30 bg-emerald-500/10 rounded-xl backdrop-blur-xl">
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 mt-20 backdrop-blur-xl">
        <div className="container mx-auto max-w-6xl py-8 px-6 text-center text-gray-500/80">
          <p className="text-sm">© {currentYear} Neonlab.dev — Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
