export default function Header({ compacto = false }) {
  return (
    <div className="text-center">
      <img
        src="/logo.png"
        alt="Logo da escola"
        onError={(e) => (e.currentTarget.style.display = 'none')}
        className={`mx-auto rounded-2xl object-contain ${compacto ? 'h-20' : 'h-36'}`}
      />
      <h1 className={`mt-3 font-extrabold tracking-tight ${compacto ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
        ELEIÇÃO DO GRÊMIO ESTUDANTIL
      </h1>
      <p className="text-ciano font-bold text-xl">2026</p>
      <p className="mt-1 text-sm sm:text-base text-azul">E.E. Professor Laudelino Fernandes dos Santos</p>
    </div>
  )
}
