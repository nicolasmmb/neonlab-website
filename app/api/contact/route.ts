import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Log dos dados recebidos (em produção, você pode encaminhar para o webhook do Discord)
    const normalizedPhone =
      typeof phone === 'string' && phone.trim().length > 0 ? phone.trim() : undefined

    const contactData = {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: normalizedPhone,
      message,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    }

    // Log no console (visível no Docker logs)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 NOVO CONTATO RECEBIDO')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📅 Data: ${new Date().toLocaleString('pt-BR')}`)
    console.log(`👤 Nome: ${name}`)
    console.log(`📧 Email: ${email}`)
    if (normalizedPhone) {
      console.log(`📱 Telefone: ${normalizedPhone}`)
    }
    console.log(`💬 Mensagem:\n${message}`)
    console.log(`🌐 IP: ${contactData.ip}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    // Envia para o bot API
    const botApiBaseUrl = process.env.BOT_API_BASE_URL || 'https://bot.neonlab.dev'
    const botEndpoint = botApiBaseUrl.replace(/\/+$/, '') + '/contacts'

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    let botResponseBody: string | undefined
    try {
      const botResponse = await fetch(botEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          ...(normalizedPhone ? { phone: normalizedPhone } : {})
        }),
        signal: controller.signal
      })
      botResponseBody = await botResponse.text()
      clearTimeout(timeout)

      if (!botResponse.ok) {
        let errorMessage = `Bot API retornou status ${botResponse.status}`
        try {
          const parsed = botResponseBody ? JSON.parse(botResponseBody) : null
          if (parsed && typeof parsed === 'object' && 'error' in parsed && typeof parsed.error === 'string') {
            errorMessage = parsed.error
          }
        } catch {
          // ignora, usamos mensagem padrão
        }

        console.error('❌ Falha ao enviar contato ao bot API:', {
          status: botResponse.status,
          body: botResponseBody
        })

        return NextResponse.json(
          {
            error: 'Não foi possível enviar sua mensagem agora. Tente novamente em instantes.',
            details: errorMessage
          },
          { status: 502 }
        )
      }

      console.log('✅ Contato encaminhado para o bot API com sucesso.')
    } catch (botError) {
      clearTimeout(timeout)

      const isAbortError = botError instanceof Error && botError.name === 'AbortError'
      const details = botError instanceof Error ? botError.message : 'Erro desconhecido ao chamar o bot API'

      console.error('❌ Erro ao comunicar com o bot API:', botError)

      return NextResponse.json(
        {
          error: 'Não foi possível enviar sua mensagem agora. Por favor, tente novamente em instantes.',
          details: isAbortError ? 'Tempo de espera excedido ao contatar o bot.' : details
        },
        { status: 502 }
      )
    }

    // OPCIONAL: Enviar para webhook (Discord)
    const webhookUrl = process.env.WEBHOOK_URL
    
    if (webhookUrl) {
      try {
        // Exemplo para Discord Webhook
        if (webhookUrl.includes('discord.com')) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              embeds: [{
                title: '📧 Novo Contato - Neonlab.dev',
                color: 3447003, // Azul
                fields: [
                  { name: '👤 Nome', value: name, inline: true },
                  { name: '📧 Email', value: email, inline: true },
                  ...(normalizedPhone
                    ? [{ name: '📱 Telefone', value: normalizedPhone, inline: true }]
                    : []),
                  { name: '💬 Mensagem', value: message.substring(0, 1000) },
                  { name: '📅 Data', value: new Date().toLocaleString('pt-BR'), inline: true },
                  { name: '🌐 IP', value: contactData.ip, inline: true }
                ],
                timestamp: new Date().toISOString()
              }]
            })
          })
        } else {
          console.warn(
            '[contact route] Webhook URL informado não é do Discord; nenhuma notificação adicional foi enviada.'
          )
        }
      } catch (webhookError) {
        console.error('Erro ao enviar webhook:', webhookError)
        // Continua mesmo se o webhook falhar
      }
    }

    // OPCIONAL: Salvar em arquivo (útil para desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      const fs = require('fs').promises
      const path = require('path')
      const logFile = path.join(process.cwd(), 'contacts.log')
      
      try {
        await fs.appendFile(
          logFile, 
          JSON.stringify(contactData, null, 2) + '\n---\n',
          'utf8'
        )
      } catch (fsError) {
        console.error('Erro ao salvar em arquivo:', fsError)
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem recebida com sucesso! Entraremos em contato em breve.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('❌ Erro ao processar contato:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao processar sua mensagem. Tente novamente.',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}
