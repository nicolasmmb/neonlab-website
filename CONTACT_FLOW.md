# Fluxo do Formulário de Contato

Este documento descreve todas as etapas do fluxo de envio do formulário de contato e orienta como depurar e testar a integração com o bot API (`bot.neonlab.dev`).

## Visão geral

1. **Interação do usuário**  
   O visitante preenche `Nome`, `E-mail` e `Mensagem` no componente `components/ContactForm.tsx` e envia o formulário.

2. **Reset de estado inicial**  
   O handler `handleSubmit` limpa mensagens de erro/sucesso anteriores, marca o formulário como `isSubmitting` e evita múltiplos envios simultâneos.

3. **Pipeline com EffectTS**  
   `Effect.runPromise(sendContactEffect({ name, email, message }))` inicia um fluxo declarativo definido em `lib/contactFlow.ts`. Esse fluxo é composto pelas etapas abaixo:

   - **Sanitização (`sanitizePayload`)**  
     Remove espaços extras, normaliza o e-mail para minúsculas e prepara os dados para validação/envio.
   - **Validação (`validatePayload`)**  
     Garante que todos os campos possuem conteúdo e que o e-mail possui formato válido. Qualquer falha gera um `ContactFlowError` com mensagem amigável.
   - **Resolução do endpoint (`resolveBaseUrl`)**  
     Define a URL do bot:
       - Usa `process.env.NEXT_PUBLIC_BOT_API_BASE_URL` quando definido (útil para ambientes locais/staging).
       - Padrão: `https://bot.neonlab.dev`.
     O endpoint final é sempre `${baseUrl}/contacts`.
   - **Log de diagnóstico**  
     Em `NODE_ENV !== 'production'`, o fluxo emite `console.info` com o endpoint e o payload sanitizado antes do envio. Após a resposta do bot, outro log detalha o status HTTP e o payload retornado.
   - **Chamada HTTP via Axios**  
     Envia um `POST` JSON com timeout de 10 s. Cabeçalhos: `Content-Type: application/json` e `Accept: application/json`.
   - **Mapeamento do sucesso**  
     Extrai as chaves `message` e `status` do corpo, quando presentes. Caso o bot responda com outro formato, aplica uma mensagem padrão de sucesso.
   - **Tratamento de erros (`toFlowError` / `mapAxiosError`)**  
     Converte exceções do Axios (timeout, 4xx, 5xx, bloqueios de rede/CORS) em `ContactFlowError`. O erro guarda `message`, `details` e `cause` para depuração.

4. **Renderização do feedback no formulário**  
   - Sucesso: o formulário exibe a mensagem retornada pelo bot, limpa os campos e agenda o desaparecimento da notificação após 4 s.
   - Erro: `ContactFlowError` é logado via `console.error` com `message`, `details` e `cause`. O usuário vê uma mensagem amigável indicando o motivo da falha.

## Possíveis causas de falha

- **CORS bloqueado**: se o domínio do site não estiver na lista de `Access-Control-Allow-Origin` do bot, o navegador acusa erro de rede. Cheque os logs no console do navegador e o `contactFlow` exibirá mensagem genérica de falha de requisição.
- **Timeout (10 s)**: a API não respondeu a tempo; o usuário recebe `Tempo de resposta excedido...`.
- **Limite de requisições (429)**: o rate limiter do bot foi atingido; aguarde e teste novamente.
- **Validação 400**: mensagem, nome ou e-mail inválidos. O bot devolve texto explicativo que o frontend exibe diretamente.

## Customização do endpoint

Para usar outro ambiente, defina `NEXT_PUBLIC_BOT_API_BASE_URL`:

```bash
NEXT_PUBLIC_BOT_API_BASE_URL=http://localhost:8080
```

Esse valor pode ser configurado em `.env.local`, variáveis de ambiente do Next.js ou no provedor de hospedagem (Vercel, etc.).

## Checklist de depuração

1. Inspecione os consoles do navegador e do servidor (caso execute o bot localmente) em busca dos logs `ContactFlow`/`ContactForm`.
2. Confirme que as requisições aparecem na aba "Network" do navegador com resposta `202 Accepted`.
3. Execute os arquivos `.http` fornecidos em `requests/contact-bot.http` para testar diretamente o endpoint sem passar pelo frontend.

