import { ImageOff } from 'lucide-react'

/**
 * Marcador visual que sustituye a una fotografía real.
 * Se usa en todo el proyecto en lugar de imágenes externas para no depender
 * de servicios de terceros que puedan dejar de funcionar. Debe sustituirse
 * por fotografías profesionales reales del centro antes de publicar la web.
 */
export default function ImagenMuestra({
  icon: Icon = ImageOff,
  gradiente = 'from-primary-800 via-primary-700 to-secondary-700',
  className = '',
  etiqueta = 'Imagen de muestra — sustituir por fotografía real',
  mostrarEtiqueta = true,
}) {
  return (
    <div
      className={`relative isolate flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradiente} ${className}`}
      role="img"
      aria-label={etiqueta}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />
      <Icon className="relative h-12 w-12 text-white/70 sm:h-16 sm:w-16" strokeWidth={1.5} aria-hidden="true" />
      {mostrarEtiqueta && (
        <span className="absolute bottom-2 left-2 right-2 rounded-md bg-black/35 px-2 py-1 text-center text-[10px] font-medium leading-tight text-white/90 backdrop-blur-sm sm:text-xs">
          {etiqueta}
        </span>
      )}
    </div>
  )
}
