import { useState } from 'react'
import { Save, RotateCcw, GripVertical } from 'lucide-react'
import { obtenerServicios, guardarServicios } from '../../utils/contentStore'
import { MAPA_ICONOS } from '../../utils/iconos'

const NOMBRES_ICONOS = Object.keys(MAPA_ICONOS)

function Campo({ etiqueta, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {etiqueta}
      </span>
      {children}
    </label>
  )
}

const claseInput =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100'

export default function AdminServicios() {
  const [items, setItems] = useState(() => obtenerServicios())
  const [guardado, setGuardado] = useState(false)

  const cambiar = (indice, campo, valor) => {
    setItems((previos) => previos.map((s, i) => (i === indice ? { ...s, [campo]: valor } : s)))
    setGuardado(false)
  }

  const cambiarLista = (indice, campo, texto) => {
    const lista = texto.split('\n').map((l) => l.trim()).filter(Boolean)
    cambiar(indice, campo, lista)
  }

  const guardar = () => {
    guardarServicios(items)
    setGuardado(true)
  }

  const recargar = () => {
    setItems(obtenerServicios())
    setGuardado(false)
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Especialidades</h2>
        <p className="text-sm text-slate-500">
          Edita los textos de cada especialidad. Los cambios se reflejan en la página de servicios.
        </p>
      </div>

      <div className="space-y-5">
        {items.map((servicio, indice) => (
          <details
            key={servicio.slug || indice}
            open={indice === 0}
            className="group rounded-2xl border border-slate-200 bg-white shadow-softer"
          >
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-2xl px-5 py-4 font-bold text-slate-900">
              <GripVertical className="h-4 w-4 text-slate-300" aria-hidden="true" />
              {servicio.nombre || 'Especialidad sin nombre'}
            </summary>

            <div className="grid gap-4 border-t border-slate-100 p-5 sm:grid-cols-2">
              <Campo etiqueta="Nombre">
                <input
                  type="text"
                  value={servicio.nombre || ''}
                  onChange={(e) => cambiar(indice, 'nombre', e.target.value)}
                  className={claseInput}
                />
              </Campo>
              <Campo etiqueta="Duración">
                <input
                  type="text"
                  value={servicio.duracion || ''}
                  onChange={(e) => cambiar(indice, 'duracion', e.target.value)}
                  className={claseInput}
                />
              </Campo>
              <Campo etiqueta="Icono">
                <select
                  value={servicio.icono || 'Activity'}
                  onChange={(e) => cambiar(indice, 'icono', e.target.value)}
                  className={claseInput}
                >
                  {NOMBRES_ICONOS.map((nombre) => (
                    <option key={nombre} value={nombre}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </Campo>
              <div className="sm:col-span-2">
                <Campo etiqueta="Descripción breve">
                  <textarea
                    rows={2}
                    value={servicio.descripcionBreve || ''}
                    onChange={(e) => cambiar(indice, 'descripcionBreve', e.target.value)}
                    className={claseInput}
                  />
                </Campo>
              </div>
              <div className="sm:col-span-2">
                <Campo etiqueta="Descripción completa">
                  <textarea
                    rows={4}
                    value={servicio.descripcion || ''}
                    onChange={(e) => cambiar(indice, 'descripcion', e.target.value)}
                    className={claseInput}
                  />
                </Campo>
              </div>
              <Campo etiqueta="Beneficios (uno por línea)">
                <textarea
                  rows={4}
                  value={(servicio.beneficios || []).join('\n')}
                  onChange={(e) => cambiarLista(indice, 'beneficios', e.target.value)}
                  className={claseInput}
                />
              </Campo>
              <Campo etiqueta="Problemas habituales (uno por línea)">
                <textarea
                  rows={4}
                  value={(servicio.problemas || []).join('\n')}
                  onChange={(e) => cambiarLista(indice, 'problemas', e.target.value)}
                  className={claseInput}
                />
              </Campo>
            </div>
          </details>
        ))}
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
