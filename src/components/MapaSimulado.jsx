import { MapPin } from 'lucide-react'

/**
 * Componente visual que simula un mapa (sin depender de Google Maps ni de
 * ninguna API externa). Queda preparado para sustituirse por un mapa real
 * (por ejemplo, un iframe de Google Maps o Mapbox) más adelante.
 */
export default function MapaSimulado({ ciudad }) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-primary-100 bg-primary-50 sm:aspect-[16/10]"
      role="img"
      aria-label={`Mapa simulado de la ubicación del centro en ${ciudad}`}
    >
      {/* Líneas que simulan calles */}
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
        <line x1="0" y1="30%" x2="100%" y2="35%" stroke="#8daed9" strokeWidth="3" />
        <line x1="0" y1="65%" x2="100%" y2="60%" stroke="#8daed9" strokeWidth="3" />
        <line x1="20%" y1="0" x2="15%" y2="100%" stroke="#8daed9" strokeWidth="3" />
        <line x1="70%" y1="0" x2="75%" y2="100%" stroke="#8daed9" strokeWidth="3" />
        <line x1="45%" y1="0" x2="48%" y2="100%" stroke="#b3c9e6" strokeWidth="2" />
      </svg>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(13,32,56,0.3) 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-700 shadow-lg ring-4 ring-white">
          <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
        </span>
        <span className="mt-2 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-md">
          {ciudad}
        </span>
      </div>

      <span className="absolute bottom-2 right-3 text-[10px] font-medium text-slate-500">
        Mapa simulado — sustituir por mapa real
      </span>
    </div>
  )
}
