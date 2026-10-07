import { redis, RA_VALIDO } from './_redis.js'
export default async function handler(req, res) {
  try {
    const ra = String(req.body?.ra ?? '')
    if (!RA_VALIDO.test(ra)) return res.json({ status: 'invalido' })
    const usado = await redis.sismember('eleitores', ra)
    return res.json({ status: usado ? 'ja_votou' : 'pode_votar' })
  } catch (e) {
    return res.status(500).json({ erro: 'falha' })
  }
}
