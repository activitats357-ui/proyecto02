import { useState } from 'react'
import { Save, RotateCcw, Plus, Trash2, ArrowUp, ArrowDown, Info } from 'lucide-react'
import { obtenerPrivacidad, guardarPrivacidad, generarId } from '../../utils/contentStore'

const claseInput =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100'

export default function AdminPrivacidad() {
  const [secciones, setSecciones] = useState(() => obtenerPrivacidad())
  const [guardado, setGuardado] = useState(false)

  const cambiar = (id, campo, valor) => {
    setSecciones((prev) => prev.map((s) => (s.id === id ? { ...s, [campo]: valor } : s)))
    setGuardado(false)
  }

  const mover = (indice, direccion) => {
    const destino = indice + direccion
    if (destino < 0 || destino >= secciones.length) return
    setSecciones((prev) => {
      const copia = [...prev]
      const [elemento] = copia.splice(indice, 1)
      copia.splice(destino, 0, elemento)
      return copia
    })
    setGuardado(false)
  }

  const anadir = () => {
    setSecciones((prev) => [...prev, { id: generarId('priv'), titulo: '', contenido: '' }])
    setGuardado(false)
  }

  const eliminar = (id) => {
    if (window.confirm('¿Eliminar esta sección?')) {
      setSecciones((prev) => prev.filter((s) => s.id !== id))
      setGuardado(false)
    }
  }

  const guardar = () => {
    const limpias = secciones.filter((s) => s.titulo.trim() || s.contenido.trim())
    guardarPrivacidad(limpias)
    setSecciones(limpias)
    setGuardado(true)
  }

  const recargar = () => {
    setSecciones(obtenerPrivacidad())
    setGuardado(false)
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Política de privacidad</h2>
        <p className="text-sm text-slate-500">
          Edita el título y el texto de cada sección. Se muestran en la página pública /privacidad.
        </p>
      </div>

      <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
        <p>
          Recomendación: este texto tiene efectos legales. Conviene que lo revise un profesional
          legal y se adapte a la normativa aplicable antes de publicarlo como definitivo.
        </p>
      </div>

      <div className="space-y-4">
        {secciones.map((seccion, indice) => (
          <div key={seccion.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-softer">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Sección {indice + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => mover(indice, -1)}
                  disabled={indice === 0}
                  aria-label="Subir"
                  className="rounded-lg border border-slate-300 p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => mover(indice, 1)}
                  disabled={indice === secciones.length - 1}
                  aria-label="Bajar"
                  className="rounded-lg border border-slate-300 p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => eliminar(seccion.id)}
                  aria-label="Eliminar sección"
                  className="rounded-lg border border-red-200 p-1.5 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <label className="mb-3 block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Título</span>
              <input
                type="text"
                value={seccion.titulo}
                onChange={(e) => cambiar(seccion.id, 'titulo', e.target.value)}
                className={claseInput}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Texto</span>
              <textarea
                rows={5}
                value={seccion.contenido}
                onChange={(e) => cambiar(seccion.id, 'contenido', e.target.value)}
                className={claseInput}
              />
            </label>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={anadir}
        className="mt-4 flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Añadir sección
      </button>

      <div className="mt-6 flex flex-wrap items-center gap-3">
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
