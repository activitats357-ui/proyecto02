import { GraduationCap } from 'lucide-react'

export default function TeamCard({ profesional }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-softer transition-shadow duration-300 hover:shadow-soft">
      <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100">
        <img
          src={profesional.foto}
          alt={`Retrato de ${profesional.nombre || 'profesional'}${profesional.especialidad ? `, ${profesional.especialidad.toLowerCase()}` : ''}`}
          className="h-full w-full object-cover"
          loading="lazy"
          width={480}
          height={600}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{profesional.nombre}</h3>
          <p className="text-sm font-semibold text-secondary-700">{profesional.especialidad}</p>
          <p className="text-xs text-slate-500">{profesional.cargo}</p>
        </div>

        <div className="flex items-start gap-2 text-sm text-slate-600">
          <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
          <span>{profesional.formacion}</span>
        </div>

        <p className="text-sm leading-relaxed text-slate-600">{profesional.trayectoria}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {(profesional.areas || []).map((area) => (
            <span
              key={area}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
