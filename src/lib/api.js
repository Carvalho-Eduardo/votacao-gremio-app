export async function chamar(rota, corpo) {
  try {
    const r = await fetch(`/api/${rota}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    })
    if (!r.ok) return { data: null, error: true }
    const j = await r.json()
    return { data: j.status, error: null }
  } catch {
    return { data: null, error: true }
  }
}
