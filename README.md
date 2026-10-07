# Votação – Grêmio Estudantil 2026 (E.E. Prof. Laudelino Fernandes dos Santos)

React + Vite + Tailwind + Vercel (funções /api) + Upstash Redis (banco da Vercel). Sem Supabase.

## Publicar (tudo pela Vercel)
1. Suba esta pasta para um repositório no GitHub.
2. Vercel → Add New → Project → importe o repositório (Framework: Vite) → Deploy.
3. No projeto: aba **Storage** → **Create Database** / Marketplace → **Upstash for Redis** → crie e conecte ao projeto (as variáveis são criadas sozinhas).
4. Settings → Environment Variables → crie `ADMIN_PASSWORD` com uma senha sua (para ver o resultado).
5. Deployments → ⋯ → **Redeploy** (obrigatório para ler as variáveis novas).

## Resultado
`https://SEU-SITE.vercel.app/api/resultado?senha=SUA_SENHA`

## Testar no computador (opcional)
`npm install` e `npx vercel dev` (o `npm run dev` sozinho não roda as funções /api).

## Alterar o nome da Chapa 2
Edite `src/lib/chapas.js`.

## Observações
- O voto é secreto: guardamos só o total por chapa e a lista de RAs que já votaram, sem ligar um ao outro.
- Votação atômica: marcar o RA e contar o voto acontecem em uma única operação.
- Qualquer RA numérico (4 a 15 dígitos) é aceito; sem lista de RAs, convém acompanhamento da comissão.
