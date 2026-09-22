import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import {
  CalendarClock,
  Clock,
  Stethoscope,
  Users,
  UserCog,
  Image,
  LogOut,
  ExternalLink,
} from 'lucide-react'
import { cerrarSesion, obtenerUsuarioActual } from '../../utils/adminAuth'

const enlaces = [
  { to: '/admin', fin: true, etiqueta: 'Citas', icono: CalendarClock },
  { to: '/admin/horarios', etiqueta: 'Horarios', icono: Clock },
  { to: '/admin/servicios', etiqueta: 'Especialidades', icono: Stethoscope },
  { to: '/admin/profesionales', etiqueta: 'Profesionales', icono: Users },
  { to: '/admin/portada', etiqueta: 'Portada', icono: Image },
  { to: '/admin/cuentas', etiqueta: 'Cuentas', icono: UserCog },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const usuarioActual = obtenerUsuarioActual()
  const usuario = usuarioActual ? usuarioActual.usuario : ''

  const salir = () => {
    cerrarSesion()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-900 font-extrabold text-white">
              A
            </span>
            <div>
              <p className="text-sm font-bold leading-tight">Panel de administración</p>
              <p className="text-xs text-slate-500">Sesión: {usuario}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Ver web
            </Link>
            <button
              type="button"
              onClick={salir}
              className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <nav className="mb-6 flex gap-1.5 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5">
          {enlaces.map(({ to, fin, etiqueta, icono: Icono }) => (
            <NavLink
              key={to}
              to={to}
              end={fin}
              className={({ isActive }) =>
                `flex flex-shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-primary-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icono className="h-4 w-4" aria-hidden="true" />
              {etiqueta}
            </NavLink>
          ))}
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
