'use client'

import React, { useState, useEffect } from 'react'
import { Button, Input, Textarea } from './UI'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)

  useEffect(() => {
    if (!formSuccess) return
    const timer = setTimeout(() => setFormSuccess(false), 3000)
    return () => clearTimeout(timer)
  }, [formSuccess])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Formulário enviado:', { name, email, message })
    setFormSuccess(true)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
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
          onChange={(event) => setName(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setMessage(event.target.value)}
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
  )
}
