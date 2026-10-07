export default function ChapaCard({ chapa, onVotar }) {
  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-card border-t-8 border-ciano p-6">
      <h3 className="text-2xl font-extrabold">{chapa.nome === 'CHAPA 2' ? chapa.nome : `CHAPA ${chapa.nome}`}</h3>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-azul">Líder</p>
      <p className="text-lg font-semibold">{chapa.lider}</p>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-azul">Proposta</p>
      <p className="flex-1 text-slate-700 leading-relaxed">{chapa.proposta}</p>
      <button
        onClick={() => onVotar(chapa)}
        className="mt-6 w-full rounded-2xl bg-azul py-4 text-lg font-bold text-white shadow-md hover:bg-marinho active:scale-[0.98] transition"
      >
        VOTAR NESTA CHAPA
      </button>
    </div>
  )
}
