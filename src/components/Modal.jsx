import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

/**
 * Modal accesible propio (sin usar window.confirm/alert).
 * Cierra con Escape, bloquea el scroll del fondo y atrapa el foco básico.
 */
export default function Modal({ abierto, onCerrar, titulo, children, footer }) {
  const contenedorRef = useRef(null)

  useEffect(() => {
    if (!abierto) return undefined

    const alPulsarTecla = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }

    document.addEventListener('keydown', alPulsarTecla)
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    contenedorRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', alPulsarTecla)
      document.body.style.overflow = overflowPrevio
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div
        className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm animate-fade-in"
        onClick={onCerrar}
        aria-hidden="true"
      />
      <div
        ref={contenedorRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl outline-none animate-slide-up sm:p-8"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="modal-titulo" className="text-xl font-bold text-slate-900">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="text-sm text-slate-600">{children}</div>
        {footer && <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">{footer}</div>}
      </div>
    </div>
  )
}
