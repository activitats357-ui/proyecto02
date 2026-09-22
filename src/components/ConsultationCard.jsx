import { Calendar, Clock, Mail, MessageSquare, Phone, Trash2 } from 'lucide-react'

function formatearFecha(iso) {
  try {
    return new Intl.DateTimeFormat('es-HN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export default function ConsultationCard({ consulta, onEliminar }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-softer sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            Solicitado el {formatearFecha(consulta.createdAt)}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{consulta.nombre}</h3>
        </div>
        <span className="rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700">
          {consulta.tipoSolicitud}
        </span>
      </div>

      <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm text-slate-600 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
          <dt className="sr-only">Teléfono</dt>
          <dd>{consulta.telefono}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
          <dt className="sr-only">Email</dt>
          <dd className="break-all">{consulta.email}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
          <dt className="sr-only">Fecha y horario preferido</dt>
          <dd>
            {consulta.fechaPreferida} · {consulta.horarioPreferido}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-slate-500">Tratamiento:</dt>
          <dd className="font-medium text-slate-700">{consulta.tratamiento}</dd>
        </div>
      </dl>

      {consulta.mensaje && (
        <div className="mt-4 flex gap-2 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
          <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
          <p>{consulta.mensaje}</p>
        </div>
      )}

      <div className="mt-4 flex justify-end border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={() => onEliminar(consulta.id)}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          Eliminar
        </button>
      </div>
    </article>
  )
}
