import { useState } from 'react'
import { Save, RotateCcw, Upload, Info } from 'lucide-react'
import {
  obtenerAjustes,
  guardarAjustes,
  IMAGEN_PORTADA_POR_DEFECTO,
} from '../../utils/contentStore'

const claseInput =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100'

// Límite para imágenes subidas como base64 (localStorage es limitado).
const MAX_BYTES = 800 * 1024

export default function AdminPortada() {
  const [imagen, setImagen] = useState(() => obtenerAjustes().imagenPortada)
  const [guardado, setGuardado] = useState(false)
  const [aviso, setAviso] = useState('')

  const esDataUrl = typeof imagen === 'string' && imagen.startsWith('data:')

  const subir = (archivo) => {
    if (!archivo) return
    if (archivo.size > MAX_BYTES) {
      setAviso(
        'La imagen supera los 800 KB. Con almacenamiento local conviene usar imágenes ligeras: redúcela o usa una URL externa.',
      )
      return
    }
    const lector = new FileReader()
    lector.onload = () => {
      setImagen(lector.result)
      setAviso('')
      setGuardado(false)
    }
    lector.readAsDataURL(archivo)
  }

  const guardar = () => {
    guardarAjustes({ imagenPortada: imagen })
    setGuardado(true)
  }

  const restablecer = () => {
    setImagen(IMAGEN_PORTADA_POR_DEFECTO)
    guardarAjustes({ imagenPortada: IMAGEN_PORTADA_POR_DEFECTO })
    setGuardado(true)
    setAviso('')
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Imagen de portada</h2>
        <p className="text-sm text-slate-500">
          Es la fotografía principal de la página de inicio (junto al título).
        </p>
      </div>

      {/* Recomendaciones */}
      <div className="mb-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-600" aria-hidden="true" />
        <div>
          <p className="font-semibold text-slate-700">Medidas recomendadas</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            <li>Proporción <strong>4:3</strong> (horizontal).</li>
            <li>Tamaño ideal: <strong>1200 × 900 px</strong> (mínimo 800 × 600 px).</li>
            <li>Formato <strong>JPG</strong> o <strong>WebP</strong>, peso inferior a <strong>800 KB</strong>.</li>
            <li>La imagen se recorta para llenar el marco; deja el motivo principal centrado.</li>
          </ul>
        </div>
      </div>

      {/* Vista previa */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-softer">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Vista previa</p>
        <div className="mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl bg-slate-100">
          {imagen ? (
            <img src={imagen} alt="Vista previa de la portada" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
              Sin imagen
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            <Upload className="h-4 w-4" aria-hidden="true" />
            Subir imagen
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => subir(e.target.files?.[0])}
            />
          </label>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              …o pegar una URL
            </label>
            <input
              type="text"
              value={esDataUrl ? '' : imagen}
              onChange={(e) => {
                setImagen(e.target.value)
                setGuardado(false)
              }}
              placeholder="https://…"
              className={claseInput}
            />
            {esDataUrl && (
              <p className="mt-1 text-xs text-slate-500">Hay una imagen subida desde tu dispositivo.</p>
            )}
          </div>
        </div>
      </div>

      {aviso && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {aviso}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={guardar}
          className="flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-950"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Guardar portada
        </button>
        <button
          type="button"
          onClick={restablecer}
          className="flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Restablecer la original
        </button>
        {guardado && <span className="text-sm font-medium text-emerald-600">✓ Guardado</span>}
      </div>
    </div>
  )
}
