import { ArrowRight, Clock } from 'lucide-react'
import Button from './Button'
import { obtenerIcono } from '../utils/iconos'

export default function ServiceCard({ servicio, compacto = false }) {
  const Icono = obtenerIcono(servicio.icono)

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-softer transition-shadow duration-300 hover:shadow-soft sm:p-7">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
        <Icono className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{servicio.nombre}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
        {servicio.descripcionBreve}
      </p>

      {!compacto && (
        <>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {servicio.duracion}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">{servicio.descripcion}</p>

          <div className="mt-5 border-t border-slate-200 pt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Beneficios</p>
            <ul className="space-y-1.5 text-sm text-slate-600">
              {servicio.beneficios.map((beneficio) => (
                <li key={beneficio} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary-500" aria-hidden="true" />
                  {beneficio}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Problemas habituales que pueden abordarse
            </p>
            <ul className="space-y-1.5 text-sm text-slate-600">
              {servicio.problemas.map((problema) => (
                <li key={problema} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                  {problema}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="mt-6">
        <Button to="/contacto" variant="secondary" size="md" icon={ArrowRight} className="w-full sm:w-auto">
          Solicitar turno
        </Button>
      </div>
    </article>
  )
}
