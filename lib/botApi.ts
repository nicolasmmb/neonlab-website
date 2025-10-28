const DEFAULT_BOT_API_BASE_URL = 'https://bot.neonlab.dev'

export const resolveBotApiBaseUrl = () =>
  (process.env.NEXT_PUBLIC_BOT_API_BASE_URL || DEFAULT_BOT_API_BASE_URL).replace(/\/+$/, '')

export { DEFAULT_BOT_API_BASE_URL }
