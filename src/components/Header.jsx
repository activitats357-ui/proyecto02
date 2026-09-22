import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Activity, Menu } from 'lucide-react'
import { centro } from '../data'
import Button from './Button'
import MobileMenu from './MobileMenu'

const ENLACES = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/equipo', label: 'Equipo' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [conFondo, setConFondo] = useState(false)

  useEffect(() => {
    const alHacerScroll = () => setConFondo(window.scrollY > 8)
    alHacerScroll()
    window.addEventListener('scroll', alHacerScroll)
    return () => window.removeEventListener('scroll', alHacerScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        conFondo ? 'bg-white/95 shadow-softer backdrop-blur-sm' : 'bg-white'
      }`}
    >
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[999] focus:rounded-md focus:bg-primary-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido principal
      </a>
      <div className="container-app flex items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-2.5" aria-label={`${centro.nombre} — Inicio`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 text-white">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold text-slate-900 sm:text-lg">{centro.nombreCorto}</span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-secondary-700">
              Fisioterapia deportiva
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {ENLACES.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-secondary-50 text-secondary-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {enlace.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/contacto" variant="primary" size="md">
            Solicitar turno
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 lg:hidden"
          onClick={() => setMenuAbierto(true)}
          aria-label="Abrir menú de navegación"
          aria-expanded={menuAbierto}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <MobileMenu
        abierto={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
        enlaces={ENLACES}
      />
    </header>
  )
}
