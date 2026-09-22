import { useMemo, useState } from 'react'
import { CalendarClock, List, CalendarDays } from 'lucide-react'
import {
  obtenerConsultas,
  actualizarConsulta,
  eliminarConsulta,
  ESTADOS_CONSULTA,
} from '../../utils/consultasStorage'
import CitaCard, { ETIQUETA_ESTADO } from '../../components/admin/CitaCard'
import CitasCalendario from '../../components/admin/CitasCalendario'

export default function AdminCitas() {
  const [consultas, setConsultas] = useState(() => obtenerConsultas())
  const [vista, setVista] = useState('lista')
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
    filtro === 'todas' ? consultas : consultas.filter((c) => (c.estado || 'pendiente') === filtro)

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Citas y solicitudes</h2>
          <p className="text-sm text-slate-500">Seguimiento de las solicitudes recibidas.</p>
        </div>

        <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setVista('lista')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
              vista === 'lista' ? 'bg-primary-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <List className="h-4 w-4" aria-hidden="true" />
            Lista
          </button>
          <button
            type="button"
            onClick={() => setVista('calendario')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
              vista === 'calendario' ? 'bg-primary-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Calendario
          </button>
        </div>
      </div>

      {vista === 'lista' ? (
        <>
          <div className="mb-5 flex flex-wrap gap-2">
            {['todas', ...ESTADOS_CONSULTA].map((clave) => (
              <button
                key={clave}
                type="button"
                onClick={() => setFiltro(clave)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
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
              {visibles.map((consulta) => (
                <CitaCard
                  key={consulta.id}
                  consulta={consulta}
                  onEstado={cambiarEstado}
                  onNota={cambiarNota}
                  onEliminar={borrar}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <CitasCalendario
          consultas={consultas}
          onEstado={cambiarEstado}
          onNota={cambiarNota}
          onEliminar={borrar}
        />
      )}
    </div>
  )
}
