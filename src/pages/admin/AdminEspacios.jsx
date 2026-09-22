import { useState } from 'react'
import { Save, RotateCcw, Upload } from 'lucide-react'
import { obtenerEspacios, guardarEspacios } from '../../utils/contentStore'

const claseInput =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100'

// Límite blando para imágenes subidas como base64 (localStorage es limitado).
const MAX_BYTES_IMAGEN = 500 * 1024

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

export default function AdminEspacios() {
  const [items, setItems] = useState(() => obtenerEspacios())
  const [guardado, setGuardado] = useState(false)
  const [aviso, setAviso] = useState('')

  const cambiar = (id, campo, valor) => {
    setItems((prev) => prev.map((e) => (e.id === id ? { ...e, [campo]: valor } : e)))
    setGuardado(false)
  }

  const subirImagen = (id, archivo) => {
    if (!archivo) return
    if (archivo.size > MAX_BYTES_IMAGEN) {
      setAviso(
        'La imagen supera los 500 KB. Con almacenamiento local conviene usar imágenes pequeñas o una URL externa.',
      )
      return
    }
    const lector = new FileReader()
    lector.onload = () => {
      cambiar(id, 'foto', lector.result)
      setAviso('')
    }
    lector.readAsDataURL(archivo)
  }

  const guardar = () => {
    guardarEspacios(items)
    setGuardado(true)
  }

  const recargar = () => {
    setItems(obtenerEspacios())
    setGuardado(false)
    setAviso('')
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Espacios</h2>
        <p className="text-sm text-slate-500">
          Edita el título, la descripción y la foto de los espacios que se muestran en la página de
          inicio. Medida recomendada de la foto: proporción 4:3 (p. ej. 1000 × 750 px), &lt; 500 KB.
        </p>
      </div>

      {aviso && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {aviso}
        </p>
      )}

      <div className="space-y-5">
        {items.map((espacio) => (
          <div key={espacio.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-softer">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="sm:w-44 sm:flex-shrink-0">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                  {espacio.foto ? (
                    <img
                      src={espacio.foto}
                      alt={`Foto de ${espacio.nombre || 'espacio'}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                      Sin foto
                    </div>
                  )}
                </div>
                <label className="mt-2 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-2 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100">
                  <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                  Subir foto
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => subirImagen(espacio.id, e.target.files?.[0])}
                  />
                </label>
              </div>

              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <Campo etiqueta="Número/etiqueta">
                  <input
                    type="text"
                    value={espacio.numero || ''}
                    onChange={(e) => cambiar(espacio.id, 'numero', e.target.value)}
                    className={claseInput}
                  />
                </Campo>
                <Campo etiqueta="Título">
                  <input
                    type="text"
                    value={espacio.nombre || ''}
                    onChange={(e) => cambiar(espacio.id, 'nombre', e.target.value)}
                    className={claseInput}
                  />
                </Campo>
                <div className="sm:col-span-2">
                  <Campo etiqueta="Descripción">
                    <textarea
                      rows={3}
                      value={espacio.descripcion || ''}
                      onChange={(e) => cambiar(espacio.id, 'descripcion', e.target.value)}
                      className={claseInput}
                    />
                  </Campo>
                </div>
                <div className="sm:col-span-2">
                  <Campo etiqueta="URL de la foto (alternativa a subir archivo)">
                    <input
                      type="text"
                      value={typeof espacio.foto === 'string' && !espacio.foto.startsWith('data:') ? espacio.foto : ''}
                      onChange={(e) => cambiar(espacio.id, 'foto', e.target.value)}
                      placeholder="https://…"
                      className={claseInput}
                    />
                  </Campo>
                </div>
              </div>
            </div>
          </div>
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
