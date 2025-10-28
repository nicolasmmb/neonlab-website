import axios, { AxiosError } from 'axios'
import { Effect } from 'effect'
import { resolveBotApiBaseUrl } from './botApi'

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ContactFlowSuccess {
  message: string
  status?: string
}

export class ContactFlowError extends Error {
  readonly details?: string
  readonly cause?: unknown

  constructor(message: string, options: { cause?: unknown; details?: string } = {}) {
    super(message)
    this.name = 'ContactFlowError'

    if (options.cause !== undefined) {
      this.cause = options.cause
    }

    if (options.details) {
      this.details = options.details
    }
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const extractStringField = (value: unknown, field: string): string | undefined => {
  if (typeof value === 'object' && value !== null && field in value) {
    const maybeString = (value as Record<string, unknown>)[field]
    if (typeof maybeString === 'string') {
      return maybeString
    }
  }

  return undefined
}

const toFlowError = (error: unknown): ContactFlowError => {
  if (axios.isAxiosError(error)) {
    return mapAxiosError(error)
  }

  if (error instanceof Error) {
    return new ContactFlowError('Não foi possível enviar sua mensagem. Tente novamente.', {
      cause: error,
      details: error.message
    })
  }

  return new ContactFlowError('Não foi possível enviar sua mensagem. Tente novamente.')
}

const mapAxiosError = (error: AxiosError): ContactFlowError => {
  if (error.code === 'ECONNABORTED') {
    return new ContactFlowError('Tempo de resposta excedido. Tente novamente em instantes.')
  }

  const status = error.response?.status
  const payload = error.response?.data

  if (status === 400) {
    const message =
      typeof payload === 'string'
        ? payload
        : typeof payload === 'object' && payload && 'message' in payload
          ? String((payload as Record<string, unknown>).message)
          : 'Dados inválidos. Verifique as informações e tente novamente.'
    return new ContactFlowError(message, { cause: error })
  }

  if (status === 429) {
    return new ContactFlowError('Muitas solicitações em sequência. Aguarde alguns instantes.', {
      cause: error
    })
  }

  if (status && status >= 500) {
    return new ContactFlowError('Serviço temporariamente indisponível. Tente novamente em breve.', {
      cause: error
    })
  }

  const details =
    typeof payload === 'string'
      ? payload
      : typeof payload === 'object' && payload && 'error' in payload
        ? String((payload as Record<string, unknown>).error)
        : undefined

  return new ContactFlowError('Não foi possível enviar sua mensagem agora. Tente novamente em instantes.', {
    cause: error,
    details
  })
}

const sanitizePayload = (payload: ContactPayload): ContactPayload => {
  const sanitized: ContactPayload = {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    message: payload.message.trim()
  }

  if (payload.phone && payload.phone.trim() !== '') {
    sanitized.phone = payload.phone.trim()
  }

  return sanitized
}

const validatePayload = (payload: ContactPayload) => {
  if (!payload.name || !payload.email || !payload.message) {
    return Effect.fail(
      new ContactFlowError('Preencha todos os campos obrigatórios antes de enviar sua mensagem.')
    )
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return Effect.fail(new ContactFlowError('Informe um e-mail válido.'))
  }

  return Effect.succeed(payload)
}

export const sendContactEffect = (input: ContactPayload) =>
  Effect.gen(function* () {
    const payload = sanitizePayload(input)
    const validPayload = yield* validatePayload(payload)

    const requestBody = {
      name: validPayload.name,
      email: validPayload.email,
      message: validPayload.message,
      phone: validPayload.phone ?? ''
    }

    const endpoint = `${resolveBotApiBaseUrl()}/contacts`

    if (process.env.NODE_ENV !== 'production') {
      console.info('[ContactFlow] Enviando contato para o bot API', {
        endpoint,
        payload: requestBody
      })
    }

    const response = yield* Effect.tryPromise({
      try: () =>
        axios.post(endpoint, requestBody, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          timeout: 10_000
        }),
      catch: (cause) => toFlowError(cause)
    })

    const rawData: unknown = response.data
    const message =
      extractStringField(rawData, 'message') ||
      'Mensagem enviada com sucesso! Entraremos em contato em breve.'

    const status = extractStringField(rawData, 'status')

    if (process.env.NODE_ENV !== 'production') {
      console.info('[ContactFlow] Resposta recebida do bot API', {
        status: response.status,
        data: rawData
      })
    }

    return { message, status }
  })
