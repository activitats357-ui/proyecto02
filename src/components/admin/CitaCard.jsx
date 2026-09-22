import { Trash2, Phone, Mail } from 'lucide-react'
import { ESTADOS_CONSULTA } from '../../utils/consultasStorage'

export const ESTILO_ESTADO = {
  pendiente: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmada: 'bg-blue-100 text-blue-800 border-blue-200',
  atendida: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  cancelada: 'bg-slate-200 text-slate-600 border-slate-300',
}

// Color de acento (para puntos/chips del calendario).
export const PUNTO_ESTADO = {
  pendiente: 'bg-amber-400',
  confirmada: 'bg-blue-500',
  atendida: 'bg-emerald-500',
  cancelada: 'bg-slate-400',
}

export const ETIQUETA_ESTADO = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  atendida: 'Atendida',
  cancelada: 'Cancelada',
}

export function formatearFechaHora(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default function CitaCard({ consulta, onEstado, onNota, onEliminar }) {
  const estado = consulta.estado || 'pendiente'

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-softer">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900">{consulta.nombre}</h3>
          <p className="text-xs text-slate-500">Recibida: {formatearFechaHora(consulta.createdAt)}</p>
        </div>
        <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ESTILO_ESTADO[estado]}`}>
          {ETIQUETA_ESTADO[estado]}
        </span>
      </div>

      <div className="grid gap-1.5 text-sm text-slate-600">
        <a href={`tel:${consulta.telefono}`} className="flex items-center gap-2 hover:text-secondary-700">
          <Phone className="h-4 w-4 text-slate-400" aria-hidden="true" />
          {consulta.telefono}
        </a>
        <a href={`mailto:${consulta.email}`} className="flex items-center gap-2 break-all hover:text-secondary-700">
          <Mail className="h-4 w-4 text-slate-400" aria-hidden="true" />
          {consulta.email}
        </a>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 rounded-xl bg-slate-50 p-3 text-xs">
        <div>
          <dt className="font-semibold text-slate-500">Solicitud</dt>
          <dd className="text-slate-800">{consulta.tipoSolicitud || '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Tratamiento</dt>
          <dd className="text-slate-800">{consulta.tratamiento || '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Fecha preferida</dt>
          <dd className="text-slate-800">{consulta.fechaPreferida || '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">Horario</dt>
          <dd className="text-slate-800">{consulta.horarioPreferido || '—'}</dd>
        </div>
      </dl>

      {consulta.mensaje && (
        <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{consulta.mensaje}</p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs font-semibold text-slate-500" htmlFor={`estado-${consulta.id}`}>
          Estado
        </label>
        <select
          id={`estado-${consulta.id}`}
          value={estado}
          onChange={(e) => onEstado(consulta.id, e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100"
        >
          {ESTADOS_CONSULTA.map((e) => (
            <option key={e} value={e}>
              {ETIQUETA_ESTADO[e]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onEliminar(consulta.id)}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Eliminar
        </button>
      </div>

      <textarea
        rows={2}
        value={consulta.notasInternas || ''}
        onChange={(e) => onNota(consulta.id, e.target.value)}
        placeholder="Notas internas (no visibles en la web)…"
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100"
      />
    </article>
  )
}
