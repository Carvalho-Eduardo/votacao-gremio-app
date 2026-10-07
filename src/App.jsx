import { useState } from 'react'
import { chamar } from './lib/api'
import { CHAPAS } from './lib/chapas'
import Header from './components/Header'
import ChapaCard from './components/ChapaCard'
import ConfirmModal from './components/ConfirmModal'

const Card = ({ children }) => (
  <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-card">{children}</div>
)

export default function App() {
  const [tela, setTela] = useState('ra') // ra | chapas | jaVotou | sucesso
  const [ra, setRa] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [escolhida, setEscolhida] = useState(null)

  async function continuar(e) {
    e.preventDefault()
    if (!ra) return setErro('Digite seu RA.')
    setLoading(true); setErro('')
    const { data, error } = await chamar('verificar', { ra })
    setLoading(false)
    if (error) return setErro('Erro de conexão. Tente novamente.')
    if (data === 'invalido') return setErro('RA inválido. Verifique o número digitado.')
    if (data === 'ja_votou') return setTela('jaVotou')
    setTela('chapas')
  }

  async function confirmar() {
    setLoading(true); setErro('')
    const { data, error } = await chamar('votar', { ra, chapa: escolhida.id })
    setLoading(false)
    if (error) return setErro('Erro ao registrar o voto. Tente novamente.')
    if (data === 'ja_votou') { setEscolhida(null); return setTela('jaVotou') }
    if (data === 'invalido') { setEscolhida(null); setTela('ra'); return setErro('RA inválido. Verifique o número digitado.') }
    if (data !== 'ok') return setErro('Não foi possível registrar o voto.')
    setEscolhida(null); setTela('sucesso')
  }

  function reiniciar() { setRa(''); setErro(''); setEscolhida(null); setTela('ra') }

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Header compacto={tela !== 'ra'} />
        <div className="mt-8">
          {tela === 'ra' && (
            <Card>
              <form onSubmit={continuar}>
                <p className="text-center text-lg">Digite seu RA para iniciar a votação.</p>
                <label className="mt-5 block text-sm font-bold text-azul" htmlFor="ra">RA</label>
                <input id="ra" value={ra} inputMode="numeric" autoComplete="off" maxLength={15}
                  onChange={(e) => { setRa(e.target.value.replace(/\D/g, '')); setErro('') }}
                  className="mt-1 w-full rounded-2xl border-2 border-ciano/50 px-4 py-4 text-center text-2xl tracking-widest focus:border-azul focus:outline-none" />
                {erro && <p className="mt-3 text-center text-sm font-semibold text-red-600">{erro}</p>}
                <button disabled={loading}
                  className="mt-5 w-full rounded-2xl bg-azul py-4 text-lg font-bold text-white shadow-md hover:bg-marinho disabled:opacity-50">
                  {loading ? 'VERIFICANDO...' : 'CONTINUAR'}
                </button>
              </form>
            </Card>
          )}

          {tela === 'chapas' && (
            <>
              <p className="mb-5 text-center text-lg font-semibold">Escolha a chapa em que deseja votar</p>
              <div className="grid gap-6 md:grid-cols-2">
                {CHAPAS.map((c) => <ChapaCard key={c.id} chapa={c} onVotar={setEscolhida} />)}
              </div>
              {escolhida && (
                <ConfirmModal chapa={escolhida} loading={loading} erro={erro}
                  onVoltar={() => { setEscolhida(null); setErro('') }} onConfirmar={confirmar} />
              )}
            </>
          )}

          {tela === 'jaVotou' && (
            <Card>
              <div className="text-center">
                <p className="text-xl font-extrabold">Este RA já registrou um voto.</p>
                <p className="mt-2 text-slate-600">Não é possível realizar uma nova votação.</p>
                <button onClick={reiniciar} className="mt-6 w-full rounded-2xl bg-azul py-4 font-bold text-white hover:bg-marinho">VOLTAR AO INÍCIO</button>
              </div>
            </Card>
          )}

          {tela === 'sucesso' && (
            <Card>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ciano-claro text-4xl text-ciano">✓</div>
                <p className="mt-4 text-2xl font-extrabold">Voto registrado com sucesso!</p>
                <p className="mt-2 text-slate-600">Obrigado por participar da eleição do Grêmio Estudantil.</p>
                <button onClick={reiniciar} className="mt-6 w-full rounded-2xl bg-azul py-4 font-bold text-white hover:bg-marinho">PRÓXIMO ALUNO</button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
