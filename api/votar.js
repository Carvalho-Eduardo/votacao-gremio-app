import { redis, RA_VALIDO } from './_redis.js'

// Script Lua: o Redis executa tudo de uma vez (ATÔMICO).
// Marca o RA como usado E soma o voto, ou não faz nada se o RA já votou.
const SCRIPT = `
if redis.call('SADD', KEYS[1], ARGV[1]) == 0 then return 0 end
redis.call('HINCRBY', KEYS[2], ARGV[2], 1)
return 1`

export default async function handler(req, res) {
  try {
    const ra = String(req.body?.ra ?? '')
    const chapa = String(req.body?.chapa ?? '')
    if (!RA_VALIDO.test(ra) || !['1', '2'].includes(chapa)) return res.json({ status: 'invalido' })
    const r = await redis.eval(SCRIPT, ['eleitores', 'votos'], [ra, chapa])
    return res.json({ status: r === 1 ? 'ok' : 'ja_votou' })
  } catch (e) {
    return res.status(500).json({ erro: 'falha' })
  }
}
