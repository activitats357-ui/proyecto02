import { useState } from 'react'
import { Save, RotateCcw, Plus, Trash2, Eye, EyeOff, Upload } from 'lucide-react'
import { obtenerProfesionales, guardarProfesionales, generarId } from '../../utils/contentStore'

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

function perfilVacio() {
  return {
    id: generarId('profesional'),
    nombre: '',
    cargo: 'Fisioterapeuta',
    especialidad: '',
    formacion: '',
    trayectoria: '',
    areas: [],
    foto: '',
    deshabilitado: false,
  }
}

export default function AdminProfesionales() {
  const [items, setItems] = useState(() => obtenerProfesionales())
  const [guardado, setGuardado] = useState(false)
  const [aviso, setAviso] = useState('')

  const cambiar = (id, campo, valor) => {
    setItems((previos) => previos.map((p) => (p.id === id ? { ...p, [campo]: valor } : p)))
    setGuardado(false)
  }

  const cambiarAreas = (id, texto) => {
    const lista = texto.split('\n').map((l) => l.trim()).filter(Boolean)
    cambiar(id, 'areas', lista)
  }

  const subirImagen = (id, archivo) => {
    if (!archivo) return
    if (archivo.size > MAX_BYTES_IMAGEN) {
      setAviso(
        'La imagen supera los 500 KB. Con almacenamiento local conviene usar imágenes pequeñas o una URL externa. Súbela más ligera o pega una URL.',
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

  const alternarVisibilidad = (id) => {
    setItems((previos) => previos.map((p) => (p.id === id ? { ...p, deshabilitado: !p.deshabilitado } : p)))
    setGuardado(false)
  }

  const anadir = () => {
    setItems((previos) => [...previos, perfilVacio()])
    setGuardado(false)
  }

  const eliminar = (id) => {
    if (window.confirm('¿Eliminar este perfil?')) {
      setItems((previos) => previos.filter((p) => p.id !== id))
      setGuardado(false)
    }
  }

  const guardar = () => {
    guardarProfesionales(items)
    setGuardado(true)
  }

  const recargar = () => {
    setItems(obtenerProfesionales())
    setGuardado(false)
    setAviso('')
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Profesionales</h2>
          <p className="text-sm text-slate-500">
            Edita los perfiles, cámbiales la foto, deshabilítalos o añade nuevos.
          </p>
        </div>
        <button
          type="button"
          onClick={anadir}
          className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Añadir perfil
        </button>
      </div>

      {aviso && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {aviso}
        </p>
      )}

      <div className="space-y-5">
        {items.map((profesional) => (
          <div
            key={profesional.id}
            className={`rounded-2xl border bg-white p-5 shadow-softer ${
              profesional.deshabilitado ? 'border-slate-200 opacity-70' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="sm:w-40 sm:flex-shrink-0">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100">
                  {profesional.foto ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      src={profesional.foto}
                      alt={`Foto de ${profesional.nombre || 'profesional'}`}
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
                    onChange={(e) => subirImagen(profesional.id, e.target.files?.[0])}
                  />
                </label>
              </div>

              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <Campo etiqueta="Nombre">
                  <input
                    type="text"
                    value={profesional.nombre || ''}
                    onChange={(e) => cambiar(profesional.id, 'nombre', e.target.value)}
                    className={claseInput}
                  />
                </Campo>
                <Campo etiqueta="Cargo">
                  <input
                    type="text"
                    value={profesional.cargo || ''}
                    onChange={(e) => cambiar(profesional.id, 'cargo', e.target.value)}
                    className={claseInput}
                  />
                </Campo>
                <div className="sm:col-span-2">
                  <Campo etiqueta="Especialidad">
                    <input
                      type="text"
                      value={profesional.especialidad || ''}
                      onChange={(e) => cambiar(profesional.id, 'especialidad', e.target.value)}
                      className={claseInput}
                    />
                  </Campo>
                </div>
                <div className="sm:col-span-2">
                  <Campo etiqueta="Formación">
                    <textarea
                      rows={2}
                      value={profesional.formacion || ''}
                      onChange={(e) => cambiar(profesional.id, 'formacion', e.target.value)}
                      className={claseInput}
                    />
                  </Campo>
                </div>
                <div className="sm:col-span-2">
                  <Campo etiqueta="Trayectoria">
                    <textarea
                      rows={3}
                      value={profesional.trayectoria || ''}
                      onChange={(e) => cambiar(profesional.id, 'trayectoria', e.target.value)}
                      className={claseInput}
                    />
                  </Campo>
                </div>
                <div className="sm:col-span-2">
                  <Campo etiqueta="Áreas (una por línea)">
                    <textarea
                      rows={2}
                      value={(profesional.areas || []).join('\n')}
                      onChange={(e) => cambiarAreas(profesional.id, e.target.value)}
                      className={claseInput}
                    />
                  </Campo>
                </div>
                <div className="sm:col-span-2">
                  <Campo etiqueta="URL de la foto (alternativa a subir archivo)">
                    <input
                      type="text"
                      value={typeof profesional.foto === 'string' && !profesional.foto.startsWith('data:') ? profesional.foto : ''}
                      onChange={(e) => cambiar(profesional.id, 'foto', e.target.value)}
                      placeholder="https://…"
                      className={claseInput}
                    />
                  </Campo>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => alternarVisibilidad(profesional.id)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  profesional.deshabilitado
                    ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                    : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {profesional.deshabilitado ? (
                  <>
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    Habilitar (mostrar en la web)
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                    Deshabilitar (ocultar de la web)
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => eliminar(profesional.id)}
                className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Eliminar
              </button>
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
