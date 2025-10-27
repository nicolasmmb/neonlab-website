import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

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

    // Log dos dados recebidos (em produção, você pode enviar para webhook, Discord, Telegram, etc.)
    const contactData = {
      timestamp: new Date().toISOString(),
      name,
      email,
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
    console.log(`💬 Mensagem:\n${message}`)
    console.log(`🌐 IP: ${contactData.ip}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    // OPCIONAL: Enviar para webhook (Discord, Slack, Telegram, etc.)
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
                  { name: '💬 Mensagem', value: message.substring(0, 1000) },
                  { name: '📅 Data', value: new Date().toLocaleString('pt-BR'), inline: true },
                  { name: '🌐 IP', value: contactData.ip, inline: true }
                ],
                timestamp: new Date().toISOString()
              }]
            })
          })
        }
        // Exemplo para Slack Webhook
        else if (webhookUrl.includes('slack.com')) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: `*Novo Contato - Neonlab.dev*\n\n*Nome:* ${name}\n*Email:* ${email}\n*Mensagem:* ${message}\n*Data:* ${new Date().toLocaleString('pt-BR')}`
            })
          })
        }
        // Webhook genérico
        else {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData)
          })
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
