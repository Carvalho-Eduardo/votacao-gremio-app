export default function ConfirmModal({ chapa, loading, erro, onVoltar, onConfirmar }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-marinho/60 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card text-center">
        <h2 className="text-2xl font-extrabold">CONFIRME SEU VOTO</h2>
        <p className="mt-4 text-slate-600">Você selecionou:</p>
        <p className="mt-1 text-3xl font-extrabold text-azul">
          {chapa.nome === 'CHAPA 2' ? chapa.nome : `CHAPA ${chapa.nome}`}
        </p>
        <p className="mt-1 font-semibold">Líder: {chapa.lider}</p>
        <p className="mt-4 rounded-xl bg-ciano-claro p-3 text-sm">
          Após confirmar, seu voto será registrado e não poderá ser alterado.
        </p>
        {erro && <p className="mt-3 text-sm font-semibold text-red-600">{erro}</p>}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button disabled={loading} onClick={onVoltar}
            className="rounded-2xl border-2 border-azul py-4 font-bold text-azul hover:bg-ciano-claro disabled:opacity-50">
            VOLTAR
          </button>
          <button disabled={loading} onClick={onConfirmar}
            className="rounded-2xl bg-azul py-4 font-bold text-white shadow-lg hover:bg-marinho disabled:opacity-50">
            {loading ? 'ENVIANDO...' : 'CONFIRMAR VOTO'}
          </button>
        </div>
      </div>
    </div>
  )
}
