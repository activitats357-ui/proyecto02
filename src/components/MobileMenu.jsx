import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Activity, X } from 'lucide-react'
import { centro } from '../data'
import Button from './Button'

export default function MobileMenu({ abierto, onCerrar, enlaces }) {
  useEffect(() => {
    if (!abierto) return undefined

    const alPulsarTecla = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', alPulsarTecla)
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', alPulsarTecla)
      document.body.style.overflow = overflowPrevio
    }
  }, [abierto, onCerrar])

  return (
    <div
      className={`fixed inset-0 z-[90] lg:hidden ${abierto ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!abierto}
    >
      <div
        className={`absolute inset-0 bg-primary-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          abierto ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onCerrar}
      />
      <nav
        id="menu-movil"
        aria-label="Navegación móvil"
        className={`absolute right-0 top-0 flex h-full w-full max-w-xs flex-col bg-white shadow-2xl transition-transform duration-300 ${
          abierto ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <span className="flex items-center gap-2 font-extrabold text-slate-900">
            <Activity className="h-5 w-5 text-secondary-600" aria-hidden="true" />
            {centro.nombreCorto}
          </span>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar menú"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-1 flex-col gap-1 px-3 py-4">
          {enlaces.map((enlace) => (
            <li key={enlace.to}>
              <NavLink
                to={enlace.to}
                end={enlace.to === '/'}
                onClick={onCerrar}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-base font-semibold ${
                    isActive ? 'bg-secondary-50 text-secondary-700' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {enlace.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="border-t border-slate-200 p-4">
          <Button to="/contacto" onClick={onCerrar} className="w-full" size="lg">
            Solicitar turno
          </Button>
        </div>
      </nav>
    </div>
  )
}
