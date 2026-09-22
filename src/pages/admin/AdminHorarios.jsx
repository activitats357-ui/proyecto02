import { useState } from 'react'
import { Plus, Trash2, Save, RotateCcw } from 'lucide-react'
import { obtenerHorarios, guardarHorarios } from '../../utils/contentStore'

export default function AdminHorarios() {
  const [filas, setFilas] = useState(() => obtenerHorarios())
  const [guardado, setGuardado] = useState(false)

  const cambiar = (indice, campo, valor) => {
    setFilas((previas) => previas.map((f, i) => (i === indice ? { ...f, [campo]: valor } : f)))
    setGuardado(false)
  }

  const anadir = () => {
    setFilas((previas) => [...previas, { dia: '', horario: '' }])
    setGuardado(false)
  }

  const eliminar = (indice) => {
    setFilas((previas) => previas.filter((_, i) => i !== indice))
    setGuardado(false)
  }

  const guardar = () => {
    const limpias = filas.filter((f) => f.dia.trim() || f.horario.trim())
    guardarHorarios(limpias)
    setFilas(limpias)
    setGuardado(true)
  }

  const recargar = () => {
    setFilas(obtenerHorarios())
    setGuardado(false)
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Horarios de atención</h2>
        <p className="text-sm text-slate-500">
          Se muestran en la página de contacto. Escribe el día (o rango) y el horario.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-softer">
        <div className="space-y-3">
          {filas.map((fila, indice) => (
            <div key={indice} className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
              <input
                type="text"
                value={fila.dia}
                onChange={(e) => cambiar(indice, 'dia', e.target.value)}
                placeholder="Ej. Lunes a viernes"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100"
              />
              <input
                type="text"
                value={fila.horario}
                onChange={(e) => cambiar(indice, 'horario', e.target.value)}
                placeholder="Ej. 8:00 — 18:00"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100"
              />
              <button
                type="button"
                onClick={() => eliminar(indice)}
                aria-label="Eliminar fila"
                className="flex-shrink-0 rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={anadir}
          className="mt-4 flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Añadir franja
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={guardar}
          className="flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-950"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={recargar}
          className="flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Descartar
        </button>
        {guardado && <span className="text-sm font-medium text-emerald-600">✓ Guardado</span>}
      </div>
    </div>
  )
}
