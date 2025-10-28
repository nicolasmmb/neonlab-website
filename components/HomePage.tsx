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
            <NeonlabAppleIcon className="w-8 h-8" />
            <span className="text-lg font-bold text-white">NEONLAB.DEV</span>
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
              Podemos ajudar sua equipe com
            </h2>
            <p className="text-center text-lg text-gray-300/90 mt-4 max-w-2xl mx-auto">
              Entregamos squads rápidas com foco em chatbots, plataformas web/mobile, dados e operações em nuvem.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              <Card>
                <CardHeader>
                  <CardTitle>Chatbots e Automação Conversacional</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300/90">
                    <li>Bots multicanal para WhatsApp, web e mobile.</li>
                    <li>Fluxos inteligentes, Node.js, Python e n8n.</li>
                    <li>Integração com CRM, billing e painéis de monitoramento.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>APIs e Plataformas Back-end</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300/90">
                    <li>APIs Go, Python e Node.js desenhadas para escalar.</li>
                    <li>Dashboards de operação, autenticação segura e mensageria.</li>
                    <li>Observabilidade completa e suporte a SQL/NoSQL.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produtos Mobile</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300/90">
                    <li>Apps Flutter e React Native com UX cuidada.</li>
                    <li>Integrações com APIs, pagamentos, push e modo offline.</li>
                    <li>Pipelines de testes e publicação nas lojas.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data & Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300/90">
                    <li>Pipelines em GCP e AWS para marketing, produto e BI.</li>
                    <li>Modelagem com dbt, Airflow e governança de dados.</li>
                    <li>Dashboards Next.js com alertas e indicadores críticos.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CI/CD & Kubernetes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300/90">
                    <li>Esteiras GitOps com GitHub Actions, ArgoCD e Helm.</li>
                    <li>Deploy contínuo em clusters Kubernetes gerenciados.</li>
                    <li>Testes end-to-end, observabilidade e alertas ativos.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experiências Web e Front-end</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300/90">
                    <li>Sites e dashboards em Next.js, React e TypeScript.</li>
                    <li>Integrações com CMS headless, APIs e automações.</li>
                    <li>Acessibilidade, Core Web Vitals e SEO on-page.</li>
                  </ul>
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
              <p className="text-center text-lg text-gray-300/90 mt-4 max-w-xl mx-auto">
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
        <div className="container mx-auto max-w-6xl py-8 px-6 text-center text-gray-300/90">
          <p className="text-sm">© {currentYear} Neonlab.dev — Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
