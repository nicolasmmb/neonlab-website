'use client'

import React, { useState, useEffect } from 'react'
import { Effect } from 'effect'
import { ContactFlowError, sendContactEffect } from '../lib/contactFlow'
import { Button, Input, Textarea } from './UI'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!successMessage) return
    const timer = setTimeout(() => setSuccessMessage(null), 4000)
    return () => clearTimeout(timer)
  }, [successMessage])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const result = await Effect.runPromise(
        sendContactEffect({ name, email, phone, message })
      )

      if (process.env.NODE_ENV !== 'production') {
        console.info('[ContactForm] Contato enviado com sucesso', result)
      }

      setSuccessMessage(result.message)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch (error) {
      if (error instanceof ContactFlowError) {
        const message = error.details ? `${error.message} (${error.details})` : error.message
        console.error('[ContactForm] Falha ao enviar contato', {
          message: error.message,
          details: error.details,
          cause: error.cause
        })
        setErrorMessage(message)
      } else if (error instanceof Error) {
        console.error('Erro inesperado ao enviar formulário de contato:', error)
        setErrorMessage('Ocorreu um erro inesperado. Tente novamente em instantes.')
      } else {
        setErrorMessage('Ocorreu um erro inesperado. Tente novamente em instantes.')
      }
    } finally {
      setIsSubmitting(false)
    }
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
        <label htmlFor="phone" className="text-sm font-medium text-gray-300/90">
          Telefone (opcional)
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="(11) 91234-5678"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
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
          className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] py-4 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>
      </div>

      {errorMessage && (
        <div className="p-4 text-center text-rose-300/90 border border-rose-500/30 bg-rose-500/10 rounded-xl backdrop-blur-xl">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-4 text-center text-emerald-300/90 border border-emerald-500/30 bg-emerald-500/10 rounded-xl backdrop-blur-xl">
          {successMessage}
        </div>
      )}
    </form>
  )
}
