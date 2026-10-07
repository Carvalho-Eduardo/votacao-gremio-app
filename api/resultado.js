import { redis } from './_redis.js'
// Acesse: https://SEU-SITE.vercel.app/api/resultado?senha=SUA_SENHA
export default async function handler(req, res) {
  if (!process.env.ADMIN_PASSWORD || req.query.senha !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ erro: 'senha incorreta' })
  const votos = (await redis.hgetall('votos')) || {}
  const total = await redis.scard('eleitores')
  return res.json({
    'CONEXÃO (chapa 1)': Number(votos['1'] || 0),
    'CHAPA 2': Number(votos['2'] || 0),
    totalDeVotos: total,
  })
}
