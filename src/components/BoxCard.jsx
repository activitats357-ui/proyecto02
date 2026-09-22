import { DoorOpen } from 'lucide-react'
import ImagenMuestra from './ImagenMuestra'

const GRADIENTES = [
  'from-primary-700 to-primary-900',
  'from-secondary-600 to-secondary-800',
  'from-primary-800 to-secondary-800',
]

export default function BoxCard({ box, indice = 0 }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-softer transition-shadow duration-300 hover:shadow-soft">
      {box.foto ? (
        <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={box.foto}
            alt={`Fotografía de ${box.nombre || 'espacio'}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <ImagenMuestra
          icon={DoorOpen}
          gradiente={GRADIENTES[indice % GRADIENTES.length]}
          className="aspect-[4/3] w-full"
          etiqueta="Imagen del espacio — sustituir por fotografía real"
        />
      )}
      <div className="p-6">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary-700">{box.numero}</span>
        <h3 className="mt-1 text-lg font-bold text-slate-900">{box.nombre}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{box.descripcion}</p>
      </div>
    </article>
  )
}
