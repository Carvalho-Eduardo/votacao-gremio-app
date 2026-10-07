import { Redis } from '@upstash/redis'
// A integração da Vercel cria as variáveis automaticamente (nomes KV_* ou UPSTASH_*).
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
})
export const RA_VALIDO = /^[0-9]{4,15}$/
