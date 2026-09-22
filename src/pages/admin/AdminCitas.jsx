import { useMemo, useState } from 'react'
import { Trash2, CalendarClock, Phone, Mail } from 'lucide-react'
import {
  obtenerConsultas,
  actualizarConsulta,
  eliminarConsulta,
  ESTADOS_CONSULTA,
} from '../../utils/consultasStorage'

const ESTILO_ESTADO = {
  pendiente: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmada: 'bg-blue-100 text-blue-800 border-blue-200',
  atendida: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  cancelada: 'bg-slate-200 text-slate-600 border-slate-300',
}

const ETIQUETA_ESTADO = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  atendida: 'Atendida',
  cancelada: 'Cancelada',
}

function formatearFecha(iso) {
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

export default function AdminCitas() {
  const [consultas, setConsultas] = useState(() => obtenerConsultas())
  const [filtro, setFiltro] = useState('todas')

  const cambiarEstado = (id, estado) => setConsultas(actualizarConsulta(id, { estado }))
  const cambiarNota = (id, notasInternas) => setConsultas(actualizarConsulta(id, { notasInternas }))
  const borrar = (id) => {
    if (window.confirm('¿Eliminar esta solicitud definitivamente?')) {
      setConsultas(eliminarConsulta(id))
    }
  }

  const conteos = useMemo(() => {
    const base = { todas: consultas.length }
    for (const estado of ESTADOS_CONSULTA) {
      base[estado] = consultas.filter((c) => (c.estado || 'pendiente') === estado).length
    }
    return base
  }, [consultas])

  const visibles =
    filtro === 'todas'
      ? consultas
      : consultas.filter((c) => (c.estado || 'pendiente') === filtro)

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Citas y solicitudes</h2>
          <p className="text-sm text-slate-500">Seguimiento de las solicitudes recibidas.</p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {['todas', ...ESTADOS_CONSULTA].map((clave) => (
          <button
            key={clave}
            type="button"
            onClick={() => setFiltro(clave)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold capitalize transition ${
              filtro === clave
                ? 'border-primary-900 bg-primary-900 text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {clave === 'todas' ? 'Todas' : ETIQUETA_ESTADO[clave]} ({conteos[clave] ?? 0})
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <CalendarClock className="h-10 w-10 text-slate-300" aria-hidden="true" />
          <p className="mt-4 text-base font-semibold text-slate-700">No hay solicitudes en esta vista.</p>
          <p className="mt-1 text-sm text-slate-500">
            Las solicitudes enviadas desde el formulario de contacto aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visibles.map((consulta) => {
            const estado = consulta.estado || 'pendiente'
            return (
              <article
                key={consulta.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-softer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{consulta.nombre}</h3>
                    <p className="text-xs text-slate-500">Recibida: {formatearFecha(consulta.createdAt)}</p>
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ESTILO_ESTADO[estado]}`}
                  >
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
                    onChange={(e) => cambiarEstado(consulta.id, e.target.value)}
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
                    onClick={() => borrar(consulta.id)}
                    className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Eliminar
                  </button>
                </div>

                <textarea
                  rows={2}
                  value={consulta.notasInternas || ''}
                  onChange={(e) => cambiarNota(consulta.id, e.target.value)}
                  placeholder="Notas internas (no visibles en la web)…"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100"
                />
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
