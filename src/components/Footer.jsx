import { Link } from 'react-router-dom'
import { Activity, Mail, MapPin, Phone } from 'lucide-react'
import { centro } from '../data'
import { useContent } from '../hooks/useContent'

export default function Footer() {
  const { servicios } = useContent()
  const anio = new Date().getFullYear()

  return (
    <footer className="bg-primary-950 text-primary-200">
      <div className="container-app grid gap-10 py-14 sm:py-16 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-500 text-white">
              <Activity className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-extrabold text-white">{centro.nombreCorto}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-primary-300">{centro.descripcionBreve}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Navegación</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-secondary-300">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-secondary-300">Servicios</Link></li>
            <li><Link to="/equipo" className="hover:text-secondary-300">Equipo</Link></li>
            <li><Link to="/contacto" className="hover:text-secondary-300">Contacto y turnos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Servicios</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {servicios.slice(0, 4).map((servicio) => (
              <li key={servicio.slug}>
                <Link to="/servicios" className="hover:text-secondary-300">
                  {servicio.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-400" aria-hidden="true" />
              <span>{centro.direccion}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 flex-shrink-0 text-secondary-400" aria-hidden="true" />
              <a href={`tel:${centro.telefono}`} className="hover:text-secondary-300">
                {centro.telefonoMostrado}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 flex-shrink-0 text-secondary-400" aria-hidden="true" />
              <a href={`mailto:${centro.email}`} className="hover:text-secondary-300 break-all">
                {centro.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-800/60">
        <div className="container-app flex flex-col items-center justify-between gap-4 py-6 text-xs text-primary-400 sm:flex-row">
          <p>© {anio} {centro.nombre}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacidad" className="hover:text-secondary-300">Política de privacidad</Link>
            <Link to="/aviso-legal" className="hover:text-secondary-300">Aviso legal</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
