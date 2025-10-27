# 📧 Sistema de Notificação de Contatos

## ✅ Como Funciona Agora

O formulário de contato **NÃO** usa mais Resend ou qualquer serviço de email. Em vez disso:

### 1. **Logs no Console** (Padrão)
Todos os contatos são logados no console do servidor:

```bash
# Ver logs em tempo real
docker logs -f neonlab-website

# Você verá:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 NOVO CONTATO RECEBIDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Data: 26/10/2025, 15:30:45
👤 Nome: João Silva
📧 Email: joao@email.com
💬 Mensagem:
Gostaria de desenvolver um site...
🌐 IP: 123.45.67.89
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. **Webhook (Opcional)**
Você pode configurar um webhook para receber notificações em:
- Discord
- Slack
- Telegram
- Qualquer endpoint HTTP

## 🎯 Opções de Notificação

### Opção 1: Discord Webhook (Recomendado - Gratuito)

#### Setup:
1. No Discord, vá no canal desejado
2. Configurações do Canal → Integrações → Webhooks
3. Criar Webhook
4. Copiar URL do Webhook

#### Configurar:
```env
# .env.local ou GitHub Secret
WEBHOOK_URL=https://discord.com/api/webhooks/123456789/token_aqui
```

#### Resultado:
Você receberá uma mensagem formatada no Discord com todos os dados do contato!

### Opção 2: Slack Webhook

#### Setup:
1. Acesse: https://api.slack.com/messaging/webhooks
2. Create New App → From scratch
3. Incoming Webhooks → Activate
4. Add New Webhook to Workspace
5. Copiar Webhook URL

#### Configurar:
```env
WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX
```

### Opção 3: Telegram Bot

#### Setup:
1. Fale com @BotFather no Telegram
2. `/newbot` e siga instruções
3. Copie o token
4. Obtenha seu Chat ID: fale com @userinfobot

#### Configurar:
```env
WEBHOOK_URL=https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>
```

### Opção 4: Email (Alternativas Gratuitas)

#### SendGrid (100 emails/dia grátis)
```bash
npm install @sendgrid/mail
```

Crie `lib/sendgrid.ts`:
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendEmail(to: string, subject: string, html: string) {
  await sgMail.send({ from: 'seu@email.com', to, subject, html })
}
```

#### Mailgun (5,000 emails/mês grátis)
```bash
npm install mailgun.js form-data
```

#### Amazon SES (62,000 emails/mês grátis)
```bash
npm install @aws-sdk/client-ses
```

### Opção 5: Arquivo de Log Local

Já está implementado em desenvolvimento! Os contatos são salvos em `contacts.log`

```bash
# Ver contatos
cat contacts.log

# Monitorar em tempo real
tail -f contacts.log
```

## 🔧 Configuração

### Local (Desenvolvimento):
```bash
# Criar .env.local
echo 'WEBHOOK_URL=https://discord.com/api/webhooks/seu_webhook' > .env.local

# Testar
npm run dev
```

### Produção (Docker):
```bash
# Opção 1: Via docker-compose
echo 'WEBHOOK_URL=https://discord.com/api/webhooks/seu_webhook' > .env
docker-compose up -d

# Opção 2: Via docker run
docker run -d \
  -p 3000:3000 \
  -e WEBHOOK_URL='https://discord.com/api/webhooks/seu_webhook' \
  neonlab-website:latest
```

### GitHub Actions:
```
Settings > Secrets > Actions > New secret

Name: WEBHOOK_URL
Value: https://discord.com/api/webhooks/seu_webhook
```

## 📊 Testando

### 1. Teste Local:
```bash
npm run dev

# Preencha o formulário em http://localhost:3000
# Veja os logs no terminal
```

### 2. Teste com cURL:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@email.com",
    "message": "Mensagem de teste"
  }'
```

### 3. Teste Discord Webhook:
```bash
curl -X POST 'https://discord.com/api/webhooks/SEU_WEBHOOK' \
  -H 'Content-Type: application/json' \
  -d '{
    "content": "Teste de webhook!"
  }'
```

## 🎨 Personalizar Notificações

Edite `app/api/contact/route.ts`:

```typescript
// Discord - Adicionar campos
embeds: [{
  title: '📧 Novo Contato',
  color: 3447003,
  fields: [
    { name: '👤 Nome', value: name },
    { name: '📧 Email', value: email },
    { name: '💬 Mensagem', value: message },
    // Adicione mais campos aqui!
    { name: '🔗 Link', value: 'https://neonlab.dev/admin' }
  ]
}]
```

## 🔒 Segurança

### Rate Limiting (Opcional):
```typescript
// app/api/contact/route.ts
const rateLimitMap = new Map()

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (limit && now - limit < 60000) { // 1 minuto
    return NextResponse.json({ error: 'Muitas requisições' }, { status: 429 })
  }
  
  rateLimitMap.set(ip, now)
  // ... resto do código
}
```

### Honeypot (Anti-bot):
```tsx
// No formulário
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// Na API
if (website) {
  return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
}
```

## 📈 Monitoramento Avançado

### Dashboard Simples:
Crie `app/api/contacts/stats/route.ts`:

```typescript
export async function GET() {
  // Retornar estatísticas dos contatos
  return NextResponse.json({
    total: 0,
    today: 0,
    lastContact: null
  })
}
```

### Integração com Analytics:
```typescript
// Adicionar no route.ts
await fetch('https://plausible.io/api/event', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Contact Form Submission',
    url: 'https://neonlab.dev/contact',
    domain: 'neonlab.dev'
  })
})
```

## 🆘 Troubleshooting

### Webhook não funciona:
```bash
# Testar webhook manualmente
curl -X POST '$WEBHOOK_URL' \
  -H 'Content-Type: application/json' \
  -d '{"content": "teste"}'
```

### Logs não aparecem:
```bash
# Verificar se container está rodando
docker ps | grep neonlab

# Ver logs com mais detalhes
docker logs --tail 100 -f neonlab-website
```

### Variável não reconhecida:
```bash
# Verificar variáveis no container
docker exec neonlab-website env | grep WEBHOOK
```

---

## ✅ Checklist

- [ ] Decidir método de notificação
- [ ] Configurar webhook (se aplicável)
- [ ] Adicionar variável de ambiente
- [ ] Testar localmente
- [ ] Testar em produção
- [ ] Configurar rate limiting (opcional)
- [ ] Adicionar honeypot (opcional)
- [ ] Monitorar logs regularmente

**Status:** ✅ Sistema de notificação configurado!
